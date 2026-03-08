// Offscreen document — handles microphone recording via getUserMedia.
// The side panel cannot show permission dialogs, so all mic work happens here.
// Messages arrive from the background service worker with target: 'offscreen'.

let micStream = null;
let mediaRecorder = null;
let audioChunks = [];

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
  mediaRecorder = new MediaRecorder(micStream, { mimeType: 'audio/webm' });
  audioChunks = [];
  mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
  mediaRecorder.start();
  return { ok: true };
}

async function stopRecording() {
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
