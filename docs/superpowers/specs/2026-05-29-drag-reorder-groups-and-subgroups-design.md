# Drag-to-reorder groups + subgroups

**Date:** 2026-05-29
**Status:** Approved (pending user review of written spec)
**Scope:** `sidepanel.js`, `sidepanel.css`

## Problem

Users can already drag individual links within and between groups, and drag workspaces in the rail to reorder them. They cannot reorder the link **groups** themselves, and there is no way to nest groups for finer-grained organisation (e.g. a "Work" group with sub-collections per project).

## Goals

1. Drag a group header to reorder groups within the current workspace.
2. Introduce a single level of nesting: a group may contain **subgroups**.
3. Subgroups can be reordered within their parent, and dragged across to other parents.
4. Existing link drag-and-drop continues to work, including landing links inside subgroups.

## Non-goals

- Arbitrary-depth nesting (groups → subgroups only).
- Interleaved order of links and subgroups within a group (direct links render first, subgroups after).
- Cross-workspace group/subgroup moves via drag (still via Edit modal, unchanged).
- "Promote subgroup to group" / "Demote group to subgroup" actions.
- External sync changes (no Chrome bookmarks integration exists; notes export uses workspaces only).

## Data model

Extend each group with an optional `subgroups` array:

```js
group    = { id, name, collapsed, links: [...], subgroups?: [...] }
subgroup = { id, name, collapsed, links: [...] }
```

A subgroup has the same shape as a group but **never** carries its own `subgroups` field. Two-level only.

**Migration:** none. Existing stored groups without `subgroups` are treated as `subgroups: []` lazily wherever the field is read or written (`group.subgroups ||= []`). Demo data in `demo-data.json` is not modified.

## Rendering layout

Within an expanded group, render in this order:

1. Direct links section (`group-links` container, existing).
2. `+ Add Link` button (existing).
3. Subgroups section (`group-subgroups` container, new).
4. `+ Add Subgroup` button (new).

ASCII reference:

```
▼ Work
   • link 1
   • link 2
   [+ Add Link]
   ▼ Project A          ← subgroup (indented ~16px, header font 1 step smaller)
      • link 3
      [+ Add Link]
   ▼ Project B
      • link 4
      [+ Add Link]
   [+ Add Subgroup]
```

Subgroup header reuses the existing `.group-header` chrome (toggle arrow, name, ⋮ menu) with a `.subgroup-header` modifier class for indentation and reduced font size. Subgroups are independently collapsible (their own `collapsed` flag).

## Menus

- **Group ⋮ menu**: unchanged (`Open All`, `Edit Group`, `Delete Group`). Adding a subgroup is done from the `+ Add Subgroup` button at the bottom of the subgroups section, mirroring how `+ Add Link` and `+ Add Group` work today.
- **Subgroup ⋮ menu**: `Open All`, `Edit Subgroup`, `Delete Subgroup`.

`showGroupModal(existing, mode)` is extended with a `mode` argument (`'group' | 'subgroup'`) that controls modal title text and which create path runs on save. The caller always passes `mode` explicitly:

- `+ Add Group` button → `showGroupModal(null, 'group')`
- `+ Add Subgroup` button (within a group) → `showGroupModal(null, 'subgroup', parentGroupId)` (parent id passed as a third arg so the new subgroup knows where to attach on save)
- `Edit Group` action → `showGroupModal(group, 'group')`
- `Edit Subgroup` action → `showGroupModal(subgroup, 'subgroup', parentGroupId)`

## Drag mechanics

Three drag kinds, each tagged with a `kind` discriminator on the `dataTransfer` payload:

| Kind | Payload | Drop targets |
|---|---|---|
| `group` | `{ kind: 'group', groupId }` | Other groups in current workspace (above/below). |
| `subgroup` | `{ kind: 'subgroup', subgroupId, parentGroupId }` | Other subgroups in the current workspace, regardless of parent (above/below). |
| `link` | `{ kind: 'link', linkId, groupId, subgroupId? }` | Any `group-links` container or any `subgroup-links` container in the current workspace. |

**Drag trigger:** the `.group-header` element (and `.subgroup-header`) is set `draggable=true`. Clicks without movement still toggle collapse — HTML5 distinguishes click from drag by mouse movement, so the existing toggle handler is unchanged. No dedicated drag handle UI.

**Type filtering:** every drop handler reads `kind` from the payload and ignores drags whose kind it does not accept. Because `dragover` bubbles, a group drop handler attached to `groupEl` will receive events that originated inside child link/subgroup areas — it bails on non-`group` drags so the inner handlers run their normal logic.

**Drop indicators (CSS classes):**

- `.group-drag-above` / `.group-drag-below` — 2px accent line on a group, mirroring the rail's `.rail-drag-above` / `.rail-drag-below`.
- `.subgroup-drag-above` / `.subgroup-drag-below` — same pattern, on a subgroup element.
- `.drag-over-above` / `.drag-over-below` — existing, used for link drops, unchanged.
- `.group-header.dragging`, `.subgroup-header.dragging` — opacity reduction during drag.

**Self-drop is a no-op.** Dropping in the bottom half of the last group/subgroup appends.

## Helper updates

- `moveLink(srcGroupId, targetGroupId, linkId, insertIndex)` → `moveLink(src, target, linkId, insertIndex)` where `src` and `target` are `{ groupId, subgroupId? }`. Resolves the source and destination link arrays via path lookup before splicing.
- `openAllInGroup(group)` opens direct links, then recurses into each subgroup. A sibling `openAllInSubgroup(subgroup)` is added for the subgroup ⋮ menu.
- `toggleGroup(groupId)` unchanged. New `toggleSubgroup(groupId, subgroupId)` mirrors it for subgroups.
- `deleteGroup(groupId)` unchanged — deleting a parent removes its subgroups (array delete already handles this).
- New `deleteSubgroup(groupId, subgroupId)`.
- New `moveGroup(fromIdx, toIdx)` and `moveSubgroup(srcParentId, targetParentId, subgroupId, insertIndex)` for the new drop handlers, each ending in `await saveState()` then `render()`.
- `showGroupModal(existing, mode, parentGroupId?)` accepts `mode = 'group' | 'subgroup'`; `parentGroupId` is required when `mode === 'subgroup'`. Always passed explicitly by the caller (no inference).

## Edge cases

- **Empty subgroup:** still rendered, draggable, still has `+ Add Link`.
- **Dropping a link onto a group with subgroups:** lands in the group's direct-links section (above the subgroups section). The `group-links` container is the drop target; the `group-subgroups` container does not accept link drops.
- **Click vs drag on a header:** HTML5 drag-and-click are mutually exclusive based on mouse movement; existing toggle click handler keeps working without changes.
- **Existing stored data missing `subgroups`:** defaulted at read/write time, no upgrade step required.
- **Bubble-up of dragover events:** each drop handler filters by `kind`, so a link drag inside a subgroup does not trigger group-reorder indicators on the outer `groupEl`.
- **Group containing only subgroups (no direct links):** renders normally; subgroups section is the only content beneath the header.

## Files touched

- `sidepanel.js` (~5482 lines today): extend render loop (~lines 1460-1592) to render subgroups, add drag handlers for groups and subgroups, update `moveLink` / `openAllInGroup` / `deleteGroup`, add `deleteSubgroup` / `toggleSubgroup` / `moveGroup` / `moveSubgroup`, extend `showGroupModal`, add `kind` to existing link drag payload at line 1618. Target additions ≤ ~200 lines; if the file crosses 600 lines added or feels tangled, factor the drag handlers into a `setupGroupDnd(groupEl, group)` and `setupSubgroupDnd(subgroupEl, subgroup, parent)` to keep render readable.
- `sidepanel.css` (~2457 lines today): `.subgroup`, `.subgroup-header`, `.subgroup-links` rules; `.group-drag-above` / `.group-drag-below`, `.subgroup-drag-above` / `.subgroup-drag-below` indicator rules (model after `.rail-drag-above` / `.rail-drag-below`); `.group-header.dragging`, `.subgroup-header.dragging` opacity.

## Testing checklist

Manual (Chrome side panel):

1. Reorder groups by drag — order persists after reload.
2. Add a subgroup; collapse/expand independently from parent.
3. Drag a subgroup within its parent — reorders.
4. Drag a subgroup into a different parent — moves.
5. Drag a link from group A into a subgroup of group B — lands in target.
6. Drag a link out of a subgroup into a top-level group's link list.
7. Click a group/subgroup header — still toggles collapse (drag not triggered by click).
8. "Open All" on a parent group opens both direct links and subgroup links.
9. Delete a group with subgroups — confirm subgroups go with it.
10. Build the extension (`./build.sh`) and load the resulting zip — no console errors on a workspace with subgroups.

## Open questions

None remaining. Approved scope is two-level nesting with mixed content, full drag support, within-workspace only.
