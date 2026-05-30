# Drag-Reorder Groups + Subgroups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow users to drag groups to reorder them within a workspace, and add a single level of nested "subgroups" that participate in the same drag UX (reorderable within and across parent groups). Link drag-and-drop extends to drop links into subgroups.

**Architecture:** Pure vanilla-JS Chrome MV3 extension (no test framework, no bundler). All work lives in `sidepanel.js` and `sidepanel.css`. Data model extension is backwards compatible (`group.subgroups` is optional and defaulted to `[]` lazily). Drag payloads gain a `kind` discriminator so each drop handler can filter the drag types it accepts; this prevents the new group/subgroup drop zones from interfering with the existing link DnD.

**Tech Stack:** Vanilla JS, HTML5 drag-and-drop, `chrome.storage.local` (via existing `saveState()`), Chrome MV3 side panel. No tests in the repo — verification is manual via reloading the unpacked extension at `chrome://extensions` and exercising the UI in Chrome's side panel.

**Spec:** `docs/superpowers/specs/2026-05-29-drag-reorder-groups-and-subgroups-design.md`

---

## File map

- `sidepanel.js` — modify in these regions:
  - `openAllInGroup` (line 980): recurse into subgroups.
  - Group render loop in `renderSpace` (lines 1460-1592): render subgroups, attach group drag handlers, attach subgroup drag handlers, attach link drop handler to subgroup link container.
  - Link `createLinkElement` (line 1609): include `kind` and `subgroupId` in drag payload; carry `data-subgroup-id` on the DOM element.
  - `toggleGroup` / `deleteGroup` / `moveLink` (lines 4789-4826): refactor `moveLink` to accept path objects; add `toggleSubgroup`, `deleteSubgroup`, `moveGroup`, `moveSubgroup`.
  - `showGroupModal` (line 5078): accept `(existing, mode, parentGroupId?)`.
- `sidepanel.css` — append new rules:
  - `.subgroup`, `.subgroup-header`, `.subgroup-links`, `.group-subgroups`, `.group-add-subgroup`.
  - `.group-header.dragging`, `.subgroup-header.dragging`.
  - `.group.group-drag-above`, `.group.group-drag-below`, `.subgroup.subgroup-drag-above`, `.subgroup.subgroup-drag-below`.
  - `.subgroup-links.drag-target`.

No new files. No changes to `manifest.json`, `background.js`, `demo-data.json`, or sync code.

---

## Verification baseline (used in every task)

`./build.sh` is **not** required during iteration — it only produces the distributable zip. Iterate by reloading the unpacked extension.

**Reload + smoke procedure** referenced by every task:

```
1. Open chrome://extensions in Chrome (or Brave, etc.).
2. With Developer Mode on, find "Snackbar" and click the reload icon.
3. Open the side panel (toolbar icon or Ctrl/Cmd+Shift+Y depending on bind).
4. Open DevTools on the side panel (right-click inside it → Inspect).
5. Watch the Console for errors during the action described in the task's Manual Verification block.
```

If you do not have the extension installed yet:

```
1. chrome://extensions → enable Developer Mode → "Load unpacked" → select /Users/chris/Nextcloud/chromesidebar.
2. Pin Snackbar from the toolbar puzzle icon.
3. Proceed with the reload procedure above.
```

---

## Task 1: Extend `showGroupModal` to handle subgroups

**Goal:** Make the existing add/edit-group modal capable of creating and editing subgroups. No UI for this surfaces yet — that arrives in Task 2.

**Files:**
- Modify: `sidepanel.js:5078-5116` (`showGroupModal` function)
- Modify: `sidepanel.js:1601` (the `+ Add Group` button click handler, to pass new args)

- [ ] **Step 1: Replace the existing `showGroupModal` with the mode-aware version**

In `sidepanel.js`, replace the entire function at lines 5078-5116 with:

```javascript
/**
 * Shows the add/edit modal for a group or subgroup.
 * @param {object|null} existing - The group/subgroup being edited, or null to create.
 * @param {'group'|'subgroup'} mode - Which kind of container to operate on.
 * @param {string} [parentGroupId] - Required when mode === 'subgroup'.
 */
function showGroupModal(existing, mode, parentGroupId) {
  const isEdit = !!existing;
  const label = mode === 'subgroup' ? 'Subgroup' : 'Group';
  showModal(`
    <div class="modal-title">${isEdit ? 'Edit' : 'Add'} ${label}</div>
    <div class="modal-field">
      <label>Name</label>
      <input type="text" id="mGName" value="${isEdit ? escapeHtml(existing.name) : ''}" placeholder="${label} name">
    </div>
    <div class="modal-buttons">
      <button class="modal-btn" id="mCancel">Cancel</button>
      <button class="modal-btn primary" id="mSave">Save</button>
    </div>
  `);

  $modal.querySelector('#mCancel').addEventListener('click', closeModal);
  $modal.querySelector('#mSave').addEventListener('click', async () => {
    const name = $modal.querySelector('#mGName').value.trim();
    if (!name) return;

    if (isEdit) {
      existing.name = name;
    } else if (mode === 'subgroup') {
      const space = getActiveSpace();
      const parent = space.groups.find(g => g.id === parentGroupId);
      if (!parent) return;
      parent.subgroups = parent.subgroups || [];
      parent.subgroups.push({
        id: generateId('sg'),
        name,
        collapsed: false,
        links: []
      });
    } else {
      const space = getActiveSpace();
      space.groups.push({
        id: generateId('g'),
        name,
        collapsed: false,
        links: [],
        subgroups: []
      });
    }
    await saveState();
    closeModal();
    render();
  });

  $modal.querySelector('#mGName').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $modal.querySelector('#mSave').click();
  });
}
```

- [ ] **Step 2: Update the `+ Add Group` button to pass `'group'` mode**

In `sidepanel.js` at line 1601, change:

```javascript
addGroupBtn.addEventListener('click', () => showGroupModal(null));
```

to:

```javascript
addGroupBtn.addEventListener('click', () => showGroupModal(null, 'group'));
```

- [ ] **Step 3: Update the `Edit Group` action in the group ⋮ menu**

In `sidepanel.js` at line 1490, change:

```javascript
{ label: 'Edit Group', action: () => showGroupModal(group) },
```

to:

```javascript
{ label: 'Edit Group', action: () => showGroupModal(group, 'group') },
```

- [ ] **Step 4: Manual verification — group add/edit still works**

Run the **Reload + smoke procedure**. Then in the side panel:

- Click **+ Add Group**, type a name, Save → new group appears at the bottom of the workspace.
- Click **⋮ → Edit Group** on a group → modal opens with current name → rename and Save → name updates.
- No console errors.

- [ ] **Step 5: Commit**

```bash
git add sidepanel.js
git commit -m "$(cat <<'EOF'
Extend showGroupModal to support subgroup mode

Adds a mode argument ('group' | 'subgroup') and optional parentGroupId.
Wires the existing add/edit-group call sites to pass mode='group' so
behaviour is unchanged. Subgroup creation path is in place but not yet
reachable from the UI.
EOF
)"
```

---

## Task 2: Render subgroups + Add Subgroup button

**Goal:** When a group has `subgroups`, render them beneath its direct links with an indented header and their own `+ Add Link` button. Add a `+ Add Subgroup` button to every group. Wire toggle, edit, and delete actions for subgroups.

**Files:**
- Modify: `sidepanel.js:1460-1592` (group render loop in `renderSpace`)
- Modify: `sidepanel.js:4789-4804` (add `toggleSubgroup` and `deleteSubgroup` next to existing `toggleGroup`/`deleteGroup`)
- Modify: `sidepanel.js:980-989` (add `openAllInSubgroup` next to `openAllInGroup` — actual recursion into `openAllInGroup` lands in Task 6)
- Modify: `sidepanel.css` (append subgroup styling rules)

- [ ] **Step 1: Add subgroup helpers next to `toggleGroup` / `deleteGroup`**

In `sidepanel.js`, immediately after the `deleteGroup` function (after line 4804), insert:

```javascript
async function toggleSubgroup(groupId, subgroupId) {
  const space = getActiveSpace();
  const group = space.groups.find(g => g.id === groupId);
  const subgroup = group && (group.subgroups || []).find(s => s.id === subgroupId);
  if (subgroup) {
    subgroup.collapsed = !subgroup.collapsed;
    await saveState();
    render();
  }
}

async function deleteSubgroup(groupId, subgroupId) {
  const space = getActiveSpace();
  const group = space.groups.find(g => g.id === groupId);
  if (!group || !group.subgroups) return;
  group.subgroups = group.subgroups.filter(s => s.id !== subgroupId);
  await saveState();
  render();
}
```

- [ ] **Step 2: Add `openAllInSubgroup` next to `openAllInGroup`**

In `sidepanel.js`, immediately after the `openAllInGroup` function (after line 989), insert:

```javascript
/** Opens every link in a subgroup, each in a new background tab. */
function openAllInSubgroup(subgroup) {
  subgroup.links.forEach(link => {
    const url = normalizeUrl(link.url);
    if (isCustomScheme(url)) {
      chrome.tabs.create({ url });
    } else {
      chrome.tabs.create({ url, active: false });
    }
  });
}
```

- [ ] **Step 3: Render subgroups in the group render loop**

In `sidepanel.js`, find the block that ends with appending the `+ Add Link` button to `linksEl` (around line 1588). The current code looks like:

```javascript
    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'group-add-link';
    addLinkBtn.textContent = '+ Add Link';
    addLinkBtn.addEventListener('click', (e) => { e.stopPropagation(); showLinkModal(null, 'group', group.id); });
    linksEl.appendChild(addLinkBtn);

    groupEl.appendChild(linksEl);
    $content.appendChild(groupEl);
  });
```

Replace it with:

```javascript
    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'group-add-link';
    addLinkBtn.textContent = '+ Add Link';
    addLinkBtn.addEventListener('click', (e) => { e.stopPropagation(); showLinkModal(null, 'group', group.id); });
    linksEl.appendChild(addLinkBtn);

    groupEl.appendChild(linksEl);

    // Subgroups section (rendered after direct links)
    const subgroupsEl = document.createElement('div');
    subgroupsEl.className = 'group-subgroups';
    subgroupsEl.dataset.groupId = group.id;
    (group.subgroups || []).forEach(subgroup => {
      subgroupsEl.appendChild(createSubgroupElement(group, subgroup));
    });

    const addSubgroupBtn = document.createElement('button');
    addSubgroupBtn.className = 'group-add-subgroup';
    addSubgroupBtn.textContent = '+ Add Subgroup';
    addSubgroupBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showGroupModal(null, 'subgroup', group.id);
    });
    subgroupsEl.appendChild(addSubgroupBtn);

    groupEl.appendChild(subgroupsEl);
    $content.appendChild(groupEl);
  });
```

- [ ] **Step 4: Add `createSubgroupElement` helper**

In `sidepanel.js`, immediately after the `createLinkElement` function ends (it starts at line 1609 — the function will end before the next top-level definition; insert the helper right after the closing brace of `createLinkElement`), add:

```javascript
/** Creates the DOM for one subgroup: header (toggle, name, ⋮ menu) + links + add-link button. */
function createSubgroupElement(parentGroup, subgroup) {
  const sgEl = document.createElement('div');
  sgEl.className = 'subgroup' + (subgroup.collapsed ? ' collapsed' : '');
  sgEl.dataset.subgroupId = subgroup.id;
  sgEl.dataset.parentGroupId = parentGroup.id;

  const header = document.createElement('div');
  header.className = 'subgroup-header';

  const toggle = document.createElement('span');
  toggle.className = 'group-toggle';
  toggle.textContent = '▼';
  header.appendChild(toggle);

  const name = document.createElement('span');
  name.className = 'group-name';
  name.textContent = subgroup.name;
  header.appendChild(name);

  const actions = document.createElement('div');
  actions.className = 'group-actions';

  const menuBtn = document.createElement('button');
  menuBtn.className = 'group-action-btn';
  menuBtn.textContent = '⋮';
  menuBtn.title = 'More';
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showContextMenu(e, [
      { label: 'Open All', action: () => openAllInSubgroup(subgroup) },
      { label: 'Edit Subgroup', action: () => showGroupModal(subgroup, 'subgroup', parentGroup.id) },
      { label: 'Delete Subgroup', danger: true, action: () => deleteSubgroup(parentGroup.id, subgroup.id) }
    ]);
  });
  actions.appendChild(menuBtn);
  header.appendChild(actions);

  header.addEventListener('click', () => toggleSubgroup(parentGroup.id, subgroup.id));
  sgEl.appendChild(header);

  const linksEl = document.createElement('div');
  linksEl.className = 'subgroup-links';
  linksEl.dataset.groupId = parentGroup.id;
  linksEl.dataset.subgroupId = subgroup.id;

  subgroup.links.forEach(link => {
    linksEl.appendChild(createLinkElement(link, parentGroup.id, subgroup.id));
  });

  const addLinkBtn = document.createElement('button');
  addLinkBtn.className = 'group-add-link';
  addLinkBtn.textContent = '+ Add Link';
  addLinkBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showLinkModal(null, 'group', parentGroup.id, subgroup.id);
  });
  linksEl.appendChild(addLinkBtn);

  sgEl.appendChild(linksEl);
  return sgEl;
}
```

- [ ] **Step 5: Extend `createLinkElement` to accept an optional `subgroupId`**

In `sidepanel.js` at line 1609, change the function signature and the two `dataset` assignments. Current code:

```javascript
function createLinkElement(link, groupId) {
  const item = document.createElement('div');
  item.className = 'link-item';
  item.draggable = true;
  item.dataset.linkId = link.id;
  item.dataset.groupId = groupId;

  // Drag data includes source groupId so drop handler knows if it's cross-group
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ linkId: link.id, groupId }));
```

Change to:

```javascript
function createLinkElement(link, groupId, subgroupId) {
  const item = document.createElement('div');
  item.className = 'link-item';
  item.draggable = true;
  item.dataset.linkId = link.id;
  item.dataset.groupId = groupId;
  if (subgroupId) item.dataset.subgroupId = subgroupId;

  // Drag data includes source path so drop handler knows where it came from
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'link', linkId: link.id, groupId, subgroupId }));
```

(Only the signature line, the `dataset.subgroupId` line, the comment, and the `setData` line change. Leave the rest of the function untouched.)

- [ ] **Step 6: Extend `showLinkModal` to accept and use a `subgroupId`**

In `sidepanel.js` at line 5127, change the function signature from:

```javascript
function showLinkModal(existing, type, groupId) {
```

to:

```javascript
function showLinkModal(existing, type, groupId, subgroupId) {
```

Then find the save handler block at lines 5305-5312, which currently reads:

```javascript
    } else if (type === 'featured') {
      space.featured.push({ id: generateId('f'), title, url: normalizeUrl(url) });
    } else {
      const group = space.groups.find(g => g.id === groupId);
      if (group) {
        group.links.push({ id: generateId('l'), title, url: normalizeUrl(url) });
      }
    }
```

Replace the `else` branch (the one that pushes into `group.links`) with:

```javascript
    } else if (type === 'featured') {
      space.featured.push({ id: generateId('f'), title, url: normalizeUrl(url) });
    } else {
      const group = space.groups.find(g => g.id === groupId);
      if (group) {
        const container = subgroupId
          ? (group.subgroups || []).find(s => s.id === subgroupId)
          : group;
        if (container) {
          container.links.push({ id: generateId('l'), title, url: normalizeUrl(url) });
        }
      }
    }
```

The edit path (`if (isEdit) { existing.title = ...; existing.url = ...; }`) is unchanged — it mutates the link object in place and does not care which container holds it.

- [ ] **Step 7: Append CSS for subgroups**

In `sidepanel.css`, find the existing `.group-add-link:hover` rule (around line 406-409) and append a new `/* ── Subgroups ── */` section immediately after it:

```css
/* ── Subgroups ── */
.group-subgroups {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 16px;
  margin-top: 4px;
}

.group.collapsed .group-subgroups {
  display: none;
}

.subgroup {
  display: flex;
  flex-direction: column;
}

.subgroup-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
  cursor: pointer;
  user-select: none;
}

.subgroup-header:hover .group-actions {
  opacity: 1;
}

.subgroup-header .group-name {
  font-size: 11px;
}

.subgroup.collapsed .group-toggle {
  transform: rotate(-90deg);
}

.subgroup-links {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 4px;
}

.subgroup.collapsed .subgroup-links {
  display: none;
}

.group-add-subgroup {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  margin-top: 2px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-family: inherit;
  width: 100%;
  text-align: left;
}

.group-add-subgroup:hover {
  background: var(--bg-hover);
  color: var(--text);
}
```

- [ ] **Step 8: Manual verification**

Run the **Reload + smoke procedure**, then:

- In any workspace, click **+ Add Subgroup** at the bottom of a group → modal title says "Add Subgroup" → save with a name → subgroup appears indented under the group.
- Click the subgroup header → it collapses, chevron rotates.
- Click subgroup ⋮ → **Edit Subgroup** → rename → name updates.
- Click subgroup ⋮ → **Delete Subgroup** → it disappears.
- Click subgroup's **+ Add Link** → existing link modal opens → add a link → it lands inside the subgroup.
- Reload Chrome → subgroups and their links persist.
- No console errors.

- [ ] **Step 9: Commit**

```bash
git add sidepanel.js sidepanel.css
git commit -m "$(cat <<'EOF'
Add subgroup rendering, CRUD, and Add Subgroup button

Groups now render an indented subgroups section beneath their direct
links, with toggle/edit/delete actions and a per-subgroup Add Link
button. createLinkElement and showLinkModal carry an optional
subgroupId so links can be added directly to subgroups.

Drag-to-reorder for groups/subgroups arrives in subsequent commits.
EOF
)"
```

---

## Task 3: Refactor `moveLink` to accept path objects; extend link drops to subgroups

**Goal:** Make link drag-and-drop work into and out of subgroups. Filter both link drop handlers by `kind === 'link'` so they ignore the upcoming group/subgroup drags.

**Files:**
- Modify: `sidepanel.js:4812-4826` (`moveLink` refactor)
- Modify: `sidepanel.js:1506-1577` (group `linksEl` dragover/drop handlers — add `kind` filter, update `moveLink` call)
- Add: `subgroup-links` dragover/dragleave/drop handlers inside `createSubgroupElement`

- [ ] **Step 1: Refactor `moveLink`**

In `sidepanel.js`, replace the `moveLink` function (lines 4812-4826) with:

```javascript
/**
 * Moves a link between/within groups or subgroups.
 * @param {{groupId: string, subgroupId?: string}} src
 * @param {{groupId: string, subgroupId?: string}} target
 */
async function moveLink(src, target, linkId, insertIndex) {
  const space = getActiveSpace();

  const srcGroup = space.groups.find(g => g.id === src.groupId);
  if (!srcGroup) return;
  const srcContainer = src.subgroupId
    ? (srcGroup.subgroups || []).find(s => s.id === src.subgroupId)
    : srcGroup;
  if (!srcContainer) return;

  const linkIndex = srcContainer.links.findIndex(l => l.id === linkId);
  if (linkIndex === -1) return;
  const [link] = srcContainer.links.splice(linkIndex, 1);

  const targetGroup = space.groups.find(g => g.id === target.groupId);
  if (!targetGroup) {
    srcContainer.links.splice(linkIndex, 0, link);
    return;
  }
  const targetContainer = target.subgroupId
    ? (targetGroup.subgroups || []).find(s => s.id === target.subgroupId)
    : targetGroup;
  if (!targetContainer) {
    srcContainer.links.splice(linkIndex, 0, link);
    return;
  }

  // If moving within same container and source was before insert point, adjust index
  const sameContainer = src.groupId === target.groupId && src.subgroupId === target.subgroupId;
  if (sameContainer && linkIndex < insertIndex) insertIndex--;
  targetContainer.links.splice(insertIndex, 0, link);

  await saveState();
  render();
}
```

- [ ] **Step 2: Update the existing group `linksEl` drop handler call site and add `kind` filter**

In `sidepanel.js`, find the existing group `linksEl` dragover handler (line 1506). At the top of the handler, immediately after `e.preventDefault()` and `e.dataTransfer.dropEffect = 'move'`, add the kind guard. Replace the current handler block (lines 1506-1536) with:

```javascript
    linksEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      // Only accept link drags; ignore group/subgroup drags so they bubble to outer handlers
      const dragging = document.querySelector('.link-item.dragging');
      if (!dragging) return;
      // Don't accept drops on collapsed groups
      if (group.collapsed) return;

      // Clear previous indicators
      linksEl.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
        el.classList.remove('drag-over-above', 'drag-over-below');
      });

      // Walk visible (non-dragging) link items to find which one the cursor is over
      const linkItems = [...linksEl.querySelectorAll('.link-item:not(.dragging)')];
      let target = null;
      let above = true;
      for (const li of linkItems) {
        const rect = li.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        if (e.clientY < mid) { target = li; above = true; break; }
        target = li;
        above = false;
      }
      if (target) {
        target.classList.add(above ? 'drag-over-above' : 'drag-over-below');
      }
      // Highlight container when dragging from another container
      const draggingGroupId = dragging.dataset.groupId;
      const draggingSubgroupId = dragging.dataset.subgroupId;
      if (draggingGroupId !== group.id || draggingSubgroupId) {
        linksEl.classList.add('drag-target');
      }
    });
```

- [ ] **Step 3: Update the group `linksEl` drop handler to pass path objects and add kind filter**

Find the `linksEl.addEventListener('drop', ...)` block (line 1547). Replace it with:

```javascript
    linksEl.addEventListener('drop', (e) => {
      e.preventDefault();
      linksEl.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
        el.classList.remove('drag-over-above', 'drag-over-below');
      });
      linksEl.classList.remove('drag-target');
      if (group.collapsed) return;

      let data;
      try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
      if (data.kind !== 'link') return;

      const linkItems = [...linksEl.querySelectorAll('.link-item:not(.dragging)')];
      let insertIndex = linkItems.length;
      for (let i = 0; i < linkItems.length; i++) {
        const rect = linkItems[i].getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) { insertIndex = i; break; }
      }
      // If dragging within the same container, remap the insert index to the underlying array
      const sameContainer = data.groupId === group.id && !data.subgroupId;
      if (sameContainer) {
        const nonDraggingIds = linkItems.map(li => li.dataset.linkId);
        const targetLinkId = nonDraggingIds[insertIndex];
        insertIndex = targetLinkId
          ? group.links.findIndex(l => l.id === targetLinkId)
          : group.links.length;
      }

      moveLink(
        { groupId: data.groupId, subgroupId: data.subgroupId },
        { groupId: group.id },
        data.linkId,
        insertIndex
      );
    });
```

- [ ] **Step 4: Add `subgroup-links` dragover/dragleave/drop inside `createSubgroupElement`**

In `sidepanel.js`, inside `createSubgroupElement`, find where the `linksEl` is created (the line `linksEl.className = 'subgroup-links';` inside that function). Immediately after the two `dataset` assignments and before `subgroup.links.forEach(...)`, insert:

```javascript
  linksEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const dragging = document.querySelector('.link-item.dragging');
    if (!dragging) return;
    if (subgroup.collapsed) return;

    linksEl.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
      el.classList.remove('drag-over-above', 'drag-over-below');
    });

    const linkItems = [...linksEl.querySelectorAll('.link-item:not(.dragging)')];
    let target = null;
    let above = true;
    for (const li of linkItems) {
      const rect = li.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (e.clientY < mid) { target = li; above = true; break; }
      target = li;
      above = false;
    }
    if (target) target.classList.add(above ? 'drag-over-above' : 'drag-over-below');

    const draggingGroupId = dragging.dataset.groupId;
    const draggingSubgroupId = dragging.dataset.subgroupId;
    if (draggingGroupId !== parentGroup.id || draggingSubgroupId !== subgroup.id) {
      linksEl.classList.add('drag-target');
    }
  });

  linksEl.addEventListener('dragleave', (e) => {
    if (!linksEl.contains(e.relatedTarget)) {
      linksEl.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
        el.classList.remove('drag-over-above', 'drag-over-below');
      });
      linksEl.classList.remove('drag-target');
    }
  });

  linksEl.addEventListener('drop', (e) => {
    e.preventDefault();
    linksEl.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
      el.classList.remove('drag-over-above', 'drag-over-below');
    });
    linksEl.classList.remove('drag-target');
    if (subgroup.collapsed) return;

    let data;
    try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
    if (data.kind !== 'link') return;

    const linkItems = [...linksEl.querySelectorAll('.link-item:not(.dragging)')];
    let insertIndex = linkItems.length;
    for (let i = 0; i < linkItems.length; i++) {
      const rect = linkItems[i].getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) { insertIndex = i; break; }
    }
    const sameContainer = data.groupId === parentGroup.id && data.subgroupId === subgroup.id;
    if (sameContainer) {
      const nonDraggingIds = linkItems.map(li => li.dataset.linkId);
      const targetLinkId = nonDraggingIds[insertIndex];
      insertIndex = targetLinkId
        ? subgroup.links.findIndex(l => l.id === targetLinkId)
        : subgroup.links.length;
    }

    moveLink(
      { groupId: data.groupId, subgroupId: data.subgroupId },
      { groupId: parentGroup.id, subgroupId: subgroup.id },
      data.linkId,
      insertIndex
    );
  });
```

- [ ] **Step 5: Add `.subgroup-links.drag-target` CSS**

In `sidepanel.css`, find the existing `.group-links.drag-target` rule (around line 509-512). Add a matching rule immediately after it:

```css
.subgroup-links.drag-target {
  background: rgba(10, 132, 255, 0.06);
  border-radius: var(--radius-sm);
}
```

- [ ] **Step 6: Manual verification**

Run the **Reload + smoke procedure**, then:

- Set up a workspace with: group A (2 links), group B with subgroup B1 (1 link) and subgroup B2 (1 link).
- Drag a link inside group A from position 1 to position 2 — reorders.
- Drag a link from group A into subgroup B1 — lands in B1.
- Drag a link from B1 to B2 — lands in B2.
- Drag a link from B2 back to group A (drop on group A's link area) — lands in A.
- Reload Chrome → arrangement persists.
- No console errors.

- [ ] **Step 7: Commit**

```bash
git add sidepanel.js sidepanel.css
git commit -m "$(cat <<'EOF'
Allow link drag-and-drop into and out of subgroups

moveLink now takes {groupId, subgroupId?} path objects. Link drag
payload carries a kind discriminator so drop handlers can filter, and
subgroup-links containers accept link drops with the same above/below
indicators used by group-links.
EOF
)"
```

---

## Task 4: Drag-to-reorder groups

**Goal:** Dragging a group's header reorders groups within the current workspace. Clicking the header still toggles collapse (drag and click are distinguished by mouse movement).

**Files:**
- Modify: `sidepanel.js:1460-1592` (in the group render loop — make `header` draggable and add `groupEl` drop handlers)
- Modify: `sidepanel.js` (add `moveGroup` near `moveLink`)
- Modify: `sidepanel.css` (append group drag indicator rules)

- [ ] **Step 1: Add `moveGroup` helper**

In `sidepanel.js`, immediately after the `moveLink` function (already updated in Task 3), insert:

```javascript
async function moveGroup(fromIdx, toIdx) {
  const space = getActiveSpace();
  if (fromIdx < 0 || fromIdx >= space.groups.length) return;
  if (toIdx < 0 || toIdx > space.groups.length) return;
  if (fromIdx === toIdx || fromIdx === toIdx - 1) return;
  const [moved] = space.groups.splice(fromIdx, 1);
  const adjusted = fromIdx < toIdx ? toIdx - 1 : toIdx;
  space.groups.splice(adjusted, 0, moved);
  await saveState();
  render();
}
```

- [ ] **Step 2: Make the group header draggable and wire dragstart/dragend**

In `sidepanel.js`, inside the group render loop, find where `header` is constructed (around line 1466). Immediately after `header.className = 'group-header';` add:

```javascript
    header.draggable = true;
    header.addEventListener('dragstart', (e) => {
      e.stopPropagation();
      e.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'group', groupId: group.id }));
      e.dataTransfer.effectAllowed = 'move';
      header.classList.add('dragging');
      groupEl.classList.add('dragging');
    });
    header.addEventListener('dragend', () => {
      header.classList.remove('dragging');
      groupEl.classList.remove('dragging');
      document.querySelectorAll('.group-drag-above, .group-drag-below').forEach(el => {
        el.classList.remove('group-drag-above', 'group-drag-below');
      });
    });
```

- [ ] **Step 3: Add dragover/dragleave/drop handlers on `groupEl`**

In `sidepanel.js`, still inside the group render loop, find the line `groupEl.appendChild(header);` (around line 1499). Immediately before that line, add the group-level DnD handlers:

```javascript
    groupEl.addEventListener('dragover', (e) => {
      const dragging = document.querySelector('.group.dragging');
      if (!dragging) return;
      if (dragging === groupEl) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      $content.querySelectorAll('.group-drag-above, .group-drag-below').forEach(el => {
        el.classList.remove('group-drag-above', 'group-drag-below');
      });
      const rect = groupEl.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      groupEl.classList.add(e.clientY < mid ? 'group-drag-above' : 'group-drag-below');
    });

    groupEl.addEventListener('dragleave', (e) => {
      if (!groupEl.contains(e.relatedTarget)) {
        groupEl.classList.remove('group-drag-above', 'group-drag-below');
      }
    });

    groupEl.addEventListener('drop', (e) => {
      const above = groupEl.classList.contains('group-drag-above');
      const below = groupEl.classList.contains('group-drag-below');
      if (!above && !below) return;
      e.preventDefault();
      e.stopPropagation();
      groupEl.classList.remove('group-drag-above', 'group-drag-below');

      let data;
      try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
      if (data.kind !== 'group' || data.groupId === group.id) return;

      const space = getActiveSpace();
      const fromIdx = space.groups.findIndex(g => g.id === data.groupId);
      let toIdx = space.groups.findIndex(g => g.id === group.id);
      if (fromIdx === -1 || toIdx === -1) return;
      if (below) toIdx += 1;
      moveGroup(fromIdx, toIdx);
    });
```

- [ ] **Step 4: Append CSS for group drag indicators**

In `sidepanel.css`, find the existing `.rail-item.rail-drag-below` rule (around line 522-524). Immediately after it, add:

```css
.group-header.dragging {
  opacity: 0.4;
}

.group.group-drag-above {
  box-shadow: 0 -2px 0 0 #0a84ff;
}

.group.group-drag-below {
  box-shadow: 0 2px 0 0 #0a84ff;
}
```

- [ ] **Step 5: Manual verification**

Run the **Reload + smoke procedure**, then:

- Workspace with at least three groups.
- Drag group 1's header to below group 3 — group 1 ends up at the bottom; arrangement persists after Chrome reload.
- Drag group 3's header to above group 1 — moves to top.
- Click a group header (without dragging) → still toggles collapse.
- Click + drag a link inside a group → link still drags normally (group drag does not trigger).
- No console errors.

- [ ] **Step 6: Commit**

```bash
git add sidepanel.js sidepanel.css
git commit -m "$(cat <<'EOF'
Add drag-to-reorder for link groups

Group headers are draggable; dragging over another group shows an
above/below indicator and dropping reorders space.groups. Drop handlers
filter by drag kind so link DnD inside a group is unaffected.
EOF
)"
```

---

## Task 5: Drag-to-reorder subgroups (within parent and across parents)

**Goal:** Subgroups participate in drag-to-reorder. They can be reordered within their parent group or dragged into a different parent group anywhere in the current workspace.

**Files:**
- Modify: `sidepanel.js` `createSubgroupElement` (make header draggable, add subgroupEl drop handlers)
- Modify: `sidepanel.js` (add `moveSubgroup` near `moveGroup`)
- Modify: `sidepanel.css` (append subgroup drag indicator rules)

- [ ] **Step 1: Add `moveSubgroup` helper**

In `sidepanel.js`, immediately after the `moveGroup` function (added in Task 4), insert:

```javascript
async function moveSubgroup(srcParentId, targetParentId, subgroupId, insertIndex) {
  const space = getActiveSpace();
  const srcParent = space.groups.find(g => g.id === srcParentId);
  if (!srcParent || !srcParent.subgroups) return;
  const fromIdx = srcParent.subgroups.findIndex(s => s.id === subgroupId);
  if (fromIdx === -1) return;
  const [moved] = srcParent.subgroups.splice(fromIdx, 1);

  const targetParent = space.groups.find(g => g.id === targetParentId);
  if (!targetParent) {
    srcParent.subgroups.splice(fromIdx, 0, moved);
    return;
  }
  targetParent.subgroups = targetParent.subgroups || [];
  if (srcParentId === targetParentId && fromIdx < insertIndex) insertIndex--;
  insertIndex = Math.max(0, Math.min(insertIndex, targetParent.subgroups.length));
  targetParent.subgroups.splice(insertIndex, 0, moved);

  await saveState();
  render();
}
```

- [ ] **Step 2: Make the subgroup header draggable**

In `sidepanel.js`, inside `createSubgroupElement`, find where `header` is constructed (`header.className = 'subgroup-header';`). Immediately after that, add:

```javascript
  header.draggable = true;
  header.addEventListener('dragstart', (e) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', JSON.stringify({
      kind: 'subgroup',
      subgroupId: subgroup.id,
      parentGroupId: parentGroup.id
    }));
    e.dataTransfer.effectAllowed = 'move';
    header.classList.add('dragging');
    sgEl.classList.add('dragging');
  });
  header.addEventListener('dragend', () => {
    header.classList.remove('dragging');
    sgEl.classList.remove('dragging');
    document.querySelectorAll('.subgroup-drag-above, .subgroup-drag-below').forEach(el => {
      el.classList.remove('subgroup-drag-above', 'subgroup-drag-below');
    });
  });
```

- [ ] **Step 3: Add dragover/dragleave/drop on `sgEl`**

Still inside `createSubgroupElement`, immediately after the `sgEl.appendChild(header);` line, add:

```javascript
  sgEl.addEventListener('dragover', (e) => {
    const dragging = document.querySelector('.subgroup.dragging');
    if (!dragging) return;
    if (dragging === sgEl) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    document.querySelectorAll('.subgroup-drag-above, .subgroup-drag-below').forEach(el => {
      el.classList.remove('subgroup-drag-above', 'subgroup-drag-below');
    });
    const rect = sgEl.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    sgEl.classList.add(e.clientY < mid ? 'subgroup-drag-above' : 'subgroup-drag-below');
  });

  sgEl.addEventListener('dragleave', (e) => {
    if (!sgEl.contains(e.relatedTarget)) {
      sgEl.classList.remove('subgroup-drag-above', 'subgroup-drag-below');
    }
  });

  sgEl.addEventListener('drop', (e) => {
    const above = sgEl.classList.contains('subgroup-drag-above');
    const below = sgEl.classList.contains('subgroup-drag-below');
    if (!above && !below) return;
    e.preventDefault();
    e.stopPropagation();
    sgEl.classList.remove('subgroup-drag-above', 'subgroup-drag-below');

    let data;
    try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
    if (data.kind !== 'subgroup') return;
    if (data.subgroupId === subgroup.id) return;

    const space = getActiveSpace();
    const targetParent = space.groups.find(g => g.id === parentGroup.id);
    if (!targetParent) return;
    targetParent.subgroups = targetParent.subgroups || [];
    let toIdx = targetParent.subgroups.findIndex(s => s.id === subgroup.id);
    if (toIdx === -1) return;
    if (below) toIdx += 1;
    moveSubgroup(data.parentGroupId, parentGroup.id, data.subgroupId, toIdx);
  });
```

- [ ] **Step 4: Allow subgroup drops onto an empty subgroups area of another parent**

A subgroup dragged into a parent group that has *no* subgroups yet won't hit any `sgEl`. The `group-subgroups` container handles that fallback.

In `sidepanel.js`, inside the main group render loop, find the lines where `subgroupsEl` is created (Task 2 added them):

```javascript
    const subgroupsEl = document.createElement('div');
    subgroupsEl.className = 'group-subgroups';
    subgroupsEl.dataset.groupId = group.id;
```

Immediately after `subgroupsEl.dataset.groupId = group.id;` insert:

```javascript
    subgroupsEl.addEventListener('dragover', (e) => {
      const dragging = document.querySelector('.subgroup.dragging');
      if (!dragging) return;
      // Only accept here when the cursor is not already over a child .subgroup
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    subgroupsEl.addEventListener('drop', (e) => {
      const dragging = document.querySelector('.subgroup.dragging');
      if (!dragging) return;
      let data;
      try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
      if (data.kind !== 'subgroup') return;
      // If the drop bubbled up from a child .subgroup, that handler already ran — bail
      const targetSubgroup = e.target.closest('.subgroup');
      if (targetSubgroup && subgroupsEl.contains(targetSubgroup)) return;
      e.preventDefault();
      const space = getActiveSpace();
      const targetParent = space.groups.find(g => g.id === group.id);
      if (!targetParent) return;
      targetParent.subgroups = targetParent.subgroups || [];
      moveSubgroup(data.parentGroupId, group.id, data.subgroupId, targetParent.subgroups.length);
    });
```

- [ ] **Step 5: Append CSS for subgroup drag indicators**

In `sidepanel.css`, immediately after the `.group.group-drag-below` rule (added in Task 4), add:

```css
.subgroup-header.dragging {
  opacity: 0.4;
}

.subgroup.subgroup-drag-above {
  box-shadow: 0 -2px 0 0 #0a84ff;
}

.subgroup.subgroup-drag-below {
  box-shadow: 0 2px 0 0 #0a84ff;
}
```

- [ ] **Step 6: Manual verification**

Run the **Reload + smoke procedure**, then:

- Workspace with: group A (subgroups A1, A2, A3), group B (subgroup B1).
- Drag A1 below A3 → reorders within A.
- Drag A2 into B (drop on B1) — A2 ends up next to B1 inside B.
- Drag a subgroup into group B's empty `+ Add Subgroup` area when B has no subgroups (test by deleting B1 first) — subgroup lands as B's first subgroup.
- Click subgroup header → still toggles collapse.
- Drag a link inside a subgroup → link reorder works, subgroup drag does NOT trigger.
- Drag a group → group reorder works, subgroup drag indicators do NOT appear.
- Reload Chrome → arrangement persists.
- No console errors.

- [ ] **Step 7: Commit**

```bash
git add sidepanel.js sidepanel.css
git commit -m "$(cat <<'EOF'
Add drag-to-reorder for subgroups across parents

Subgroup headers are draggable; subgroups can be reordered within their
parent or dropped onto a subgroup of any other parent group in the
current workspace. The parent's subgroups container also accepts drops
when it has no children yet, appending the dragged subgroup.
EOF
)"
```

---

## Task 6: Recurse `openAllInGroup` into subgroups

**Goal:** "Open All" on a parent group also opens its subgroups' links.

**Files:**
- Modify: `sidepanel.js:980-989` (`openAllInGroup`)

- [ ] **Step 1: Update `openAllInGroup`**

In `sidepanel.js`, replace the existing `openAllInGroup` function (lines 980-989) with:

```javascript
/** Opens every link in a group (and its subgroups), each in a new background tab. */
function openAllInGroup(group) {
  const open = (link) => {
    const url = normalizeUrl(link.url);
    if (isCustomScheme(url)) {
      chrome.tabs.create({ url });
    } else {
      chrome.tabs.create({ url, active: false });
    }
  };
  group.links.forEach(open);
  (group.subgroups || []).forEach(sub => sub.links.forEach(open));
}
```

- [ ] **Step 2: Manual verification**

Run the **Reload + smoke procedure**, then:

- Set up: group A with one direct link "site1" and one subgroup A1 containing "site2".
- Group A ⋮ → **Open All** → both site1 and site2 open in new background tabs.
- Subgroup A1 ⋮ → **Open All** → only site2 opens.
- No console errors.

- [ ] **Step 3: Commit**

```bash
git add sidepanel.js
git commit -m "$(cat <<'EOF'
Open All on a group also opens its subgroups' links
EOF
)"
```

---

## Task 7: Full integration smoke + build

**Goal:** Exercise every interaction once on a clean reload, then produce the distributable zip via `./build.sh`.

- [ ] **Step 1: End-to-end manual scenario**

Run the **Reload + smoke procedure**, then run through this scenario in one session. Use a non-precious workspace (delete any state with `chrome.storage.local.clear()` in DevTools beforehand if needed; the welcome workspace will reseed).

1. Create a new workspace "QA".
2. Add three groups: G1, G2, G3.
3. In G2, add subgroups S1 and S2.
4. In G1, add link L1 (google.com). In S1, add link L2 (duckduckgo.com).
5. Drag G3 to be first (above G1).
6. Drag S1 below S2.
7. Drag L1 into S2.
8. Drag L2 from S1 to G1 (drop on G1's links area).
9. Drag S1 into G1 (drop on G1; if G1 has no subgroups, drop in its `+ Add Subgroup` area).
10. Click a group header — collapse/expand still works.
11. Reload Chrome (close & reopen, or chrome://extensions reload). Confirm arrangement persisted.
12. G1 ⋮ → **Open All** → opens both direct links and subgroup links.
13. Delete subgroup S1 — confirm it (and its links) disappear.
14. Delete G1 — confirm G1 (and any subgroups under it) disappear.
15. No console errors throughout.

If anything fails, fix it in a follow-up commit on this branch before continuing.

- [ ] **Step 2: Produce the distributable zip**

Run:

```bash
./build.sh
```

Expected: `snackbar-chrome.zip` and `snackbar-firefox.zip` are regenerated at the repo root (both gitignored). No error output.

- [ ] **Step 3: Verify the built Chrome zip loads cleanly**

In Chrome:

1. Unpack `snackbar-chrome.zip` to a temporary directory.
2. `chrome://extensions` → **Load unpacked** → select the unpacked directory.
3. Open the side panel and confirm groups/subgroups render and drag.
4. Remove the temporary load.

- [ ] **Step 4: Final commit (only if any fixup was needed)**

If Step 1 surfaced a bug and a fix was applied, commit it:

```bash
git add sidepanel.js sidepanel.css
git commit -m "Fix <specific issue> uncovered during integration smoke"
```

Otherwise no commit is needed for this task.
