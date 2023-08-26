/*global chrome*/
import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
function Settings() {
    const [isHardMode, setIsHardMode] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        chrome.storage.local.get(["hardmode"]).then((result) => {
            setIsHardMode(result.hardmode || false); // Use result.hardmode
        });
    }, []); // Run this effect only once on component mount

    useEffect(() => {
        chrome.storage.local.set({ "hardmode": isHardMode });
    }, [isHardMode]); // Run this effect whenever isHardMode changes

    return (
        <div className="bg-black h-96">
            <MdKeyboardBackspace className="w-8 h-8"  color="white" onClick={() => navigate(-1)}/>
            <div className="flex flex-row gap-2 justify-center items-center bg-gray-200 rounded-md p-2">
                <div
                    className={`flex w-10 h-5 ${
                        isHardMode
                            ? "bg-schoolblue"
                            : "bg-gray-600"
                    } rounded-full m-5`}
                    onClick={() => setIsHardMode((prevMode) => !prevMode)}
                >
                    <span
                        className={`w-5 h-5 rounded-full bg-white transition-all duration-500 shadow-lg ${
                            isHardMode ? "ml-5" : ""
                        }`}
                    ></span>
                </div>
                <div className="text-black flex flex-col">
                    <p className="text-lg">Hard Mode</p>
                    <p className="text-base">
                        Have less break time and more work time.
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default Settings;
