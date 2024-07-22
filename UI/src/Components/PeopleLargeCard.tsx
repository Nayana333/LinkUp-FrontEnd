return (
    <>
        <div className=" bg-white flex justify-between px-4 py-4 items-end w-full mx-5 mt-3 rounded-md" >
          <div>
          <img
        className="h-9 w-9 rounded-full border-2 p-.5 mb-3 border-green-600"
        src={user?.profileImageUrl}
        alt="Profile"
      />
          <p className="text-sm font-semibold flex items-center gap-1" > {user?.profile?.fullname||user?.companyProfile?.companyName}{user?.isPremium==true&&(<Target color="green" size={15}/>)} </p>
          <p className="text-xs text-gray-400">{user?.profile?.designation||user?.companyProfile?.companyType}</p>
          <p className="text-xs text-green-600 font-medium">{user?.profile?.location||user?.companyProfile?.companyLocation}</p>

          </div>   
       
          <div className="flex gap-2 justify-between">
          <button onClick={()=>{navigate(`/visit-profile/bio/${user?._id}`)}} className="text-xs border px-4 py-1 rounded-md border-green-600">view</button>
           
          {location.pathname.startsWith('/visit-profile/connections/') && (
  <div>
    {requested?.some((request:any) => request._id === user?._id) ? (
      <button className="text-xs flex gap-1 text-gray-600 font-semibold border px-2 py-1 rounded-md border-gray-600" disabled>
        Requested <CircleArrowDownIcon size={15} />
      </button>
    ) : connections?.some((connection:any) => connection._id === user?._id) ? (
      <button onClick={() =>  handleUnFollowFromViewProfile(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">
        Unfollow <CircleArrowDownIcon size={15} />
      </button>
    ) : (
      <button onClick={() => handleFollowFromViewProfile(user?._id, user.username)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">
        Follow <CircleArrowUp size={15} />
      </button>
    )}
  </div>
)}

          {location.pathname === '/people/discover' && (
          <button  onClick={()=>handleFollow(user?._id,user.username)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">circle up <CircleArrowUp size={15}/> </button>

      )}
      {location.pathname === '/people/connections' && (
          <button  onClick={()=>handleUnFollow(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">circle down <CircleArrowDownIcon size={15}/> </button>

      )}
      {location.pathname === '/people/requests' && (
        <div className="flex gap-2">
                    <button  onClick={()=>handleAcceptRequest(user)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">Accept <CircleCheck size={15}/> </button>
          <button  onClick={()=>handleReject(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">Reject <CircleX size={15}/> </button>

        </div>
      )}
      {location.pathname === '/people/requested' && (
          <button  onClick={()=>handleCancel(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">Cancel  <Ban size={15}/> </button>
          )}
          </div>
        


        </div>
    

    </>
  )