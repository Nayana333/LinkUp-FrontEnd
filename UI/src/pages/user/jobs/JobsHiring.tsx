import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFilterContext } from '../../../utils/context/JobFilterData/FilterContext';
import './JobsHiring.css';

function JobsHiring() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const { filterData, setFilterData } = useFilterContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [isDrawerOpen, _setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (user.isHiring === false) {
      navigate('jobs/open-to-work/job-list');
    }
  }, [user, navigate]);

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

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {}, [filterData]);

  return (
    <div className='tho'>
      <div className="people-section-2" id="people-section-2">
        <div className={`flex w-full flex-col md:flex-row ${isDrawerOpen ? 'h-48' : 'h-auto'} transition-all duration-300`}>
          <div className="border w-full md:w-2/3 sm:w-full profile-nav flex items-center justify-center gap-4 md:gap-20 bg-white rounded-md mx-5 md:mx-0 py-2 md:py-0 sm:justify-center" >
            <button
              onClick={() => { navigate('/jobs/hiring/jobList') }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 md:px-7 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === '/jobs/hiring/jobList' ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Job Postings
            </button>
            <button
              onClick={() => { navigate('/jobs/hiring/applicants') }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 md:px-7 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === '/jobs/hiring/applicants' ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Applicants
            </button>
            <button
              onClick={() => { navigate('/jobs/hiring/interviews') }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 md:px-7 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === '/jobs/hiring/interviews' ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Interviews
            </button>
          </div>
          <button
            onClick={() => navigate('/jobs/hiring/add-job')}
            className={`text-xs w-full md:w-28 font-medium text-green-600 hover:text-white focus:bg-black focus:text-white px-4 py-2 md:px-7 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === '/jobs/hiring/add-job' ? 'bg-black text-white' : ' bg-white'
            } hidden sm:block mx-5 md:mx-0 mt-2 md:mt-0 sm:justify-center`}
            type="submit"
            style={{marginLeft:"12px"}}
          >
            Add Job
          </button>
    
          <div className="border w-full md:w-1/3 profile-nav  items-center justify-center gap-4 md:gap-20 bg-white rounded-md ms-4 hidden sm:flex mt-2 md:mt-0 sm:justify-center">
            <div className="flex items-center justify-center gap-2 w-full p-2">
              <p className="text-xs text-gray-500 w-1/3 ps-5">Search Job</p>
              <input
                type="text"
                className="searchInput w-3/4 text-xs text-gray-400 p-2 border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                value={searchText}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="home-scroll">
          <div className="home-scrollbox">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsHiring;
