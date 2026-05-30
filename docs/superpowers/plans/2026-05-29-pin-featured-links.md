# Pin Featured Links Across Workspaces Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Pin / Unpin action to the featured-link context menu; pinned links appear at the top of every workspace's featured strip with a small pin marker.

**Architecture:** Single `pinned: boolean` flag on each featured link object. Rendering walks all `state.spaces` in order, collects pinned featured links (deduped by id), and prepends them to each workspace's strip. Edit/Delete continue to operate on the underlying link in its origin space; the existing `deleteFeatured` is widened to find the link in any space rather than only the active one. A new `pin` SVG is added to the Lucide icon registry.

**Tech Stack:** Vanilla JS, HTML5, `chrome.storage.local` (via existing `saveState()`). No tests in the repo — verification is manual via reloading the unpacked extension and exercising the UI.

**Spec:** `docs/superpowers/specs/2026-05-29-pin-featured-links-design.md`

**File map:**
- `sidepanel.js` — add `pin` icon entry; restructure the featured-strip section in `renderSpace`; extend the featured-badge context menu; add `togglePinFeatured`; widen `deleteFeatured`.
- `sidepanel.css` — add `.featured-badge.pinned` and `.featured-badge .pin-marker` rules.

---

## Task 1: Implement pin/unpin

**Files:**
- Modify: `sidepanel.js` — five distinct regions (icon registry, render loop, context menu, deleteFeatured, new togglePinFeatured helper)
- Modify: `sidepanel.css` — append two new rules

### Step 1: Add the `pin` icon to the Lucide registry

In `sidepanel.js`, the icon registry starts at line 32 (`const LUCIDE_ICONS = {`). Add a new entry. The icons are alphabetised — insert immediately before the existing `"plug"` or `"play"` entry, or after the last `"p"` entry depending on alphabetisation; if no nearby `p` entry exists, simply add it before the closing `}` of the object. Use `grep -n '"pin\|"play\|"plug' sidepanel.js` to find the right spot.

Add this entry:

```javascript
  "pin": `<path d="M12 17v5" /> <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />`,
```

### Step 2: Restructure the featured-strip section in `renderSpace`

In `sidepanel.js`, find the block that begins at line 1358 with `if (space.featured.length > 0 || true) {` and contains `space.featured.forEach(feat => { ... })`. The current relevant code is:

```javascript
  if (space.featured.length > 0 || true) {
    const section = document.createElement('div');
    section.className = 'featured-section';

    space.featured.forEach(feat => {
      const badge = document.createElement('div');
      badge.className = 'featured-badge';
      badge.title = feat.title + '\n' + feat.url;

      const iconEl = createFaviconEl(feat.url, 20);
      iconEl.className = 'badge-letter';
      badge.appendChild(iconEl);

      const label = document.createElement('span');
      label.className = 'badge-label';
      label.textContent = feat.title.split(/\s+/)[0]; // show only first word for compactness
      badge.appendChild(label);

      badge.addEventListener('click', () => openLink(feat.url));
      badge.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, [
          { label: 'Copy URL', action: () => navigator.clipboard.writeText(normalizeUrl(feat.url)) },
          { label: 'Edit', action: () => showLinkModal(feat, 'featured') },
          { label: 'Link Notes', action: () => showNotesModal(feat, 'featured') },
          { label: 'Delete', danger: true, action: () => deleteFeatured(feat.id) }
        ]);
      });
      section.appendChild(badge);
    });
```

Replace just the `space.featured.forEach(feat => { ... })` block (NOT the surrounding `if`, `section` creation, or the pinned-notes / pinned-todos / `+` blocks below it) with:

```javascript
    // Build the ordered list: pinned links from all workspaces first (deduped by id), then this workspace's non-pinned featured.
    const pinnedAcrossSpaces = [];
    const seenIds = new Set();
    for (const sp of state.spaces) {
      for (const f of (sp.featured || [])) {
        if (f.pinned && !seenIds.has(f.id)) {
          pinnedAcrossSpaces.push(f);
          seenIds.add(f.id);
        }
      }
    }
    const localUnpinned = space.featured.filter(f => !f.pinned);

    [...pinnedAcrossSpaces, ...localUnpinned].forEach(feat => {
      const badge = document.createElement('div');
      badge.className = 'featured-badge' + (feat.pinned ? ' pinned' : '');
      badge.title = feat.title + '\n' + feat.url;

      const iconEl = createFaviconEl(feat.url, 20);
      iconEl.className = 'badge-letter';
      badge.appendChild(iconEl);

      const label = document.createElement('span');
      label.className = 'badge-label';
      label.textContent = feat.title.split(/\s+/)[0]; // show only first word for compactness
      badge.appendChild(label);

      if (feat.pinned) {
        const marker = createLucideIcon('pin', 10, 'currentColor');
        marker.classList.add('pin-marker');
        badge.appendChild(marker);
      }

      badge.addEventListener('click', () => openLink(feat.url));
      badge.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, [
          { label: feat.pinned ? 'Unpin' : 'Pin', action: () => togglePinFeatured(feat.id) },
          { label: 'Copy URL', action: () => navigator.clipboard.writeText(normalizeUrl(feat.url)) },
          { label: 'Edit', action: () => showLinkModal(feat, 'featured') },
          { label: 'Link Notes', action: () => showNotesModal(feat, 'featured') },
          { label: 'Delete', danger: true, action: () => deleteFeatured(feat.id) }
        ]);
      });
      section.appendChild(badge);
    });
```

(The change adds: the union/dedupe building blocks; `pinned` modifier class; the `pin-marker` element; the Pin/Unpin menu item.)

### Step 3: Widen `deleteFeatured` to search all spaces

In `sidepanel.js`, find `deleteFeatured` (currently at line ~5246):

```javascript
async function deleteFeatured(featId) {
  const space = getActiveSpace();
  space.featured = space.featured.filter(f => f.id !== featId);
  await saveState();
  render();
}
```

Replace with:

```javascript
async function deleteFeatured(featId) {
  for (const sp of state.spaces) {
    if (!sp.featured) continue;
    const before = sp.featured.length;
    sp.featured = sp.featured.filter(f => f.id !== featId);
    if (sp.featured.length !== before) break;
  }
  await saveState();
  render();
}
```

### Step 4: Add `togglePinFeatured` helper

In `sidepanel.js`, immediately after the `deleteFeatured` function you just modified, insert:

```javascript
async function togglePinFeatured(featId) {
  for (const sp of state.spaces) {
    const f = (sp.featured || []).find(f => f.id === featId);
    if (f) {
      f.pinned = !f.pinned;
      await saveState();
      render();
      return;
    }
  }
}
```

### Step 5: Append CSS rule

`.featured-badge` already declares `position: relative` at sidepanel.css:267, so the marker's absolute positioning anchors correctly to it. Append this single rule immediately after the existing `.featured-badge` rule (whose closing `}` is at line 268):

```css
.featured-badge .pin-marker {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  color: var(--text-secondary);
  opacity: 0.7;
  pointer-events: none;
}
```

### Step 6: Verify

Run `node --check sidepanel.js`. Expected: no output.

Then `git diff --staged` and confirm the scope:
- `sidepanel.js`: icon registry +1 line, render block restructured (~25 lines added), `deleteFeatured` rewritten (~5 lines net), new `togglePinFeatured` (~9 lines).
- `sidepanel.css`: 2 new rules (~12 lines total).

### Step 7: Commit

```bash
git add sidepanel.js sidepanel.css
git commit -m "$(cat <<'EOF'
Allow pinning featured links across all workspaces

Adds a Pin/Unpin action to the featured-link context menu. Pinned links
appear at the top of every workspace's featured strip in a stable order
with a small pin marker in the upper right. Edit/Delete continue to act
on the underlying link in its origin space.
EOF
)"
```

---

## Self-review checklist (already verified by author)

- **Spec coverage**: data model (Step 2 reads/writes `pinned`), rendering union with dedupe (Step 2), pin marker icon (Steps 1 + 2 + 5), context-menu Pin/Unpin item (Step 2), `togglePinFeatured` helper (Step 4), cross-space `deleteFeatured` (Step 3). No spec section unaddressed.
- **Placeholders**: none.
- **Type consistency**: `togglePinFeatured(featId)` defined Step 4, called Step 2. `feat.pinned` is the same field throughout. `createLucideIcon('pin', 10, 'currentColor')` matches the existing helper signature at sidepanel.js:16.
