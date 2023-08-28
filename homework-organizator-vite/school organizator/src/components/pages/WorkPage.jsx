/*global chrome*/
import { HomeworkContext } from "../../Data/HomeworkContext";
import React, { useContext, useEffect, useState } from "react";
import {BiCheck} from "react-icons/bi"
import {FaEye} from "react-icons/fa"
function WorkPage() {
  const { homeworkList } = useContext(HomeworkContext);

  const [timerStatus, setTimerStatus] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [hasStarted, setHasStarted] = useState(false)
  const [seeContent, setSeeContent] = useState({})


  //show that you have started
  //now it works check miro
  useEffect(() => {
    // Request initial timer data from background.js
    chrome.runtime.sendMessage({ status: "get_time" });

    // Listening for messages from background.js
    chrome.runtime.onMessage.addListener((message) => {
 
        setTimerStatus(message.isWorking ? "Work Time" : "Break Time");
        console.log("hi!")
        setFormattedTime(message.formattedTime);
    
      return true;
    });
  }, []);

  // Function to start the timer
  const startTimer = () => {
    // Send a message to background.js to start the timer
    chrome.runtime.sendMessage({ status: "start_time" });
  };
  console.log(formattedTime)
  
  console.log("timer status :" + timerStatus)

  const completeHomework = (index) => {
    homeworkList[index].completed = true
    alert(`completed ${homeworkList[index].name}`)
  }

  const specificHomework = (index) => {
    setSeeContent(homeworkList[index])
  }
  return (
    <div className="bg-black h-96 w-full ">

      <div className="w-full">
      <div className="flex flex-col justify-center items-center">
      <p className="text-2xl text-white">{timerStatus}</p>
      <p className={timerStatus === "Work Time" ? "text-3xl text-white" : "text-3xl text-schoolblue"}>
        {formattedTime}
      </p>
      {timerStatus == "" && (
        <button onClick={startTimer} className="p-2 bg-schoolblue rounded-md text-base">Start Timer</button>
      )}
      </div>

      

      <div className="w-full flex flex-col gap-2 p-2">
        {homeworkList.sort((h1, h2) => h1.priority - h2.priority).map((homework, index) => (
          <div className="bg-gray-200 rounded-md w-full flex flex-row justify-between items-center" key={homework.priority}>
          <div className="flex flex-col">
          <p className="text-base">{homework.priority}</p>
            <p className="text-base">{homework.name}</p>
          </div>
           
            <BiCheck className="w-6 h-6 cursor-pointer" color="#1BA8F0" onClick={() => completeHomework(index)} />
            <FaEye className="w-6 h-6 cursor-pointer" color="#1BA8F0" onClick={() => specificHomework(index)} />
          </div>
        ))}
      </div>
      </div>
    

    </div>

  );
}

export default WorkPage;
