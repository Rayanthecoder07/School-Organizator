import { useNavigate } from "react-router-dom"
import {MdOutlineSettingsSystemDaydream} from "react-icons/md"
function Home(){
    const navigate = useNavigate()
    return(
        <div className=" bg-black w-full">
             <div className="w-full h-96 text-white flex flex-col justify-between">
    <div className='h-1/6'>
    
    </div>
     

      <div className='flex flex-col justify-center items-center  h-5/6'>
      <div className='flex flex-col gap-2 justify-center items-center text-black w-full '>
        <button className= ' hover:bg-schoolblue bg-grey w-1/2 rounded-md  text-base  transition-colors duration-300 ease-in-out' onClick={() => navigate("/create-session")}>new homework session</button>
        <button className= ' hover:bg-schoolblue bg-grey w-1/2 rounded-md  text-base  transition-colors duration-300 ease-in-out' onClick={() => navigate("/sessions")}>my homework sessions</button>
        <button className=' hover:bg-schoolblue bg-grey w-1/2 rounded-md  text-base  transition-colors duration-300 ease-in-out flex flex-row gap-2 items-center justify-center' onClick={() => navigate("/settings")}> settings <MdOutlineSettingsSystemDaydream className="w-6 h-6"/></button>
      </div>
      </div>
    </div>
        </div>
    )
}

export default Home
