import { newPassword } from "./user/apiMethods";

export const userUrls ={
    register:'/users/register' ,
    verifyOTP:'/users/register-otp',
    resendOTP:'/users/resent-otp',
    login:'/users/login',
    forgotPsw:'/users/forgotPsw',
    forgotOtp:'/users/forgotOtp',
    newPassword:'/users/resetPsw',
    googleAuth:'/users/googleAuth',
    setPreferences:'/users/setPreferences',
    basicInformation:'/users/basicInformation',
    setUserRole:'/users/SetUserRole'
    
   
}


export const postUrls={
    addPost:'/post/addPost',
    getAllPosts:'/post/getAllPosts',
    likePost:'/post/likePost',
    deletePost:'/post/deletePost',
    editPost:'/post/editPost',
    getAllPostComments:'/post/getAllPostComments',
    addComment:'/post/addComment',
    replyComment:'post/replyComment',
    deleteComment:'/post/deleteComment'
}


export const adminUrl = {
    login: "/admin/adminLogin",
    

}