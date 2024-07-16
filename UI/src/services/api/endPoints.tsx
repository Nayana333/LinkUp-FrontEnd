
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
    setUserRole:'/users/SetUserRole',
    userSuggestions:'/users/userSuggestions',
    userDeatils:'/users/userDeatils',
    
   
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
    deleteComment:'/post/deleteComment',
    getUserPost:'/post/getUserPost',
    reportPost:'/post/reportPost',
    savePost:'/post/savePost',
    getSavedPost:'/post/getSavedPost'
}


export const adminUrl = {
    login: "/admin/adminLogin",
    adminUserList:'/admin/userList',
    adminUserBlock:'/admin/blockUser',
    ReportList:'/admin/reportList',
    reportPostBlock:'/admin/reportPostBlock',
    adminPostList:'/admin/adminPostList',
    postBlock:'/admin/postBlock',
    adminJobList:'/admin/adminJobList',
    jobBlock:'/admin/jobBlock'
    

}


export const jobUrls={
    addJob:'/job/addJob',
    listUserJob:'/job/listUserJob',
    userJobBlock:'/job/userJobBlock',
    listJob:'/job/listJob',
    editJob:'job/editJob',
    getJobDetails:'/job/getJobDetails',
    viewJob:'/job/viewJob',
    getFormSelectData:'job/getFormSelectData'
    

}   

export const connectUrl={
    getUserConnection:'/connect/getConnection',
    unfollow:'/connect/unfollow',
    follow:'/connect/follow',
    acceptRequest:'/connect/acceptRequest',
    cancelRequest:'/connect/cancelRequest',
    rejectRequest:'/connect/rejectRequest',
    
}