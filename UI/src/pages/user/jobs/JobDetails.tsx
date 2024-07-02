import { useEffect } from "react";
import { Outlet,useLocation,useNavigate, useParams } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import { ChevronLeft } from 'lucide-react';
import './JobDetails.css'


function JobDetails(){
    const selectuser=(state:any)=>state.auth.user
    const user=useSelector(selectuser)
    const navigate=useNavigate()
    const jobId=useParams()
    const location=useLocation()

    useEffect(()=>{
        if(user.isHiring===false){
            navigate('jobs/open-to-work-job-list')
        }
    },[user,navigate])


return (
    <div >
      <div className="people-section-2">
        <div className='flex w-full' id="main-div">
          <div className="border w-full profile-nav flex items-center justify-center gap-10 bg-white rounded-md mx-5"  id='nav'>
            <button
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === `/jobs/view-job/job-info/${jobId}` ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Job Info
            </button>
            <button
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 
              
              }`}
              type="submit"
            >
           Applications
            </button>
            <button
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 
              }`}
              type="submit"
            >
             Accepted
            </button>
            <button
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300               }`}
              type="submit"
            >
            Rejected
            </button>
            <button
              className={`text-xs font-medium text-gray-400 c hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 
              }`}
              type="submit"
            >
              Interviews
            </button>
            
          </div>
          

          <div  onClick={() => { navigate('/jobs/hiring/jobList') }} className= " border cursor-pointer text-xs text-gray-400 w-32 profile-nav flex items-center justify-center  bg-white rounded-md "> <ChevronLeft size={18}/> Go back</div>
   
        </div>

        <div className='home-scroll'>
          <div className='home-scrollbox'>
            
          <Outlet />

          </div>
        </div>
   
       
      </div>
    </div>
  );
}

export default JobDetails