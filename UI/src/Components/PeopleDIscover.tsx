import { useSelector, UseSelector } from "react-redux"
import PeopleCard from "./PeopleCard"
import { useEffect,useState } from "react"
import { toast } from "sonner"
import { followUser,getUserSuggestions } from "../services/api/user/apiMethods"



function PeopleDiscover(){


  const selectUser=(state:any)=>state.auth.user
  const userData=useSelector(selectUser)
  const userId=userData._id ||''
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{

    getUserSuggestions({userId}).then((response:any)=>{
      setUsers(response.data.suggestedUsers)
      setLoading(false)
    }).catch((error:any)=>{
      console.log(error.message);

    })

  },[])


  const handleFollow=(foloweduserId:string,folowedUsername:string)=>{
    followUser({userId,followingUser:foloweduserId})
    .then((response:any)=>{
      setUsers(users.filter((user:any)=>user._id !==foloweduserId))
      response.data.followed
      ?toast.info(`followed ${folowedUsername}`)
      :toast.info(`followd Request sent to ${folowedUsername}`)
      console.log(response.data);
      
    }).catch((err)=>{
      console.log(err.message);
      
    })
  }



  return (
    
    <div>
   
        {loading ? (
         <div className="">
         <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
     
        
        </div>
           
         </div>
       ) : (
         <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
           {users?.map((user: any) => (
          
             <PeopleCard user={user}  handleFollow={handleFollow} />
            
           
          
           ))}
         </div>
       )}
       </div>
        
     )
    }

    export default PeopleDiscover