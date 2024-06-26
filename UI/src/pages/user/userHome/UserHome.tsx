import "./UserHome.css";
import AddPost from '../../../Components/AddPost/AddPost';
import Post from "../../../Components/Post";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/api/user/apiMethods";
import PostSkeletonUi from '../../../Components/SkeltonUi/PostSkeltonUi'
import Preferences from "../../../Components/Preferences/Preferences";
import BasicInformations from "../../../Components/Basicinformations";
import { useSelector } from "react-redux";

function UserHome() {

  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]); 
  const [users,setUsers] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getAllPosts()
          .then((response:any) => {
            const postsData = response.data;
            setPosts(postsData); 
            
            console.log(postsData);
          })
          .catch((error) => {
          console.log(error);
          
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);

    } catch (error) {
    console.log(error);
    
    }
  }, []);
  return (

      <div>

        {!user.userType&&(
          <Preferences/>
        )}

        {!user.profile?.fullname!&&!user.companyProfile?.companyName&&user.userType&&(
          <BasicInformations/>
        )}

       
      <div className="home-section-2">
        <div  className="home-scroll">
          <div className="home-scrollbox">
          <AddPost updatePost={setPosts} />
{loading&&(
  <PostSkeletonUi/>
)}
{posts?.length > 0 && (
  <div className="posts">
    {posts.map((post:any) => (
      <Post key={post._id} post={post}  />
    ))}
  </div>
)}
         </div>
        </div>
    
      </div>

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
