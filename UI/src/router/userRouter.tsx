import { createBrowserRouter } from 'react-router-dom';

import LandingPage from '../pages/user/Landing/LandingPage';
import Register from '../pages/user/Register/Register';
import OtpPage from '../pages/user/otp-page/OtpPage';
import Rsuccess from '../pages/user/RsuccessPage/Rsuccess';
import Login from '../pages/user/LoginPage/Login';
import ForgotPsw from '../pages/user/Forgot/ForgotPsw';
import ForgotOtpPage from '../pages/user/Forgot-otp/Forgot-otp';
import Reset from '../pages/user/ResetPSW/Reset';
import UserHome from '../pages/user/userHome/UserHome';
import { adminLoginRouter, adminRoute } from './adminRoute';
import Profile from '../Components/Profile/Profile';
import NotFoundPage from '../Components/ErrorPage/NotFound';
import UserBio from '../Components/UserBio';
import NotAuthorized from '../Components/ErrorPage/NotAuthorized';
import App from '../App';
import Error from '../Components/ErrorPage/Error';
import UserPost from '../Components/UserPost';
import ProfilePage from '../pages/user/ProfilePage/ProfilePage';

const appRouter = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/otp',
    element: <OtpPage />,
  },
  {
    path: '/success',
    element: <Rsuccess />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot',
    element: <ForgotPsw />,
  },
  {
    path: '/forgot-otp',
    element: <ForgotOtpPage />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '/notFound',
    element: <NotFoundPage />,
  },
  {
    path: '/notAuthorized',
    element: <NotAuthorized />,
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/home',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <UserHome />,
      },
    ],
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <Error />,
    children: [
      {
        path: 'bio',
        element: <UserBio />,
      },
      {
        path: 'user-post',
        element: <UserPost />,
        errorElement:<Error/>
      },
    ],
  },
  adminRoute,
  adminLoginRouter,
]);

export default appRouter;
