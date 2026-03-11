#!/usr/bin/env python3
"""Patches the Firefox build of Snackbar to remove Chrome-only features."""

import sys
import os

def patch(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()
    for old, new in replacements:
        if old not in content:
            print(f"  WARNING: patch target not found in {os.path.basename(filepath)}:")
            print(f"    {old[:80]}...")
            continue
        content = content.replace(old, new, 1)
    with open(filepath, 'w') as f:
        f.write(content)

def main():
    build_dir = sys.argv[1]
    bg = os.path.join(build_dir, 'background.js')
    sp = os.path.join(build_dir, 'sidepanel.js')

    print("Patching Firefox build...")

    # ── background.js ──
    patch(bg, [
        # Replace sidePanel API with sidebarAction
        (
            'chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });',
            '// Firefox: toggle sidebar when toolbar icon clicked\n'
            'browser.action.onClicked.addListener(() => { browser.sidebarAction.toggle(); });'
        ),
        # Guard offscreen document (Firefox doesn't support it the same way)
        (
            "const contexts = await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] });",
            "// Firefox: offscreen not supported, skip check\n"
            "  const contexts = typeof chrome.runtime.getContexts === 'function'"
            " ? await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] })"
            " : [];"
        ),
        (
            "await chrome.offscreen.createDocument({\n"
            "    url: 'offscreen.html',\n"
            "    reasons: ['USER_MEDIA'],\n"
            "    justification: 'Microphone recording for voice transcription'\n"
            "  });",
            "if (typeof chrome.offscreen !== 'undefined') {\n"
            "    await chrome.offscreen.createDocument({\n"
            "      url: 'offscreen.html',\n"
            "      reasons: ['USER_MEDIA'],\n"
            "      justification: 'Microphone recording for voice transcription'\n"
            "    });\n"
            "  }"
        ),
    ])

    # ── sidepanel.js ──
    patch(sp, [
        # Add browser detection flag at top
        (
            "// ── Helpers ──",
            'const IS_FIREFOX = typeof browser !== "undefined" && !!browser.runtime;\n\n// ── Helpers ──'
        ),

        # Guard getDriveToken
        (
            "async function getDriveToken() {\n"
            "  try {\n"
            "    const result = await chrome.identity.getAuthToken({ interactive: true });",
            "async function getDriveToken() {\n"
            "  if (IS_FIREFOX) throw new Error('Google Drive is not available in Firefox. Use Nextcloud instead.');\n"
            "  try {\n"
            "    const result = await chrome.identity.getAuthToken({ interactive: true });"
        ),

        # Guard getCalendarToken
        (
            "async function getCalendarToken() {\n"
            "  try {\n"
            "    const result = await chrome.identity.getAuthToken({ interactive: true });",
            "async function getCalendarToken() {\n"
            "  if (IS_FIREFOX) throw new Error('Google Calendar is not available in Firefox.');\n"
            "  try {\n"
            "    const result = await chrome.identity.getAuthToken({ interactive: true });"
        ),

        # Guard clearAllCachedAuthTokens in retry button
        (
            "try { await chrome.identity.clearAllCachedAuthTokens(); } catch {}",
            "try { if (!IS_FIREFOX) await chrome.identity.clearAllCachedAuthTokens(); } catch {}"
        ),

        # Hide Google Drive toggle in notes export settings
        (
            "  // Google Drive toggle\n"
            "  wrap.appendChild(createToggleRow('hard-drive', 'Google Drive',",
            "  // Google Drive toggle (Chrome only)\n"
            "  if (!IS_FIREFOX) wrap.appendChild(createToggleRow('hard-drive', 'Google Drive',"
        ),

        # Hide sync row in settings (Google Drive only)
        (
            "  const syncDesc = syncEnabled ? 'Google Drive' : 'Not configured';",
            "  const syncDesc = syncEnabled ? 'Google Drive' : 'Not configured';\n"
            "  if (!IS_FIREFOX)"
        ),

        # Hide welcome screen sync link (inside template literal, so ${} works)
        (
            '<div class="welcome-sync">Already using Snackbar? <a href="#" id="welcomeSync">Sync from Google Drive</a></div>',
            '${IS_FIREFOX ? "" : \'<div class="welcome-sync">Already using Snackbar? <a href="#" id="welcomeSync">Sync from Google Drive</a></div>\'}'
        ),

        # Guard the welcomeSync click handler (element may not exist in Firefox)
        (
            "welcome.querySelector('#welcomeSync').addEventListener",
            "welcome.querySelector('#welcomeSync')?.addEventListener"
        ),

        # Hide calendar feature toggle in settings for Firefox
        (
            "{ key: 'calendar', label: 'Calendar', desc: 'Google Calendar integration', icon: 'calendar' },",
            "!IS_FIREFOX && { key: 'calendar', label: 'Calendar', desc: 'Google Calendar integration', icon: 'calendar' },"
        ),

        # Filter out falsy entries from the feature list
        (
            "featureList.forEach",
            "featureList.filter(Boolean).forEach"
        ),
    ])

    # ── sidepanel.html: add resize overlay ──
    html = os.path.join(build_dir, 'sidepanel.html')
    patch(html, [
        (
            '  <div class="app">',
            '  <div id="firefoxResize" class="firefox-resize">\n'
            '    <div class="firefox-resize-arrows">\n'
            '      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>\n'
            '    </div>\n'
            '    <div class="firefox-resize-text">Drag the sidebar edge to widen</div>\n'
            '  </div>\n'
            '  <div class="app">'
        ),
    ])

    # ── sidepanel.css: add resize overlay styles ──
    css = os.path.join(build_dir, 'sidepanel.css')
    patch(css, [
        (
            '/* ── Content ── */',
            '/* ── Firefox resize prompt ── */\n'
            '.firefox-resize {\n'
            '  position: fixed;\n'
            '  inset: 0;\n'
            '  z-index: 99999;\n'
            '  background: var(--bg);\n'
            '  display: flex;\n'
            '  flex-direction: column;\n'
            '  align-items: center;\n'
            '  justify-content: center;\n'
            '  gap: 16px;\n'
            '  color: var(--text-secondary);\n'
            '  transition: opacity 0.3s ease;\n'
            '}\n'
            '.firefox-resize.hidden {\n'
            '  opacity: 0;\n'
            '  pointer-events: none;\n'
            '}\n'
            '.firefox-resize-arrows {\n'
            '  opacity: 0.5;\n'
            '  animation: firefox-resize-pulse 2s ease-in-out infinite;\n'
            '}\n'
            '.firefox-resize-text {\n'
            '  font-size: 14px;\n'
            '  font-weight: 500;\n'
            '  text-align: center;\n'
            '  padding: 0 20px;\n'
            '}\n'
            '@keyframes firefox-resize-pulse {\n'
            '  0%, 100% { transform: scale(1); opacity: 0.4; }\n'
            '  50% { transform: scale(1.15); opacity: 0.8; }\n'
            '}\n\n'
            '/* ── Content ── */'
        ),
    ])

    # ── sidepanel.js: add resize observer to hide/show overlay ──
    patch(sp, [
        (
            'const IS_FIREFOX = typeof browser !== "undefined" && !!browser.runtime;\n\n// ── Helpers ──',
            'const IS_FIREFOX = typeof browser !== "undefined" && !!browser.runtime;\n\n'
            '// ── Firefox: one-time sidebar width hint ──\n'
            'if (IS_FIREFOX) {\n'
            '  const overlay = document.getElementById("firefoxResize");\n'
            '  if (overlay) {\n'
            '    chrome.storage.local.get("firefoxResizeHintDone").then(({ firefoxResizeHintDone }) => {\n'
            '      if (firefoxResizeHintDone) { overlay.remove(); return; }\n'
            '      if (document.documentElement.clientWidth >= 380) { overlay.remove(); return; }\n'
            '      const dismiss = () => {\n'
            '        overlay.classList.add("hidden");\n'
            '        chrome.storage.local.set({ firefoxResizeHintDone: true });\n'
            '        setTimeout(() => overlay.remove(), 300);\n'
            '        ro.disconnect();\n'
            '      };\n'
            '      overlay.addEventListener("click", dismiss);\n'
            '      const ro = new ResizeObserver(() => {\n'
            '        if (document.documentElement.clientWidth >= 380) dismiss();\n'
            '      });\n'
            '      ro.observe(document.documentElement);\n'
            '    });\n'
            '  }\n'
            '}\n\n'
            '// ── Helpers ──'
        ),
    ])

    print("Firefox patches applied.")

if __name__ == '__main__':
    main()
