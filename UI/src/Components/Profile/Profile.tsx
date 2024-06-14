import React from 'react';

import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import './Profile.css'

const Profile = () => {


  const selectUser=(state:any)=>state.auth.user ||''
  const user=useSelector(selectUser) ||''
  const userId=user._id ||'';
  console.log();
  

  return (
    <>
    
    <div className="h-screen dark:bg-gray-700 bg-gray-300" id='profile'>
  
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900  overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6"  id='fonts'>
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src={user.profileImageUrl}
              alt="Profile"
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1" id='fonts'>{user.profile?.fullname||user.companyProfile?.companyName}</h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center" id="small">
              {user.profile?.designation||user.companyProfile?.companyType}
             
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-green-700 dark:bg-green-900 text-white dark:text-white antialiased font-bold hover:bg-green-500 dark:hover:bg-green-700 px-4 py-2">
              Edit Profile
            </button>
            
          </div>
        </div>
        <div className="px-4 py-4">
          
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
