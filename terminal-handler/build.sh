#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="TerminalLauncher"
BUILD_DIR="$SCRIPT_DIR/build"
APP_PATH="$BUILD_DIR/$APP_NAME.app"
INSTALL_DIR="$HOME/Applications"
INSTALL_PATH="$INSTALL_DIR/$APP_NAME.app"

echo "==> Building $APP_NAME.app..."

# Clean previous build
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Compile AppleScript into a stay-open .app bundle
# -o creates .app, -s flag makes it stay-open (required to receive URL open events)
osacompile -o "$APP_PATH" -s "$SCRIPT_DIR/main.applescript"

echo "==> Patching Info.plist for terminal:// URL scheme..."

# Patch Info.plist to register the terminal:// URL scheme
PLIST="$APP_PATH/Contents/Info.plist"

/usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string com.local.terminallauncher" "$PLIST" 2>/dev/null || \
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.local.terminallauncher" "$PLIST"

/usr/libexec/PlistBuddy -c "Add :CFBundleURLTypes array" "$PLIST" 2>/dev/null || true
/usr/libexec/PlistBuddy -c "Add :CFBundleURLTypes:0 dict" "$PLIST" 2>/dev/null || true
/usr/libexec/PlistBuddy -c "Add :CFBundleURLTypes:0:CFBundleURLName string com.local.terminallauncher" "$PLIST" 2>/dev/null || true
/usr/libexec/PlistBuddy -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes array" "$PLIST" 2>/dev/null || true
/usr/libexec/PlistBuddy -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes:0 string terminal" "$PLIST" 2>/dev/null || true

echo "==> Installing to $INSTALL_DIR..."

mkdir -p "$INSTALL_DIR"
rm -rf "$INSTALL_PATH"
cp -R "$APP_PATH" "$INSTALL_PATH"

echo "==> Registering URL handler with Launch Services..."

/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -R "$INSTALL_PATH"

echo "==> Done! $APP_NAME.app installed to $INSTALL_PATH"
echo ""
echo "Test with:  open 'terminal://default/tmp'"
