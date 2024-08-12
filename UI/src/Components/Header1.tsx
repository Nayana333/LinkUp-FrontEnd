// import React, { useState, useEffect, useRef } from "react";
// import { Bell, Bookmark, Mail } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logout } from "../utils/context/reducers/authSlice";
// import { toast } from "sonner";
// import Linkup from '../assets/Linkup.svg'

// interface HeaderProps {}

// const Header: React.FC<HeaderProps> = () => {
//   const selectUser = (state: any) => state.auth.user || "";
//   const user = useSelector(selectUser) || "";
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [unreadCount, setUnreadCount] = useState<number>(0); 
//   const toggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target as Node)
//     ) {
//       setIsUserMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     fetchUnreadNotificationsCount();
//   }, []);

//   const fetchUnreadNotificationsCount = async () => {
//     const count = await getUnreadNotificationsCountFromAPI();
//     setUnreadCount(count);
//   };

//   const getUnreadNotificationsCountFromAPI = async () => {
//     return 5; 
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("userRefreshToken");
//     navigate("/login");
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (searchQuery.trim() === "") {
//       toast.error("Please enter a search term.");
//     } else {
//       navigate(`/search/posts?search=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   const activeLinkStyle = "text-green-600"; 
//   const inactiveLinkStyle = "text-gray-700";

//   return (
//     <nav className="border bg-white lg:px-6 py-2.5 h-16 sticky top-0">
//       <div className="flex flex-wrap justify-between">
//         <a href="/" className="flex items-center">
//           <img
//             src={Linkup}
//             className="mr-3 h-4 sm:h-9"
//             alt="linkup logo"
//           />
//         </a>
//         <div className="hidden justify-between items-center w-full lg:flex lg:w-auto" id="mobile-menu-2">
//           <ul className="flex flex-col mt-4 gap-5 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//             <li>
//               <a
//                 onClick={() => navigate('/home')}
//                 className={`text-xs font-bold block py-2 pr-4 pl-3 ${
//                   location.pathname.startsWith('/home') ? activeLinkStyle : inactiveLinkStyle
//                 }`}
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 onClick={() => navigate('/people/discover')}
//                 className={`text-xs font-bold block py-2 pr-4 pl-3 ${
//                   location.pathname.startsWith('/people') ? activeLinkStyle : inactiveLinkStyle
//                 }`}
//               >
//                 People
//               </a>
//             </li>
//             <li>
//               <a
//                 onClick={() => navigate('/jobs/open-to-work/job-list')}
//                 className={`text-xs font-bold block py-2 pr-4 pl-3 ${
//                   location.pathname.startsWith('/jobs') ? activeLinkStyle : inactiveLinkStyle
//                 }`}
//               >
//                 Jobs
//               </a>
//             </li>
//           </ul>
//           <form className="relative w-80 ms-52 me-6" onSubmit={handleSearchSubmit}>
//             <div className="relative">
//               <input
//                 type="search"
//                 name="search"
//                 placeholder="Search"
//                 className="search-input text-xs bg-white h-8 px-5 w-full pr-10 rounded-full focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 border border-gray-300"
//                 style={{ position: "relative" }}
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//               <button
//                 type="submit"
//                 className="search-icon text-white rounded-full absolute bg-green-600 font-medium text-sm px-2 py-2"
//                 style={{ position: "absolute", right: "2px", top: "2px" }}
//               >
//                 <svg
//                   className="w-3 h-3 text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>
//           <ul className="flex justify-between items-center gap-6">
//           <li className="relative" onClick={() => navigate('/home/notifications')}>
//   <Bell color="gray" strokeWidth={1.3} size={23} />
//   {unreadCount > 0 && (
//     <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[8px] font-bold text-red-100 bg-red-600 rounded-full">
//       {unreadCount}
//     </span>
//   )}
// </li>

//             <li onClick={() => navigate('/home/saved/posts')}>
//               <Bookmark color="gray" strokeWidth={1.5} size={20} />
//             </li>
//             <a
//               onClick={()=>navigate('/chat', { state: { from: location.pathname } })}
//             >
//               <li>
//                 <Mail color="gray" strokeWidth={1.5} size={20} />
//               </li>
//             </a>
//             <li className="relative">
//               <button
//                 type="button"
//                 className="flex items-center focus:outline-none"
//                 onClick={toggleUserMenu}
//               >
//                 <img
//                   className="w-6 h-6 rounded-full border"
//                   src={user.profileImageUrl}
//                   alt="user photo"
//                 />
//               </button>
//               <div
//                 ref={dropdownRef}
//                 className={`absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ${
//                   isUserMenuOpen ? "block" : "hidden"
//                 }`}
//               >
//                 <div className="px-4 py-4">
//                   <span className="block text-xs font-semibold text-gray-900">
//                     {user.userName}
//                   </span>
//                   <span className="block text-xs text-gray-500 truncate">
//                   </span>
//                 </div>
//                 <ul className="py-2">
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </a>
//                   </li>
//                   <li>
//                     <a
//               onClick={()=>navigate('/profile/settings', { state: { from: location.pathname } })}
//               className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
//                     >
//                       Settings
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                        onClick={()=>navigate('/premium/plans')} 
//                       className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
//                     >
//                    LinkUp Premium
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       onClick={handleLogout}
//                       className="block px-4 py-2 font-semibold text-xs text-red-500 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;




import React, { useState, useEffect, useRef } from "react";
import { Bell, Bookmark, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";
import Linkup from '../assets/Linkup.svg'

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchUnreadNotificationsCount();
  }, []);

  const fetchUnreadNotificationsCount = async () => {
    const count = await getUnreadNotificationsCountFromAPI();
    setUnreadCount(count);
  };

  const getUnreadNotificationsCountFromAPI = async () => {
    return 5;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRefreshToken");
    navigate("/login");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search term.");
    } else {
      navigate(`/search/posts?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const activeLinkStyle = "text-green-600";
  const inactiveLinkStyle = "text-gray-700";

  const handleLinkClick = (path:string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };


  return (
    <nav className="border bg-white lg:px-6 py-2.5 lg:height:4.8rem sticky top-0 z-10">
      <div className="flex flex-wrap justify-between items-center ">
        <a href="/" className="flex items-center">
          <img src={Linkup} className="mr-3 h-4 sm:h-9" alt="linkup logo" />
        </a>
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-green-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        <div className={`${isMobileMenuOpen ? 'block z-30 bg-gray-200' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full `} id="mobile-menu">
          <ul className='flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 cursor-pointer'>
            <li>
              <p
                 onClick={() => handleLinkClick('/home')}
                className={`text-xs font-bold block py-2 pr-4 pl-3 ${location.pathname.startsWith('/home') ? activeLinkStyle : inactiveLinkStyle}`}
              >
                Home
              </p>
            </li>
            <li>
              <a
                onClick={() => handleLinkClick('/people/discover')}
                className={`text-xs font-bold block py-2 pr-4 pl-3 ${location.pathname.startsWith('/people') ? activeLinkStyle : inactiveLinkStyle}`}
              >
                People
              </a>
            </li>
            <li>
              <a
                onClick={() => handleLinkClick('/jobs/open-to-work/job-list')}
                className={`text-xs font-bold block py-2 pr-4 pl-3 ${location.pathname.startsWith('/jobs') ? activeLinkStyle : inactiveLinkStyle}`}
              >
                Jobs
              </a>
            </li>
          </ul>
          <form className="relative w-full lg:w-80 lg:ms-52 lg:me-6 mt-4 lg:mt-0" onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="search-input text-xs bg-white h-8 px-5 w-full pr-10 rounded-full focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 border border-gray-300"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="search-icon text-white rounded-full absolute bg-green-600 font-medium text-sm px-2 py-2"
                style={{ position: "absolute", right: "2px", top: "2px" }}
              >
                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
            </div>
          </form>
          <ul className="flex flex-row lg:flex-row items-center lg:gap-6 mt-4 lg:mt-0 justify-center gap-5 p-2 cursor-pointer ">
            <li className="relative" onClick={() => handleLinkClick ('/home/notifications')}>
              <Bell color="gray" strokeWidth={1.3} size={23} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[8px] font-bold text-red-100 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </li>
            <li onClick={() => handleLinkClick ('/home/saved/posts')}>
              <Bookmark color="gray" strokeWidth={1.5} size={20} />
            </li>
            <li onClick={() => navigate('/chat', { state: { from: location.pathname } })}>
              <Mail color="gray" strokeWidth={1.5} size={20} />
            </li>
            <li className="relative">
              <button
                type="button"
                className="flex items-center focus:outline-none"
                onClick={toggleUserMenu}
              >
                <img className="w-6 h-6 rounded-full border" src={user.profileImageUrl} alt="user photo" />
              </button>
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ${isUserMenuOpen ? "block" : "hidden"}`}
              >
                <div className="px-4 py-4">
                  <span className="block text-xs font-semibold text-gray-900">{user.userName}</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a onClick={() => navigate('/profile/settings', { state: { from: location.pathname } })} className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate('/premium/plans')} className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                      LinkUp Premium
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout} className="block px-4 py-2 font-semibold text-xs text-red-500 hover:bg-gray-100">
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



}

export default Header;




