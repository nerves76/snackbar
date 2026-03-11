#!/bin/bash
# Build script for Snackbar browser extension
# Produces snackbar-chrome.zip and snackbar-firefox.zip

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
BUILD="$ROOT/build"
SHARED_FILES="sidepanel.html sidepanel.css sidepanel.js background.js offscreen.html offscreen.js request-mic.html icons LICENSE"

# Clean previous builds
rm -rf "$BUILD"
mkdir -p "$BUILD/chrome" "$BUILD/firefox"

# ── Copy shared files ──
for f in $SHARED_FILES; do
  if [ -d "$ROOT/$f" ]; then
    cp -r "$ROOT/$f" "$BUILD/chrome/$f"
    cp -r "$ROOT/$f" "$BUILD/firefox/$f"
  else
    cp "$ROOT/$f" "$BUILD/chrome/$f"
    cp "$ROOT/$f" "$BUILD/firefox/$f"
  fi
done

# ── Chrome: use main manifest as-is ──
cp "$ROOT/manifest.json" "$BUILD/chrome/manifest.json"

# ── Firefox: use firefox manifest, apply patches ──
cp "$ROOT/manifest.firefox.json" "$BUILD/firefox/manifest.json"

python3 "$ROOT/build-firefox-patch.py" "$BUILD/firefox"

# ── Zip both builds ──
cd "$BUILD/chrome" && zip -r "$ROOT/snackbar-chrome.zip" . > /dev/null
cd "$BUILD/firefox" && zip -r "$ROOT/snackbar-firefox.zip" . > /dev/null

echo ""
echo "Build complete:"
echo "  Chrome:  snackbar-chrome.zip"
echo "  Firefox: snackbar-firefox.zip"
echo ""

# Clean up build directory
rm -rf "$BUILD"
