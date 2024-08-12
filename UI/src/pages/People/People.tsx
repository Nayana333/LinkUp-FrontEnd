import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./People.css";

function People() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="relative">
      <div className="people-section-2 mx-5">
        <div className="people-scroll">
          <div className="people-scrollbox">
            <div className="border people-profile-nav flex items-center justify-between bg-white rounded-lg p-4 sm:flex sm:justify-between">
              <button
                onClick={toggleNavVisibility}
                className="block sm:hidden text-xs font-medium text-gray-400 bg-white border rounded-md hover:text-white hover:bg-gray-800 focus:bg-black focus:text-white transition-colors duration-300"
              >
                Menu
              </button>
              <div
                className={`hidden sm:flex flex-wrap items-center w-full justify-around lg:justify-between ${
                  isNavVisible ? "flex" : ""
                }`}
              >
                <button
                  onClick={() => {
                    navigate("/people/discover");
                  }}
                  className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-2 md:px-3 lg:px-4 py-1 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                    location.pathname === "/people/discover" ? "bg-black text-white" : ""
                  }`}
                  type="button"
                >
                  Discover
                </button>
                <button
                  onClick={() => {
                    navigate("/people/connections");
                  }}
                  className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-2 md:px-3 lg:px-4 py-1 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                    location.pathname === "/people/connections" ? "bg-black text-white" : ""
                  }`}
                  type="button"
                >
                  Connections
                </button>
                <button
                  onClick={() => {
                    navigate("/people/requests");
                  }}
                  className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-2 md:px-3 lg:px-4 py-1 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                    location.pathname === "/people/requests" ? "bg-black text-white" : ""
                  }`}
                  type="button"
                >
                  Requests
                </button>
                <button
                  onClick={() => {
                    navigate("/people/requested");
                  }}
                  className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-2 md:px-3 lg:px-4 py-1 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                    location.pathname === "/people/requested" ? "bg-black text-white" : ""
                  }`}
                  type="button"
                >
                  Requested
                </button>
              </div>
            </div>

            {/* Drawer */}
            {isNavVisible && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                <div className="fixed left-0 top-0 h-full bg-white shadow-lg p-4 w-64">
                  <button
                    onClick={toggleNavVisibility}
                    className="mb-4 text-xs font-medium text-gray-400 bg-white border rounded-md hover:text-white hover:bg-gray-800 focus:bg-black focus:text-white transition-colors duration-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      navigate("/people/discover");
                      setIsNavVisible(false);
                    }}
                    className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 block w-full text-left ${
                      location.pathname === "/people/discover" ? "bg-black text-white" : ""
                    }`}
                    type="button"
                  >
                    Discover
                  </button>
                  <button
                    onClick={() => {
                      navigate("/people/connections");
                      setIsNavVisible(false);
                    }}
                    className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 block w-full text-left ${
                      location.pathname === "/people/connections" ? "bg-black text-white" : ""
                    }`}
                    type="button"
                  >
                    Connections
                  </button>
                  <button
                    onClick={() => {
                      navigate("/people/requests");
                      setIsNavVisible(false);
                    }}
                    className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 block w-full text-left ${
                      location.pathname === "/people/requests" ? "bg-black text-white" : ""
                    }`}
                    type="button"
                  >
                    Requests
                  </button>
                  <button
                    onClick={() => {
                      navigate("/people/requested");
                      setIsNavVisible(false);
                    }}
                    className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 block w-full text-left ${
                      location.pathname === "/people/requested" ? "bg-black text-white" : ""
                    }`}
                    type="button"
                  >
                    Requested
                  </button>
                </div>
              </div>
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
