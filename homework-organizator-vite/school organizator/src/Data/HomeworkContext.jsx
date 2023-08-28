/*global chrome*/
import { createContext, useEffect, useState } from "react";

export const HomeworkContext = createContext({});

const HomeworkProvider = ({ children }) => { // Use 'const' to define HomeworkProvider
    const [currentStep, setCurrentStep] = useState(1);
    const [homeworkList, setHomeworkList] = useState([]);
    const [errorCode, setErrorCode] = useState(0)
    const [timeConfig, setTimeConfig] = useState({})
    const [currHomeworkSession, setCurrHomeworkSession] = useState(0)
    
    const [easyTime,setEasyTime] = useState([
        {workMin:6,breakTotalMin:3, numBreaks:1}, // should be 30 minutes
        {workMin:60,breakTotalMin:10, numBreaks:2},
        {workMin:90,breakTotalMin:20, numBreaks:2},
        {workMin:120,breakTotalMin:30, numBreaks:3},
    ])

    const [hardTime,setHardTime] = useState([
        {workMin:30,breakTotalMin:0, numBreaks:0},
        {workMin:60,breakTotalMin:10, numBreaks:1},
        {workMin:90,breakTotalMin:20, numBreaks:2},
        {workMin:120,breakTotalMin:20, numBreaks:2},
    ])



    return (<HomeworkContext.Provider value={{ currentStep, setCurrentStep, homeworkList, setHomeworkList,errorCode,setErrorCode,easyTime,setEasyTime, setHardTime, hardTime,timeConfig, setTimeConfig, currHomeworkSession, setCurrHomeworkSession}}>
        {children}
    </HomeworkContext.Provider>)
};

export default HomeworkProvider; // Export HomeworkProvider
