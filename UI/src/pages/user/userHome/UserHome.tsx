import "./UserHome.css";
import AddPost from '../../../Components/AddPost/AddPost';
import Post from "../../../Components/Post";
import { useEffect, useState } from "react";
import { getAllPosts, getUserSuggestions } from "../../../services/api/user/apiMethods";
import PostSkeletonUi from '../../../Components/SkeltonUi/PostSkeltonUi';
import Preferences from "../../../Components/Preferences/Preferences";
import BasicInformations from "../../../Components/Basicinformations";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import PeopleCard from "../../../Components/PeopleCard";

function UserHome() {

  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("use Effect calling")
    const fetchPost = async () => {
      try {
        setLoading(true)
        setTimeout(() => {

          getAllPosts({ userId, page })
            .then((response: any) => {
              const postsData = response.data;
              if (postsData.length === 0) {
                setHasMore(false);
              }
              setPosts((prev) => [...prev, ...postsData]);
              console.log(postsData);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setLoading(false);
            });
        }, 2000);

        getUserSuggestions({ userId }).then((response: any) => {
          console.log(response.data, 'suggestions');
          setUsers(response.data.suggestedUsers);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (page > 1 || posts.length === 0) {
      console.log(page, posts.length);
      fetchPost();
    }
  }, [page]);

  const handleScroll = () => {
    console.log("handling scroll event")
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    console.log("Handle Scrolll functiuon")
    window.addEventListener("scroll", ()=>{
      console.log('working');
      
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePageCount = () => {
    setPage((prev) => prev + 1);
  }
  

  return (
    <div>
      {!user.userType && (
        <Preferences />
      )}

      {!user.profile?.fullname && !user.companyProfile?.companyName && user.userType && (
        <BasicInformations />
      )}

      <div className="home-section-2">
        <div className="home-scroll">
          <div className="home-scrollbox">
            <AddPost updatePost={setPosts} />

            {loading && page === 1 ? (
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <PostSkeletonUi />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {posts?.length > 0 && (
                  <div className="posts">
                    {posts.map((post: any) => (
                      <Post key={post._id} post={post} />
                    ))}
                    {hasMore && (
                      <div className="flex justify-center">
                        <button className="bg-gray-200 text-gray-700 text-xs font-bold px-5 py-2 rounded-md" onClick={handlePageCount}>
                          <span>
                            View More
                          </span>
                          
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {loading && page > 1 && (
                  <div className="lg:col-span-2 lg:ms-96 w-12/12 lg:pl-4 s pt-2 lg:pt-4 flex justify-center">
                    <Spinner
                      color="purple"
                      size="md"
                      aria-label="Purple spinner example"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:block home-section-3" id="mobile-menu-2">
          <div className="home-people-scroll">
            <div className="home-scrollbox">
              {users?.map((user: any) => (
                <PeopleCard key={user._id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;