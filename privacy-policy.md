# Snackbar Privacy Policy

**Last updated:** March 6, 2026

Snackbar is a browser sidebar extension built by Diviner (diviner.agency). Your privacy matters — here's exactly how Snackbar handles your data.

## What data Snackbar stores

Snackbar stores all of your data locally on your computer using Chrome's built-in storage. This includes:

- Workspaces, links, groups, and link notes
- Notes, todos, and daily notepad entries
- Time tracking and focus timer history
- Your settings and preferences

This data never leaves your browser unless you explicitly choose to sync it.

## Google Drive sync (optional)

If you choose to enable Google Drive sync, Snackbar stores a single encrypted backup file in your Google Drive's private app data folder. This data goes directly from your browser to your Google Drive account — it is never routed through or stored on any server we operate. You can disconnect Google Drive sync at any time.

## Google Calendar (optional)

If you choose to connect Google Calendar, Snackbar reads your calendar events in real-time to display them in the sidebar. Calendar data is only used for display and is never stored, logged, or transmitted anywhere.

## Voice transcription (optional)

If you choose to use voice transcription, Snackbar records audio from your microphone and sends it directly to the transcription provider you configure (Groq, OpenAI, or a custom endpoint you specify). Audio is transmitted directly from your browser to the provider's API — it never passes through any server we operate. Your API key is stored locally in the extension. We do not store, log, or retain any audio recordings or transcription results beyond what appears in your notepad.

## Nextcloud notes export (optional)

If you choose to export notes to a Nextcloud server, Snackbar sends your notes directly from your browser to your server via WebDAV. Your Nextcloud credentials (server URL, username, and app password) are stored locally in the extension and are never transmitted to us or any third party.

## What we don't do

- We do not operate any servers or databases
- We do not collect analytics or usage data
- We do not track your browsing activity outside of the time tracking feature you control
- We do not share, sell, or transmit your data to any third party
- We do not use cookies

## Time tracking

Snackbar's time tracking feature logs which websites you spend time on. This data is stored entirely on your computer and is only visible to you. You can export or delete it at any time.

## Permissions

Snackbar requests the following Chrome permissions:

- **sidePanel** — to display the sidebar
- **storage** — to save your data locally
- **activeTab / tabs** — to track time on your current site and open links
- **idle** — to pause time tracking when you're away
- **alarms** — to periodically save time tracking data
- **identity** — to authenticate with Google for Calendar and Drive sync (only when you choose to connect)
- **offscreen** — to access the microphone for voice transcription (only when you start a recording)

Snackbar may also request optional host permissions for specific API endpoints (e.g., your transcription provider or Nextcloud server). These are requested individually at the time you configure each service — never broadly.

## Changes to this policy

If this policy changes, the updated version will be posted at this URL with a new date.

## Contact

Questions or concerns? Reach out at diviner.agency/contact.
