let session = {};
let intervalIndex = 0;
let remainingTime = 0;
let isWorking = true; // Start with work interval

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.status === "start") {
      startCountdown();
    }
  });
});

chrome.storage.local.get(["currentSession"], (result) => {
  session = result.currentSession;

  if (session && session.timeConfiguration) {
    const { workMin, breakTotalMin, numBreaks } = session.timeConfiguration;

    const workIntervalDuration = Math.floor(workMin / (numBreaks + 1));
    const breakIntervalDuration = Math.floor(breakTotalMin / numBreaks);

    const intervals = [];
    for (let i = 0; i < numBreaks; i++) {
      intervals.push(workIntervalDuration, breakIntervalDuration);
    }
    intervals.push(workIntervalDuration);

    remainingTime = intervals[intervalIndex] * 60;

    function startCountdown() {
      isWorking = true; // Start with work interval
      remainingTime = intervals[intervalIndex] * 60;
      sendTimeToContent();
      updateCountdown();
    }

    function updateCountdown() {
      if (remainingTime <= 0) {
        intervalIndex = (intervalIndex + 1) % intervals.length;
        isWorking = !isWorking;
        remainingTime = intervals[intervalIndex] * 60;
        sendTimeToContent();
      } else {
        remainingTime--;
        sendTimeToContent();
      }

      setTimeout(updateCountdown, 1000);
    }

    function sendTimeToContent() {
      const formattedTime = formatTime(remainingTime);
      chrome.runtime.sendMessage({ status: "time update", time: formattedTime, isWorking });
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
      return { minutes: formattedMinutes, seconds: formattedSeconds };
    }
  }
});
