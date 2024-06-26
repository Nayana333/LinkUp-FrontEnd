
import {   Outlet } from "react-router-dom";
import Header1 from "./Components/Header1";

import Profile from "./Components/Profile/Profile";


function App() {




  return (
    <>
       
<div>

      <Header1 />

      <div className="home-main">
      <div className="hidden lg:block home-section-1" id="mobile-menu-2">
        <Profile />
      </div>

          <Outlet/>
      </div>
        </div>
        
  </>
  )
}

export default App


