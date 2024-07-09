import {useState,useEffect} from 'react'
import { getUserConnection } from '../services/api/user/apiMethods'
import PeopleCard from './PeopleCard'
import { useSelector } from 'react-redux'


function PeopleConnections(){

  const [connections,setConnections]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const selectUser=(state:any)=>state.auth.user;
  const userData=useSelector(selectUser)
  const userId=userData._id

  useEffect(()=>{
    try{

      getUserConnection({userId})
      .then((response:any)=>{
        const connectionData=response.data.connections;
        setConnections(connectionData)
        setLoading(false)
      }).catch((error)=>{
        console.log(error.message);
        
      })


    }catch(error){

      console.log(error);
      

    }
  },[])







return (
    <div >
     
 {loading ? (
  <div className="">
  <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">

 
 </div>
    
  </div>
) : (
  <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
    {connections?.map((user: any) => (
   
      <PeopleCard user={user} updateConnection={setConnections} />
     
    
   
    ))}
  </div>
)}
    </div>
   )
  }

  export default PeopleConnections