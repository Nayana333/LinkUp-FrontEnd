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
    addPost:'/post/addPost'
}


export const adminUrl = {
    login: "/admin/adminLogin",
    

}