chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ── Theme-aware Icon ──

function setIconForTheme(isDark) {
  const suffix = isDark ? '-dark' : '';
  chrome.action.setIcon({
    path: {
      16: `icons/icon16${suffix}.png`,
      48: `icons/icon48${suffix}.png`,
      128: `icons/icon128${suffix}.png`
    }
  });
}

async function detectAndSetIcon() {
  const { theme } = await chrome.storage.local.get('theme');
  // If user chose explicit light/dark, use that
  if (theme === 'dark') return setIconForTheme(true);
  if (theme === 'light') return setIconForTheme(false);
  // For 'system' or unset, check via offscreen trick or default to dark
  // Chrome toolbar follows system theme, so assume dark if we can't detect
  if (typeof matchMedia !== 'undefined') {
    setIconForTheme(matchMedia('(prefers-color-scheme: dark)').matches);
  } else {
    // Can't detect in service worker — read from storage flag set by sidepanel
    const { systemIsDark } = await chrome.storage.local.get('systemIsDark');
    setIconForTheme(systemIsDark !== false);
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'themeChanged') setIconForTheme(msg.isDark);
});

// Also react to storage changes (for when sidepanel updates theme)
chrome.storage.onChanged.addListener((changes) => {
  if (changes.theme || changes.systemIsDark) detectAndSetIcon();
});

detectAndSetIcon();

// ── Time Tracking ──

let tracking = {
  tabId: null,
  domain: null,
  startTime: null,
  isIdle: false,
  windowFocused: true
};

// Persist tracking state across service worker restarts
async function saveTrackingState() {
  await chrome.storage.session.set({
    trackingState: {
      tabId: tracking.tabId,
      domain: tracking.domain,
      startTime: tracking.startTime,
      isIdle: tracking.isIdle,
      windowFocused: tracking.windowFocused
    }
  });
}

async function loadTrackingState() {
  try {
    const { trackingState } = await chrome.storage.session.get('trackingState');
    if (trackingState) Object.assign(tracking, trackingState);
  } catch {}
}

function getDomain(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.hostname;
  } catch {}
  return null;
}

async function flushTime() {
  if (!tracking.domain || !tracking.startTime || tracking.isIdle || !tracking.windowFocused) {
    tracking.startTime = Date.now();
    await saveTrackingState();
    return;
  }

  const now = Date.now();
  const elapsed = Math.round((now - tracking.startTime) / 1000);
  tracking.startTime = now;

  // Sanity check: skip if <= 0 or > 10 min (SW was likely asleep)
  if (elapsed <= 0 || elapsed > 600) {
    await saveTrackingState();
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const { timeTracking = {} } = await chrome.storage.local.get('timeTracking');
  if (!timeTracking[today]) timeTracking[today] = {};
  timeTracking[today][tracking.domain] = (timeTracking[today][tracking.domain] || 0) + elapsed;
  await chrome.storage.local.set({ timeTracking });
  await saveTrackingState();
}

async function startTracking(tabId) {
  const tab = await chrome.tabs.get(tabId).catch(() => null);
  if (!tab) return;
  tracking.tabId = tabId;
  tracking.domain = getDomain(tab.url);
  tracking.startTime = Date.now();
  await saveTrackingState();
}

async function updateTracking() {
  await flushTime();

  if (!tracking.windowFocused || tracking.isIdle) {
    tracking.domain = null;
    tracking.startTime = null;
    await saveTrackingState();
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab) await startTracking(tab.id);
  } catch {}
}

// ── Event Listeners ──

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await loadTrackingState();
  await flushTime();
  await startTracking(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  await loadTrackingState();
  if (tabId === tracking.tabId && changeInfo.url) {
    await flushTime();
    tracking.domain = getDomain(changeInfo.url);
    tracking.startTime = Date.now();
    await saveTrackingState();
  }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  await loadTrackingState();
  await flushTime();
  tracking.windowFocused = windowId !== chrome.windows.WINDOW_ID_NONE;
  if (tracking.windowFocused) {
    await updateTracking();
  } else {
    tracking.domain = null;
    tracking.startTime = null;
    await saveTrackingState();
  }
});

chrome.idle.onStateChanged.addListener(async (state) => {
  await loadTrackingState();
  await flushTime();
  tracking.isIdle = state !== 'active';
  if (!tracking.isIdle) {
    await updateTracking();
  } else {
    tracking.domain = null;
    tracking.startTime = null;
    await saveTrackingState();
  }
});

// 60 seconds of no input = idle
chrome.idle.setDetectionInterval(60);

// Periodic flush every 30 seconds
chrome.alarms.create('flushTime', { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'flushTime') {
    await loadTrackingState();
    await flushTime();
  }
});

// Initialize on startup/install
chrome.runtime.onStartup.addListener(async () => {
  await loadTrackingState();
  await updateTracking();
});

chrome.runtime.onInstalled.addListener(async () => {
  await updateTracking();
});
