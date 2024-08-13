
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogout } from "../utils/context/reducers/adminAuthSlice";
import Linkup from '../assets/Linkup.svg'

interface HeaderProps {}

const AdminHeader: React.FC<HeaderProps> = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserMenuOpen(false);
    }
  };
  const handleLogout = () => {
    dispatch(AdminLogout());
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefreshToken");
    navigate("/admin/login");
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="z-100 bg-white lg:px-6 py-2.5 h-16 ">
      <div className="flex flex-wrap justify-between">
        <a href="/" className="flex items-center">
          <img
            src={Linkup}
            className="mr-3 h-6 sm:h-9"
            alt="LinkUp logo"
          />
        </a>
  
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto"
          id="mobile-menu-2"
        >
          <span className="block text-sm text-green-500 truncate">
            Admin Logged
            <span className="inline-block ml-2 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          </span>
  
          <ul className="flex justify-between items-center gap-6 ms-4">
            <li className="relative">
              <button
                type="button"
                className="flex items-center focus:outline-none"
                onClick={toggleUserMenu}
              >
                <img
                  className="w-6 h-6 rounded-full border"
                  src="https://storage.needpix.com/rsynced_images/people-2388584_1280.png"
                  alt="user photo"
                />
              </button>
  
              <div
                ref={dropdownRef}
                className={`z-50 absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ${
                  isUserMenuOpen ? "block" : "hidden"
                }`}
              >
                <div className="px-4 py-2">
                  <span className="block text-xs font-semibold text-gray-900">
                    Admin
                  </span>
                  <span className="block text-xs text-gray-500 truncate">
                    admin@gamil.com
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 font-semibold text-xs text-red-500 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  
};

export default AdminHeader;
