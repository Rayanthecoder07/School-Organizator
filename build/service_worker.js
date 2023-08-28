console.log("Background script is running");
chrome.runtime.onInstalled.addListener(() => {
    console.log("it works!")
    return true;
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
  
      if (intervalIndex === intervals.length - 1) {
        // Last interval, send a notification for finishing the work session
        chrome.notifications.create({
          title: "Work Session Finished",
          message: "Congratulations! You've completed your work session.",
          iconUrl: "/images/48.png",
          type: "basic"
        });
      } else {
        if (!isWorking) {
          // Notify that work session has finished
          chrome.notifications.create({
            title: "Work Session Finished",
            message: "You finished your work session, take a break!",
            iconUrl: "/images/48.png",
            type: "basic"
          });
        } else {
          // Notify that break is over and it's time to work again
          chrome.notifications.create({
            title: "Break Time's Over",
            message: "Time to get back to work!",
            iconUrl: "/images/48.png",     
            type: "basic"
          });
        }
      }
  
      remainingTime = intervals[intervalIndex];
      updateTimerDisplay();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}
// Inside your updateTimerDisplay() function in background.js
function updateTimerDisplay() {
    const formattedTime = formatTime(remainingTime);
    const status = isWorking ? "Work Time" : "Break Time";
    const formattedMinutes = formattedTime.split(":")[0];
    chrome.action.setBadgeText({ text: formattedMinutes });
    chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    // Send a message to the content script of the current tab
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
    console.log("timer started")
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
  return true;

});
