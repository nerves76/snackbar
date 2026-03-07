// ── Helpers ──

/** Generates a unique ID with the given prefix using base-36 timestamp + random suffix. */
function generateId(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Lucide Icons ──

/**
 * Creates an inline SVG element for a named Lucide icon.
 * @param {string} name - Key into LUCIDE_ICONS path data map.
 * @param {number} size - Width and height in pixels.
 * @param {string} [color] - Stroke color; defaults to currentColor.
 */
function createLucideIcon(name, size, color) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', color || 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.style.display = 'block';
  const inner = LUCIDE_ICONS[name];
  if (inner) svg.innerHTML = inner;
  return svg;
}

const LUCIDE_ICONS = {
  "arrow-left": `<path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />`,
  "archive": `<rect width="20" height="5" x="2" y="3" rx="1" /> <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /> <path d="M10 12h4" />`,
  "at-sign": `<circle cx="12" cy="12" r="4" /> <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />`,
  "bell": `<path d="M10.268 21a2 2 0 0 0 3.464 0" /> <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />`,
  "bike": `<circle cx="18.5" cy="17.5" r="3.5" /> <circle cx="5.5" cy="17.5" r="3.5" /> <circle cx="15" cy="5" r="1" /> <path d="M12 17.5V14l-3-3 4-3 2 3h2" />`,
  "book-open": `<path d="M12 7v14" /> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />`,
  "bookmark": `<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />`,
  "briefcase": `<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /> <rect width="20" height="14" x="2" y="6" rx="2" />`,
  "bug": `<path d="M12 20v-9" /> <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" /> <path d="M14.12 3.88 16 2" /> <path d="M22 13h-4" /> <path d="M6 13H2" /> <path d="m8 2 1.88 1.88" /> <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />`,
  "building-2": `<path d="M10 12h4" /> <path d="M10 8h4" /> <path d="M14 21v-3a2 2 0 0 0-4 0v3" /> <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" /> <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />`,
  "calendar": `<path d="M8 2v4" /> <path d="M16 2v4" /> <rect width="18" height="18" x="3" y="4" rx="2" /> <path d="M3 10h18" />`,
  "camera": `<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /> <circle cx="12" cy="13" r="3" />`,
  "check": `<path d="M20 6 9 17l-5-5" />`,
  "check-square": `<rect width="18" height="18" x="3" y="3" rx="2" /> <path d="m9 12 2 2 4-4" />`,
  "chevron-left": `<path d="m15 18-6-6 6-6" />`,
  "chevron-right": `<path d="m9 18 6-6-6-6" />`,
  "car": `<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /> <circle cx="7" cy="17" r="2" /> <path d="M9 17h6" /> <circle cx="17" cy="17" r="2" />`,
  "clock": `<circle cx="12" cy="12" r="10" /> <path d="M12 6v6l4 2" />`,
  "cloud": `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />`,
  "code": `<path d="m16 18 6-6-6-6" /> <path d="m8 6-6 6 6 6" />`,
  "coffee": `<path d="M10 2v2" /> <path d="M14 2v2" /> <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" /> <path d="M6 2v2" />`,
  "compass": `<circle cx="12" cy="12" r="10" /> <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />`,
  "copy": `<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />`,
  "cpu": `<path d="M12 20v2" /> <path d="M12 2v2" /> <path d="M17 20v2" /> <path d="M17 2v2" /> <path d="M2 12h2" /> <path d="M2 17h2" /> <path d="M2 7h2" /> <path d="M20 12h2" /> <path d="M20 17h2" /> <path d="M20 7h2" /> <path d="M7 20v2" /> <path d="M7 2v2" /> <rect x="4" y="4" width="16" height="16" rx="2" /> <rect x="8" y="8" width="8" height="8" rx="1" />`,
  "database": `<ellipse cx="12" cy="5" rx="9" ry="3" /> <path d="M3 5V19A9 3 0 0 0 21 19V5" /> <path d="M3 12A9 3 0 0 0 21 12" />`,
  "droplet": `<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />`,
  "eye": `<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx="12" cy="12" r="3" />`,
  "file-text": `<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" /> <path d="M14 2v6h6" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" />`,
  "film": `<rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M7 3v18" /> <path d="M3 7.5h4" /> <path d="M3 12h18" /> <path d="M3 16.5h4" /> <path d="M17 3v18" /> <path d="M17 7.5h4" /> <path d="M17 16.5h4" />`,
  "filter": `<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />`,
  "flag": `<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />`,
  "flame": `<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />`,
  "folder": `<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />`,
  "gamepad-2": `<line x1="6" x2="10" y1="11" y2="11" /> <line x1="8" x2="8" y1="9" y2="13" /> <line x1="15" x2="15.01" y1="12" y2="12" /> <line x1="18" x2="18.01" y1="10" y2="10" /> <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258a4 4 0 0 0-3.995-3.742z" />`,
  "gift": `<path d="M12 7v14" /> <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" /> <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" /> <rect x="3" y="7" width="18" height="4" rx="1" />`,
  "git-branch": `<path d="M15 6a9 9 0 0 0-9 9V3" /> <circle cx="18" cy="6" r="3" /> <circle cx="6" cy="18" r="3" />`,
  "globe": `<circle cx="12" cy="12" r="10" /> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /> <path d="M2 12h20" />`,
  "help-circle": `<circle cx="12" cy="12" r="10" /> <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /> <path d="M12 17h.01" />`,
  "graduation-cap": `<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" /> <path d="M22 10v6" /> <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />`,
  "headphones": `<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />`,
  "heart": `<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />`,
  "home": `<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`,
  "image": `<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /> <circle cx="9" cy="9" r="2" /> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />`,
  "key": `<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" /> <path d="m21 2-9.6 9.6" /> <circle cx="7.5" cy="15.5" r="5.5" />`,
  "layers": `<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /> <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /> <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />`,
  "layout-grid": `<rect width="7" height="7" x="3" y="3" rx="1" /> <rect width="7" height="7" x="14" y="3" rx="1" /> <rect width="7" height="7" x="14" y="14" rx="1" /> <rect width="7" height="7" x="3" y="14" rx="1" />`,
  "leaf": `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /> <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />`,
  "lightbulb": `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /> <path d="M9 18h6" /> <path d="M10 22h4" />`,
  "list": `<path d="M3 5h.01" /> <path d="M3 12h.01" /> <path d="M3 19h.01" /> <path d="M8 5h13" /> <path d="M8 12h13" /> <path d="M8 19h13" />`,
  "lock": `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" />`,
  "mail": `<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" />`,
  "map-pin": `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /> <circle cx="12" cy="10" r="3" />`,
  "mic": `<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /> <path d="M19 10v2a7 7 0 0 1-14 0v-2" /> <line x1="12" x2="12" y1="19" y2="22" />`,
  "mic-off": `<line x1="2" x2="22" y1="2" y2="22" /> <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" /> <path d="M5 10v2a7 7 0 0 0 12 5" /> <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" /> <path d="M9 9v3a3 3 0 0 0 5.12 2.12" /> <line x1="12" x2="12" y1="19" y2="22" />`,
  "megaphone": `<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" /> <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" /> <path d="M8 6v8" />`,
  "message-circle": `<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />`,
  "moon": `<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />`,
  "mountain-snow": `<path d="m8 3 4 8 5-5 5 15H2L8 3z" /> <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />`,
  "music": `<path d="M9 18V5l12-2v13" /> <circle cx="6" cy="18" r="3" /> <circle cx="18" cy="16" r="3" />`,
  "newspaper": `<path d="M15 18h-5" /> <path d="M18 14h-8" /> <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" /> <rect width="8" height="4" x="10" y="6" rx="1" />`,
  "paintbrush": `<path d="m14.622 17.897-10.68-2.913" /> <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" /> <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />`,
  "palette": `<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /> <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /> <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /> <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /> <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />`,
  "pen-tool": `<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" /> <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" /> <path d="m2.3 2.3 7.286 7.286" /> <circle cx="11" cy="11" r="2" />`,
  "pen": `<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />`,
  "phone": `<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />`,
  "pause": `<rect x="14" y="4" width="4" height="16" rx="1" /> <rect x="6" y="4" width="4" height="16" rx="1" />`,
  "play": `<polygon points="6 3 20 12 6 21 6 3" />`,
  "plus": `<path d="M5 12h14" /> <path d="M12 5v14" />`,
  "plane": `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />`,
  "presentation": `<path d="M2 3h20" /> <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /> <path d="m7 21 5-5 5 5" />`,
  "rocket": `<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /> <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" /> <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" /> <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />`,
  "rss": `<path d="M4 11a9 9 0 0 1 9 9" /> <path d="M4 4a16 16 0 0 1 16 16" /> <circle cx="5" cy="19" r="1" />`,
  "scissors": `<circle cx="6" cy="6" r="3" /> <path d="M8.12 8.12 12 12" /> <path d="M20 4 8.12 15.88" /> <circle cx="6" cy="18" r="3" /> <path d="M14.8 14.8 20 20" />`,
  "search": `<path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" />`,
  "send": `<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /> <path d="m21.854 2.147-10.94 10.939" />`,
  "server": `<rect width="20" height="8" x="2" y="2" rx="2" ry="2" /> <rect width="20" height="8" x="2" y="14" rx="2" ry="2" /> <line x1="6" x2="6.01" y1="6" y2="6" /> <line x1="6" x2="6.01" y1="18" y2="18" />`,
  "settings": `<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /> <circle cx="12" cy="12" r="3" />`,
  "share-2": `<circle cx="18" cy="5" r="3" /> <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="19" r="3" /> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />`,
  "shield": `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />`,
  "shopping-cart": `<circle cx="8" cy="21" r="1" /> <circle cx="19" cy="21" r="1" /> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />`,
  "sparkles": `<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> <path d="M20 2v4" /> <path d="M22 4h-4" /> <circle cx="4" cy="20" r="2" />`,
  "star": `<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />`,
  "sun": `<circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" />`,
  "tag": `<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /> <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />`,
  "target": `<circle cx="12" cy="12" r="10" /> <circle cx="12" cy="12" r="6" /> <circle cx="12" cy="12" r="2" />`,
  "terminal": `<path d="M12 19h8" /> <path d="m4 17 6-6-6-6" />`,
  "trash": `<path d="M3 6h18" /> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />`,
  "trophy": `<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" /> <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" /> <path d="M18 9h1.5a1 1 0 0 0 0-5H18" /> <path d="M4 22h16" /> <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /> <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />`,
  "user": `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" />`,
  "users": `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <path d="M16 3.128a4 4 0 0 1 0 7.744" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <circle cx="9" cy="7" r="4" />`,
  "video": `<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" /> <rect x="2" y="6" width="14" height="12" rx="2" />`,
  "wifi": `<path d="M12 20h.01" /> <path d="M2 8.82a15 15 0 0 1 20 0" /> <path d="M5 12.859a10 10 0 0 1 14 0" /> <path d="M8.5 16.429a5 5 0 0 1 7 0" />`,
  "wrench": `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />`,
  "zap": `<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />`,
};

// Groups icons into categories for the space icon picker modal
const ICON_CATEGORIES = {
  'Work': ['briefcase', 'building-2', 'calendar', 'clock', 'mail', 'phone', 'users', 'user', 'presentation', 'newspaper', 'graduation-cap', 'map-pin'],
  'Dev': ['code', 'terminal', 'database', 'server', 'git-branch', 'bug', 'cpu', 'globe', 'wifi', 'zap', 'rocket', 'eye'],
  'Creative': ['palette', 'pen-tool', 'camera', 'film', 'music', 'paintbrush', 'scissors', 'image', 'layers', 'pen', 'lightbulb', 'sparkles'],
  'Social': ['message-circle', 'send', 'bell', 'megaphone', 'heart', 'share-2', 'at-sign', 'rss', 'headphones', 'gamepad-2', 'book-open', 'trophy'],
  'Files': ['folder', 'file-text', 'archive', 'bookmark', 'tag', 'search', 'filter', 'list', 'layout-grid', 'key', 'lock', 'shield'],
  'Nature': ['sun', 'moon', 'star', 'cloud', 'mountain-snow', 'leaf', 'flame', 'droplet', 'compass', 'target', 'flag', 'bike'],
  'Objects': ['home', 'shopping-cart', 'coffee', 'gift', 'wrench', 'settings', 'plane', 'car'],
};

/** Checks if the URL uses the terminal:// custom protocol. */
function isTerminalUrl(url) {
  return /^terminal:\/\//i.test(url.trim());
}

/** Prepends https:// if no protocol scheme is present. Leaves custom schemes intact. */
function normalizeUrl(url) {
  url = url.trim();
  // Already has a scheme (http, https, custom, etc.)
  if (/^[a-zA-Z][\w+.-]*:\/\//i.test(url)) return url;
  if (url) url = 'https://' + url;
  return url;
}

/** Extracts a display letter from a URL (e.g. hostname initial) for fallback favicons. */
function letterFromUrl(url) {
  if (isTerminalUrl(url)) return '>_';
  if (isCustomScheme(url)) {
    try { return url.split('://')[0][0].toUpperCase(); } catch {}
  }
  try {
    return new URL(normalizeUrl(url)).hostname.replace('www.', '')[0].toUpperCase();
  } catch {
    return '?';
  }
}

/** Derives a deterministic HSL color from a string via a simple hash (djb2-like). */
function colorFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return `hsl(${Math.abs(h) % 360}, 55%, 55%)`;
}

/** Returns a Google favicon service URL for the domain, or null for custom schemes. */
function faviconUrl(url) {
  if (isCustomScheme(url)) return null;
  try {
    const domain = new URL(normalizeUrl(url)).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
}

/**
 * Creates a favicon element for a URL. Falls back to a colored letter on image load error.
 * Handles terminal://, custom schemes, and standard http(s) URLs differently.
 */
function createFaviconEl(url, size) {
  const wrapper = document.createElement('div');
  if (isTerminalUrl(url)) {
    wrapper.textContent = '>_';
    wrapper.style.background = '#1e1e1e';
    wrapper.style.color = '#4af626';
    wrapper.style.fontFamily = 'monospace';
    wrapper.style.fontSize = (size * 0.5) + 'px';
    wrapper.style.fontWeight = '700';
    return wrapper;
  }
  if (isCustomScheme(url)) {
    wrapper.textContent = url.split('://')[0].slice(0, 2).toUpperCase();
    wrapper.style.background = 'var(--bg-active)';
    wrapper.style.color = 'var(--text)';
    wrapper.style.fontSize = (size * 0.35) + 'px';
    wrapper.style.fontWeight = '600';
    return wrapper;
  }
  const src = faviconUrl(url);
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.width = size;
    img.height = size;
    img.style.borderRadius = '3px';
    img.style.display = 'block';
    img.addEventListener('error', () => {
      img.remove();
      wrapper.textContent = letterFromUrl(url);
      wrapper.style.background = colorFromString(url);
      wrapper.style.color = '#fff';
    });
    wrapper.appendChild(img);
  } else {
    wrapper.textContent = letterFromUrl(url);
    wrapper.style.background = colorFromString(url);
    wrapper.style.color = '#fff';
  }
  return wrapper;
}

// ── Default Data ──

const DEFAULT_STATE = {
  spaces: [],
  activeSpaceId: null
};

// ── State ──

let currentView = 'spaces'; // which panel is shown in the content area

// Feature toggles (persisted to storage; control rail icon visibility)
let features = {
  activity: true,
  notepad: true,
  calendar: true,
  focusTimer: true
};
// Built-in app presets for opening links in editors/terminals via custom URL schemes
const APP_PRESETS = [
  { id: 'vscode', name: 'VS Code', scheme: 'vscode://file/', usesBasePath: true, type: 'editor' },
  { id: 'cursor', name: 'Cursor', scheme: 'cursor://file/', usesBasePath: true, type: 'editor' },
  { id: 'terminal', name: 'Terminal', scheme: 'terminal://default/', usesBasePath: true, type: 'terminal' },
  { id: 'iterm', name: 'iTerm', scheme: 'terminal://iterm/', usesBasePath: true, type: 'terminal' },
  { id: 'warp', name: 'Warp', scheme: 'terminal://warp/', usesBasePath: true, type: 'terminal' },
  { id: 'ghostty', name: 'Ghostty', scheme: 'terminal://ghostty/', usesBasePath: true, type: 'terminal' },
  { id: 'alacritty', name: 'Alacritty', scheme: 'terminal://alacritty/', usesBasePath: true, type: 'terminal' },
  { id: 'kitty', name: 'Kitty', scheme: 'terminal://kitty/', usesBasePath: true, type: 'terminal' },
  { id: 'wezterm', name: 'WezTerm', scheme: 'terminal://wezterm/', usesBasePath: true, type: 'terminal' },
];
let appLinksConfig = {
  enabled: false,
  basePath: '',
  enabledApps: [] // array of preset IDs, e.g. ['vscode', 'terminal']
};

/** Returns the full preset objects for enabled apps. */
function getEnabledApps() {
  return APP_PRESETS.filter(p => appLinksConfig.enabledApps.includes(p.id));
}

// Transcription config — user provides their own API key
let transcriptionConfig = {
  provider: 'groq', // 'groq' or 'openai'
  apiKey: ''
};

// Currently viewed date on each date-navigable panel
let activityDate = new Date().toISOString().slice(0, 10);
let notepadDate = new Date().toISOString().slice(0, 10);
let calendarDate = new Date().toISOString().slice(0, 10);
let activityRefreshTimer = null;

// Focus timer state — persisted in session storage so it survives sidebar reopens
let focusTimer = {
  running: false,
  startTime: null,
  durationSeconds: null, // null = stopwatch (count up), number = countdown
  elapsed: 0,
  sites: {},  // domain -> seconds tracked during this session
  intervalId: null,
  finished: false       // true once countdown reaches zero
};

let state = null; // root app state: { spaces[], activeSpaceId }

/** Loads spaces and active workspace from chrome.storage.local. Initializes defaults if empty. */
async function loadState() {
  const data = await chrome.storage.local.get(['spaces', 'activeSpaceId']);
  if (!data.spaces || data.spaces.length === 0) {
    state = structuredClone(DEFAULT_STATE);
    await saveState();
  } else {
    state = { spaces: data.spaces, activeSpaceId: data.activeSpaceId };
  }
  // Ensure activeSpaceId points to an existing space
  if (state.spaces.length > 0 && !state.spaces.find(s => s.id === state.activeSpaceId)) {
    state.activeSpaceId = state.spaces[0].id;
  }
}

/** Persists current spaces and active workspace ID to chrome.storage.local. */
async function saveState() {
  await chrome.storage.local.set({ spaces: state.spaces, activeSpaceId: state.activeSpaceId });
}

/** Returns the space object matching the current activeSpaceId, or undefined. */
function getActiveSpace() {
  return state.spaces.find(s => s.id === state.activeSpaceId);
}

// ── Theme ──

let currentTheme = 'system'; // 'system', 'light', 'dark'

/** Notifies the background script of the current effective theme so the toolbar icon can match. */
function notifyIconTheme() {
  const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = currentTheme === 'dark' ||
    (currentTheme === 'system' && systemDark);
  chrome.storage.local.set({ systemIsDark: systemDark });
  chrome.runtime.sendMessage({ type: 'themeChanged', isDark });
}

/** Reads persisted theme preference and applies it to the document root. */
async function applyTheme() {
  const { theme } = await chrome.storage.local.get('theme');
  currentTheme = theme || 'system';
  document.documentElement.setAttribute('data-theme', currentTheme);
  notifyIconTheme();
}

/** Cycles through system -> light -> dark and persists the choice. */
async function cycleTheme() {
  const order = ['system', 'light', 'dark'];
  const idx = order.indexOf(currentTheme);
  currentTheme = order[(idx + 1) % order.length];
  document.documentElement.setAttribute('data-theme', currentTheme);
  await chrome.storage.local.set({ theme: currentTheme });
  notifyIconTheme();
}

// Re-evaluate icon theme when OS dark mode changes
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => notifyIconTheme());

/** Loads feature toggles and app-links config from storage, merging with defaults. */
async function loadFeatures() {
  const data = await chrome.storage.local.get(['featureToggles', 'appLinksConfig', 'transcriptionConfig']);
  if (data.featureToggles) Object.assign(features, data.featureToggles);
  if (data.appLinksConfig) {
    // Migrate old format: apps[] → enabledApps[]
    if (data.appLinksConfig.apps && !data.appLinksConfig.enabledApps) {
      data.appLinksConfig.enabledApps = data.appLinksConfig.apps
        .map(a => {
          const match = APP_PRESETS.find(p => p.scheme === a.scheme);
          return match ? match.id : null;
        })
        .filter(Boolean);
      delete data.appLinksConfig.apps;
      await chrome.storage.local.set({ appLinksConfig: data.appLinksConfig });
    }
    Object.assign(appLinksConfig, data.appLinksConfig);
  }
  if (data.transcriptionConfig) Object.assign(transcriptionConfig, data.transcriptionConfig);
}

async function saveTranscriptionConfig() {
  await chrome.storage.local.set({ transcriptionConfig: { ...transcriptionConfig } });
}

async function saveFeatures() {
  await chrome.storage.local.set({ featureToggles: { ...features } });
}

async function saveAppLinksConfig() {
  await chrome.storage.local.set({ appLinksConfig: { ...appLinksConfig } });
}

// ── Google Drive Sync ──
// Uses the appDataFolder scope so the sync file is hidden from the user's Drive.

const SYNC_FILENAME = 'snackbar-sync.json';
const SYNC_KEYS = ['spaces', 'activeSpaceId', 'notepadPages', 'timeTracking', 'featureToggles', 'theme'];

/** Obtains an OAuth token for Google Drive via chrome.identity (prompts user if needed). */
async function getDriveToken() {
  try {
    const result = await chrome.identity.getAuthToken({ interactive: true });
    return result.token || result;
  } catch (e) {
    throw new Error('Auth failed: ' + e.message);
  }
}

/** Searches the appDataFolder for the sync file, returning its id and modifiedTime or null. */
async function findSyncFile(token) {
  const resp = await fetch('https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name%3D%27' + SYNC_FILENAME + '%27&fields=files(id,modifiedTime)', {
    headers: { Authorization: 'Bearer ' + token }
  });
  if (!resp.ok) throw new Error('Drive list failed: ' + resp.status);
  const data = await resp.json();
  return data.files && data.files.length > 0 ? data.files[0] : null;
}

/** Downloads and parses the JSON content of a Drive file by ID. */
async function downloadSyncFile(token, fileId) {
  const resp = await fetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media', {
    headers: { Authorization: 'Bearer ' + token }
  });
  if (!resp.ok) throw new Error('Drive download failed: ' + resp.status);
  return resp.json();
}

/**
 * Uploads data as JSON to Drive. Updates in place if existingFileId is provided,
 * otherwise creates a new file in the appDataFolder via multipart upload.
 */
async function uploadSyncFile(token, data, existingFileId) {
  const content = JSON.stringify(data);
  if (existingFileId) {
    const resp = await fetch('https://www.googleapis.com/upload/drive/v3/files/' + existingFileId + '?uploadType=media', {
      method: 'PATCH',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: content
    });
    if (!resp.ok) throw new Error('Drive update failed: ' + resp.status);
    return resp.json();
  } else {
    const metadata = { name: SYNC_FILENAME, parents: ['appDataFolder'] };
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([content], { type: 'application/json' }));
    const resp = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body: form
    });
    if (!resp.ok) throw new Error('Drive create failed: ' + resp.status);
    return resp.json();
  }
}

/**
 * Performs a last-write-wins sync with Google Drive.
 * Compares remote vs local timestamps: pulls if remote is newer, pushes otherwise.
 * @returns {'pulled'|'pushed'} which direction the sync went.
 */
async function syncToCloud() {
  const token = await getDriveToken();
  const localData = await chrome.storage.local.get(SYNC_KEYS);
  localData.syncedAt = Date.now();

  const existing = await findSyncFile(token);

  if (existing) {
    const remote = await downloadSyncFile(token, existing.id);
    const remoteTime = remote.syncedAt || 0;
    const localTime = (await chrome.storage.local.get('lastSyncedAt')).lastSyncedAt || 0;

    if (remoteTime > localTime) {
      // Remote is newer — pull
      const { syncedAt, ...rest } = remote;
      await chrome.storage.local.set(rest);
      await chrome.storage.local.set({ lastSyncedAt: syncedAt });
      await loadState();
      await loadFeatures();
      await applyTheme();
      render();
      return 'pulled';
    } else {
      // Local is newer or same — push
      await uploadSyncFile(token, localData, existing.id);
      await chrome.storage.local.set({ lastSyncedAt: localData.syncedAt });
      return 'pushed';
    }
  } else {
    // No remote file — push
    await uploadSyncFile(token, localData, null);
    await chrome.storage.local.set({ lastSyncedAt: localData.syncedAt });
    return 'pushed';
  }
}

// ── Navigation ──

/** Returns true for non-http(s) schemes like vscode://, cursor://, terminal://, etc. */
function isCustomScheme(url) {
  return /^[a-zA-Z][\w+.-]*:\/\//i.test(url) && !/^https?:\/\//i.test(url);
}

/**
 * Opens a link. Custom schemes open in a new window (OS handles them);
 * standard URLs navigate the current active tab.
 */
async function openLink(url) {
  url = normalizeUrl(url);
  if (isCustomScheme(url)) {
    window.open(url, '_blank');
    return;
  }
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) chrome.tabs.update(tab.id, { url });
}

/** Opens every link in a group, each in a new background tab. */
function openAllInGroup(group) {
  group.links.forEach(link => {
    const url = normalizeUrl(link.url);
    if (isCustomScheme(url)) {
      window.open(url, '_blank');
    } else {
      chrome.tabs.create({ url, active: false });
    }
  });
}

// ── Rendering ──

const $rail = document.getElementById('rail');
const $content = document.getElementById('content');
const $modalOverlay = document.getElementById('modalOverlay');
const $modal = document.getElementById('modal');

// A11y: allow Enter/Space to activate any element with role="button"
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('role') === 'button') {
    e.preventDefault();
    e.target.click();
  }
});

/** Top-level render dispatcher. Rebuilds the rail and the content area based on currentView. */
function render() {
  renderRail();
  if (currentView === 'settings') {
    renderSettingsView();
  } else if (currentView === 'activity') {
    renderActivityView();
  } else if (currentView === 'notepad') {
    renderNotepadView();
  } else if (currentView === 'calendar') {
    renderCalendarView();
  } else {
    renderContent();
  }
  // Auto-refresh activity view every 30s when visible
  clearInterval(activityRefreshTimer);
  if (currentView === 'activity') {
    activityRefreshTimer = setInterval(() => renderActivityView(), 30000);
  }
}

/** Builds the vertical sidebar rail: workspace icons, add button, feature toggles, settings. */
function renderRail() {
  $rail.innerHTML = '';
  $rail.setAttribute('role', 'navigation');
  $rail.setAttribute('aria-label', 'Sidebar navigation');

  state.spaces.forEach(space => {
    const item = document.createElement('div');
    item.className = 'rail-item' + (currentView === 'spaces' && space.id === state.activeSpaceId ? ' active' : '');
    item.draggable = true;
    item.dataset.spaceId = space.id;
    if (LUCIDE_ICONS[space.icon]) {
      item.appendChild(createLucideIcon(space.icon, 18, space.color));
    } else {
      item.textContent = space.icon;
      item.style.color = space.color;
      item.style.fontSize = space.icon.length > 2 ? '11px' : '14px';
      item.style.fontWeight = '700';
    }
    item.title = space.name;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', space.name);
    item.tabIndex = 0;
    if (space.color) item.style.borderColor = space.id === state.activeSpaceId ? space.color : 'transparent';
    if (space.color && space.id === state.activeSpaceId) {
      item.style.setProperty('--accent', space.color);
      item.querySelector('::before')?.style?.setProperty('background', space.color);
    }
    item.addEventListener('click', () => switchSpace(space.id));
    item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e, [
        { label: 'Edit Space', action: () => showSpaceModal(space) },
        { label: 'Delete Space', danger: true, action: () => deleteSpace(space.id) }
      ]);
    });
    // ── Rail drag-and-drop: reorder workspaces ──
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', space.id);
      e.dataTransfer.effectAllowed = 'move';
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      $rail.querySelectorAll('.rail-drag-above, .rail-drag-below').forEach(el => {
        el.classList.remove('rail-drag-above', 'rail-drag-below');
      });
    });
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      $rail.querySelectorAll('.rail-drag-above, .rail-drag-below').forEach(el => {
        el.classList.remove('rail-drag-above', 'rail-drag-below');
      });
      // Show indicator above or below depending on cursor position relative to midpoint
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      item.classList.add(e.clientY < mid ? 'rail-drag-above' : 'rail-drag-below');
    });
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      $rail.querySelectorAll('.rail-drag-above, .rail-drag-below').forEach(el => {
        el.classList.remove('rail-drag-above', 'rail-drag-below');
      });
      const draggedId = e.dataTransfer.getData('text/plain');
      if (!draggedId || draggedId === space.id) return;
      const fromIdx = state.spaces.findIndex(s => s.id === draggedId);
      if (fromIdx === -1) return;
      const [moved] = state.spaces.splice(fromIdx, 1);
      let toIdx = state.spaces.findIndex(s => s.id === space.id);
      const rect = item.getBoundingClientRect();
      // Insert after if cursor is in the bottom half of the drop target
      if (e.clientY >= rect.top + rect.height / 2) toIdx++;
      state.spaces.splice(toIdx, 0, moved);
      saveState();
      render();
    });
    $rail.appendChild(item);
  });

  // Add Space button (right after spaces)
  const addBtn = document.createElement('div');
  addBtn.className = 'rail-item rail-add';
  addBtn.textContent = '+';
  addBtn.title = 'Add Space';
  addBtn.setAttribute('role', 'button');
  addBtn.setAttribute('aria-label', 'Add Space');
  addBtn.tabIndex = 0;
  addBtn.addEventListener('click', () => showSpaceModal(null));
  $rail.appendChild(addBtn);

  // Spacer pushes utility icons to bottom
  const spacer = document.createElement('div');
  spacer.className = 'rail-spacer';
  $rail.appendChild(spacer);

  if (features.activity) {
    const activityBtn = document.createElement('div');
    activityBtn.className = 'rail-item' + (currentView === 'activity' ? ' active' : '');
    activityBtn.appendChild(createLucideIcon('clock', 18));
    activityBtn.title = 'Activity (T)';
    activityBtn.setAttribute('role', 'button');
    activityBtn.setAttribute('aria-label', 'Activity');
    activityBtn.tabIndex = 0;
    activityBtn.addEventListener('click', () => {
      currentView = currentView === 'activity' ? 'spaces' : 'activity';
      if (currentView === 'activity') activityDate = new Date().toISOString().slice(0, 10);
      render();
    });
    $rail.appendChild(activityBtn);
  }

  if (features.notepad) {
    const notepadBtn = document.createElement('div');
    notepadBtn.className = 'rail-item' + (currentView === 'notepad' ? ' active' : '');
    notepadBtn.appendChild(createLucideIcon('file-text', 18));
    notepadBtn.title = 'Notepad (N)';
    notepadBtn.setAttribute('role', 'button');
    notepadBtn.setAttribute('aria-label', 'Notepad');
    notepadBtn.tabIndex = 0;
    notepadBtn.addEventListener('click', () => {
      currentView = currentView === 'notepad' ? 'spaces' : 'notepad';
      if (currentView === 'notepad') notepadDate = new Date().toISOString().slice(0, 10);
      render();
    });
    $rail.appendChild(notepadBtn);
  }

  if (features.calendar) {
    const calendarBtn = document.createElement('div');
    calendarBtn.className = 'rail-item' + (currentView === 'calendar' ? ' active' : '');
    calendarBtn.appendChild(createLucideIcon('calendar', 18));
    calendarBtn.title = 'Calendar (C)';
    calendarBtn.setAttribute('role', 'button');
    calendarBtn.setAttribute('aria-label', 'Calendar');
    calendarBtn.tabIndex = 0;
    calendarBtn.addEventListener('click', () => {
      currentView = currentView === 'calendar' ? 'spaces' : 'calendar';
      if (currentView === 'calendar') calendarDate = new Date().toISOString().slice(0, 10);
      render();
    });
    $rail.appendChild(calendarBtn);
  }

  const settingsBtn = document.createElement('div');
  settingsBtn.className = 'rail-item' + (currentView === 'settings' ? ' active' : '');
  settingsBtn.appendChild(createLucideIcon('settings', 18));
  settingsBtn.title = 'Settings';
  settingsBtn.setAttribute('role', 'button');
  settingsBtn.setAttribute('aria-label', 'Settings');
  settingsBtn.tabIndex = 0;
  settingsBtn.addEventListener('click', () => {
    currentView = currentView === 'settings' ? 'spaces' : 'settings';
    render();
  });
  $rail.appendChild(settingsBtn);
}

/** Renders the onboarding screen shown when no workspaces exist. */
function renderWelcome() {
  const welcome = document.createElement('div');
  welcome.className = 'welcome';
  welcome.innerHTML = `
    <div class="welcome-title">Snackbar</div>
    <div class="welcome-subtitle">Stay focused. See where your time goes.</div>
    <div class="welcome-features">
      <div class="welcome-feature">
        ${createLucideIcon('target', 20, '#30d158').outerHTML}
        <div>
          <strong>Visual Focus Timer</strong>
          <span>See time passing, not just know it</span>
        </div>
      </div>
      <div class="welcome-feature">
        ${createLucideIcon('clock', 20, '#0a84ff').outerHTML}
        <div>
          <strong>Session Tracking</strong>
          <span>Know exactly where your focus went</span>
        </div>
      </div>
      <div class="welcome-feature">
        ${createLucideIcon('briefcase', 20, '#ff9f0a').outerHTML}
        <div>
          <strong>Workspaces</strong>
          <span>One project at a time, no clutter</span>
        </div>
      </div>
      <div class="welcome-feature">
        ${createLucideIcon('file-text', 20, '#bf5af2').outerHTML}
        <div>
          <strong>Notes & Calendar</strong>
          <span>Everything in your sidebar</span>
        </div>
      </div>
    </div>
    <button class="welcome-cta" id="welcomeCreate">Create your first workspace</button>
    <div class="welcome-hint">Press <kbd>T</kbd> <kbd>N</kbd> <kbd>C</kbd> to quickly switch views</div>
  `;
  $content.appendChild(welcome);
  welcome.querySelector('#welcomeCreate').addEventListener('click', () => showSpaceModal(null));
}

/** Creates a header row with a back-to-spaces button and a view title label. */
function createViewTitleRow(label) {
  const row = document.createElement('div');
  row.className = 'settings-title-row';
  const backBtn = document.createElement('button');
  backBtn.className = 'settings-back-btn';
  backBtn.setAttribute('aria-label', 'Back to spaces');
  backBtn.appendChild(createLucideIcon('arrow-left', 16));
  backBtn.addEventListener('click', () => { currentView = 'spaces'; render(); });
  row.appendChild(backBtn);
  const title = document.createElement('div');
  title.className = 'settings-title';
  title.textContent = label;
  row.appendChild(title);
  return row;
}

/** Renders the main workspace view: header, featured badges, link groups, and bottom actions. */
function renderContent() {
  $content.innerHTML = '';
  const space = getActiveSpace();
  if (!space) {
    renderWelcome();
    return;
  }

  // Space title
  const header = document.createElement('div');
  header.className = 'space-header';
  const headerTitle = document.createElement('span');
  headerTitle.textContent = space.name;
  if (space.color) headerTitle.style.color = space.color;
  header.appendChild(headerTitle);
  const headerMenu = document.createElement('button');
  headerMenu.className = 'space-header-menu';
  headerMenu.textContent = '⋮';
  headerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    showContextMenu(e, [
      { label: 'Edit Space', action: () => showSpaceModal(space) },
      { label: 'Delete Space', danger: true, action: () => deleteSpace(space.id) }
    ]);
  });
  header.appendChild(headerMenu);
  $content.appendChild(header);

  // Featured badges — always shown (the `|| true` ensures section renders even when empty)
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

    // Pinned space notes
    const pinnedNotes = (space.notes || []).filter(n => n.pinned);
    pinnedNotes.forEach(note => {
      const badge = document.createElement('div');
      badge.className = 'featured-badge pinned-note-badge';
      badge.title = note.title || 'Untitled note';

      const iconEl = document.createElement('div');
      iconEl.className = 'badge-letter';
      iconEl.appendChild(createLucideIcon('file-text', 18, space.color || '#0a84ff'));
      badge.appendChild(iconEl);

      const label = document.createElement('span');
      label.className = 'badge-label';
      label.textContent = (note.title || 'Note').split(/\s+/)[0];
      badge.appendChild(label);

      badge.addEventListener('click', () => {
        currentView = 'notepad';
        notepadMode = 'notes';
        activeSpaceNoteId = note.id;
        render();
      });
      badge.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, [
          { label: 'Open', action: () => { currentView = 'notepad'; notepadMode = 'notes'; activeSpaceNoteId = note.id; render(); } },
          { label: 'Unpin', action: async () => { note.pinned = false; await saveState(); render(); } },
          { label: 'Delete', danger: true, action: async () => { space.notes = space.notes.filter(n => n.id !== note.id); await saveState(); render(); } }
        ]);
      });
      section.appendChild(badge);
    });

    // Pinned todo lists
    const pinnedTodos = (space.todos || []).filter(t => t.pinned);
    pinnedTodos.forEach(todo => {
      const badge = document.createElement('div');
      badge.className = 'featured-badge pinned-note-badge';
      const doneCount = todo.items.filter(i => i.done).length;
      badge.title = (todo.title || 'Untitled list') + ` (${doneCount}/${todo.items.length})`;

      const iconEl = document.createElement('div');
      iconEl.className = 'badge-letter';
      iconEl.appendChild(createLucideIcon('check-square', 18, space.color || '#0a84ff'));
      badge.appendChild(iconEl);

      const label = document.createElement('span');
      label.className = 'badge-label';
      label.textContent = (todo.title || 'Todos').split(/\s+/)[0];
      badge.appendChild(label);

      badge.addEventListener('click', () => {
        currentView = 'notepad';
        notepadMode = 'todos';
        activeSpaceTodoId = todo.id;
        render();
      });
      badge.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, [
          { label: 'Open', action: () => { currentView = 'notepad'; notepadMode = 'todos'; activeSpaceTodoId = todo.id; render(); } },
          { label: 'Unpin', action: async () => { todo.pinned = false; await saveState(); render(); } },
          { label: 'Delete', danger: true, action: async () => { space.todos = space.todos.filter(t => t.id !== todo.id); await saveState(); render(); } }
        ]);
      });
      section.appendChild(badge);
    });

    const addBadge = document.createElement('div');
    addBadge.className = 'featured-badge featured-add';
    addBadge.textContent = '+';
    addBadge.title = 'Add Featured Link';
    addBadge.addEventListener('click', () => showLinkModal(null, 'featured'));
    section.appendChild(addBadge);

    $content.appendChild(section);
  }

  // Groups
  space.groups.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'group' + (group.collapsed ? ' collapsed' : '');

    // Header
    const header = document.createElement('div');
    header.className = 'group-header';

    const toggle = document.createElement('span');
    toggle.className = 'group-toggle';
    toggle.textContent = '▼';
    header.appendChild(toggle);

    const name = document.createElement('span');
    name.className = 'group-name';
    name.textContent = group.name;
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
        { label: 'Open All', action: () => openAllInGroup(group) },
        { label: 'Edit Group', action: () => showGroupModal(group) },
        { label: 'Delete Group', danger: true, action: () => deleteGroup(group.id) }
      ]);
    });
    actions.appendChild(menuBtn);

    header.appendChild(actions);

    header.addEventListener('click', () => toggleGroup(group.id));
    groupEl.appendChild(header);

    // Links
    const linksEl = document.createElement('div');
    linksEl.className = 'group-links';
    linksEl.dataset.groupId = group.id;

    linksEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
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
      // Highlight container when dragging from another group
      const dragging = document.querySelector('.link-item.dragging');
      if (dragging && dragging.dataset.groupId !== group.id) {
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
      if (group.collapsed) return;

      let data;
      try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }

      const linkItems = [...linksEl.querySelectorAll('.link-item:not(.dragging)')];
      let insertIndex = linkItems.length;
      for (let i = 0; i < linkItems.length; i++) {
        const rect = linkItems[i].getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) { insertIndex = i; break; }
      }
      // Account for the dragged item being absent from the filtered list
      // Find actual index among all links in this group
      if (data.groupId === group.id) {
        // Recount using the non-dragging items' data-link-id to map back
        const nonDraggingIds = linkItems.map(li => li.dataset.linkId);
        const targetLinkId = nonDraggingIds[insertIndex];
        if (targetLinkId) {
          insertIndex = group.links.findIndex(l => l.id === targetLinkId);
        } else {
          insertIndex = group.links.length;
        }
      }

      moveLink(data.groupId, group.id, data.linkId, insertIndex);
    });

    group.links.forEach(link => {
      linksEl.appendChild(createLinkElement(link, group.id));
    });

    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'group-add-link';
    addLinkBtn.textContent = '+ Add Link';
    addLinkBtn.addEventListener('click', (e) => { e.stopPropagation(); showLinkModal(null, 'group', group.id); });
    linksEl.appendChild(addLinkBtn);

    groupEl.appendChild(linksEl);
    $content.appendChild(groupEl);
  });

  // Bottom actions
  const bottomActions = document.createElement('div');
  bottomActions.className = 'bottom-actions';

  const addGroupBtn = document.createElement('button');
  addGroupBtn.className = 'bottom-action-btn';
  addGroupBtn.textContent = '+ Add Group';
  addGroupBtn.addEventListener('click', () => showGroupModal(null));
  bottomActions.appendChild(addGroupBtn);

  const addNoteBtn = document.createElement('button');
  addNoteBtn.className = 'bottom-action-btn';
  addNoteBtn.textContent = '+ Add Note';
  addNoteBtn.addEventListener('click', async () => {
    if (!space.notes) space.notes = [];
    const newNote = { id: generateId('n'), title: '', content: '', createdAt: new Date().toISOString() };
    space.notes.unshift(newNote);
    await saveState();
    currentView = 'notepad';
    notepadMode = 'notes';
    activeSpaceNoteId = newNote.id;
    render();
  });
  bottomActions.appendChild(addNoteBtn);

  const addTodoBtn = document.createElement('button');
  addTodoBtn.className = 'bottom-action-btn';
  addTodoBtn.textContent = '+ Add Todo';
  addTodoBtn.addEventListener('click', async () => {
    if (!space.todos) space.todos = [];
    const newTodo = { id: generateId('td'), title: '', items: [{ id: generateId('ti'), text: '', done: false }], pinned: false, createdAt: new Date().toISOString() };
    space.todos.unshift(newTodo);
    await saveState();
    currentView = 'notepad';
    notepadMode = 'todos';
    activeSpaceTodoId = newTodo.id;
    render();
  });
  bottomActions.appendChild(addTodoBtn);

  $content.appendChild(bottomActions);
}

/** Creates a draggable link row element with favicon, title, URL, overflow menu, and click-to-open. */
function createLinkElement(link, groupId) {
  const item = document.createElement('div');
  item.className = 'link-item';
  item.draggable = true;
  item.dataset.linkId = link.id;
  item.dataset.groupId = groupId;

  // Drag data includes source groupId so drop handler knows if it's cross-group
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ linkId: link.id, groupId }));
    e.dataTransfer.effectAllowed = 'move';
    item.classList.add('dragging');
  });
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    document.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
      el.classList.remove('drag-over-above', 'drag-over-below');
    });
    document.querySelectorAll('.drag-target').forEach(el => el.classList.remove('drag-target'));
  });

  const icon = createFaviconEl(link.url, 16);
  icon.className = 'link-icon';
  item.appendChild(icon);

  const info = document.createElement('div');
  info.className = 'link-info';

  const title = document.createElement('div');
  title.className = 'link-title';
  title.textContent = link.title;
  info.appendChild(title);

  const url = document.createElement('div');
  url.className = 'link-url';
  url.textContent = link.url;
  info.appendChild(url);

  item.appendChild(info);

  // Indicator for notes/login info
  if (link.notes || link.loginUser || link.loginPass) {
    const indicators = document.createElement('div');
    indicators.className = 'link-indicators';
    const noteIcon = createLucideIcon('file-text', 12);
    noteIcon.classList.add('link-indicator');
    noteIcon.title = 'Has notes';
    indicators.appendChild(noteIcon);
    item.appendChild(indicators);
  }

  const overflow = document.createElement('button');
  overflow.className = 'link-overflow';
  overflow.textContent = '⋮';
  overflow.addEventListener('click', (e) => {
    e.stopPropagation();
    showContextMenu(e, [
      { label: 'Copy URL', action: () => navigator.clipboard.writeText(normalizeUrl(link.url)) },
      { label: 'Edit', action: () => showLinkModal(link, 'group', groupId) },
      { label: 'Link Notes', action: () => showNotesModal(link, 'group', groupId) },
      { label: 'Delete', danger: true, action: () => deleteLink(groupId, link.id) }
    ]);
  });
  item.appendChild(overflow);

  item.addEventListener('click', () => openLink(link.url));

  return item;
}

// ── Settings View ──

/** Renders the full settings page: feature toggles, app links, theme, shortcuts, sync, and data. */
function renderSettingsView() {
  $content.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'settings-view';

  wrap.appendChild(createViewTitleRow('Settings'));

  // Features section
  const featSection = document.createElement('div');
  featSection.className = 'settings-section';
  const featLabel = document.createElement('div');
  featLabel.className = 'settings-section-label';
  featLabel.textContent = 'Features';
  featSection.appendChild(featLabel);

  const featureList = [
    { key: 'activity', label: 'Activity Tracker', desc: 'Track time spent on websites', icon: 'clock' },
    { key: 'notepad', label: 'Notepad', desc: 'Daily notes and workspace notes', icon: 'file-text' },
    { key: 'calendar', label: 'Calendar', desc: 'Google Calendar integration', icon: 'calendar' },
    { key: 'focusTimer', label: 'Focus Timer', desc: 'Countdown timer with site tracking', icon: 'target' },
  ];

  featureList.forEach(({ key, label, desc, icon }) => {
    const row = document.createElement('div');
    row.className = 'settings-row';

    const left = document.createElement('div');
    left.className = 'settings-row-info';
    const iconEl = createLucideIcon(icon, 16);
    iconEl.style.flexShrink = '0';
    left.appendChild(iconEl);
    const text = document.createElement('div');
    const nameEl = document.createElement('div');
    nameEl.className = 'settings-row-label';
    nameEl.textContent = label;
    text.appendChild(nameEl);
    const descEl = document.createElement('div');
    descEl.className = 'settings-row-desc';
    descEl.textContent = desc;
    text.appendChild(descEl);
    left.appendChild(text);
    row.appendChild(left);

    const toggle = document.createElement('label');
    toggle.className = 'settings-toggle';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = features[key];
    input.addEventListener('change', async () => {
      features[key] = input.checked;
      await saveFeatures();
      render();
    });
    const slider = document.createElement('span');
    slider.className = 'settings-slider';
    toggle.appendChild(input);
    toggle.appendChild(slider);
    row.appendChild(toggle);

    featSection.appendChild(row);
  });

  wrap.appendChild(featSection);

  // App Links section
  const appSection = document.createElement('div');
  appSection.className = 'settings-section';
  const appLabel = document.createElement('div');
  appLabel.className = 'settings-section-label';
  appLabel.textContent = 'App Links';
  appSection.appendChild(appLabel);

  const appRow = document.createElement('div');
  appRow.className = 'settings-row';
  const appInfo = document.createElement('div');
  appInfo.className = 'settings-row-info';
  const appIcon = createLucideIcon('rocket', 18);
  appInfo.appendChild(appIcon);
  const appText = document.createElement('div');
  const appRowLabel = document.createElement('div');
  appRowLabel.className = 'settings-row-label';
  appRowLabel.textContent = 'Enable app links';
  appText.appendChild(appRowLabel);
  const appRowDesc = document.createElement('div');
  appRowDesc.className = 'settings-row-desc';
  appRowDesc.textContent = 'Open projects in editors, terminals, and other apps';
  appText.appendChild(appRowDesc);
  appInfo.appendChild(appText);
  appRow.appendChild(appInfo);
  const appToggle = document.createElement('label');
  appToggle.className = 'settings-toggle';
  appToggle.innerHTML = `<input type="checkbox" ${appLinksConfig.enabled ? 'checked' : ''}><span class="settings-slider"></span>`;
  appToggle.querySelector('input').addEventListener('change', async (e) => {
    appLinksConfig.enabled = e.target.checked;
    await saveAppLinksConfig();
    renderSettingsView();
  });
  appRow.appendChild(appToggle);
  appSection.appendChild(appRow);

  if (appLinksConfig.enabled) {
    // Base path
    const baseField = document.createElement('div');
    baseField.className = 'settings-terminal-field';
    baseField.innerHTML = `
      <label class="settings-row-label">Base path</label>
      <div class="settings-row-desc" style="margin-bottom:6px">Your projects folder. Paths in app links will be relative to this.</div>
      <input type="text" class="settings-terminal-input" value="${escapeHtml(appLinksConfig.basePath)}" placeholder="/Users/you/projects/">
    `;
    baseField.querySelector('input').addEventListener('change', async (e) => {
      let val = e.target.value.trim();
      if (val && !val.endsWith('/')) val += '/';
      appLinksConfig.basePath = val;
      await saveAppLinksConfig();
    });
    appSection.appendChild(baseField);

    // Helper to render a group of app preset checkboxes
    function renderAppCheckboxes(container, presets) {
      const list = document.createElement('div');
      list.className = 'settings-apps-list';
      presets.forEach(preset => {
        const row = document.createElement('label');
        row.className = 'settings-app-row';
        row.style.cursor = 'pointer';
        const isOn = appLinksConfig.enabledApps.includes(preset.id);
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = isOn;
        cb.style.marginRight = '8px';
        cb.addEventListener('change', async (e) => {
          if (e.target.checked) {
            appLinksConfig.enabledApps.push(preset.id);
          } else {
            appLinksConfig.enabledApps = appLinksConfig.enabledApps.filter(id => id !== preset.id);
          }
          await saveAppLinksConfig();
        });
        row.appendChild(cb);
        const nameSpan = document.createElement('span');
        nameSpan.className = 'settings-app-name';
        nameSpan.textContent = preset.name;
        row.appendChild(nameSpan);
        list.appendChild(row);
      });
      container.appendChild(list);
    }

    // Editors section
    const editorsField = document.createElement('div');
    editorsField.className = 'settings-terminal-field';
    editorsField.style.marginTop = '12px';
    const editorsLabel = document.createElement('label');
    editorsLabel.className = 'settings-row-label';
    editorsLabel.textContent = 'Editors';
    editorsField.appendChild(editorsLabel);
    const editorsDesc = document.createElement('div');
    editorsDesc.className = 'settings-row-desc';
    editorsDesc.style.marginBottom = '8px';
    editorsDesc.textContent = 'Open files and folders in your editor. Works automatically if the app is installed.';
    editorsField.appendChild(editorsDesc);
    renderAppCheckboxes(editorsField, APP_PRESETS.filter(p => p.type === 'editor'));
    appSection.appendChild(editorsField);

    // Terminals section
    const terminalsField = document.createElement('div');
    terminalsField.className = 'settings-terminal-field';
    terminalsField.style.marginTop = '12px';
    const terminalsLabel = document.createElement('label');
    terminalsLabel.className = 'settings-row-label';
    terminalsLabel.textContent = 'Terminals';
    terminalsField.appendChild(terminalsLabel);
    const terminalsDesc = document.createElement('div');
    terminalsDesc.className = 'settings-row-desc';
    terminalsDesc.style.marginBottom = '8px';
    terminalsDesc.textContent = 'Open a terminal in any project folder — great for CLI tools like Claude Code.';
    terminalsField.appendChild(terminalsDesc);

    // Terminal setup callout (before checkboxes)
    const setupNote = document.createElement('div');
    setupNote.className = 'settings-setup-callout';
    setupNote.innerHTML = `
      ${createLucideIcon('info', 14).outerHTML}
      <div>
        <strong>One-time setup required</strong>
        <div class="settings-row-desc" style="margin-top:2px">Terminals need <strong>Hatch</strong>, a free helper app for macOS, to handle <code>terminal://</code> links. <a href="https://github.com/nerves76/hatch" target="_blank">Get Hatch</a></div>
      </div>
    `;
    terminalsField.appendChild(setupNote);

    renderAppCheckboxes(terminalsField, APP_PRESETS.filter(p => p.type === 'terminal'));

    appSection.appendChild(terminalsField);

    // Tip for custom schemes
    const tip = document.createElement('div');
    tip.className = 'settings-row-desc';
    tip.style.marginTop = '12px';
    tip.style.padding = '0 2px';
    tip.textContent = 'For other apps, paste the full URL (e.g. figma://file/abc) directly in the URL field.';
    appSection.appendChild(tip);
  }

  wrap.appendChild(appSection);

  // Transcription section
  const transcriptionSection = document.createElement('div');
  transcriptionSection.className = 'settings-section';
  const transcriptionLabel = document.createElement('div');
  transcriptionLabel.className = 'settings-section-label';
  transcriptionLabel.textContent = 'Voice Transcription';
  transcriptionSection.appendChild(transcriptionLabel);

  const transcriptionDesc = document.createElement('div');
  transcriptionDesc.className = 'settings-row-desc';
  transcriptionDesc.style.marginBottom = '8px';
  transcriptionDesc.textContent = 'Add an API key to enable the mic button on your daily notepad. Your key is stored locally.';
  transcriptionSection.appendChild(transcriptionDesc);

  const providerField = document.createElement('div');
  providerField.className = 'settings-terminal-field';
  providerField.innerHTML = `
    <label class="settings-row-label">Provider</label>
    <select class="settings-terminal-input" id="transcriptionProvider">
      <option value="groq" ${transcriptionConfig.provider === 'groq' ? 'selected' : ''}>Groq (free)</option>
      <option value="openai" ${transcriptionConfig.provider === 'openai' ? 'selected' : ''}>OpenAI</option>
    </select>
  `;
  providerField.querySelector('select').addEventListener('change', async (e) => {
    transcriptionConfig.provider = e.target.value;
    await saveTranscriptionConfig();
  });
  transcriptionSection.appendChild(providerField);

  const keyField = document.createElement('div');
  keyField.className = 'settings-terminal-field';
  keyField.style.marginTop = '8px';
  keyField.innerHTML = `
    <label class="settings-row-label">API Key</label>
    <input type="password" class="settings-terminal-input" value="${escapeHtml(transcriptionConfig.apiKey)}" placeholder="Paste your API key">
  `;
  keyField.querySelector('input').addEventListener('change', async (e) => {
    transcriptionConfig.apiKey = e.target.value.trim();
    await saveTranscriptionConfig();
  });
  transcriptionSection.appendChild(keyField);

  const keyTip = document.createElement('div');
  keyTip.className = 'settings-row-desc';
  keyTip.style.marginTop = '6px';
  keyTip.innerHTML = 'Get a free key at <a href="#" class="settings-link" id="transcriptionKeyLink">groq.com</a>';
  transcriptionSection.appendChild(keyTip);
  // Defer event listener since innerHTML replaces elements
  setTimeout(() => {
    const link = document.getElementById('transcriptionKeyLink');
    if (link) link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = transcriptionConfig.provider === 'openai' ? 'https://platform.openai.com/api-keys' : 'https://console.groq.com/keys';
      chrome.tabs.create({ url });
    });
  });

  wrap.appendChild(transcriptionSection);

  // Theme section
  const themeSection = document.createElement('div');
  themeSection.className = 'settings-section';
  const themeLabel = document.createElement('div');
  themeLabel.className = 'settings-section-label';
  themeLabel.textContent = 'Theme';
  themeSection.appendChild(themeLabel);

  const themeRow = document.createElement('div');
  themeRow.className = 'settings-theme-row';

  ['system', 'light', 'dark'].forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'settings-theme-btn' + (currentTheme === t ? ' active' : '');
    btn.appendChild(createLucideIcon(t === 'light' ? 'sun' : t === 'dark' ? 'moon' : 'settings', 16));
    const lbl = document.createElement('span');
    lbl.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    btn.appendChild(lbl);
    btn.addEventListener('click', async () => {
      currentTheme = t;
      document.documentElement.setAttribute('data-theme', t);
      await chrome.storage.local.set({ theme: t });
      renderSettingsView();
    });
    themeRow.appendChild(btn);
  });

  themeSection.appendChild(themeRow);
  wrap.appendChild(themeSection);

  // Keyboard shortcuts section
  const kbSection = document.createElement('div');
  kbSection.className = 'settings-section';
  const kbLabel = document.createElement('div');
  kbLabel.className = 'settings-section-label';
  kbLabel.textContent = 'Keyboard Shortcuts';
  kbSection.appendChild(kbLabel);

  const shortcuts = [
    ['1 – 9', 'Switch workspace'],
    ['T', 'Activity tracker'],
    ['N', 'Notepad'],
    ['C', 'Calendar'],
    ['F', 'Start/stop focus timer'],
    ['Esc', 'Back to workspaces'],
  ];

  shortcuts.forEach(([key, desc]) => {
    const row = document.createElement('div');
    row.className = 'settings-shortcut';
    const kbd = document.createElement('kbd');
    kbd.textContent = key;
    row.appendChild(kbd);
    const descEl = document.createElement('span');
    descEl.textContent = desc;
    row.appendChild(descEl);
    kbSection.appendChild(row);
  });

  wrap.appendChild(kbSection);

  // Sync section
  const syncSection = document.createElement('div');
  syncSection.className = 'settings-section';
  const syncLabel = document.createElement('div');
  syncLabel.className = 'settings-section-label';
  syncLabel.textContent = 'Sync';
  syncSection.appendChild(syncLabel);

  const syncDesc = document.createElement('div');
  syncDesc.className = 'settings-row-desc';
  syncDesc.style.marginBottom = '8px';
  syncDesc.textContent = 'Sync your data across devices using Google Drive. Your data is stored privately in an app-only folder.';
  syncSection.appendChild(syncDesc);

  const syncBtn = document.createElement('button');
  syncBtn.className = 'settings-sync-btn';
  syncBtn.innerHTML = createLucideIcon('cloud', 16).outerHTML + '<span>Sync now</span>';
  syncBtn.addEventListener('click', async () => {
    syncBtn.disabled = true;
    syncBtn.querySelector('span').textContent = 'Syncing...';
    try {
      const result = await syncToCloud();
      syncBtn.querySelector('span').textContent = result === 'pulled' ? 'Updated from cloud' : 'Backed up to cloud';
      // Update last synced display
      const statusEl = syncSection.querySelector('.settings-sync-status');
      if (statusEl) statusEl.textContent = 'Last synced: just now';
    } catch (e) {
      syncBtn.querySelector('span').textContent = 'Sync failed';
      console.error('Sync error:', e);
    }
    syncBtn.disabled = false;
    setTimeout(() => {
      syncBtn.innerHTML = createLucideIcon('cloud', 16).outerHTML + '<span>Sync now</span>';
    }, 2500);
  });
  syncSection.appendChild(syncBtn);

  const syncStatus = document.createElement('div');
  syncStatus.className = 'settings-sync-status';
  chrome.storage.local.get('lastSyncedAt').then(({ lastSyncedAt }) => {
    if (lastSyncedAt) {
      const d = new Date(lastSyncedAt);
      syncStatus.textContent = 'Last synced: ' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' at ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    } else {
      syncStatus.textContent = 'Never synced';
    }
  });
  syncSection.appendChild(syncStatus);

  wrap.appendChild(syncSection);

  // Data section
  const dataSection = document.createElement('div');
  dataSection.className = 'settings-section';
  const dataLabel = document.createElement('div');
  dataLabel.className = 'settings-section-label';
  dataLabel.textContent = 'Data';
  dataSection.appendChild(dataLabel);

  const exportBtn = document.createElement('button');
  exportBtn.className = 'settings-action-btn';
  exportBtn.textContent = 'Export all data (JSON)';
  exportBtn.addEventListener('click', async () => {
    const data = await chrome.storage.local.get(null);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snackbar-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  dataSection.appendChild(exportBtn);

  const importBtn = document.createElement('button');
  importBtn.className = 'settings-action-btn';
  importBtn.textContent = 'Import data (JSON)';
  importBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await chrome.storage.local.set(data);
        await loadState();
        await loadFeatures();
        await applyTheme();
        render();
      } catch {
        // Show inline error
        importBtn.textContent = 'Import failed — invalid file';
        setTimeout(() => { importBtn.textContent = 'Import data (JSON)'; }, 2000);
      }
    });
    input.click();
  });
  dataSection.appendChild(importBtn);

  wrap.appendChild(dataSection);

  // About
  const about = document.createElement('div');
  about.className = 'settings-about';
  about.innerHTML = `
    <div class="settings-version">Snackbar v1.0</div>
    <div class="settings-byline">by <a href="#" id="settingsDivinerLink">Diviner</a></div>
    <p class="settings-blurb">Built for people who struggle with context switching and staying on task. Visual timers help you see time passing — not just know it's passing. Session tracking shows exactly where your focus went, so you can bill hours accurately or just understand your own patterns.</p>
    <a href="#" id="settingsSupportLink" class="settings-support-link">${createLucideIcon('heart', 14).outerHTML} Support Snackbar</a>
  `;
  about.querySelector('#settingsDivinerLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://diviner.agency' });
  });
  about.querySelector('#settingsSupportLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://ko-fi.com/divinerone' });
  });
  wrap.appendChild(about);

  $content.appendChild(wrap);
}

// ── Activity View ──

/** Formats seconds into a human-readable duration string (e.g. "1h 23m" or "45s"). */
function formatDuration(seconds) {
  if (seconds < 60) return seconds + 's';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return h + 'h ' + m + 'm';
  return m + 'm';
}

/** Returns "Today", "Yesterday", or a short date label for the given YYYY-MM-DD string. */
function formatDateLabel(dateStr) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  // T12:00:00 avoids timezone-related off-by-one issues
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

// ── Focus Timer ──

/** Formats seconds as M:SS or H:MM:SS for the focus timer display. */
function formatTimerDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Starts the focus timer. Pass a duration for countdown mode, or null for open-ended stopwatch.
 * Resets all tracked site time.
 */
function startFocusTimer(durationSeconds) {
  focusTimer.running = true;
  focusTimer.startTime = Date.now();
  focusTimer.durationSeconds = durationSeconds || null;
  focusTimer.elapsed = 0;
  focusTimer.sites = {};
  focusTimer.finished = false;
  saveFocusTimerState();
  startTimerTick();
}

/** Pauses the focus timer but preserves elapsed time and site data for possible resume. */
function stopFocusTimer() {
  focusTimer.running = false;
  clearInterval(focusTimer.intervalId);
  focusTimer.intervalId = null;
  saveFocusTimerState();
}

/** Fully resets the timer state, clearing all elapsed time and site tracking data. */
function resetFocusTimer() {
  focusTimer.running = false;
  focusTimer.startTime = null;
  focusTimer.durationSeconds = null;
  focusTimer.elapsed = 0;
  focusTimer.sites = {};
  focusTimer.finished = false;
  clearInterval(focusTimer.intervalId);
  focusTimer.intervalId = null;
  saveFocusTimerState();
}

/** Starts the 1-second interval that updates elapsed time, tracks the active site, and checks countdown completion. */
function startTimerTick() {
  clearInterval(focusTimer.intervalId);
  focusTimer.intervalId = setInterval(() => {
    if (!focusTimer.running) return;
    // Derive elapsed from wall-clock difference so it stays accurate across sleeps
    focusTimer.elapsed = Math.round((Date.now() - focusTimer.startTime) / 1000);

    // Track which site the user is on each second
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
      if (tab && tab.url) {
        try {
          const domain = new URL(tab.url).hostname;
          if (domain) focusTimer.sites[domain] = (focusTimer.sites[domain] || 0) + 1;
        } catch {}
      }
    }).catch(() => {});

    saveFocusTimerState();

    // Check if countdown finished
    if (focusTimer.durationSeconds && focusTimer.elapsed >= focusTimer.durationSeconds && !focusTimer.finished) {
      focusTimer.finished = true;
      playTimerAlert();
    }

    // Update display if activity view is visible
    updateTimerDisplay();
  }, 1000);
}

/** Plays a soft two-tone chime via Web Audio API when the countdown timer finishes. */
function playTimerAlert() {
  try {
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 — gentle ascending arpeggio
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const start = ctx.currentTime + i * 0.4;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.15, start + 0.05); // soft attack
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2); // long fade
      osc.start(start);
      osc.stop(start + 1.2);
    });
  } catch {}
}

/** Updates the timer's time text, SVG ring progress, and site list without a full re-render. */
function updateTimerDisplay() {
  const timeEl = document.querySelector('.timer-time');
  const ringEl = document.querySelector('.timer-ring-progress');
  if (!timeEl) return;

  const elapsed = focusTimer.elapsed;
  const duration = focusTimer.durationSeconds;

  if (duration) {
    const remaining = Math.max(0, duration - elapsed);
    timeEl.textContent = formatTimerDisplay(remaining);
  } else {
    timeEl.textContent = formatTimerDisplay(elapsed);
  }

  const ringSegments = document.querySelectorAll('.timer-ring-progress');
  if (ringSegments.length && duration) {
    const progress = Math.min(elapsed / duration, 1);
    const circumference = 2 * Math.PI * 54;
    ringSegments.forEach(seg => {
      const type = seg.dataset.segment;
      let len = 0;
      if (type === 'green') len = Math.min(progress, 0.5) * circumference;
      else if (type === 'orange') len = Math.max(0, Math.min(progress - 0.5, 0.25)) * circumference;
      else if (type === 'red') len = Math.max(0, Math.min(progress - 0.75, 0.25)) * circumference;
      seg.style.strokeDasharray = `${len} ${circumference - len}`;
    });
  }

  // Update sites list
  const sitesList = document.querySelector('.timer-sites');
  if (sitesList) renderTimerSites(sitesList);
}

/** Renders the sorted list of domains visited during the current focus session, with time bars. */
function renderTimerSites(container) {
  const entries = Object.entries(focusTimer.sites).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:8px 0;font-size:12px">No sites visited yet</div>';
    return;
  }
  const maxTime = entries[0][1];
  container.innerHTML = '';
  entries.slice(0, 8).forEach(([domain, seconds]) => {
    const row = document.createElement('div');
    row.className = 'activity-row';
    const favicon = createFaviconEl('https://' + domain, 16);
    favicon.className = 'link-icon';
    row.appendChild(favicon);
    const info = document.createElement('div');
    info.className = 'activity-info';
    const topLine = document.createElement('div');
    topLine.className = 'activity-domain-line';
    const domainEl = document.createElement('span');
    domainEl.className = 'activity-domain';
    domainEl.textContent = domain;
    topLine.appendChild(domainEl);
    const timeEl = document.createElement('span');
    timeEl.className = 'activity-time';
    timeEl.textContent = formatDuration(seconds);
    topLine.appendChild(timeEl);
    info.appendChild(topLine);
    const barBg = document.createElement('div');
    barBg.className = 'activity-bar-bg';
    const bar = document.createElement('div');
    bar.className = 'activity-bar';
    bar.style.width = Math.max((seconds / maxTime) * 100, 2) + '%';
    barBg.appendChild(bar);
    info.appendChild(barBg);
    row.appendChild(info);
    container.appendChild(row);
  });
}

/** Persists timer state to session storage so it survives sidebar close/reopen within the session. */
async function saveFocusTimerState() {
  await chrome.storage.session.set({
    focusTimerState: {
      running: focusTimer.running,
      startTime: focusTimer.startTime,
      durationSeconds: focusTimer.durationSeconds,
      sites: focusTimer.sites,
      finished: focusTimer.finished
    }
  });
}

/** Restores a running timer from session storage and resumes the tick interval if needed. */
async function loadFocusTimerState() {
  try {
    const { focusTimerState } = await chrome.storage.session.get('focusTimerState');
    if (focusTimerState && focusTimerState.running) {
      focusTimer.running = true;
      focusTimer.startTime = focusTimerState.startTime;
      focusTimer.durationSeconds = focusTimerState.durationSeconds;
      focusTimer.sites = focusTimerState.sites || {};
      focusTimer.finished = focusTimerState.finished || false;
      focusTimer.elapsed = Math.round((Date.now() - focusTimer.startTime) / 1000);
      startTimerTick();
    }
  } catch {}
}

/** Builds the focus timer UI: preset buttons when idle, or ring + controls + sites when active. */
function renderTimerSection() {
  const section = document.createElement('div');
  section.className = 'timer-section';

  if (!focusTimer.running && focusTimer.elapsed === 0) {
    // Timer not started — show preset buttons
    const label = document.createElement('div');
    label.className = 'timer-label';
    label.textContent = 'Focus Timer';
    section.appendChild(label);

    const controls = document.createElement('div');
    controls.className = 'timer-presets';

    // Minutes input
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'timer-minutes-input';
    input.min = '1';
    input.max = '480';
    input.value = '25';
    input.placeholder = 'min';
    input.setAttribute('aria-label', 'Timer minutes');
    controls.appendChild(input);

    // Start countdown button
    const startBtn = document.createElement('button');
    startBtn.className = 'timer-preset-btn';
    startBtn.textContent = 'Start';
    startBtn.addEventListener('click', () => {
      const mins = parseInt(input.value);
      if (!mins || mins < 1) return;
      startFocusTimer(mins * 60);
      renderActivityView();
    });
    controls.appendChild(startBtn);

    // Stopwatch button (no limit)
    const swBtn = document.createElement('button');
    swBtn.className = 'timer-preset-btn timer-stopwatch-btn';
    swBtn.appendChild(createLucideIcon('play', 12));
    const swLabel = document.createElement('span');
    swLabel.textContent = 'Stopwatch';
    swBtn.appendChild(swLabel);
    swBtn.addEventListener('click', () => {
      startFocusTimer(null);
      renderActivityView();
    });
    controls.appendChild(swBtn);

    // Enter key starts the countdown
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') startBtn.click();
    });

    section.appendChild(controls);
  } else {
    // Timer is running or stopped with results
    const elapsed = focusTimer.elapsed;
    const duration = focusTimer.durationSeconds;

    // Ring + time display
    const ringWrap = document.createElement('div');
    ringWrap.className = 'timer-ring-wrap' + (duration ? ' has-ring' : '');

    if (duration) {
      const progress = Math.min(elapsed / duration, 1);
      const circumference = 2 * Math.PI * 54;
      // Three segments: green 0-50%, orange 50-75%, red 75-100%
      const greenLen = Math.min(progress, 0.5) * circumference;
      const orangeLen = Math.max(0, Math.min(progress - 0.5, 0.25)) * circumference;
      const redLen = Math.max(0, Math.min(progress - 0.75, 0.25)) * circumference;
      // Each segment starts where the previous one ended (rotate from -90° top)
      const greenRotate = -90;
      const orangeRotate = -90 + (0.5 * 360);
      const redRotate = -90 + (0.75 * 360);
      ringWrap.innerHTML = `
        <svg class="timer-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--bg-secondary)" stroke-width="6" />
          <circle class="timer-ring-progress" data-segment="green" cx="60" cy="60" r="54" fill="none" stroke="#30d158" stroke-width="6"
            stroke-dasharray="${greenLen} ${circumference - greenLen}"
            transform="rotate(${greenRotate} 60 60)" />
          <circle class="timer-ring-progress" data-segment="orange" cx="60" cy="60" r="54" fill="none" stroke="#ff9f0a" stroke-width="6"
            stroke-dasharray="${orangeLen} ${circumference - orangeLen}"
            transform="rotate(${orangeRotate} 60 60)" />
          <circle class="timer-ring-progress" data-segment="red" cx="60" cy="60" r="54" fill="none" stroke="#ff453a" stroke-width="6"
            stroke-dasharray="${redLen} ${circumference - redLen}"
            transform="rotate(${redRotate} 60 60)" />
        </svg>`;
    }

    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'timer-time' + (focusTimer.finished ? ' timer-finished' : '');
    if (duration) {
      const remaining = Math.max(0, duration - elapsed);
      timeDisplay.textContent = formatTimerDisplay(remaining);
    } else {
      timeDisplay.textContent = formatTimerDisplay(elapsed);
    }
    ringWrap.appendChild(timeDisplay);

    if (focusTimer.finished) {
      const doneLabel = document.createElement('div');
      doneLabel.className = 'timer-done-label';
      doneLabel.textContent = 'Time\'s up!';
      ringWrap.appendChild(doneLabel);
    }

    section.appendChild(ringWrap);

    // Controls
    const controls = document.createElement('div');
    controls.className = 'timer-controls';

    if (focusTimer.running && !focusTimer.finished) {
      const stopBtn = document.createElement('button');
      stopBtn.className = 'timer-control-btn';
      stopBtn.appendChild(createLucideIcon('pause', 14));
      const stopLabel = document.createElement('span');
      stopLabel.textContent = 'Stop';
      stopBtn.appendChild(stopLabel);
      stopBtn.addEventListener('click', () => {
        stopFocusTimer();
        renderActivityView();
      });
      controls.appendChild(stopBtn);
    } else if (!focusTimer.running && focusTimer.elapsed > 0 && !focusTimer.finished) {
      // Paused
      const resumeBtn = document.createElement('button');
      resumeBtn.className = 'timer-control-btn';
      resumeBtn.appendChild(createLucideIcon('play', 14));
      const resumeLabel = document.createElement('span');
      resumeLabel.textContent = 'Resume';
      resumeBtn.appendChild(resumeLabel);
      resumeBtn.addEventListener('click', () => {
        focusTimer.running = true;
        // Adjust startTime backward by already-elapsed time so the timer continues seamlessly
        focusTimer.startTime = Date.now() - focusTimer.elapsed * 1000;
        saveFocusTimerState();
        startTimerTick();
        renderActivityView();
      });
      controls.appendChild(resumeBtn);
    }

    const resetBtn = document.createElement('button');
    resetBtn.className = 'timer-control-btn timer-reset-btn';
    resetBtn.appendChild(createLucideIcon('trash', 14));
    const resetLabel = document.createElement('span');
    resetLabel.textContent = 'Reset';
    resetBtn.appendChild(resetLabel);
    resetBtn.addEventListener('click', () => {
      resetFocusTimer();
      renderActivityView();
    });
    controls.appendChild(resetBtn);

    section.appendChild(controls);

    // Sites visited during timer
    if (Object.keys(focusTimer.sites).length > 0) {
      const sitesLabel = document.createElement('div');
      sitesLabel.className = 'timer-sites-label';
      sitesLabel.textContent = 'Sites during session';
      section.appendChild(sitesLabel);

      const sitesList = document.createElement('div');
      sitesList.className = 'timer-sites activity-list';
      renderTimerSites(sitesList);
      section.appendChild(sitesList);
    }
  }

  return section;
}

/** Renders the activity tracker view: date nav, focus timer (today only), and per-domain time bars. */
async function renderActivityView() {
  $content.innerHTML = '';

  $content.appendChild(createViewTitleRow('Activity'));

  // Header with date nav
  const header = document.createElement('div');
  header.className = 'activity-header';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'activity-nav-btn';
  prevBtn.setAttribute('aria-label', 'Previous day');
  prevBtn.appendChild(createLucideIcon('chevron-left', 16));
  prevBtn.addEventListener('click', () => {
    const d = new Date(activityDate + 'T12:00:00');
    d.setDate(d.getDate() - 1);
    activityDate = d.toISOString().slice(0, 10);
    renderActivityView();
  });
  header.appendChild(prevBtn);

  const dateLabelWrap = document.createElement('div');
  dateLabelWrap.className = 'activity-date-wrap';
  const dateLabel = document.createElement('span');
  dateLabel.className = 'activity-date';
  dateLabel.textContent = formatDateLabel(activityDate);
  dateLabelWrap.appendChild(dateLabel);
  const dateSub = document.createElement('span');
  dateSub.className = 'activity-date-sub';
  const dd = new Date(activityDate + 'T12:00:00');
  dateSub.textContent = dd.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  dateLabelWrap.appendChild(dateSub);
  header.appendChild(dateLabelWrap);

  const today = new Date().toISOString().slice(0, 10);
  const nextBtn = document.createElement('button');
  nextBtn.className = 'activity-nav-btn';
  nextBtn.setAttribute('aria-label', 'Next day');
  nextBtn.appendChild(createLucideIcon('chevron-right', 16));
  if (activityDate >= today) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.3';
  } else {
    nextBtn.addEventListener('click', () => {
      const d = new Date(activityDate + 'T12:00:00');
      d.setDate(d.getDate() + 1);
      activityDate = d.toISOString().slice(0, 10);
      renderActivityView();
    });
  }
  header.appendChild(nextBtn);

  $content.appendChild(header);

  // Focus timer (today only, if enabled)
  if (activityDate === today && features.focusTimer) {
    $content.appendChild(renderTimerSection());
  }

  // Load data
  const { timeTracking = {} } = await chrome.storage.local.get('timeTracking');
  const dayData = timeTracking[activityDate] || {};

  const entries = Object.entries(dayData).sort((a, b) => b[1] - a[1]);
  const totalSeconds = entries.reduce((sum, [, s]) => sum + s, 0);

  // Total
  const totalEl = document.createElement('div');
  totalEl.className = 'activity-total';
  totalEl.innerHTML = `<span class="activity-total-time">${formatDuration(totalSeconds)}</span><span class="activity-total-label">total active time</span>`;
  $content.appendChild(totalEl);

  if (entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = activityDate === today ? 'No activity tracked yet today.' : 'No activity recorded.';
    $content.appendChild(empty);
    return;
  }

  // Domain list
  const maxTime = entries[0][1];
  const list = document.createElement('div');
  list.className = 'activity-list';

  entries.forEach(([domain, seconds]) => {
    const row = document.createElement('div');
    row.className = 'activity-row';

    const favicon = createFaviconEl('https://' + domain, 16);
    favicon.className = 'link-icon';
    row.appendChild(favicon);

    const info = document.createElement('div');
    info.className = 'activity-info';

    const topLine = document.createElement('div');
    topLine.className = 'activity-domain-line';

    const domainEl = document.createElement('span');
    domainEl.className = 'activity-domain';
    domainEl.textContent = domain;
    topLine.appendChild(domainEl);

    const timeEl = document.createElement('span');
    timeEl.className = 'activity-time';
    timeEl.textContent = formatDuration(seconds);
    topLine.appendChild(timeEl);

    info.appendChild(topLine);

    const barBg = document.createElement('div');
    barBg.className = 'activity-bar-bg';
    const bar = document.createElement('div');
    bar.className = 'activity-bar';
    bar.style.width = Math.max((seconds / maxTime) * 100, 2) + '%'; // min 2% so short bars are visible
    barBg.appendChild(bar);
    info.appendChild(barBg);

    row.appendChild(info);
    list.appendChild(row);
  });

  $content.appendChild(list);

  // Export button
  const exportBtn = document.createElement('button');
  exportBtn.className = 'activity-export-btn';
  exportBtn.appendChild(createLucideIcon('share-2', 14));
  const exportLabel = document.createElement('span');
  exportLabel.textContent = 'Export CSV';
  exportBtn.appendChild(exportLabel);
  exportBtn.addEventListener('click', () => {
    let csv = 'Domain,Seconds,Duration\n';
    entries.forEach(([domain, seconds]) => {
      csv += `"${domain}",${seconds},"${formatDuration(seconds)}"\n`;
    });
    csv += `\nTotal,${totalSeconds},"${formatDuration(totalSeconds)}"\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snackbar-activity-${activityDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });
  $content.appendChild(exportBtn);
}

// ── Notepad View ──

let notepadSaveTimer = null;   // debounce timer for auto-saving notepad content
let isTranscribing = false;
let mediaRecorder = null;      // MediaRecorder for voice capture
let audioChunks = [];          // recorded audio data
let notepadMode = 'daily';     // 'daily' = date-based notes, 'notes' = workspace notes, 'todos' = workspace todo lists
let activeSpaceNoteId = null;  // ID of the space note currently open in the editor
let activeSpaceTodoId = null;  // ID of the todo list currently open in the editor

/** Renders the notepad view with Daily/Notes/Todos tab toggle, then delegates to the active mode. */
async function renderNotepadView() {
  $content.innerHTML = '';

  $content.appendChild(createViewTitleRow('Notepad'));

  const space = getActiveSpace();

  // Show space name for context on Notes/Todos tabs
  if (space && notepadMode !== 'daily') {
    const spaceLabel = document.createElement('div');
    spaceLabel.className = 'notepad-space-label';
    if (space.color) spaceLabel.style.color = space.color;
    spaceLabel.textContent = space.name;
    $content.appendChild(spaceLabel);
  }

  const toggle = document.createElement('div');
  toggle.className = 'modal-toggle';

  const dailyBtn = document.createElement('button');
  dailyBtn.className = 'toggle-btn' + (notepadMode === 'daily' ? ' active' : '');
  dailyBtn.textContent = 'Daily';
  dailyBtn.addEventListener('click', () => { notepadMode = 'daily'; activeSpaceNoteId = null; activeSpaceTodoId = null; renderNotepadView(); });
  toggle.appendChild(dailyBtn);

  const notesBtn = document.createElement('button');
  notesBtn.className = 'toggle-btn' + (notepadMode === 'notes' ? ' active' : '');
  notesBtn.textContent = 'Notes';
  notesBtn.addEventListener('click', () => { notepadMode = 'notes'; activeSpaceTodoId = null; renderNotepadView(); });
  toggle.appendChild(notesBtn);

  const todosBtn = document.createElement('button');
  todosBtn.className = 'toggle-btn' + (notepadMode === 'todos' ? ' active' : '');
  todosBtn.textContent = 'Todos';
  todosBtn.addEventListener('click', () => { notepadMode = 'todos'; activeSpaceNoteId = null; renderNotepadView(); });
  toggle.appendChild(todosBtn);

  $content.appendChild(toggle);

  if (notepadMode === 'notes') {
    renderSpaceNotes();
    return;
  }
  if (notepadMode === 'todos') {
    renderSpaceTodos();
    return;
  }

  await renderDailyNotepad();
}

/** Renders the daily notepad: date navigation, mic transcription toolbar, title, and textarea. */
async function renderDailyNotepad() {
  // Abort recording if navigating away from today
  const today = new Date().toISOString().slice(0, 10);
  if (notepadDate !== today && isTranscribing) {
    isTranscribing = false;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      mediaRecorder.stop();
    }
    mediaRecorder = null;
    audioChunks = [];
  }

  // Header with date nav
  const header = document.createElement('div');
  header.className = 'activity-header';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'activity-nav-btn';
  prevBtn.setAttribute('aria-label', 'Previous day');
  prevBtn.appendChild(createLucideIcon('chevron-left', 16));
  prevBtn.addEventListener('click', async () => {
    await flushNotepad();
    const d = new Date(notepadDate + 'T12:00:00');
    d.setDate(d.getDate() - 1);
    notepadDate = d.toISOString().slice(0, 10);
    renderNotepadView();
  });
  header.appendChild(prevBtn);

  const dateLabelWrap = document.createElement('div');
  dateLabelWrap.className = 'activity-date-wrap';
  const dateLabel = document.createElement('span');
  dateLabel.className = 'activity-date';
  dateLabel.textContent = formatDateLabel(notepadDate);
  dateLabelWrap.appendChild(dateLabel);
  const dateSub = document.createElement('span');
  dateSub.className = 'activity-date-sub';
  const dd = new Date(notepadDate + 'T12:00:00');
  dateSub.textContent = dd.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  dateLabelWrap.appendChild(dateSub);
  header.appendChild(dateLabelWrap);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'activity-nav-btn';
  nextBtn.setAttribute('aria-label', 'Next day');
  nextBtn.appendChild(createLucideIcon('chevron-right', 16));
  if (notepadDate >= today) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.3';
  } else {
    nextBtn.addEventListener('click', async () => {
      await flushNotepad();
      const d = new Date(notepadDate + 'T12:00:00');
      d.setDate(d.getDate() + 1);
      notepadDate = d.toISOString().slice(0, 10);
      renderNotepadView();
    });
  }
  header.appendChild(nextBtn);

  $content.appendChild(header);

  // Toolbar: status + mic button (today only)
  const toolbar = document.createElement('div');
  toolbar.className = 'notepad-toolbar';

  const status = document.createElement('span');
  status.className = 'notepad-status';
  status.textContent = '';
  toolbar.appendChild(status);

  if (notepadDate === today && transcriptionConfig.apiKey) {
    if (isTranscribing) {
      const stopBtn = document.createElement('button');
      stopBtn.className = 'notepad-mic-btn recording';
      stopBtn.title = 'Stop & transcribe';
      stopBtn.appendChild(createLucideIcon('square', 14));
      const stopLabel = document.createElement('span');
      stopLabel.textContent = 'Stop';
      stopBtn.appendChild(stopLabel);
      const dot = document.createElement('span');
      dot.className = 'recording-dot';
      stopBtn.appendChild(dot);
      stopBtn.addEventListener('click', async () => {
        const textarea = $content.querySelector('.notepad-textarea');
        await stopTranscription(textarea, status);
        renderNotepadView();
      });
      toolbar.appendChild(stopBtn);
    } else {
      const recBtn = document.createElement('button');
      recBtn.className = 'notepad-mic-btn';
      recBtn.title = 'Record voice note';
      recBtn.appendChild(createLucideIcon('mic', 14));
      const recLabel = document.createElement('span');
      recLabel.textContent = 'Record';
      recBtn.appendChild(recLabel);
      recBtn.addEventListener('click', async () => {
        const textarea = $content.querySelector('.notepad-textarea');
        await startTranscription(textarea, status);
        renderNotepadView();
      });
      toolbar.appendChild(recBtn);
    }
  }

  $content.appendChild(toolbar);

  // Load note for this date
  const { notepadPages = {} } = await chrome.storage.local.get('notepadPages');
  let page = notepadPages[notepadDate] || { title: '', content: '' };
  // Migrate: older versions stored the page as a plain string instead of {title, content}
  if (typeof page === 'string') page = { title: '', content: page };

  // Title field
  const titleInput = document.createElement('input');
  titleInput.className = 'notepad-title';
  titleInput.type = 'text';
  titleInput.placeholder = 'Untitled note';
  titleInput.value = page.title;
  titleInput.addEventListener('input', () => {
    clearTimeout(notepadSaveTimer);
    notepadSaveTimer = setTimeout(async () => {
      await saveNotepadContent(titleInput.value, textarea.value);
      status.textContent = 'Saved';
      setTimeout(() => { if (status.textContent === 'Saved') status.textContent = ''; }, 2000);
    }, 500);
  });
  $content.appendChild(titleInput);

  const textarea = document.createElement('textarea');
  textarea.className = 'notepad-textarea';
  textarea.placeholder = notepadDate === today ? 'Write anything here...' : 'No notes for this day.';
  textarea.value = page.content;
  textarea.spellcheck = true;

  // Debounced auto-save on every keystroke (500ms idle)
  textarea.addEventListener('input', () => {
    clearTimeout(notepadSaveTimer);
    status.textContent = '';
    notepadSaveTimer = setTimeout(async () => {
      await saveNotepadContent(titleInput.value, textarea.value);
      status.textContent = 'Saved';
      setTimeout(() => { if (status.textContent === 'Saved') status.textContent = ''; }, 2000);
    }, 500);
  });

  $content.appendChild(textarea);
}

// ── Space Notes ──

/** Renders the workspace notes list, or the note editor if a specific note is selected. */
function renderSpaceNotes() {
  const space = getActiveSpace();
  if (!space) return;
  if (!space.notes) space.notes = [];

  // Editing a specific note
  if (activeSpaceNoteId) {
    const note = space.notes.find(n => n.id === activeSpaceNoteId);
    if (note) {
      renderSpaceNoteEditor(note);
      return;
    }
    activeSpaceNoteId = null;
  }

  // Note list
  const listHeader = document.createElement('div');
  listHeader.className = 'notepad-toolbar';
  const countLabel = document.createElement('span');
  countLabel.className = 'notepad-status';
  countLabel.textContent = space.notes.length + ' note' + (space.notes.length !== 1 ? 's' : '');
  listHeader.appendChild(countLabel);
  const addBtn = document.createElement('button');
  addBtn.className = 'notepad-mic-btn';
  addBtn.title = 'New note';
  addBtn.appendChild(createLucideIcon('plus', 16));
  addBtn.addEventListener('click', async () => {
    const newNote = { id: generateId('n'), title: '', content: '', createdAt: new Date().toISOString() };
    space.notes.unshift(newNote);
    await saveState();
    activeSpaceNoteId = newNote.id;
    renderNotepadView();
  });
  listHeader.appendChild(addBtn);
  $content.appendChild(listHeader);

  if (space.notes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No notes in this workspace yet.';
    $content.appendChild(empty);
    return;
  }

  const list = document.createElement('div');
  list.className = 'space-notes-list';
  space.notes.forEach(note => {
    const row = document.createElement('div');
    row.className = 'space-note-row';
    row.addEventListener('click', () => { activeSpaceNoteId = note.id; renderNotepadView(); });

    const info = document.createElement('div');
    info.className = 'space-note-info';
    const title = document.createElement('div');
    title.className = 'space-note-title';
    title.textContent = note.title || 'Untitled note';
    info.appendChild(title);
    const meta = document.createElement('div');
    meta.className = 'space-note-meta';
    const preview = note.content.split('\n')[0].slice(0, 60);
    const date = new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    meta.textContent = date + (preview ? ' — ' + preview : '');
    info.appendChild(meta);
    row.appendChild(info);

    const actions = document.createElement('div');
    actions.className = 'space-note-actions';

    const pinBtn = document.createElement('button');
    pinBtn.className = 'space-note-action-btn' + (note.pinned ? ' pinned' : '');
    pinBtn.title = note.pinned ? 'Unpin from space' : 'Pin to space';
    pinBtn.appendChild(createLucideIcon('map-pin', 14));
    pinBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      note.pinned = !note.pinned;
      await saveState();
      renderNotepadView();
    });
    actions.appendChild(pinBtn);

    const delBtn = document.createElement('button');
    delBtn.className = 'space-note-action-btn danger';
    delBtn.title = 'Delete';
    delBtn.appendChild(createLucideIcon('trash', 14));
    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      space.notes = space.notes.filter(n => n.id !== note.id);
      await saveState();
      renderNotepadView();
    });
    actions.appendChild(delBtn);

    row.appendChild(actions);
    list.appendChild(row);
  });
  $content.appendChild(list);
}

/** Renders a single workspace note editor with title input, textarea, and auto-save. */
function renderSpaceNoteEditor(note) {
  // Back button
  const backRow = document.createElement('div');
  backRow.className = 'notepad-toolbar';
  const backBtn = document.createElement('button');
  backBtn.className = 'activity-nav-btn';
  backBtn.setAttribute('aria-label', 'Back');
  backBtn.appendChild(createLucideIcon('chevron-left', 16));
  backBtn.addEventListener('click', async () => {
    await flushSpaceNote(note);
    activeSpaceNoteId = null;
    renderNotepadView();
  });
  backRow.appendChild(backBtn);
  const status = document.createElement('span');
  status.className = 'notepad-status';
  status.textContent = '';
  backRow.appendChild(status);
  $content.appendChild(backRow);

  // Title
  const titleInput = document.createElement('input');
  titleInput.className = 'notepad-title';
  titleInput.type = 'text';
  titleInput.placeholder = 'Untitled note';
  titleInput.value = note.title;
  titleInput.addEventListener('input', () => {
    clearTimeout(notepadSaveTimer);
    notepadSaveTimer = setTimeout(async () => {
      note.title = titleInput.value;
      note.content = textarea.value;
      await saveState();
      status.textContent = 'Saved';
      setTimeout(() => { if (status.textContent === 'Saved') status.textContent = ''; }, 2000);
    }, 500);
  });
  $content.appendChild(titleInput);

  // Content
  const textarea = document.createElement('textarea');
  textarea.className = 'notepad-textarea';
  textarea.placeholder = 'Write something...';
  textarea.value = note.content;
  textarea.spellcheck = true;
  textarea.addEventListener('input', () => {
    clearTimeout(notepadSaveTimer);
    notepadSaveTimer = setTimeout(async () => {
      note.title = titleInput.value;
      note.content = textarea.value;
      await saveState();
      status.textContent = 'Saved';
      setTimeout(() => { if (status.textContent === 'Saved') status.textContent = ''; }, 2000);
    }, 500);
  });
  $content.appendChild(textarea);
}

/** Immediately saves the current note editor contents, cancelling any pending debounce timer. */
async function flushSpaceNote(note) {
  clearTimeout(notepadSaveTimer);
  const titleInput = $content.querySelector('.notepad-title');
  const textarea = $content.querySelector('.notepad-textarea');
  if (!textarea) return;
  note.title = titleInput ? titleInput.value : note.title;
  note.content = textarea.value;
  await saveState();
}

// ── Space Todos ──

/** Renders the workspace todo list index, or the todo editor if a specific list is selected. */
function renderSpaceTodos() {
  const space = getActiveSpace();
  if (!space) return;
  if (!space.todos) space.todos = [];

  if (activeSpaceTodoId) {
    const todo = space.todos.find(t => t.id === activeSpaceTodoId);
    if (todo) { renderTodoEditor(todo); return; }
    activeSpaceTodoId = null;
  }

  // List header
  const listHeader = document.createElement('div');
  listHeader.className = 'notepad-toolbar';
  const countLabel = document.createElement('span');
  countLabel.className = 'notepad-status';
  countLabel.textContent = space.todos.length + ' list' + (space.todos.length !== 1 ? 's' : '');
  listHeader.appendChild(countLabel);
  const addBtn = document.createElement('button');
  addBtn.className = 'notepad-mic-btn';
  addBtn.title = 'New todo list';
  addBtn.appendChild(createLucideIcon('plus', 16));
  addBtn.addEventListener('click', async () => {
    const newTodo = { id: generateId('td'), title: '', items: [], pinned: false, createdAt: new Date().toISOString() };
    space.todos.unshift(newTodo);
    await saveState();
    activeSpaceTodoId = newTodo.id;
    renderNotepadView();
  });
  listHeader.appendChild(addBtn);
  $content.appendChild(listHeader);

  if (space.todos.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No todo lists in this workspace yet.';
    $content.appendChild(empty);
    return;
  }

  const list = document.createElement('div');
  list.className = 'space-notes-list';
  space.todos.forEach(todo => {
    const row = document.createElement('div');
    row.className = 'space-note-row';
    row.addEventListener('click', () => { activeSpaceTodoId = todo.id; renderNotepadView(); });

    const info = document.createElement('div');
    info.className = 'space-note-info';
    const title = document.createElement('div');
    title.className = 'space-note-title';
    title.textContent = todo.title || 'Untitled list';
    info.appendChild(title);
    const meta = document.createElement('div');
    meta.className = 'space-note-meta';
    const doneCount = todo.items.filter(i => i.done).length;
    const total = todo.items.length;
    meta.textContent = total === 0 ? 'Empty' : `${doneCount}/${total} done`;
    info.appendChild(meta);
    row.appendChild(info);

    const actions = document.createElement('div');
    actions.className = 'space-note-actions';

    const pinBtn = document.createElement('button');
    pinBtn.className = 'space-note-action-btn' + (todo.pinned ? ' pinned' : '');
    pinBtn.title = todo.pinned ? 'Unpin' : 'Pin to space';
    pinBtn.appendChild(createLucideIcon('map-pin', 14));
    pinBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      todo.pinned = !todo.pinned;
      await saveState();
      renderNotepadView();
    });
    actions.appendChild(pinBtn);

    const delBtn = document.createElement('button');
    delBtn.className = 'space-note-action-btn danger';
    delBtn.title = 'Delete';
    delBtn.appendChild(createLucideIcon('trash', 14));
    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      space.todos = space.todos.filter(t => t.id !== todo.id);
      await saveState();
      renderNotepadView();
    });
    actions.appendChild(delBtn);

    row.appendChild(actions);
    list.appendChild(row);
  });
  $content.appendChild(list);
}

/** Renders the interactive todo list editor: checkboxes, inline text editing, Enter to add, Backspace to remove. */
function renderTodoEditor(todo) {
  // Back button + title
  const backRow = document.createElement('div');
  backRow.className = 'notepad-toolbar';
  const backBtn = document.createElement('button');
  backBtn.className = 'activity-nav-btn';
  backBtn.setAttribute('aria-label', 'Back');
  backBtn.appendChild(createLucideIcon('chevron-left', 16));
  backBtn.addEventListener('click', () => { activeSpaceTodoId = null; renderNotepadView(); });
  backRow.appendChild(backBtn);
  const status = document.createElement('span');
  status.className = 'notepad-status';
  const doneCount = todo.items.filter(i => i.done).length;
  status.textContent = todo.items.length > 0 ? `${doneCount}/${todo.items.length}` : '';
  backRow.appendChild(status);
  $content.appendChild(backRow);

  // Title
  const titleInput = document.createElement('input');
  titleInput.className = 'notepad-title';
  titleInput.type = 'text';
  titleInput.placeholder = 'Untitled list';
  titleInput.value = todo.title;
  titleInput.addEventListener('input', async () => {
    todo.title = titleInput.value;
    await saveState();
  });
  $content.appendChild(titleInput);

  // Items
  const itemsList = document.createElement('div');
  itemsList.className = 'todo-items';

  function renderItems() {
    itemsList.innerHTML = '';
    todo.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'todo-item' + (item.done ? ' done' : '');

      const checkbox = document.createElement('button');
      checkbox.className = 'todo-checkbox' + (item.done ? ' checked' : '');
      checkbox.appendChild(createLucideIcon(item.done ? 'check' : 'plus', 12));
      checkbox.addEventListener('click', async () => {
        item.done = !item.done;
        await saveState();
        status.textContent = `${todo.items.filter(i => i.done).length}/${todo.items.length}`;
        renderItems();
      });
      row.appendChild(checkbox);

      const text = document.createElement('input');
      text.className = 'todo-text';
      text.type = 'text';
      text.value = item.text;
      text.addEventListener('input', async () => {
        item.text = text.value;
        await saveState();
      });
      text.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
          // Insert a new empty item right after this one
          e.preventDefault();
          const idx = todo.items.indexOf(item);
          const newItem = { id: generateId('ti'), text: '', done: false };
          todo.items.splice(idx + 1, 0, newItem);
          await saveState();
          renderItems();
          const inputs = itemsList.querySelectorAll('.todo-text');
          if (inputs[idx + 1]) inputs[idx + 1].focus();
        }
        if (e.key === 'Backspace' && item.text === '' && todo.items.length > 1) {
          e.preventDefault();
          const idx = todo.items.indexOf(item);
          todo.items = todo.items.filter(i => i.id !== item.id);
          await saveState();
          status.textContent = `${todo.items.filter(i => i.done).length}/${todo.items.length}`;
          renderItems();
          const inputs = itemsList.querySelectorAll('.todo-text');
          const focusIdx = Math.max(0, idx - 1);
          if (inputs[focusIdx]) inputs[focusIdx].focus();
        }
      });
      row.appendChild(text);

      const delBtn = document.createElement('button');
      delBtn.className = 'todo-delete';
      delBtn.appendChild(createLucideIcon('trash', 12));
      delBtn.addEventListener('click', async () => {
        todo.items = todo.items.filter(i => i.id !== item.id);
        await saveState();
        status.textContent = todo.items.length > 0 ? `${todo.items.filter(i => i.done).length}/${todo.items.length}` : '';
        renderItems();
      });
      row.appendChild(delBtn);

      itemsList.appendChild(row);
    });

    // Add item button
    const addRow = document.createElement('button');
    addRow.className = 'todo-add-btn';
    addRow.textContent = '+ Add item';
    addRow.addEventListener('click', async () => {
      todo.items.push({ id: generateId('ti'), text: '', done: false });
      await saveState();
      status.textContent = `${todo.items.filter(i => i.done).length}/${todo.items.length}`;
      renderItems();
      const inputs = itemsList.querySelectorAll('.todo-text');
      if (inputs.length) inputs[inputs.length - 1].focus();
    });
    itemsList.appendChild(addRow);
  }

  renderItems();
  $content.appendChild(itemsList);
}

// ── Daily Notepad Save ──

/** Saves a daily notepad page. Removes the entry entirely if both title and content are empty. */
async function saveNotepadContent(title, text) {
  const { notepadPages = {} } = await chrome.storage.local.get('notepadPages');
  if (title.trim() || text.trim()) {
    notepadPages[notepadDate] = { title, content: text };
  } else {
    delete notepadPages[notepadDate];
  }
  await chrome.storage.local.set({ notepadPages });
}

/** Immediately persists the daily notepad, used before navigating away to prevent data loss. */
async function flushNotepad() {
  clearTimeout(notepadSaveTimer);
  const textarea = $content.querySelector('.notepad-textarea');
  const titleInput = $content.querySelector('.notepad-title');
  if (!textarea) return;
  await saveNotepadContent(titleInput ? titleInput.value : '', textarea.value);
}

// ── Speech-to-Text (Whisper API via user's own key) ──

/** Checks if microphone permission has been granted. */
async function hasMicPermission() {
  try {
    const result = await navigator.permissions.query({ name: 'microphone' });
    return result.state === 'granted';
  } catch { return false; }
}

/** Opens a tab to request microphone permission (required once from a non-sidepanel context). */
function requestMicPermission() {
  chrome.tabs.create({ url: chrome.runtime.getURL('request-mic.html') });
}

/** Starts recording audio from the microphone. */
async function startTranscription(textarea, status) {
  if (!transcriptionConfig.apiKey) {
    status.textContent = 'Add API key in Settings';
    setTimeout(() => { status.textContent = ''; }, 3000);
    return;
  }

  const hasMic = await hasMicPermission();
  if (!hasMic) {
    status.textContent = 'Granting mic access...';
    requestMicPermission();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    audioChunks = [];
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.start();
    isTranscribing = true;
    status.textContent = 'Recording...';
  } catch {
    status.textContent = 'Mic access denied';
    setTimeout(() => { status.textContent = ''; }, 3000);
  }
}

/** Stops recording and sends audio to the Whisper API for transcription. */
async function stopTranscription(textarea, status) {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    isTranscribing = false;
    return;
  }

  return new Promise((resolve) => {
    mediaRecorder.onstop = async () => {
      // Stop all mic tracks
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      isTranscribing = false;

      if (audioChunks.length === 0) { resolve(); return; }

      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = [];

      if (status) status.textContent = 'Transcribing...';

      try {
        const text = await sendToWhisperAPI(blob);
        if (text && textarea) {
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          textarea.value += (textarea.value && !textarea.value.endsWith('\n') ? '\n' : '') + `[${time}] ${text}\n`;
          textarea.scrollTop = textarea.scrollHeight;
          const titleEl = document.querySelector('.notepad-title');
          saveNotepadContent(titleEl ? titleEl.value : '', textarea.value);
        }
        if (status) status.textContent = '';
      } catch (err) {
        if (status) status.textContent = 'Transcription failed';
        setTimeout(() => { if (status) status.textContent = ''; }, 3000);
      }
      resolve();
    };
    mediaRecorder.stop();
  });
}

/** Sends an audio blob to the configured Whisper API and returns the transcript text. */
async function sendToWhisperAPI(blob) {
  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');
  formData.append('model', 'whisper-large-v3');

  let url;
  if (transcriptionConfig.provider === 'openai') {
    url = 'https://api.openai.com/v1/audio/transcriptions';
    formData.set('model', 'whisper-1');
  } else {
    url = 'https://api.groq.com/openai/v1/audio/transcriptions';
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${transcriptionConfig.apiKey}` },
    body: formData
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.text || '';
}

// ── Calendar View ──

/** Obtains an OAuth token for Google Calendar via chrome.identity. */
async function getCalendarToken() {
  try {
    const result = await chrome.identity.getAuthToken({ interactive: true });
    return result.token || result;
  } catch (e) {
    console.error('Calendar auth error:', e);
    throw e;
  }
}

let calendarTokenRetried = false; // prevents infinite retry loop on 401

/**
 * Fetches calendar events for a given date from Google Calendar API.
 * Automatically retries once on 401 by clearing the cached auth token.
 */
async function fetchCalendarEvents(date) {
  const token = await getCalendarToken();
  if (!token) throw new Error('No auth token received. Make sure you approved the Google sign-in prompt.');

  const timeMin = new Date(date + 'T00:00:00').toISOString();
  const timeMax = new Date(date + 'T23:59:59.999').toISOString();

  const params = new URLSearchParams({
    timeMin, timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50'
  });

  const resp = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (resp.status === 401 && !calendarTokenRetried) {
    calendarTokenRetried = true;
    await chrome.identity.removeCachedAuthToken({ token });
    return fetchCalendarEvents(date);
  }
  calendarTokenRetried = false;

  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    throw new Error(`API ${resp.status}: ${errBody}`);
  }
  const data = await resp.json();
  return data.items || [];
}

/** Formats an event's start-end time range, or returns "All day" for dateless events. */
function formatEventTime(event) {
  if (event.start.date) return 'All day';
  const fmt = (d) => new Date(d).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return `${fmt(event.start.dateTime)} – ${fmt(event.end.dateTime)}`;
}

/** Returns true if the current moment falls within the event's time range. */
function isEventNow(event) {
  const now = Date.now();
  if (event.start.date) {
    const start = new Date(event.start.date + 'T00:00:00').getTime();
    const end = new Date(event.end.date + 'T00:00:00').getTime();
    return now >= start && now < end;
  }
  return now >= new Date(event.start.dateTime).getTime() && now < new Date(event.end.dateTime).getTime();
}

// Google Calendar event colorId -> hex mapping (from Calendar API docs)
const GCAL_COLORS = {
  '1': '#7986cb', '2': '#33b679', '3': '#8e24aa', '4': '#e67c73',
  '5': '#f6bf26', '6': '#f4511e', '7': '#039be5', '8': '#616161',
  '9': '#3f51b5', '10': '#0b8043', '11': '#d50000'
};

/** Maps a Google Calendar event's colorId to a hex color, defaulting to blue. */
function getEventColor(event) {
  if (event.colorId && GCAL_COLORS[event.colorId]) return GCAL_COLORS[event.colorId];
  return '#0a84ff';
}

/** Adds a retry button to an error container that clears cached auth tokens and re-renders. */
function appendRetryButton(container) {
  const btn = document.createElement('button');
  btn.className = 'modal-btn primary';
  btn.textContent = 'Retry';
  btn.style.marginTop = '12px';
  btn.addEventListener('click', async () => {
    try { await chrome.identity.clearAllCachedAuthTokens(); } catch {}
    renderCalendarView();
  });
  container.appendChild(document.createElement('br'));
  container.appendChild(btn);
}

/** Renders the calendar view: date navigation and a list of Google Calendar events for that day. */
async function renderCalendarView() {
  $content.innerHTML = '';

  $content.appendChild(createViewTitleRow('Calendar'));

  // Header with date nav
  const header = document.createElement('div');
  header.className = 'activity-header';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'activity-nav-btn';
  prevBtn.setAttribute('aria-label', 'Previous day');
  prevBtn.appendChild(createLucideIcon('chevron-left', 16));
  prevBtn.addEventListener('click', () => {
    const d = new Date(calendarDate + 'T12:00:00');
    d.setDate(d.getDate() - 1);
    calendarDate = d.toISOString().slice(0, 10);
    renderCalendarView();
  });
  header.appendChild(prevBtn);

  const dateLabelWrap = document.createElement('div');
  dateLabelWrap.className = 'activity-date-wrap';
  const dateLabel = document.createElement('span');
  dateLabel.className = 'activity-date';
  dateLabel.textContent = formatDateLabel(calendarDate);
  dateLabelWrap.appendChild(dateLabel);
  const dateSub = document.createElement('span');
  dateSub.className = 'activity-date-sub';
  const dd = new Date(calendarDate + 'T12:00:00');
  dateSub.textContent = dd.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  dateLabelWrap.appendChild(dateSub);
  header.appendChild(dateLabelWrap);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'activity-nav-btn';
  nextBtn.setAttribute('aria-label', 'Next day');
  nextBtn.appendChild(createLucideIcon('chevron-right', 16));
  nextBtn.addEventListener('click', () => {
    const d = new Date(calendarDate + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    calendarDate = d.toISOString().slice(0, 10);
    renderCalendarView();
  });
  header.appendChild(nextBtn);

  $content.appendChild(header);

  // Loading
  const loadingEl = document.createElement('div');
  loadingEl.className = 'empty-state';
  loadingEl.textContent = 'Loading events...';
  $content.appendChild(loadingEl);

  let events;
  try {
    events = await fetchCalendarEvents(calendarDate);
  } catch (e) {
    const msg = e.message || String(e);
    loadingEl.innerHTML = `<strong>Calendar error:</strong><br><br>${escapeHtml(msg)}<br><br>Check that:<br>1. Calendar API is enabled in Google Cloud<br>2. OAuth client type is "Chrome extension"<br>3. Extension ID is added to the OAuth client`;
    appendRetryButton(loadingEl);
    return;
  }


  loadingEl.remove();

  if (events.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No events scheduled.';
    $content.appendChild(empty);
    return;
  }

  // Render all-day events first, then timed events
  const allDay = events.filter(e => e.start.date);
  const timed = events.filter(e => e.start.dateTime);

  const list = document.createElement('div');
  list.className = 'calendar-list';

  allDay.forEach(event => list.appendChild(createCalendarEventEl(event)));
  timed.forEach(event => list.appendChild(createCalendarEventEl(event)));

  $content.appendChild(list);
}

/** Creates a calendar event card with color stripe, time, title, location, and optional meeting link. */
function createCalendarEventEl(event) {
  const el = document.createElement('div');
  el.className = 'calendar-event' + (isEventNow(event) ? ' now' : '');

  const stripe = document.createElement('div');
  stripe.className = 'calendar-event-stripe';
  stripe.style.background = getEventColor(event);
  el.appendChild(stripe);

  const body = document.createElement('div');
  body.className = 'calendar-event-body';

  const time = document.createElement('div');
  time.className = 'calendar-event-time';
  time.textContent = formatEventTime(event);
  body.appendChild(time);

  const title = document.createElement('div');
  title.className = 'calendar-event-title';
  title.textContent = event.summary || '(No title)';
  body.appendChild(title);

  if (event.location) {
    const loc = document.createElement('div');
    loc.className = 'calendar-event-detail';
    loc.appendChild(createLucideIcon('map-pin', 12));
    const locText = document.createElement('span');
    locText.textContent = event.location;
    loc.appendChild(locText);
    body.appendChild(loc);
  }

  if (event.hangoutLink) {
    const meet = document.createElement('div');
    meet.className = 'calendar-event-detail calendar-event-link';
    meet.appendChild(createLucideIcon('video', 12));
    const meetText = document.createElement('span');
    meetText.textContent = 'Join meeting';
    meet.appendChild(meetText);
    meet.addEventListener('click', (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url: event.hangoutLink });
    });
    body.appendChild(meet);
  }

  el.appendChild(body);
  return el;
}

// ── Space Operations ──

/** Switches to a workspace by ID, returning to the spaces view if in another panel. */
function switchSpace(id) {
  currentView = 'spaces';
  state.activeSpaceId = id;
  saveState();
  render();
}

/** Deletes a workspace and falls back to the first remaining space (or none). */
async function deleteSpace(id) {
  state.spaces = state.spaces.filter(s => s.id !== id);
  if (state.activeSpaceId === id) {
    state.activeSpaceId = state.spaces.length > 0 ? state.spaces[0].id : null;
  }
  await saveState();
  render();
}

// ── Group Operations ──

/** Toggles a link group's collapsed state and re-renders. */
async function toggleGroup(groupId) {
  const space = getActiveSpace();
  const group = space.groups.find(g => g.id === groupId);
  if (group) {
    group.collapsed = !group.collapsed;
    await saveState();
    render();
  }
}

async function deleteGroup(groupId) {
  const space = getActiveSpace();
  space.groups = space.groups.filter(g => g.id !== groupId);
  await saveState();
  render();
}

// ── Drag & Drop ──

/**
 * Moves a link between or within groups via drag-and-drop.
 * Handles index adjustment when reordering within the same group.
 */
async function moveLink(srcGroupId, targetGroupId, linkId, insertIndex) {
  const space = getActiveSpace();
  const srcGroup = space.groups.find(g => g.id === srcGroupId);
  if (!srcGroup) return;
  const linkIndex = srcGroup.links.findIndex(l => l.id === linkId);
  if (linkIndex === -1) return;
  const [link] = srcGroup.links.splice(linkIndex, 1);
  const targetGroup = space.groups.find(g => g.id === targetGroupId);
  if (!targetGroup) return;
  // If moving within same group and source was before insert point, adjust index
  if (srcGroupId === targetGroupId && linkIndex < insertIndex) insertIndex--;
  targetGroup.links.splice(insertIndex, 0, link);
  await saveState();
  render();
}

// ── Link Operations ──

async function deleteLink(groupId, linkId) {
  const space = getActiveSpace();
  const group = space.groups.find(g => g.id === groupId);
  if (group) {
    group.links = group.links.filter(l => l.id !== linkId);
    await saveState();
    render();
  }
}

async function deleteFeatured(featId) {
  const space = getActiveSpace();
  space.featured = space.featured.filter(f => f.id !== featId);
  await saveState();
  render();
}

// ── Context Menu ──

let activeContextMenu = null;

/**
 * Shows a positioned context menu with the given action items.
 * Auto-dismisses on the next click anywhere in the document.
 */
function showContextMenu(e, items) {
  closeContextMenu();
  const menu = document.createElement('div');
  menu.className = 'context-menu';

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'context-menu-item' + (item.danger ? ' danger' : '');
    btn.textContent = item.label;
    btn.addEventListener('click', () => { closeContextMenu(); item.action(); });
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);
  activeContextMenu = menu;

  // Clamp position so the menu doesn't overflow the viewport
  const x = Math.min(e.clientX, window.innerWidth - 140);
  const y = Math.min(e.clientY, window.innerHeight - items.length * 32 - 8);
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  // Defer the click-to-dismiss listener so the triggering click doesn't immediately close it
  setTimeout(() => document.addEventListener('click', closeContextMenu, { once: true }), 0);
}

function closeContextMenu() {
  if (activeContextMenu) {
    activeContextMenu.remove();
    activeContextMenu = null;
  }
}

// ── Modals ──

/** Populates the modal with HTML, shows the overlay, and auto-focuses the first input. */
function showModal(html) {
  $modal.innerHTML = html;
  $modalOverlay.classList.add('visible');
  const firstInput = $modal.querySelector('input');
  if (firstInput) setTimeout(() => firstInput.focus(), 50);
}

function closeModal() {
  $modalOverlay.classList.remove('visible');
  $modal.innerHTML = '';
}

// Close modal when clicking the backdrop (but not the modal content itself)
$modalOverlay.addEventListener('click', (e) => {
  if (e.target === $modalOverlay) closeModal();
});

// ── Space Modal ──

/**
 * Shows the add/edit workspace modal with name input, icon picker (Lucide grid or custom text),
 * color picker, and save/cancel actions.
 * @param {object|null} existing - Space to edit, or null to create a new one.
 */
function showSpaceModal(existing) {
  const isEdit = !!existing;
  const categoryTabs = Object.keys(ICON_CATEGORIES).map(cat =>
    `<button class="emoji-tab" data-cat="${cat}">${cat}</button>`
  ).join('');

  const defaultIcon = isEdit ? existing.icon : 'briefcase';
  const defaultColor = isEdit ? existing.color : '#4A90D9';

  showModal(`
    <div class="modal-title">${isEdit ? 'Edit' : 'Add'} Space</div>
    <div class="modal-field">
      <label>Name</label>
      <input type="text" id="mName" value="${isEdit ? escapeHtml(existing.name) : ''}" placeholder="Space name">
    </div>
    <div class="modal-field">
      <label>Icon</label>
      <div class="emoji-picker">
        <div class="icon-picker-top">
          <div class="emoji-preview" id="mIconPreview"></div>
          <input type="color" id="mIconColor" value="${defaultColor}" title="Icon color">
        </div>
        <div class="emoji-tabs">${categoryTabs}<button class="emoji-tab" data-cat="Text">Text</button></div>
        <div class="emoji-grid" id="mIconGrid"></div>
        <div class="icon-text-input" id="mTextInput" style="display:none">
          <input type="text" id="mIconText" maxlength="3" placeholder="AB">
        </div>
      </div>
      <input type="hidden" id="mIcon" value="${defaultIcon}">
    </div>
    <div class="modal-buttons">
      <button class="modal-btn" id="mCancel">Cancel</button>
      <button class="modal-btn primary" id="mSave">Save</button>
    </div>
  `);

  const $preview = $modal.querySelector('#mIconPreview');
  const $grid = $modal.querySelector('#mIconGrid');
  const $iconInput = $modal.querySelector('#mIcon');
  const $colorInput = $modal.querySelector('#mIconColor');
  const $textInput = $modal.querySelector('#mTextInput');
  const $iconText = $modal.querySelector('#mIconText');

  // Pre-fill text input if editing a text-based icon
  if (isEdit && !LUCIDE_ICONS[existing.icon]) {
    $iconText.value = existing.icon;
  }

  function setPreview(iconVal, color) {
    $preview.innerHTML = '';
    if (LUCIDE_ICONS[iconVal]) {
      $preview.appendChild(createLucideIcon(iconVal, 24, color));
    } else {
      $preview.style.color = color;
      $preview.style.fontSize = iconVal.length > 2 ? '11px' : '14px';
      $preview.style.fontWeight = '700';
      $preview.textContent = iconVal;
    }
  }

  function showCategory(cat) {
    $modal.querySelectorAll('.emoji-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    if (cat === 'Text') {
      $grid.style.display = 'none';
      $textInput.style.display = '';
      $iconText.focus();
      return;
    }
    $grid.style.display = '';
    $textInput.style.display = 'none';
    $grid.innerHTML = '';
    ICON_CATEGORIES[cat].forEach(iconName => {
      const btn = document.createElement('button');
      btn.className = 'emoji-cell' + (iconName === $iconInput.value ? ' selected' : '');
      btn.appendChild(createLucideIcon(iconName, 18, $colorInput.value));
      btn.title = iconName;
      btn.addEventListener('click', () => {
        $iconInput.value = iconName;
        setPreview(iconName, $colorInput.value);
        $grid.querySelectorAll('.emoji-cell').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
      });
      $grid.appendChild(btn);
    });
  }

  function refreshGridColors() {
    const color = $colorInput.value;
    $grid.querySelectorAll('.emoji-cell svg').forEach(svg => {
      svg.setAttribute('stroke', color);
    });
    setPreview($iconInput.value, color);
  }

  $iconText.addEventListener('input', () => {
    const text = $iconText.value.trim().toUpperCase();
    if (text) {
      $iconInput.value = text;
      setPreview(text, $colorInput.value);
    }
  });

  setPreview(defaultIcon, defaultColor);
  $modal.querySelectorAll('.emoji-tab').forEach(tab => {
    tab.addEventListener('click', () => showCategory(tab.dataset.cat));
  });
  $colorInput.addEventListener('input', () => {
    refreshGridColors();
    // Also update text preview color
    if (!LUCIDE_ICONS[$iconInput.value]) {
      setPreview($iconInput.value, $colorInput.value);
    }
  });

  // Show correct initial tab
  if (isEdit && !LUCIDE_ICONS[existing.icon]) {
    showCategory('Text');
  } else {
    showCategory(Object.keys(ICON_CATEGORIES)[0]);
  }

  $modal.querySelector('#mCancel').addEventListener('click', closeModal);
  $modal.querySelector('#mSave').addEventListener('click', async () => {
    const name = $modal.querySelector('#mName').value.trim();
    const icon = $modal.querySelector('#mIcon').value || 'briefcase';
    const color = $colorInput.value;
    if (!name) return;

    if (isEdit) {
      existing.name = name;
      existing.icon = icon;
      existing.color = color;
    } else {
      const newSpace = {
        id: generateId('s'),
        name, icon, color,
        featured: [],
        groups: [],
        notes: [],
        todos: []
      };
      state.spaces.push(newSpace);
      state.activeSpaceId = newSpace.id;
    }
    await saveState();
    closeModal();
    render();
  });

  // Enter key to save
  $modal.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') $modal.querySelector('#mSave').click();
    });
  });
}

// ── Group Modal ──

/**
 * Shows the add/edit group modal (name only).
 * @param {object|null} existing - Group to edit, or null to create a new one.
 */
function showGroupModal(existing) {
  const isEdit = !!existing;
  showModal(`
    <div class="modal-title">${isEdit ? 'Edit' : 'Add'} Group</div>
    <div class="modal-field">
      <label>Name</label>
      <input type="text" id="mGName" value="${isEdit ? escapeHtml(existing.name) : ''}" placeholder="Group name">
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
    } else {
      const space = getActiveSpace();
      space.groups.push({
        id: generateId('g'),
        name,
        collapsed: false,
        links: []
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

// ── Link Modal (Featured & Group) ──

/**
 * Shows the add/edit link modal. Supports both web URLs and app links (custom schemes).
 * When app links are configured, provides a Web/App toggle and app selector dropdown.
 * @param {object|null} existing - Link to edit, or null to create.
 * @param {'featured'|'group'} type - Whether this is a featured badge or group link.
 * @param {string} [groupId] - Required when type is 'group'.
 */
function showLinkModal(existing, type, groupId) {
  const isEdit = !!existing;
  const apps = getEnabledApps();
  const isApp = isEdit && isCustomScheme(existing.url);
  const hasApps = appLinksConfig.enabled && apps.length > 0;

  // Try to match existing URL to an enabled preset so the form pre-fills correctly
  let matchedAppIndex = -1;
  let existingPath = '';
  if (isApp && hasApps) {
    apps.forEach((app, i) => {
      if (existing.url.startsWith(app.scheme)) {
        matchedAppIndex = i;
        let path = existing.url.slice(app.scheme.length);
        if (app.usesBasePath && appLinksConfig.basePath && path.startsWith(appLinksConfig.basePath)) {
          path = path.slice(appLinksConfig.basePath.length);
        }
        existingPath = path;
      }
    });
  }

  showModal(`
    <div class="modal-title">${isEdit ? 'Edit' : 'Add'} ${type === 'featured' ? 'Featured ' : ''}Link</div>
    ${hasApps ? `<div class="modal-field">
      <label>Type</label>
      <div class="modal-toggle" id="mTypeToggle">
        <button class="toggle-btn ${!isApp ? 'active' : ''}" data-type="web">Web</button>
        <button class="toggle-btn ${isApp ? 'active' : ''}" data-type="app">App</button>
      </div>
    </div>` : ''}
    <div class="modal-field">
      <label>Title</label>
      <input type="text" id="mLTitle" value="${isEdit ? escapeHtml(existing.title) : ''}" placeholder="Link title">
    </div>
    <div id="mWebFields" class="modal-field" ${isApp ? 'style="display:none"' : ''}>
      <label>URL</label>
      <input type="text" id="mLUrl" value="${isEdit && !isApp ? escapeHtml(existing.url) : ''}" placeholder="https://example.com">
    </div>
    ${hasApps ? `<div id="mAppFields" ${!isApp ? 'style="display:none"' : ''}>
      <div class="modal-field">
        <label>App</label>
        <select id="mAppSelect">
          ${apps.map((a, i) => `<option value="${i}" ${i === matchedAppIndex ? 'selected' : ''}>${escapeHtml(a.name)}</option>`).join('')}
        </select>
      </div>
      <div class="modal-field">
        <label>Path ${(() => {
          const idx = matchedAppIndex >= 0 ? matchedAppIndex : 0;
          const a = apps[idx];
          return a && a.usesBasePath && appLinksConfig.basePath ? `<span class="terminal-path-hint">${appLinksConfig.basePath}</span>` : '';
        })()}</label>
        <input type="text" id="mAppPath" value="${escapeHtml(existingPath)}" placeholder="project/folder">
      </div>
    </div>` : ''}
    <div class="modal-buttons">
      <button class="modal-btn" id="mCancel">Cancel</button>
      <button class="modal-btn primary" id="mSave">Save</button>
    </div>
  `);

  // Toggle between web and app
  $modal.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $modal.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isAppMode = btn.dataset.type === 'app';
      $modal.querySelector('#mWebFields').style.display = isAppMode ? 'none' : '';
      const appFields = $modal.querySelector('#mAppFields');
      if (appFields) appFields.style.display = isAppMode ? '' : 'none';
    });
  });

  // Update path hint when app selection changes
  const appSelect = $modal.querySelector('#mAppSelect');
  if (appSelect) {
    appSelect.addEventListener('change', () => {
      const app = apps[parseInt(appSelect.value)];
      const label = $modal.querySelector('#mAppFields label');
      if (label && app) {
        const hint = app.usesBasePath && appLinksConfig.basePath ? appLinksConfig.basePath : '';
        label.innerHTML = `Path ${hint ? `<span class="terminal-path-hint">${hint}</span>` : ''}`;
      }
    });
  }

  $modal.querySelector('#mCancel').addEventListener('click', closeModal);
  $modal.querySelector('#mSave').addEventListener('click', async () => {
    const title = $modal.querySelector('#mLTitle').value.trim();
    const activeToggle = $modal.querySelector('#mTypeToggle .toggle-btn.active');
    const isAppMode = activeToggle ? activeToggle.dataset.type === 'app' : false;
    let url;
    if (isAppMode) {
      const appIndex = parseInt($modal.querySelector('#mAppSelect').value);
      const app = apps[appIndex];
      const path = $modal.querySelector('#mAppPath').value.trim();
      if (!title || !app) return;
      const basePath = app.usesBasePath ? appLinksConfig.basePath : '';
      url = app.scheme + basePath + path;
    } else {
      url = $modal.querySelector('#mLUrl').value.trim();
      if (!title || !url) return;
    }

    const space = getActiveSpace();

    if (isEdit) {
      existing.title = title;
      existing.url = normalizeUrl(url);
    } else if (type === 'featured') {
      space.featured.push({ id: generateId('f'), title, url: normalizeUrl(url) });
    } else {
      const group = space.groups.find(g => g.id === groupId);
      if (group) {
        group.links.push({ id: generateId('l'), title, url: normalizeUrl(url) });
      }
    }
    await saveState();
    closeModal();
    render();
  });

  $modal.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') $modal.querySelector('#mSave').click();
    });
  });
}

// ── Master Password Modal ──

// ── Notes Modal ──

/** Escapes HTML entities by leveraging the browser's textContent -> innerHTML conversion. */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Shows a modal for adding/editing freeform notes and optional login credentials for a link. */
function showNotesModal(link, type, groupId) {
  showModal(`
    <div class="modal-title">Link Notes — ${escapeHtml(link.title)}</div>
    <div class="modal-field">
      <textarea id="mNotes" rows="4" placeholder="Add notes about this site...">${escapeHtml(link.notes || '')}</textarea>
    </div>
    <div class="modal-field">
      <label>Login (optional)</label>
      <div class="credential-row">
        <input type="text" id="mLoginUser" value="${escapeHtml(link.loginUser || '')}" placeholder="Username or email">
        <button class="credential-copy-btn" id="mCopyUser" title="Copy">${createLucideIcon('copy', 14).outerHTML}</button>
      </div>
    </div>
    <div class="modal-field">
      <div class="credential-row">
        <input type="password" id="mLoginPass" value="${escapeHtml(link.loginPass || '')}" placeholder="Password">
        <button class="credential-copy-btn" id="mTogglePass" title="Show/hide">${createLucideIcon('eye', 14).outerHTML}</button>
        <button class="credential-copy-btn" id="mCopyPass" title="Copy">${createLucideIcon('copy', 14).outerHTML}</button>
      </div>
    </div>
    <div class="modal-buttons">
      <button class="modal-btn" id="mCancel">Cancel</button>
      <button class="modal-btn primary" id="mSave">Save</button>
    </div>
  `);

  $modal.querySelector('#mCopyUser').addEventListener('click', () => {
    navigator.clipboard.writeText($modal.querySelector('#mLoginUser').value);
  });
  $modal.querySelector('#mCopyPass').addEventListener('click', () => {
    navigator.clipboard.writeText($modal.querySelector('#mLoginPass').value);
  });
  $modal.querySelector('#mTogglePass').addEventListener('click', () => {
    const input = $modal.querySelector('#mLoginPass');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  $modal.querySelector('#mCancel').addEventListener('click', closeModal);
  $modal.querySelector('#mSave').addEventListener('click', async () => {
    link.notes = $modal.querySelector('#mNotes').value;
    link.loginUser = $modal.querySelector('#mLoginUser').value.trim();
    link.loginPass = $modal.querySelector('#mLoginPass').value;
    await saveState();
    closeModal();
    render();
  });
}


// ── Init ──

/** Entry point: loads persisted data, applies theme, renders UI, and registers keyboard shortcuts. */
async function init() {
  await loadState();
  await loadFeatures();
  await loadFocusTimerState();
  applyTheme();
  render();

  // Global keyboard shortcuts — ignored when focus is in form fields
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    // 1-9: switch spaces
    if (e.key >= '1' && e.key <= '9' && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const idx = parseInt(e.key) - 1;
      if (idx < state.spaces.length) {
        currentView = 'spaces';
        switchSpace(state.spaces[idx].id);
        e.preventDefault();
      }
      return;
    }

    switch (e.key.toLowerCase()) {
      case 't':
        if (!features.activity) break;
        currentView = currentView === 'activity' ? 'spaces' : 'activity';
        if (currentView === 'activity') activityDate = new Date().toISOString().slice(0, 10);
        render();
        e.preventDefault();
        break;
      case 'n':
        if (!features.notepad) break;
        currentView = currentView === 'notepad' ? 'spaces' : 'notepad';
        if (currentView === 'notepad') notepadDate = new Date().toISOString().slice(0, 10);
        render();
        e.preventDefault();
        break;
      case 'c':
        if (!features.calendar) break;
        currentView = currentView === 'calendar' ? 'spaces' : 'calendar';
        if (currentView === 'calendar') calendarDate = new Date().toISOString().slice(0, 10);
        render();
        e.preventDefault();
        break;
      case 'escape':
        if (currentView !== 'spaces') {
          currentView = 'spaces';
          render();
          e.preventDefault();
        }
        break;
      case 'f':
        // F key: toggle timer — stop if running, start 25min if idle, reset if paused
        if (currentView === 'activity') {
          if (focusTimer.running) { stopFocusTimer(); } else if (focusTimer.elapsed === 0) { startFocusTimer(25 * 60); } else { resetFocusTimer(); }
          renderActivityView();
          e.preventDefault();
        }
        break;
    }
  });
}

init();
