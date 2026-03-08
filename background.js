// Open sidepanel when user clicks the extension icon (instead of a popup)
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ── Theme-aware Icon ──

/** Sets the toolbar icon variant to match the current light/dark theme. */
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

/** Resolves the effective theme (explicit > system > fallback) and updates the icon. */
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
    // Service workers lack matchMedia; fall back to flag the sidepanel writes
    const { systemIsDark } = await chrome.storage.local.get('systemIsDark');
    setIconForTheme(systemIsDark !== false);
  }
}

// Sidepanel sends 'themeChanged' when user toggles theme in the UI
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'themeChanged') {
    setIconForTheme(msg.isDark);
    return;
  }

  // Recording commands from side panel — ensure offscreen doc exists, then forward
  if (msg.type === 'start-recording') {
    ensureOffscreen()
      .then(() => chrome.runtime.sendMessage({ target: 'offscreen', action: 'start' }))
      .then(sendResponse)
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
  if (msg.type === 'stop-recording') {
    chrome.runtime.sendMessage({ target: 'offscreen', action: 'stop' })
      .then(sendResponse)
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }

  // Transcribe audio via Whisper API — runs in background to bypass CORS
  if (msg.type === 'transcribe-audio') {
    transcribeAudio(msg.audioB64, msg.config)
      .then(text => sendResponse({ text }))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }

  // Chunked recording: offscreen sends audio chunks during long recordings
  if (msg.type === 'audio-chunk-ready') {
    handleAudioChunk(msg.audioB64);
    return; // fire-and-forget, no response needed
  }
});

/** Transcribes an audio chunk and sends the result to the side panel. */
async function handleAudioChunk(audioB64) {
  try {
    const { transcriptionConfig } = await chrome.storage.local.get('transcriptionConfig');
    if (!transcriptionConfig?.apiKey) return;
    const text = await transcribeAudio(audioB64, transcriptionConfig);
    if (text) {
      chrome.runtime.sendMessage({ type: 'transcription-chunk', text });
    }
  } catch {} // best-effort — don't break recording if a chunk fails
}

/** Sends audio to a Whisper-compatible API and returns transcript text. */
async function transcribeAudio(audioB64, config) {
  // Convert base64 data URL back to blob
  const fetchResp = await fetch(audioB64);
  const blob = await fetchResp.blob();

  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');

  let url;
  if (config.provider === 'openai') {
    url = 'https://api.openai.com/v1/audio/transcriptions';
    formData.append('model', 'whisper-1');
  } else if (config.provider === 'custom') {
    url = config.customUrl;
    if (config.customModel) formData.append('model', config.customModel);
  } else {
    url = 'https://api.groq.com/openai/v1/audio/transcriptions';
    formData.append('model', 'whisper-large-v3');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${config.apiKey}` },
    body: formData
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.text || '';
}

/** Ensures the offscreen document exists for mic recording. */
async function ensureOffscreen() {
  const contexts = await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] });
  if (contexts.length > 0) return;
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['USER_MEDIA'],
    justification: 'Microphone recording for voice transcription'
  });
}

// Also react to storage changes (covers sidepanel writes we didn't receive via message)
chrome.storage.onChanged.addListener((changes) => {
  if (changes.theme || changes.systemIsDark) detectAndSetIcon();
});

// Set icon immediately on service worker startup
detectAndSetIcon();

// ── Time Tracking ──

// In-memory state for the currently tracked browsing session.
// Persisted to session storage so it survives service worker restarts.
let tracking = {
  tabId: null,         // active tab being timed
  domain: null,        // hostname of the active tab
  startTime: null,     // epoch ms when current segment started
  isIdle: false,       // true when user input has stopped (idle API)
  windowFocused: true  // false when all Chrome windows lose focus
};

/** Writes tracking state to session storage so it persists across SW restarts. */
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

/** Restores tracking state from session storage after a SW wake-up. */
async function loadTrackingState() {
  try {
    const { trackingState } = await chrome.storage.session.get('trackingState');
    if (trackingState) Object.assign(tracking, trackingState);
  } catch {} // session storage may be empty on first run
}

/** Extracts the hostname from a URL; returns null for non-http(s) pages (e.g. chrome://). */
function getDomain(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.hostname;
  } catch {}
  return null;
}

/**
 * Commits the elapsed time since startTime to storage for the current domain.
 * Called on every state transition (tab switch, idle, focus change) and by the
 * periodic alarm so time isn't lost if the SW gets killed between transitions.
 */
async function flushTime() {
  // Nothing to record when paused, idle, or unfocused — just reset the clock
  if (!tracking.domain || !tracking.startTime || tracking.isIdle || !tracking.windowFocused) {
    tracking.startTime = Date.now();
    await saveTrackingState();
    return;
  }

  const now = Date.now();
  const elapsed = Math.round((now - tracking.startTime) / 1000);
  tracking.startTime = now;

  // Discard impossible values: negative or >10 min means the SW was suspended
  if (elapsed <= 0 || elapsed > 600) {
    await saveTrackingState();
    return;
  }

  // Accumulate seconds into a { "YYYY-MM-DD": { domain: seconds } } structure
  const today = new Date().toISOString().slice(0, 10);
  const { timeTracking = {} } = await chrome.storage.local.get('timeTracking');
  if (!timeTracking[today]) timeTracking[today] = {};
  timeTracking[today][tracking.domain] = (timeTracking[today][tracking.domain] || 0) + elapsed;
  await chrome.storage.local.set({ timeTracking });
  await saveTrackingState();
}

/** Begins a new timing segment for the given tab. */
async function startTracking(tabId) {
  const tab = await chrome.tabs.get(tabId).catch(() => null);
  if (!tab) return;
  tracking.tabId = tabId;
  tracking.domain = getDomain(tab.url);
  tracking.startTime = Date.now();
  await saveTrackingState();
}

/** Flushes any pending time, then re-acquires the active tab to start a fresh segment. */
async function updateTracking() {
  await flushTime();

  // Don't start a new segment if the user isn't actively browsing
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
// Each listener reloads state first because the SW may have restarted since
// the last event, losing the in-memory `tracking` object.

// User switched tabs — flush old domain's time, start timing the new tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await loadTrackingState();
  await flushTime();
  await startTracking(activeInfo.tabId);
});

// In-page navigation on the active tab — treat as a domain change
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  await loadTrackingState();
  if (tabId === tracking.tabId && changeInfo.url) {
    await flushTime();
    tracking.domain = getDomain(changeInfo.url);
    tracking.startTime = Date.now();
    await saveTrackingState();
  }
});

// Pause tracking when all Chrome windows lose focus (user switched apps)
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

// Pause tracking when user is idle (no keyboard/mouse input)
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

// Fire idle after 60 seconds of no user input
chrome.idle.setDetectionInterval(60);

// Alarm-based flush keeps data safe if the SW is killed between tab events.
// 0.5 min = 30 seconds — the minimum Chrome allows for alarm intervals.
chrome.alarms.create('flushTime', { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'flushTime') {
    await loadTrackingState();
    await flushTime();
  }
});

// Bootstrap tracking on browser launch and extension install/update
chrome.runtime.onStartup.addListener(async () => {
  await loadTrackingState();
  await updateTracking();
});

chrome.runtime.onInstalled.addListener(async () => {
  await updateTracking();
});
