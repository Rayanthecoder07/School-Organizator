/*global chrome*/
import { useContext, useEffect, useState } from "react";
import { HomeworkContext } from "../../Data/HomeworkContext";
import {HiOutlineDocumentAdd} from "react-icons/hi"
import {MdDelete} from "react-icons/md"
function CreateHomework() {
    
    const { homeworkList, setHomeworkList } = useContext(HomeworkContext);
    const [isSaved, setIsSaved] = useState(false);

    const createHomework = () => {
        setHomeworkList([...homeworkList, { subject: "", resources: ["", "", ""], name: "", priority: 0 }]);
    };

    const canSave = () => {
        for (const homework of homeworkList) {
            if (homework.name.trim() === "") {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {

    }, [homeworkList])

    useEffect(() => {
        if (isSaved && homeworkList.length > 0 && canSave()) {
            // Save the homeworkList to Chrome storage
            chrome.storage.sync.set({ "homeworkList": homeworkList }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Error saving data: ", chrome.runtime.lastError);
                    alert("saved")
                } else {
                    alert("Successfully saved data");
                }
            });
        }

        if(canSave() == false){
            alert("please provide a name")
        }
    }, [isSaved]);

    const deleteHomework = (index, homework) => {
        const updatedHomeworkList = homeworkList.filter((_, i) => i !== index);
        setHomeworkList(updatedHomeworkList);
        alert("Successfully deleted homework");
    };

    return (
        <div className="text-white flex flex-col items-center bg-black h-96">
            <div className="flex flex-row gap-2 items-center">
                <p className="text-xl">Add Homework</p>
                <HiOutlineDocumentAdd onClick={() => createHomework()} className="w-6 h-6"/>
            </div>

            <div className="flex flex-col gap-2 p-2 bg-black overflow-y-auto  scrollbar-thin scrollbar-thumb-schoolblue scrollbar-thumb-rounded-md">
                {homeworkList.map((homework, index) => {
                    return (
                        <div key={index} className="w-full rounded-md bg-gray-200 h-36 text-black flex flex-col gap-2">
                        <div className="flex flex-row items-center justify-end ">
                        <MdDelete onClick={() => deleteHomework(index, homework)} className="w-6 h-6"/>
                        </div>
                        <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2 ">
                                    <p className="text-lg">subject</p>
                                    <select className="text-base" onChange={(e) => homeworkList[index].subject = e.target.value}>
                                        <option>Select Subject</option>
                                        <option>➗ Mathematics</option>
                                        <option>🧪 Chemistry</option>
                                        <option>⌛ History</option>
                                        <option>🫂 Ethics</option>
                                        <option>✍️ English</option>
                                        <option>💬 Languages</option>
                                        <option>⚛️ Physics</option>
                                        <option>🗺️ Geography</option>
                                        <option>🔭 Science</option>
                                    </select>
                                </div>
                                <div className="flex flex-row gap-2 ">
                                    <p className="text-lg">name</p>
                                    <input placeholder="name of homework" onChange={(e) => homeworkList[index].name = e.target.value}/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 overflow-y-auto">
                                <p className="text-base">resources</p>
                                <input placeholder="ex: docs.google.com"  onChange={(e) => homeworkList[index].resources[0] = e.target.value}/>
                                <input placeholder="ex: slides.google.com" onChange={(e) => homeworkList[index].resources[0] = e.target.value}/>
                                <input placeholder="ex: classroom.google.com" onChange={(e) => homeworkList[index].resources[0] = e.target.value}/>
                            </div>
                        </div>
                           
                        </div>
                    );
                })}
            </div>
            <button className="bg-red-500 rounded-md text-lg" onClick={() => setIsSaved(true)}>save</button>
        </div>
    );
}

export default CreateHomework;
