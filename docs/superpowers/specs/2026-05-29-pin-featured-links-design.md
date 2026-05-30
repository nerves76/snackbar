# Pin featured links across workspaces

**Date:** 2026-05-29
**Status:** Approved
**Scope:** `sidepanel.js`, `sidepanel.css`

## Problem

Featured links live in `space.featured[]` per workspace. Users have no way to surface a link that should appear in every workspace (e.g. Gmail, Calendar) without manually re-adding it to each one.

## Goal

Add a Pin / Unpin action to the featured-link context menu. Pinned links appear in the featured strip of every workspace, marked with a small pin icon in the upper right of the badge.

## Non-goals

- Cross-workspace move or copy of unpinned links.
- Per-workspace hide of a pinned link ("show in all spaces except this one").
- Drag-to-reorder across the pinned / unpinned boundary in the featured strip (within-section drag for unpinned items is unchanged).
- Pinning of group links, subgroups, or pinned notes/todos (already per-space).

## Data model

Add an optional `pinned: boolean` to featured link objects:

```js
{ id, title, url, pinned?: true }
```

Pin state lives on the link in its origin `space.featured`. Missing field = not pinned. No migration script — defaulted lazily at read sites.

## Rendering

Featured-strip rendering in `renderSpace` (sidepanel.js:1358-1387) becomes:

1. **Pinned links across all workspaces.** Iterate `state.spaces` in order, collect every `featured` entry with `pinned === true`, dedupe by `id`. Render each as a `.featured-badge.pinned` tile. Click and context-menu behaviour identical to non-pinned tiles, except the menu shows **Unpin** instead of **Pin**.
2. **Current workspace's non-pinned featured.** Existing iteration of `space.featured`, filtered to `!feat.pinned`.
3. **Existing pinned notes and todos.** Unchanged.
4. **`+` add-badge.** Unchanged.

The pinned section appears first so its order is stable as the user switches workspaces.

## Visual indicator

A new CSS modifier `.featured-badge.pinned` paints a small pin icon in the upper-right corner of the badge:

- Icon: Lucide `pin`. Not yet in the `LUCIDE_ICONS` registry (sidepanel.js:32) — add it. Path data:
  ```
  <path d="M12 17v5" /> <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  ```
- Rendered via the existing `createLucideIcon('pin', 10, 'currentColor')` helper.
- Position: absolute, top: 2px, right: 2px.
- Colour: `var(--text-secondary)` at ~70% opacity.
- Pointer events: `none` so clicks pass through to the badge.

## Context menu

Replace the static `Copy URL / Edit / Link Notes / Delete` list with a dynamic one that prepends a pin toggle:

```
[Pin | Unpin]
Copy URL
Edit
Link Notes
Delete
```

Label is `Unpin` iff `feat.pinned === true`. The toggle simply flips `feat.pinned`, calls `saveState()`, and `render()`. Edit / Delete are unchanged and continue to operate on the link in its origin `space.featured`.

## Edit / Delete on a pinned link viewed from a non-origin workspace

Because the badge references the same link object that lives in the origin space, no special casing is needed:

- **Edit** opens the existing modal, mutates the link's `title` / `url` in place. All workspaces re-render with the new value.
- **Delete** removes the link from its origin `space.featured`. The badge disappears from every workspace.
- **Unpin** clears `pinned`. The badge disappears from non-origin workspaces and reverts to a non-pinned tile in the origin workspace.

The existing `deleteFeatured(featId)` walks only the active space, so it needs to be extended to find the link in whichever space it lives.

## Helper updates

- `deleteFeatured(featId)` → iterate `state.spaces`, find the space that owns the link, splice from that space's `featured`. Active space remains a hint but no longer required.
- New `togglePinFeatured(featId)` → find link across spaces, flip `pinned`, save, render.
- `showLinkModal` edit path is already object-mutation based and needs no change.

## Edge cases

- **Duplicate ids across spaces.** IDs are generated with `generateId('f')` and collisions are vanishingly rare, but dedupe-by-id on the pinned collection prevents a duplicate badge if it ever happens.
- **Origin workspace deleted.** When a workspace is deleted, its featured links go with it — pinned or not. No orphan state.
- **All workspaces have pinned links with same URL but different titles.** They render as distinct badges. Intentional — pin is per-link, not per-URL.
- **Existing storage.** Featured links without `pinned` render exactly as today.

## Files touched

- `sidepanel.js`:
  - `renderSpace` featured-strip section (lines ~1358-1387): add the pinned-from-all-spaces iteration, filter the current-space loop to non-pinned.
  - Context menu inside the featured badge (lines ~1377-1385): prepend the Pin / Unpin toggle.
  - `deleteFeatured` (~line 5246-5249): walk all spaces.
  - New `togglePinFeatured(featId)` helper near `deleteFeatured`.
- `sidepanel.css`:
  - New `.featured-badge.pinned` and `.featured-badge .pin-marker` rules.

## Out of scope this round

- Reordering pinned links among themselves (they render in workspace-then-array order).
- Pin indicator on the rail workspace icon when one of its links is pinned globally.
- A dedicated "pinned" management view.
