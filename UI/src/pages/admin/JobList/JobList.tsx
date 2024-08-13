
import { Pagination } from "flowbite-react";

import { toast } from "sonner";
import { adminJobList, jobBlock } from "../../../services/api/admin/AdminApiMethods";
import { useEffect, useState } from "react";
import NoApplicant from "../../../Components/SkeltonUi/NoApplicant";

function HiringJobList() {

  const [jobs, setJobs] = useState<any[]>([]);
  console.log(jobs);
  
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [_loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: any = await adminJobList(currentPage);
        const { jobs: fetchedJobs, totalPages: fetchedTotalPages } = response.data;
        setJobs(fetchedJobs);
        setTotalPages(fetchedTotalPages);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();  
  }, [currentPage]);


  const handleJobBlock = (jobId: string, status: string) => {
    try {
          const requestData:any = { jobId };
          jobBlock(requestData)
          .then((response: any) => {
            console.log(response);
          
          const data = response.data;
          if (status === "block") {
            toast.error(data.message);
          } else {
            toast.info(data.message); 
          }
          setJobs(prevJobs =>
            prevJobs.map(job => {
              if (job._id === jobId) {
                return { ...job, isAdminBlocked: !job.isAdminBlocked };
              }
              return job;
            })
          );
        })
        .catch((error: any) => {
          toast.error(error.message);
        });

    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <>
      {jobs.length > 0 ? (
        <div className="w-full overflow-hidden rounded-lg mx-5 mt-5 mb-3" style={{ height: '440px' }}>
          <table className="w border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Job Role</th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Posted by</th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Job Type</th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Posted on</th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Last Date</th>
                <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Status</th>
                <th scope="col" className="text-xs px-6 py-4 font-medium flex justify-center text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {jobs.map((job: any) => (
                <tr key={job._id} className={`hover:bg-gray-50 ${job.isBlocked ? 'relative' : ''}`}>
                  {job.isBlocked && (
                    <div className="absolute z-50 inset-0 bg-gray-400 bg-opacity-50 text-xs text-red-600 flex items-center justify-center pb-8">
                      <p>{`Blocked by ${job.userId.userName}`}</p>
                    </div>
                  )}
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="text-xs">
                      <div className="font-medium text-gray-700">{job.companyName}</div>
                      <div className="text-gray-400">{job.jobRole}</div>
                    </div>
                  </th>
                  <th>
                    <div className="text-xs">
                      <div className="font-medium text-gray-700">{job.userId?.userName}</div>
                      <div className="text-gray-400">{job.userId?.email}</div>
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
                    {job.isAdminBlocked ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        UnBlocked
                      </span>
                    )}
                  </td>
                  <td className="flex text-xs py-4">
                    <div className="justify-end gap-4">
                      {job.isAdminBlocked ? (
                        <button
                          type="button"
                          onClick={() => handleJobBlock(job._id, "unblock")}
                          className="text-xs px-5 bg-white text-green-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
                        >
                          UnBlock
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleJobBlock(job._id, "block")}
                          className="text-xs px-5 bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg py-2.5 text-center inline-flex items-center me-2 mb-2"
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagnation flex justify-end pe-1">
            <Pagination className='text-xs' currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
          </div>
        </div>
      ) : (
        <NoApplicant/>
      )}
    </>
  );
  
}

export default HiringJobList
