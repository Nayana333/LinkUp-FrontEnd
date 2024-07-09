import { useState, useEffect} from "react"
import PeopleCard from "./PeopleCard"
import { getUserConnection } from "../services/api/user/apiMethods"
import { useSelector } from "react-redux"

function PeopleRequested(){

  const [loading,setLoading]=useState(true)
  const [requested,setRequested]=useState<any>(null)
  const selectUser=(state:any)=>state.auth.user
  const userData=useSelector(selectUser)
  const userId=userData._id

  useEffect(()=>{
    try{

      setLoading(true)
      getUserConnection({userId})
      .then((response:any)=>{
        const requestedData=response.data.connection;
        setRequested(requestedData.requestSent)
        setLoading(false)
      }).catch((error)=>{
        console.log(error.message);
        
      })


    }catch(error){
      console.log(error);
      
    }
  },[userId])

return (
    
    <div>

    {loading ? (
     <div className="">
     <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
 
    
    </div>
       
     </div>
   ) : (
     <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
       {requested?.map((user: any) => (
      
         <PeopleCard user={user} updateRequested={setRequested}  />
        
       
      
       ))}
     </div>
   )}
   </div>
    
     )
    }
    export default PeopleRequested