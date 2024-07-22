import { useEffect, useState } from 'react';
import { getSavedPost } from '../services/api/user/apiMethods';
import PostSkeletonUi from './SkeltonUi/PostSkeltonUi';
import Post from './Post';
import { useSelector } from 'react-redux';

function SavedPosts() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getSavedPost(userId)
          .then((response: any) => {
            const postsData = response.data.posts;
            setPosts(postsData);
            console.log(posts);
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
  }, [user]);

  return (
    <div>
      {loading && <PostSkeletonUi />}
      {posts?.length > 0 && (
        <div className="posts">
          {posts.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedPosts;
