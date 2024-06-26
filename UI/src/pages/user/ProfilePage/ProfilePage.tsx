import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header1 from "../../../Components/Header1";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header1 />
      <div className="profile-wrapper px-48 mt-10" style={{ backgroundColor: "rgb(234, 233, 233)" }}>
        <div className="border profile-nav flex items-center justify-center gap-52 bg-white rounded-md">
          <button
            onClick={() => { navigate('/profile/bio') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === '/profile/bio' ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            Profile
          </button>
          <button
      onClick={() => { navigate('/profile/user-post') }}
      className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
        location.pathname === '#' ? 'bg-black text-white' : ''
      }`}
      type="button"
    >
      User Activity
    </button>
          <button
            onClick={() => { navigate('/profile/settings') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === '/profile/settings' ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            Settings
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
