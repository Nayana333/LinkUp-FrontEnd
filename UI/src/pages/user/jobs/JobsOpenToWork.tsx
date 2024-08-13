import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import JobFilterForm from "../../../Components/JobFilterForm/JobFilterForm";
import { useFilterContext } from "../../../utils/context/JobFilterData/FilterContext";

function JobsOpenToWork() {
  const selectUser = (state: any) => state.auth.user;
  const {  setFilterData } = useFilterContext();
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setFilterData({
      search: searchText,
      jobRole: null,
      location: null,
      jobType: null,
      salaryRange: null,
      experienceRange: null,
    });
  }, [searchText, setFilterData]);

  useEffect(() => {
    if (user.isHiring === true) {
      navigate("/jobs/hiring/jobList");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="home-section-2">
        <div className="border profile-nav flex flex-wrap items-center justify-center gap-2 sm:gap-5 bg-white rounded-md mt-5 mx-5">
          <button
            onClick={() => { navigate('/jobs/open-to-work/job-list') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname === '/jobs/open-to-work/job-list' ? 'bg-black text-white' : ''
              }`}
          >
            Job Openings
          </button>
          <button
            onClick={() => { navigate('/jobs/open-to-work/applications') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname === '/jobs/open-to-work/applications' ? 'bg-black text-white' : ''
              }`}
          >
            Applications
          </button>
          <button
            onClick={() => { navigate('/jobs/open-to-work/interviews') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname === '/jobs/open-to-work/interviews' ? 'bg-black text-white' : ''
              }`}
          >
            Interviews
          </button>
        </div>

        <div className="job-scroll">
          <div className="home-scrollbox">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="hidden lg:block home-section-3">
        <div className="border profile-nav flex items-center gap-20 bg-white rounded-md mt-5 mx-5 p-3">
          <div className="flex items-center justify-start w-full">
            <p className="text-xs text-gray-500">Search Job</p>
            <input
              type="text"
              className="searchInput w-3/4 text-xs text-gray-400 p-2 border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300 ms-4"
              value={searchText}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-5 mx-5">
          <JobFilterForm />
        </div>
      </div>
    </div>
  );
}

export default JobsOpenToWork;
