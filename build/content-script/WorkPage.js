/*global chrome*/
import React, { useContext, useEffect, useState } from "react";


function WorkPage() {


  const [timerStatus, setTimerStatus] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    // Delayed sending of initial message when background script is ready
    chrome.runtime.onConnect.addListener((port) => {
      if (port.name === "timerConnection") {
        // Request initial timer data from background.js
        port.postMessage({ status: "get_time" });

        // Listening for messages from background.js
        port.onMessage.addListener((message) => {
          if (message.status === "time_update") {
            setTimerStatus(message.isWorking ? "Work Time" : "Break Time");
            setFormattedTime(message.formattedTime);
          }
        });
      }
    });
  }, []);

  // Function to start the timer
  const startTimer = () => {
    // Send a message to background.js to start the timer
    chrome.runtime.sendMessage({ status: "start_time" });
    // Send a greeting message to background.js
chrome.runtime.sendMessage({ greeting: "Hi from Workpage.js" });

  };
  
  return (
    <div className="bg-black h-96">
      <p className="text-2xl text-white">{timerStatus}</p>
      <p className={timerStatus === "Work Time" ? "text-2xl text-white" : "text-2xl text-schoolblue"}>
        {formattedTime}
      </p>

      {/* Button to start the timer */}
      <button onClick={startTimer}>Start Timer</button>

 
    </div>
  );
}

export default WorkPage;
