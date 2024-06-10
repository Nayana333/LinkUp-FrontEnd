import "./UserHome.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header1 from "../../../Components/Header1";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function UserHome() {

  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  

 
    const navigate = useNavigate();
        
  

  



  
  return (

  
      <div>
        <>

       <Header1/>

        
  
        {/* {!user.userType&&(
          <Preferences/>
        )}

        {!user.profile?.fullname!&&!user.companyProfile?.companyName&&user.userType&&(
          <BasicInformation/>
        )} */}

       
      <div className="home-section-2">
        <div  className="home-scroll">
          <div className="home-scrollbox">
          


          </div>
        </div>
    
      </div>

      <div className="hidden lg:block home-section-3" id="mobile-menu-2">
        <div className="home-people-scroll">
          <div className="home-scrollbox">
          
          </div>
        </div>
      </div>
      </>
      </div>
    

    
  );
}

export default UserHome;