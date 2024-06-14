import { createBrowserRouter } from 'react-router-dom'

import LandingPage from '../pages/user/Landing/LandingPage'
import Register from '../pages/user/Register/Register'
import OtpPage from '../pages/user/otp-page/OtpPage'
import Rsuccess from '../pages/user/RsuccessPage/Rsuccess'
import Login from '../pages/user/LoginPage/Login'
import ForgotPsw from '../pages/user/Forgot/ForgotPsw'
import ForgotOtpPage from '../pages/user/Forgot-otp/Forgot-otp'
import Reset from '../pages/user/ResetPSW/Reset'
import UserHome from '../pages/user/userHome/UserHome'
import { adminLoginRouter, adminRoute } from "./adminRoute";
import Profile from '../Components/Profile/Profile'


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>
  },{
    path:'/register',
    element:<Register/>
  },{
    path:'/otp',
    element:<OtpPage/>
  },{
    path:'/success',
    element:<Rsuccess/>
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'/forgot',
    element:<ForgotPsw/>
  },{
    path:'/forgot-otp',
    element:<ForgotOtpPage/>
  },{
    path:'/reset',
    element:<Reset/>
  },{
    path:'/home',
    element:<UserHome/>
  },{
    path:'/test',
    element:<Profile/>
  },
  adminRoute,  
  adminLoginRouter,

])

export default appRouter