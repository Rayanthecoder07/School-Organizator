/*global chrome*/
import React, { useContext, useEffect } from "react";
import { HomeworkContext } from "../../Data/HomeworkContext";
import { useState } from "react";
function WorkPage() {
  const { timeConfig , homeworkList} = useContext(HomeworkContext);
  const { numBreaks } = timeConfig;

  const [formattedTime, setFormattedTime] = useState("");
  const [isWorking, setIsWorking] = useState(true);

  useEffect(() => {
    // Listening for messages from background.js
    chrome.runtime.onMessage.addListener((message) => {
      if (message.status === "time update") {
        setFormattedTime(message.time);
        setIsWorking(message.isWorking);
      }
    });
  }, []);

  const breakLabel = numBreaks > 1 ? "Break Time" : "Break Time";

  return (
    <div className="bg-black h-96">
      <p className="text-2xl text-white">{isWorking ? "Work Time" : breakLabel}</p>
      <p className={isWorking ? "text-2xl text-white" : "text-2xl text-schoolblue"}>{formattedTime}</p>

      <div>
        {homeworkList.sort((h1, h2) => h1.priority - h2.priority).map((homework) => (
          <div className="bg-gray-200 rounded-md w-full" key={homework.priority}>
            <p className="text-base">{homework.priority}</p>
            <p className="text-base">{homework.name}</p>
            <p className="text-base">{homework.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkPage;
