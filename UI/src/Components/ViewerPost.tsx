import { getUserPost } from "../services/api/user/apiMethods"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import PostDetailsUi from "./SkeltonUi/PostDetailsUi"
import PostDetails from "./PostDetails"
import NoApplicant from "./SkeltonUi/NoApplicant"



function ViewerPost(){


const[loading,setLoading]=useState(false)
const [posts,setPosts]=useState<any[]>([])
const {userId}=useParams()



useEffect(()=>{
try{
  setLoading(true)
  setTimeout(()=>{
    getUserPost({userId:userId})
    .then((response:any)=>{
      const postData=response.data
      console.log(response.data,'postDta');
      
      setPosts(postData)
      
    }).catch((error)=>{
      console.log(error.message);
      
    }).finally(()=>{
      setLoading(false)
    })
  },2000)
}catch(error){
  console.log(error);
  
}
},[userId])
return (
  <>
    {loading ? (
      <PostDetailsUi />
    ) : posts.length > 0 ? (
      <div className="posts">
        {posts.map((post: any) => (
          <PostDetails key={post._id} post={post} likesValue={false} commentsValue={false} />
        ))}
      </div>
    ) : (
      <NoApplicant/>
    )}
  </>
);

}
export default ViewerPost