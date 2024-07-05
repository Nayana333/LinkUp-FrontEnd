import "./UserHome.css";
import AddPost from '../../../Components/AddPost/AddPost';
import Post from "../../../Components/Post";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/api/user/apiMethods";
import PostSkeletonUi from '../../../Components/SkeltonUi/PostSkeltonUi';
import Preferences from "../../../Components/Preferences/Preferences";
import BasicInformations from "../../../Components/Basicinformations";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

function UserHome() {

  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
      } catch (error) {
        console.log(error);
      }
    };
    if (page > 1 || posts.length === 0) {
      console.log(page, posts.length)
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

    window.addEventListener("scroll", handleScroll);
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
                    {hasMore &&
                      <div className="flex justify-center">
                        < button className="flex items-center text-green-500 border border-green-600 py-2 px-6 gap-2 rounded inline-flex items-center" onClick={handlePageCount}>
                          <span>
                            View More
                          </span>
                          <svg className="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            viewBox="0 0 24 24" className="w-6 h-6 ml-2">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </button>

                      </div>}
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
              {/* Additional content can be placed here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserHome;




