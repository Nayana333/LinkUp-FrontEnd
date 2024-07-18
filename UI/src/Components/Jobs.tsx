
import { useEffect, useState } from "react";
import { Bookmark, Lock } from "lucide-react";
import { listJob, savePost } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { useFilterContext } from '../utils/context/JobFilterData/FilterContext';
import { toast } from "sonner";
import debounce from 'lodash/debounce';
import { updateUser } from "../utils/context/reducers/authSlice";
import PostSkeletonUi from "./SkeltonUi/PostSkeltonUi";
import ApplyJobForm from "./ApplyJobForm";
interface jobProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      profileImageUrl: string;
    };
    companyName: string;
    jobRole: string;
    jobDescription: string;
    requiredSkills: string;
    jobLocation: string;
    salary: string;
    jobType: string;
    experience: string;
    qualification: string;
  };
}

const Jobs = () => {
  const dispatch = useDispatch();
  const { filterData } = useFilterContext();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";

  const [jobs, setJobs] = useState<jobProps["post"][]>([]);
  const [selectedjob, setSelectedJob] = useState<any>({});
  const [isApply, setIsApply] = useState<boolean>(false);
  const [loading,setLoading]=useState(true)
 


  const handleApplyJob = (job:any) => {
    setIsApply(true);
    setSelectedJob(job);
  };
  const cancelApplyJob=()=>{
    setIsApply(false)
  }

 
  

  const debouncedListJob = debounce((filterData, userId) => {
    listJob({ filterData, userId })
      .then((response: any) => {
        const jobsData = response.data.jobs;
        setJobs(jobsData);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false)
      });
  }, 600); 

  useEffect(() => {
    setLoading(true)
    debouncedListJob(filterData, userId); 
    return () => {
   
      debouncedListJob.cancel();
    };
  }, [filterData]);

  const handleSave = (jobId: string, userId: string) => {
    try {
      savePost({ postId:null, userId,jobId})
        .then((response: any) => {
          const userData = response.data;
      
          dispatch(updateUser({ user: userData }));
     
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };


  return (
    <>
      {loading ? (
        
          < PostSkeletonUi />
          
        
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-post-section bg-white p-4 py-10" style={{ height: "520px" }}>
            <div className="w-full flex justify-between items-center">
              <div className="flex">
                <div className="w-14 h-14 rounded-md bg-green-600 flex items-center justify-center font-bold text-white text-2xl">
                  {job.jobRole.slice(0, 1)}
                </div>
                <div className="mx-5">
                  <p className="text-sm">{job.companyName}</p>
                  <p className="text-sm font-bold">{job.jobRole}</p>
                </div>
              </div>

              <div className="flex">
                {user.savedJobs?.includes(job._id) ? (
                  <button onClick={() => handleSave(job._id, user._id)} type="button">
                    <Bookmark color="green" fill="green" strokeWidth={1.5} size={22} />
                  </button>
                ) : (
                  <button onClick={() => handleSave(job._id, user._id)} type="button">
                    <Bookmark color="gray" strokeWidth={1.5} size={22} />
                  </button>
                )}
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
            {(user.dailyJobsApplied >=0 ) &&(
               <div className="w-full flex justify-end mt-10">
               <button
                 onClick={() => handleApplyJob(job)}
                 className="  hover:bg-white hover:border duration-300 hover:text-green-600 text-xs rounded btn border w-24 px-4 py-2 cursor-pointer text-white ml-2 bg-green-600"
               >
                 Apply
               </button>
             </div>

           )}
   
           {isApply && selectedjob._id === job._id && <ApplyJobForm job={selectedjob} cancelApplyJob={cancelApplyJob} />}

          </div>
        ))
      )}
    </>
  );
};

export default Jobs;
