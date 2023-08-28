
import {MdRemoveRedEye} from "react-icons/md"
function HomeworkCard({homework,index,draggable}){
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", index.toString());
    };
    return(
        <div className="w-full bg-grey rounded-md flex flex-row justify-between items-center"   draggable={draggable}
        onDragStart={handleDragStart}>
        <div className="flex flex-row gap-2">
            <p className="text-lg">{homework.priority}.</p>
            <p className="text-base">{homework.name}</p>
        </div>
            <MdRemoveRedEye className=" w-8 h-8"/>
        </div>
    )
}

export default HomeworkCard