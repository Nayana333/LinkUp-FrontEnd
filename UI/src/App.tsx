// import { Outlet } from "react-router-dom";



// import Header1 from "./Components/Header1";
// import Profile from "./Components/Profile/Profile";
// import FilterProvider from "./utils/context/JobFilterData/FilterProvider";

// function App() {
//   return (
//     <>
//       <FilterProvider>
//         <div>
//           <Header1 />
//           <div className="home-main">
//             <div className="hidden lg:block home-section-1" id="mobile-menu-2">
//               <Profile />
//             </div>
//             <Outlet />
//           </div>
//         </div>
//       </FilterProvider>
//     </>
//   );
// }

// export default App;

import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile/Profile";
import FilterProvider from "./utils/context/JobFilterData/FilterProvider";
import { io, Socket } from "socket.io-client";
import { socketBaseURL } from "./config";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type SocketRef = {
  current: Socket | null;
};

function App() {
  const socket = useRef<Socket | null>(null);
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      socket.current = io(socketBaseURL);
      socket.current.emit("addUser", user._id);

      socket.current.on('getNotifications', (data) => {
        toast.success(`${data.senderName} ${data.message}`);
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [user]);

  return (
    <>
      <FilterProvider>
        <div>
          <Header1 />
          <div className="home-main">
            <div className="hidden lg:block home-section-1" id="mobile-menu-2">
              <Profile />
            </div>
            <Outlet />
          </div>
        </div>
      </FilterProvider>
    </>
  );
}

export default App;
