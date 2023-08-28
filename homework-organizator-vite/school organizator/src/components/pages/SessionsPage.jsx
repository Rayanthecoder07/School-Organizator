/*global chrome*/
import { useContext, useEffect, useState } from "react"
import {MdWork} from "react-icons/md"
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { HomeworkContext } from "../../Data/HomeworkContext";
function SessionsPage(){
    const navigate = useNavigate()
    const {setTimeConfig, setHomeworkList} = useContext(HomeworkContext)
    const [homeWorkSessions, setHomeWorkSessions] = useState([])
    useEffect(() => {
        chrome.storage.local.get(["homeWorkSessions"]).then((result) => {
            setHomeWorkSessions(result.homeWorkSessions || []); // Use result.hardmode
        });
    },[])

    const deleteHomeworkByIndex = (indexToDelete) => {
        // Retrieve the current data from synchronized storage
        chrome.storage.local.get(['homeWorkSessions'], function(result) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            const homeWorkSessions = result.homeWorkSessions || [];
      
            if (indexToDelete >= 0 && indexToDelete < homeWorkSessions.length) {
              // Modify the data (remove the homework object at the specified index)
              const newHomeWorkSessions = [...homeWorkSessions]; // Create a shallow copy
              newHomeWorkSessions.splice(indexToDelete, 1); // Remove the item at the specified index
      
              // Save the modified data back to synchronized storage
              chrome.storage.local.set({ 'homeWorkSessions': newHomeWorkSessions }, function() {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                } else {
                  console.log('Homework item removed successfully');
                  setHomeWorkSessions(newHomeWorkSessions); // Update your local state if needed
                }
              });
            } else {
              console.log('Invalid index');
            }
          }
        });
      };
      

    useEffect(() => {
        
    }, [homeWorkSessions])

    const openSession = (index) => {
        setTimeConfig(homeWorkSessions[index].timeConfiguration)
        setHomeworkList(homeWorkSessions[index].homeworks)
        chrome.storage.local.set({ "currentSession":  homeWorkSessions[index]})
        navigate("/work")
    }
      
    return(
        <div className="h-96 bg-black w-full ">
         <MdKeyboardBackspace className="w-8 h-8"  color="white" onClick={() => navigate(-1)}/>
         <div className="flex flex-col gap-2 justify-center items-center  overflow-y-auto  scrollbar-thin scrollbar-thumb-schoolblue scrollbar-thumb-rounded-md">
            {homeWorkSessions.map((session, index) => {
                console.log(session)
                return(
                    <div className="flex flex-row gap-2 justify-between items-center bg-gray-200 rounded-md p-2 w-full">
                    <div className="flex flex-row gap-2 items-center">
                    <MdWork className="w-8 h-8"/>
                    <div className="flex flex-col">
                    <p className="text-lg">Session {index + 1}</p>
                    <p className="text-base">work time: {session.timeConfiguration.workMin}</p>
                    <p className="text-base">break time: {session.timeConfiguration.breakTotalMin}</p>
                    </div>
                    
                    </div>
                    <div className="text-black flex flex-col">
                   
                    
                    
                    <button className="bg-red-500 rounded-md text-lg cursor-pointer" onClick={() => openSession(index)}>open</button>
                    <button className="bg-red-500 rounded-md text-lg cursor-pointer" onClick={() => deleteHomeworkByIndex(index)}>delete</button>
                </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default SessionsPage