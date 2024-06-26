import { Bookmark, Heart, MessageCircle,X } from "lucide-react";
import { likePost  } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { setUsePosts, updateUser } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";
import { useState } from "react";
import PostDetails from "./PostDetails";
// import ReportModal from "./ReportModel";
import { Dropdown } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";


interface PostProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      userName: string;
      profileImageUrl: string;
    };
    title: string;
    imageUrl: string;
    description: string;
    likes: any[];
    isHidden: boolean;
    isBlocked: boolean;
    hideComment: boolean;
    hideLikes: boolean;
    date: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
 const[value1,setValue1]=useState(false)
 const[value2,setValue2]=useState(false)
 const [reportModal, setReportModal] = useState(false);
  const[isCommentSection,SetIsCommentSection]=useState(false)
  const handleHideCommentToggle = () => {
    SetIsCommentSection(!isCommentSection);
    setValue1(true)
    setValue2(false)
  };
  const handleLikedPeople=()=>{
    SetIsCommentSection(!isCommentSection);
    setValue1(false)
    setValue2(true)
  }
  const handleClosePostDetails = () => {
    SetIsCommentSection(false); 
  };
  const [isLikedByUser, setIsLikedByUser] = useState(
    post?.likes?.some((like) => like._id === userId)
  );
  const[likeCount,setLikeCount]=useState(post?.likes?.length)


  const openReportModal = () => {
    setReportModal(true);
  };
  const closeReportModal = () => {
    setReportModal(false);
  };
  const [isSavedByUser, setIsSavedByUser] = useState(
    user.savedPosts?.includes(post._id)
  );

  
  const handleLike = (postId: string, userId: string) => {
    try {
      likePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;
          dispatch(setUsePosts({ userPost: postData.posts }));
          setIsLikedByUser(!isLikedByUser);
          if (isLikedByUser) {
         
            setLikeCount((prev) => prev - 1);
            post.likes.pop();
          } else {
           
            setLikeCount((prev) => prev + 1);
            post.likes.push({ _id: userId, userName: user.userName, profileImageUrl: user.profileImageUrl })
          }

        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };


 

  return (
    <div className=" home-post-section bg-white">
      <div className="w-full justify-between px-2">
        <div>
        <div className="flex items-center px-4 py-3">
        <img
          className="h-8 w-8 rounded-full"
          src={post.userId.profileImageUrl}
          alt="Profile"
        />
        <div className="ml-3 ">
          <span className="text-sm font-semibold antialiased block leading-tight">
            {post.userId.userName}
          </span>
          <span className="text-gray-600 text-xs block">
            Asheville, North Carolina
          </span>
        </div>
      </div>


        </div >
        <div className="p-4">
        <Dropdown className="flex border-none " label=""  inline>
        <Dropdown.Item className="text-xs">View Profile</Dropdown.Item>

        {
                       user._id !== post.userId._id  && (

                        <Dropdown.Item onClick={() => openReportModal()} className="text-xs">Report</Dropdown.Item>
                       )
                    }
     


    </Dropdown>
          
        </div>
   
        
      </div>

      <img style={{ width: "600px" }} src={post.imageUrl} alt="Post" />

      <p className="  text-gray-700  ms-4 mt-2 text-xs font-semibold">
        {post.title}
      </p>

      <p className="ms-5 text-xs text-gray-700 ">{post.description}</p><br></br>
      <p
className="text-xs text-gray-400"
style={{ fontSize: "12px", marginLeft:"10px" }}
>
{formatDistanceToNow(
new Date(post.createdAt),
 { addSuffix: true }
)}
</p>

      <div className="flex items-center justify-between mx-4 pb-4 mt-2">
        <div className="flex gap-5">
        <button
                 onClick={() => handleLike(post._id, user._id)}
                 type="button"
               >
                 {isLikedByUser ? (
                   <Heart color="green" fill="green" strokeWidth={1.5} size={22} />
                 ) : (
                   <Heart color="gray" strokeWidth={1.5} size={22} />
                 )}
               </button>

       
 

          {post.hideComment==false&&(
              <button type="button" onClick={handleHideCommentToggle}>
              <MessageCircle color="gray" strokeWidth={1.5} size={22} />
            </button>


          )}

        </div>
      </div>

      {post.hideLikes==false&&(
            <button onClick={handleLikedPeople}>
            <div className="font-semibold text-sm pb-4 mx-4">
              <p>{likeCount} likes</p>
            </div>
      
            </button>
      


    )}


      {isCommentSection && (
            <div className="addpost-popup">
              <div className="addpost-popup">
              <button className="close-button mt-16 me-5" onClick={handleClosePostDetails} ><X size={18}  color="white"/></button>
                <PostDetails  key={post._id} post={post} likesValue={value2} commentsValue={value1} />
        
              </div>
            </div>
          )}

{/* {reportModal && (
  <ReportModal
    userId={userId}
    postId={post._id}
    openReportModal={openReportModal}
    closeReportModal={closeReportModal}
  />
)} */}


   

    </div>



         


                    
  )
      }

export default Post;