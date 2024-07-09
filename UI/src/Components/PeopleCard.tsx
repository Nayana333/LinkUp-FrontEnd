import { CircleArrowUp, CircleCheck,CircleX,CircleArrowDownIcon,Ban,Target} from "lucide-react"
import {useNavigate} from 'react-router-dom'
import { toast } from "sonner"
import {unfollowUser,acceptFollowRequest,cancelFollowRequest,followUser,getUserConnection,rejectFollowRequest} from '../services/api/user/apiMethods'
import { useSelector, UseSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect,useState } from "react"

function PeopleCard({user,handleFollow,updateConnection,updateRequested,updateRequestes}:any){

  const selectUser=(state:any)=>state.auth.user

  const currentUser=useSelector(selectUser)

  const userId=currentUser?._id

  const [connections,setConnections]=useState<any>(null)
  const [requested,setRequested]=useState<any>(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    {
      try{
        setLoading(true)
        getUserConnection({userId})
        .then((response:any)=>{

          const connectionData=response.data.connection;
          
          setConnections(connectionData.connections)
          setRequested(connectionData.requestSent)
          setLoading(false)

        }).catch((error)=>{
          console.log(error.message);
          
        })
      }catch(error){
        console.log(error);
        
      }
    }
  },[])


  const location =useLocation()

  const handleAcceptRequest=(user:any)=>{
    acceptFollowRequest({userId,requestedUser:user?._id}).then((response:any)=>{
      updateRequestes(response.data.connection.requested)
      toast.success('Request accepted')
    })
  }

 const handleReject=(user:any)=>{
  rejectFollowRequest({userId,requestedUser:user?._id}).then((response:any)=>{
    toast.error('Request Rejected')
    updateRequestes(response.data.connection.requested)
  })
 }

 const handleCancel=(user:any)=>{
  cancelFollowRequest({userId,cancellingUser:user?._id}).then((response:any)=>{
    toast.error('Request cancelled')
    updateRequested(response.data.connection.requestSent)

  })
 }


 const handleUnFollow=(user:any)=>{
  unfollowUser({userId,unfollowingUser:user?._id})
  .then((response:any)=>{
    toast.error('Unfollwed User')
    updateConnection(response.data.connection.connections)
  }).catch((error:any)=>{
    console.log(error.message);
    
  })
 }



 const handleUnFollowFromViewProfile=(user:any)=>{

  unfollowUser({userId,unfollowingUser:user?._id})
  .then((response:any)=>{
    toast.error('Unfollow User')
    setConnections(response.data.connection.connection)
  }).catch((error:Error)=>{
    console.log(error.message);
    
  })
 }


 const handleFollowFromViewProfile=(folowedUserId:string,followedUserName:string)=>{
  followUser({userId,followingUser:folowedUserId})
  .then((response:any)=>{
    const connectionData=response.data.connection
    setRequested(connectionData.requestSent)
  }).catch((error:Error)=>{
    console.log(error.message);
    
  })
 }


 const navigate=useNavigate()

 return (
  <>
    <div className="home-recommed-section bg-white flex justify-between px-4 py-4 items-end relative" style={{width:'346px'}}>
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
        {location.pathname.startsWith('/visit-profile/connections/') && (
          <div>
            {requested?.some((request: any) => request._id === user?._id) ? (
              <button
                className="text-xs flex gap-1 text-gray-600 font-semibold border px-2 py-1 rounded-md border-gray-600"
                disabled
              >
                Requested <CircleArrowDownIcon size={15} />
              </button>
            ) : connections?.some((connection: any) => connection._id === user?._id) ? (
              <button
                onClick={() => handleUnFollowFromViewProfile(user)}
                className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600" style={{marginRight:'69px'}}
              >
                Unfollow <CircleArrowDownIcon size={15} />
              </button>
            ) : (
              <button
                onClick={() => handleFollowFromViewProfile(user?._id, user.userName)}
                className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600" 
              >
                Follow <CircleArrowUp size={15} />
              </button>
            )}
          </div>
        )}

        {location.pathname === '/people/discover' && (
          <button
            onClick={() => handleFollow(user?._id, user.userName)}
            className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600"
          >
            Link up <CircleArrowUp size={15} />
          </button>
        )}

        {location.pathname === '/people/connections' && (
          <button
            onClick={() => handleUnFollow(user)}
            className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600" style={{marginRight:'69px'}}
          >
            Link down <CircleArrowDownIcon size={15} />
          </button>
        )}

        {location.pathname === '/people/requests' && (
          <div className="flex gap-2">
            <button
              onClick={() => handleAcceptRequest(user)}
              className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600"
            >
              Accept <CircleCheck size={15} />
            </button>
            <button
              onClick={() => handleReject(user)}
              className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600" 
            >
              Reject <CircleX size={15} />
            </button>
          </div>
        )}

        {location.pathname === '/people/requested' && (
          <button
            onClick={() => handleCancel(user)}
            className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600"
          >
            Cancel <Ban size={15} />
          </button>
        )}

<button
              onClick={() => navigate(`/visit-profile/bio/${user?._id}`)}
              className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600 "
            >
              View <CircleCheck size={15} />
            </button>
      </div>

     
   
    </div>
  </>
);


}

export default PeopleCard








