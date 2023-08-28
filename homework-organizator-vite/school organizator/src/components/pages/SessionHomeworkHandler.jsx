/*global chrome*/
import { useState,useContext, useEffect } from "react"
import CreateHomework from "./CreateHomework"
import PriorityHomework from "./PriorityHomework"
import TimeChoose from "./TimeChoose"
import {HomeworkContext} from "../../Data/HomeworkContext"
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from "react-router-dom"
function SessionHomeworkHandler(){
    const {currentStep, setCurrentStep,homeworkList, errorCode, timeConfig} = useContext(HomeworkContext)
    const [maxSteps, setMaxSteps] = useState(3)
    const [homeWorkSessions, setHomeWorkSessions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentStep(1)
        chrome.storage.local.get(["homeWorkSessions"]).then((result) => {
            
            setHomeWorkSessions(result.homeWorkSessions || []); // Use result.hardmode
        });
    },[])
    const nextStep = () => {
        if (currentStep < maxSteps && errorCode == 0) {
            setCurrentStep(currentStep + 1);

        
        
            
        }

        if (currentStep === maxSteps) {
            chrome.storage.local.set({ "homeWorkSessions": [...homeWorkSessions, {homeworks:homeworkList, timeConfiguration:timeConfig}] }).then(() => alert("succesfully saved"));
            chrome.storage.local.set({ "currentSession":  {homeworks:homeworkList, timeConfiguration:timeConfig}})
            navigate("/work")
        }
    };
    return(
        <div className="bg-black w-full">
            <MdKeyboardBackspace className="w-8 h-8"  color="white" onClick={() => navigate(-1)}/>
            {currentStep == 1 && (
                <CreateHomework/>
            )}
            {currentStep == 2 && (
                <PriorityHomework/>
            )}
            {currentStep == 3 && (
                <TimeChoose/>
            )}
            <button onClick={() => nextStep()} className="bg-schoolblue rounded-md text-base">next</button>
        </div>
    )
}

export default SessionHomeworkHandler