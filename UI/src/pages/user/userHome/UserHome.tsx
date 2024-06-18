import "./UserHome.css";
import { useEffect, useState } from "react";
import Preferences from "../../../Components/Preferences/Preferences";
import BasicInformation from "../../../Components/Basicinformations";
import { useSelector } from "react-redux";
import Header1 from "../../../Components/Header1";
import Profile from "../../../Components/Profile/Profile";
import AddPost from "../../../Components/AddPost/AddPost";

function UserHome() {

  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";




  return (

    <div>
      <Header1 />
      <AddPost/>


      {!user.userType && (
        <Preferences />
      )}

      {!user.profile?.fullname! && !user.companyProfile?.companyName && user.userType && (
        <BasicInformation />
      )}

<Profile/>

      <div className="hidden lg:block home-section-3" id="mobile-menu-2">
        <div className="home-people-scroll">
          <div className="home-scrollbox">
          </div>
        </div>
      </div>

    </div>


  );
}

export default UserHome;