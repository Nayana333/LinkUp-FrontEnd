import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { View } from "lucide-react";
import {viewJob} from '../../services/api/user/apiMethods'
import './ViewJob.css'




const ViewJob = () => {

    const selectuser=(state:any)=>state.auth.user
    const user=useSelector(selectuser)
    const userId=user._id;
    const {jobId}=useParams()
    const [job,setJob]=useState<any>({})
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
        viewJob({jobId:jobId})
        .then((response:any)=>{
            setJob(response.data.job)
        }).catch((error:any)=>{
            toast.error(error.message)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])




return (

    <div>

      {!loading&&(

            <div className="home-post-section bg-white p-9 py-10" id='home-post'>
            <div className="w-full flex justify-between items-center">
              <div className="flex">
                <div className="w-14 h-14 rounded-md bg-green-600 flex items-center justify-center font-bold text-white text-2xl">
                {job?.jobRole?.slice(0,1)}
                  

                </div>
              
                <div className="mx-5">
                  <p className="text-sm">{job.companyName}</p>
                  <p className="text-sm font-bold">{job.jobRole}</p>
                </div>
              </div>
  
            </div>
            <div className="mt-10">
              <p className="text-sm mb-3 font-bold">Job Overview</p>
              <p className="text-xs">{job.jobDescription}</p>
            </div>
            <div className="mt-10">
              <p className="text-sm mb-3 font-bold">Skills Required</p>
              <div className="flex">
                <p className="text-xs">{job.requiredSkills}</p>
              </div>
            </div>
            <div className="mt-10">
              <p className="text-sm mb-3 font-bold">Job Details</p>
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-xs font-semibold">Location</p>
                  <p className="text-xs">{job.jobLocation}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Salary</p>
                  <p className="text-xs">{job.salary}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Job Type</p>
                  <p className="text-xs">{job.jobType}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Experience</p>
                  <p className="text-xs">{job.experience} years</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Qualifications</p>
                  <p className="text-xs">{job.qualification}</p>
                </div>
              </div>
            </div>
  


          </div>



      )}



    </div>

  );
}
export default ViewJob