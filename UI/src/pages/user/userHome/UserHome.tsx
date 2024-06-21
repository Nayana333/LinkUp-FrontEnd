import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddPost from "../../../Components/AddPost/AddPost";
import Post from "../../../Components/Post";
import Preferences from "../../../Components/Preferences/Preferences";
import BasicInformation from "../../../Components/Basicinformations";
import Profile from "../../../Components/Profile/Profile";
import Header1 from "../../../Components/Header1";
import { getAllPosts } from "../../../services/api/user/apiMethods";

function UserHome() {
  const selectUser = (state: any) => state.auth.user || {};
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      setTimeout(() => {
        getAllPosts()
          .then((response: any) => {
            const postsData = response.data;
            setPosts(postsData);
            console.log(postsData);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header1 />
      {!user.userType && <Preferences />}
      {!user.profile?.fullname && !user.companyProfile?.companyName && user.userType && (
        <BasicInformation />
      )}
      <AddPost updatePost={setPosts} />
      <Profile />
      <div className="home-section-2">
        <div className="home-scroll">
          <div className="home-scrollbox">
          {posts.length > 0 && (
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
          <div className="home-scrollbox"></div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
