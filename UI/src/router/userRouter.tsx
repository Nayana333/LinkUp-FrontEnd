import { createBrowserRouter } from 'react-router-dom'

import LandingPage from '../pages/user/Landing/LandingPage'
import Register from '../pages/user/Register/Register'


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>
  },{
    path:'/register',
    element:<Register/>
  }

])

export default appRouter