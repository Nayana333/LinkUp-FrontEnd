import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cancelJobApplication, getEmployeeApplications } from '../services/api/user/apiMethods';
import { updateUser } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";
import ViewApplication from './ViewApplication'; 

const Applications = () => {
  const selectUser = (state: any) => state.auth.user || '';
  const user = useSelector(selectUser) || '';
  const userId = user._id;
  const [applications, setApplications] = useState<any[]>([]);
  const [isViewApplication, setIsViewApplication] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const handleCancelApplication = (applicationId: string) => {
    cancelJobApplication({ applicationId, applicantId: userId })
      .then((response: any) => {
        const applicationData = response.data.applications;
        setApplications(applicationData);
        toast.error(response.data.message);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    try {
      getEmployeeApplications({ applicantId: userId })
        .then((response: any) => {
          const applicationsData = response.data.applications;
          console.log(applicationsData);
          setApplications(applicationsData);
          updateUser(response.data);
        }).catch((error: Error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsViewApplication(true);
  };

  const cancelViewApplication = () => {
    setIsViewApplication(false);
    setSelectedApplication(null);
  };

  return (
    <>
      {applications?.map((application) => (
        <div key={application._id} className="home-post-section bg-white p-4 " style={{ height: "165px" }}>
          <div className="w-full flex justify-between ">
            <div className="flex">
              <div className="w-14 h-14 rounded-md bg-green-600 flex items-center justify-center font-bold text-white text-2xl">
                {application?.jobId?.jobRole?.slice(0, 1)}
              </div>
              <div className="mx-5">
                <p className="text-sm">{application.jobId.companyName}</p>
                <p className="text-sm font-bold">{application.jobId.jobRole}</p>
              </div>
            </div>
            <div className="flex text-xs gap-1">
              <p className="font-semibold">Status :</p>
              {application.applicationStatus === 'Rejected' && (
                <p className="text-red-600">{application.applicationStatus}</p>
              )}
              {application.applicationStatus === 'Pending' && (
                <p className="text-gray-500">{application.applicationStatus}</p>
              )}
              {application.applicationStatus === 'Accepted' && (
                <p className="text-green-600">{application.applicationStatus}</p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col items-start">
              <div className="flex gap-2">
                <p className="text-xs font-semibold">Location :</p>
                <p className="text-xs">{application.jobId.jobLocation}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-semibold">Salary :</p>
                <p className="text-xs">{application.jobId.salary}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-semibold">Job Type :</p>
                <p className="text-xs">{application.jobId.jobType}</p>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              {application.applicationStatus === "Pending" && (
                <button
                  onClick={() => handleCancelApplication(application._id)}
                  className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                >
                  Cancel Application
                </button>
              )}
              {application.applicationStatus !== "Pending" && (
                <button
                  onClick={() => handleViewApplication(application)}
                  className="text-xs rounded btn border px-4 py-2 cursor-pointer text-green-600 ml-2 bg-white"
                >
                  View Application
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {isViewApplication && selectedApplication && (
        <ViewApplication application={selectedApplication} cancelViewApplication={cancelViewApplication} />
      )}
    </>
  );
};

export default Applications;
