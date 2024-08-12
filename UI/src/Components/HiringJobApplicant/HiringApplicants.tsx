import { useEffect, useState } from "react";
import { View } from "lucide-react";
import { getemployerApplications, updateApplicationStatus } from "../../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import '../ViewJobApplications';
import ViewApplication from '../ViewApplication';
import './HiringJobApplicant.css'
import NoApplicant from "../SkeltonUi/NoApplicant";

const HiringJobApplicant = () => {

  const selectUser = (state: any) => state.auth.user || '';
  const user = useSelector(selectUser);
  const userId = user._id || '';

  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>({});
  const [isViewApplication, setIsViewApplication] = useState<boolean>(false);

  const handleViewApplication = (application: any) => {
    setIsViewApplication(true);
    setSelectedApplication(application);
  };

  const cancelViewApplication = () => {
    setIsViewApplication(false);
  };

  const handleApplicationStatus = (applicationId: string, status: string, userId: string) => {
    updateApplicationStatus({ applicationId, status, userId }).then((response: any) => {
      const applicationData = response.data.applications;
      setApplications(applicationData);
      toast.success(response.data.message);
    }).catch((error: Error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    try {
      getemployerApplications({ userId: userId })
        .then((response: any) => {
          const applicationData = response.data.applications;
          console.log(applicationData, 'hiring application');
          setApplications(applicationData);
        }).catch((error: Error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="applications-container">
      {applications.length === 0 ? (
        <NoApplicant/>
      ) : (
        applications.map((application) => (
          <div key={application._id} className="application-item bg-white p-4">
            <div className="w-full flex flex-col sm:flex-row justify-between">
              <div className="flex mb-3 sm:mb-0">
                <img
                  className="w-14 h-14 rounded-md border-2 p-.5 border-green-600"
                  src={application.applicantId.profileImageUrl}
                  alt=""
                />
                <div className="mx-5">
                  <p className="text-sm font-bold">
                    {application?.applicantId?.profile?.fullname
                      ? application?.applicantId?.profile?.fullname
                      : application?.applicantId?.companyProfile?.companyName}
                  </p>
                  <p className="text-xs">
                    {application?.applicantId?.profile?.designation
                      ? application?.applicantId?.profile?.designation
                      : application?.applicantId?.companyProfile?.companyType}
                  </p>
                </div>
              </div>
              <div className="flex text-xs gap-1 mt-2 sm:mt-0">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-3 sm:mt-0">
              <div className="flex flex-col items-start">
                <div className="flex gap-2">
                  <p className="text-xs font-semibold">Applying for the position of :</p>
                  <p className="text-xs">{application.jobId.jobRole}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs font-semibold">Job location :</p>
                  <p className="text-xs">{application.jobId.jobLocation}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs font-semibold">Job Type :</p>
                  <p className="text-xs">{application.jobId.jobType}</p>
                </div>
              </div>
              <div className="flex justify-end mt-3 sm:mt-0">
                <button
                  onClick={() => handleViewApplication(application)}
                  className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                >
                  <View size={18} />
                </button>
                {application.applicationStatus === 'Rejected' && (
                  <button
                    onClick={() => handleApplicationStatus(application._id, "Accepted", userId)}
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                  >
                    Accept Application
                  </button>
                )}
                {application.applicationStatus === 'Pending' && (
                  <div>
                    <button
                      onClick={() => handleApplicationStatus(application._id, "Accepted", userId)}
                      className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                    >
                      Accept Application
                    </button>
                    <button
                      onClick={() => handleApplicationStatus(application._id, "Rejected", userId)}
                      className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                    >
                      Reject Application
                    </button>
                  </div>
                )}
                {application.applicationStatus === 'Accepted' && (
                  <button
                    onClick={() => handleApplicationStatus(application._id, "Rejected", userId)}
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-red-600 ml-2 bg-white"
                  >
                    Reject Application
                  </button>
                )}
              </div>
            </div>
            {isViewApplication && selectedApplication._id === application._id && (
              <ViewApplication application={selectedApplication} cancelViewApplication={cancelViewApplication} />
            )}
          </div>
        ))
      )}
    </div>
  );
  
}

export default HiringJobApplicant;
