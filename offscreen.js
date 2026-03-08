// Offscreen document — handles microphone recording via getUserMedia.
// The side panel cannot show permission dialogs, so all mic work happens here.
// Messages arrive from the background service worker with target: 'offscreen'.

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
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  audioChunks = [];
  mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
  mediaRecorder.start();
  return { ok: true };
}

async function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    return { error: 'not-recording' };
  }

  return new Promise((resolve) => {
    mediaRecorder.onstop = async () => {
      mediaRecorder.stream.getTracks().forEach(t => t.stop());

      if (audioChunks.length === 0) {
        resolve({ ok: true, audioB64: null });
        return;
      }

      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = [];

      // Convert blob to base64 data URL so it can be sent via message
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ ok: true, audioB64: reader.result });
      };
      reader.readAsDataURL(blob);
    };
    mediaRecorder.stop();
  });
}
