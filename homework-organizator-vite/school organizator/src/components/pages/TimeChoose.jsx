/*global chrome*/
import { useContext, useEffect, useState } from "react";
import { HomeworkContext } from "../../Data/HomeworkContext";
import { RiRestTimeLine } from "react-icons/ri";
import { GiWeightLiftingUp } from "react-icons/gi";

function TimeChoose() {
  const { easyTime, hardTime, timeConfig, setTimeConfig, errorCode,setErrorCode } = useContext(
    HomeworkContext
  );
  const [isHardMode, setIsHardMode] = useState(false);
  const [timeArray, setTimeArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null); // Track clicked div index

    selectedTimeIndex == null ? setErrorCode(1) : setErrorCode(0)

  const handleTimeConfig = (timeConfig, index) => {
    console.log(`time config is: `)
    console.log(timeConfig)
    setSelectedTimeIndex(index); // Update clicked div index
    setTimeConfig(timeConfig);
  };

  useEffect(() => {
    chrome.storage.local.get(["hardmode"]).then((result) => {
      setIsHardMode(result.hardmode || false);
    });

    const selectedTimeArray = isHardMode ? hardTime : easyTime;
    setTimeArray(selectedTimeArray);
  }, [isHardMode]);

  return (
    <div className="h-96 bg-black">
      <p className="text-white text-lg text-center">
        Configure your working time
      </p>
      <div className="grid grid-cols-2 gap-2 p-2 relative ">
        {timeArray.map((time, index) => (
          <div
            key={index}
            className={`relative rounded-md bg-gray-200 p-2 ${
              index === selectedTimeIndex ? "bg-schoolblue" : ""
            }`}
            onClick={() => handleTimeConfig(time, index)}
          >
    
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg text-black">{time.workMin} minutes</p>
              <GiWeightLiftingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg text-black">
                {time.breakTotalMin === 0
                  ? ""
                  : `${time.numBreaks} x ${
                      time.breakTotalMin === 0
                        ? "no breaks"
                        : time.breakTotalMin / time.numBreaks
                    }`}
              </p>
              <RiRestTimeLine className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
      {errorCode == 1 && (
        <p className="text-base text-red-500"> Choose a time configuration</p>
      )}
    </div>
  );
}

export default TimeChoose;
