
import { Pagination} from "flowbite-react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {  listUserJob, userJobBlock } from "../services/api/user/apiMethods";
import { useEffect, useState } from "react";
import '../pages/admin/UserList/UserList.css'

function HiringJobList(){

    const selectUser=(state:any)=>state.auth.user;
    const user=useSelector(selectUser)
    const navigate=useNavigate()
    const userId=user._id
    const [currentPage,setCurrentPage]=useState(1)
    const [jobs,setJobs]=useState<any[]>([])
    const [loading,setLoading]=useState(false)
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try{
                const response:any=await listUserJob({userId,page:currentPage})
                const { jobs: jobsData, totalPages: fetchedTotalPages } =response.data
                setJobs(jobsData)
                setTotalPages(fetchedTotalPages)
            }catch(error:any){
                console.log(error.message);
                
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[currentPage,userId])



    const handleJobBlock=(jobId:string,status:string)=>{
        try{
            const requestData={jobId}
            userJobBlock(requestData)
            .then((response:any)=>{
                const data=response.data

                if(status==='block'){
                    toast.error(data.message)
                }
                else{
                    toast.info(data.message)
                }
                setJobs(response.data.jobs)
            })
            .catch((error:any)=>{
                toast.error(error.message)
            })
        }catch(error:any){
            toast.error(error.message)
        }
    }

    const onPageChange=(page:number)=>{
        setCurrentPage(page)
    }



return (
    <>
      {jobs.length === 0 ? (
        <div className="text-gray-600 text-xs border-dashed border opacity-75 bg-white border-gray-400 flex justify-center p-6 rounded-lg mx-5 mt-9">
          <p className="py-2">No Job postings</p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-lg mx-5 mt-5 mb-3" style={{ height:'440px',width: '1053px' }}>
          <table className="w border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">
                  Job Role
                </th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">
                  Job Type
                </th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">
                  Posted on
                </th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">
                  Last Date
                </th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" className="text-xs px-6 py-4 font-medium flex justify-center text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {jobs?.map((job: any) => (
                <tr key={job._id} className={`hover:bg-gray-50 ${job.isAdminBlocked ? 'relative' : ''}`}>
                  {job.isAdminBlocked && (
                    <div className="absolute z-50 inset-0 bg-gray-400 bg-opacity-50 text-xs text-red-600 flex items-center justify-center pb-8">
                      <p>Blocked by admin</p>
                    </div>
                  )}
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative rounded-full h-10 w-10 bg-green-600 flex items-center justify-center font-bold text-white">
                      {job.jobRole.slice(0, 1)}
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-gray-700">{job.companyName}</div>
                      <div className="text-gray-400">{job.jobRole}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      {job.jobType}
                    </span>
                  </td>
                  <td className="font-xs px-6 py-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="font-xs px-6 py-4">{new Date(job.lastDateToApply).toLocaleDateString()}</td>
                  <td className="text-xs px-6 py-4">
                    {job.isBlocked? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        closed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        opened
                      </span>
                    )}
                  </td>
                  <td className="flex text-xs py-4">
                    <button
                      onClick={() => {
                        navigate(`/jobs/view-job/job-info/${job._id}`);
                      }}
                      type="button"
                      className="text-xs px-5 bg-white text-green-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
                    >
                      View
                    </button>
  
                    <button
                      onClick={() => {
                        navigate(`/jobs/hiring/edit-job/${job._id}`);
                      }}
                      type="button"
                      className="text-xs px-5 bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
                    >
                      Edit
                    </button>
  
                    <div className="justify-end gap-4">
                      {job.isBlocked ? (
                        <button
                          type="button"
                          onClick={() => handleJobBlock(job._id,"block")}
                          className="text-xs px-5 bg-white text-green-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
                        >
                         Open 
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleJobBlock(job._id,"block")}
                          className="text-xs px-5 bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        
      )}
                <div className="pagnation flex justify-end pe-1">
        <Pagination className='text-xs ' currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
      </div>
    </>
  );
}

export default HiringJobList