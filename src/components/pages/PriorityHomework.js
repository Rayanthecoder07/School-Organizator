import React, { useContext, useEffect, useState } from "react";
import HomeworkProvider, { HomeworkContext } from "../../Data/HomeworkContext";
import HomeworkCard from "../HomeworkCard";
import "../../styles.css";

function PriorityHomework() {
    const { homeworkList, setHomeworkList } = useContext(HomeworkContext);
    const {errorCode, setErrorCode} = useContext(HomeworkContext)

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index.toString());
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();

        const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
        const updatedHomeworkList = [...homeworkList];
        const movedHomework = updatedHomeworkList.splice(sourceIndex, 1)[0];

        // Reorder the homework
        updatedHomeworkList.splice(targetIndex, 0, movedHomework);

        // Update priorities based on new order
        updatedHomeworkList.forEach((homework, index) => {
            homework.priority = index + 1;
        });

        setHomeworkList(updatedHomeworkList);
    };

    // Check for priority value and set error code if necessary
    useEffect(() => {
        const hasPriorityError = homeworkList.some(homework => homework.priority === 0);
        if (hasPriorityError) {
            setErrorCode(1);
        } else {
            setErrorCode(0);
        }
    }, [homeworkList]);
    

    return (
        <div>
            <p className="text-center text-lg text-white">Hold and Drag to set your homework priority</p>
            <div className="w-full h-96 flex flex-col gap-2">
                {homeworkList.map((homework, index) => (
                    <div
                        key={homework.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <HomeworkCard homework={homework} />
                    </div>
                ))}
                {errorCode == 1 && (
                    <p className="text-base text-red-500">You need to set priorities for your homework.</p>
                )} 
            </div>
        </div>
    );
}

export default PriorityHomework;
