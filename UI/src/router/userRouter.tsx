import { createBrowserRouter } from 'react-router-dom'

import LandingPage from '../pages/user/Landing/LandingPage'
import Register from '../pages/user/Register/Register'
import OtpPage from '../pages/user/otp-page/OtpPage'
import Rsuccess from '../pages/user/RsuccessPage/Rsuccess'


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
  }

])

export default appRouter