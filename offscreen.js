// Offscreen document — handles microphone recording via getUserMedia.
// The side panel cannot show permission dialogs, so all mic work happens here.
// Messages arrive from the background service worker with target: 'offscreen'.
// Supports chunked recording: every CHUNK_INTERVAL_MS, the current audio is
// sent for transcription while recording continues seamlessly.

const CHUNK_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

let micStream = null;
let mediaRecorder = null;
let audioChunks = [];
let chunkTimer = null;

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.target !== 'offscreen') return;

  if (msg.action === 'start') {
    startRecording().then(sendResponse).catch(err => sendResponse({ error: err.message }));
    return true;
  }

  if (msg.action === 'stop') {
    stopRecording().then(sendResponse).catch(err => sendResponse({ error: err.message }));
    return true;
  }
});

async function startRecording() {
  micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  beginRecorder();
  // Start chunk timer — periodically harvest audio and send for transcription
  chunkTimer = setInterval(() => rotateChunk(), CHUNK_INTERVAL_MS);
  return { ok: true };
}

/** Creates a new MediaRecorder on the existing mic stream. */
function beginRecorder() {
  mediaRecorder = new MediaRecorder(micStream, { mimeType: 'audio/webm' });
  audioChunks = [];
  mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
  mediaRecorder.start();
}

/** Stops the current recorder, sends its audio as a chunk, and starts a new recorder. */
function rotateChunk() {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

  // Stop current recorder to finalize the audio data
  mediaRecorder.onstop = async () => {
    if (audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioB64 = await blobToDataURL(blob);
      // Send chunk to background for transcription (fire-and-forget)
      chrome.runtime.sendMessage({ type: 'audio-chunk-ready', audioB64 });
    }
    // Start a fresh recorder on the same mic stream
    beginRecorder();
  };
  mediaRecorder.stop();
}

/** Final stop — sends the last chunk and releases the mic. */
async function stopRecording() {
  clearInterval(chunkTimer);
  chunkTimer = null;

  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    releaseMic();
    return { error: 'not-recording' };
  }

  return new Promise((resolve) => {
    mediaRecorder.onstop = async () => {
      releaseMic();

      if (audioChunks.length === 0) {
        resolve({ ok: true, audioB64: null });
        return;
      }

      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = [];
      const audioB64 = await blobToDataURL(blob);
      resolve({ ok: true, audioB64 });
    };
    mediaRecorder.stop();
  });
}

function releaseMic() {
  if (micStream) {
    micStream.getTracks().forEach(t => t.stop());
    micStream = null;
  }
}

function blobToDataURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
