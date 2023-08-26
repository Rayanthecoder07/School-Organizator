console.log("Background script is running");
chrome.runtime.onInstalled.addListener(() => {
   console.log("hi!")
  });
let isWorking = true;
let intervalIndex = 0;
let remainingTime = 0;
let intervals = [];

function startTimer() {
  updateTimerDisplay();

  const timerInterval = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      intervalIndex = (intervalIndex + 1) % intervals.length;
      isWorking = !isWorking;
      remainingTime = intervals[intervalIndex];

      updateTimerDisplay();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const formattedTime = formatTime(remainingTime);
  const status = isWorking ? "Work Time" : "Break Time";

  // Send a message to the content script (WorkPage.js) with the updated time and status
  chrome.runtime.sendMessage({ status, formattedTime });
}

function formatTime(seconds) {
  const formattedMinutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

// Listen for messages from the content script (WorkPage.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === "start_time") {
    // Handle the request to start the timer here
    chrome.storage.local.get(["currentSession"], (result) => {
      const session = result.currentSession;

      if (session && session.timeConfiguration) {
        const { workMin, breakTotalMin, numBreaks } = session.timeConfiguration;

        const workIntervalDuration = Math.floor(workMin / (numBreaks + 1));
        const breakIntervalDuration = Math.floor(breakTotalMin / numBreaks);

        for (let i = 0; i < numBreaks; i++) {
          intervals.push(workIntervalDuration * 60, breakIntervalDuration * 60);
        }
        intervals.push(workIntervalDuration * 60);

        remainingTime = intervals[0];
        startTimer();
      }
    });
  }
  console.log(message.greeting)
});
