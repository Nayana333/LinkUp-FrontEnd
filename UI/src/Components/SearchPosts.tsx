import { useEffect,useState } from "react";
import { Search } from "../services/api/user/apiMethods"; 
import PostSkeletonUi from "./SkeltonUi/PostSkeltonUi";
import Post from "./Post";
import { useLocation } from "react-router-dom";

import NoPost from './SkeltonUi/NoPost'


function SearchPosts(){

    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(false)
    const location=useLocation()
    const [searchQuery, setSearchQuery] = useState<string>('');


    useEffect(()=>{
        const searchParams=new URLSearchParams(location.search)
        const searchParamValue=searchParams.get('search')
        setSearchQuery(searchParamValue || '');

    },[location.search])


    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const response:any=await Search(searchQuery)
                const postData=response.data.posts
                setPosts(postData)
            }catch(error){
                console.log(error);
                
            }finally{
                setLoading(false)
            }
        };
        if(searchQuery !== ''){
            fetchData()
        }
    },[searchQuery])

return (
    <div>
      {loading && <PostSkeletonUi />}
      {posts?.length > 0 ? (
        <div className="posts">
          {posts.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
       <NoPost/>
      )}
    </div>
  );
}

export default SearchPosts

