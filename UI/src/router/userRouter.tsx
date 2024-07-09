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
import JobsHiring from '../pages/user/jobs/JobsHiring';
import  HiringJobList from '../Components/HiringJobList';
import JobsOpenWork from '../pages/user/jobs/JobsOpenToWork'
import Jobs from '../Components/Jobs';
import AddJob from '../Components/AddJob';
import EditJob from '../Components/EditJob';
import JobDetails from '../pages/user/jobs/JobDetails';
import ViewJob from '../Components/ViewJob/ViewJob';
import Protect from './Protect/Protect';
import SavedCollection from '../Components/SavedCollections';
import SavedPost from '../Components/SavedPost';
import ViewerProfile from '../pages/user/ViewerProfile/ViewerProfile';
import ViewerBio from '../Components/ViewerBio';
import ViewerPost from '../Components/ViewerPost';
import ViewerConnections from '../Components/ViewerConnections';
import ViewerJobs from '../Components/ViewerJob';
import People from '../pages/People/People';
import PeopleDiscover from '../Components/PeopleDIscover';




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
    element:
    (
      <Protect>
         <App />
      </Protect>
   
  ), 
    errorElement: <Error />,
    children: [
      {
        path: '/home',
        element: <UserHome />,
       
      },
      {
        path:'/home/saved',
        element:<SavedCollection/>,

        children:[
          {
            path:'/home/saved/posts',
             element:<SavedPost/>

          }
        ]
      }
    ],
  },
  {
    path: '/profile',
     
    element: (
      <Protect>
    <ProfilePage />
    </Protect>
  ),
    errorElement: <Error />,
    children: [
      {
        path: 'bio',
        element: <UserBio />,
      },
      {
        path: 'user-post',
        element: <UserPost />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '/jobs',
    element:(
      <Protect>
    <App />
    </Protect>

    ) ,
    errorElement: <Error />,
    children: [
      {
        path: '/jobs/hiring',
        element: <JobsHiring />,
        children:[
          {
            
              path:"/jobs/hiring/jobList",
              element:<HiringJobList/>
            
          },
          {
            path:"/jobs/hiring/add-job",
            element:<AddJob/>
          },
          {
            path:"/jobs/hiring/edit-job/:jobId",
            element:<EditJob/>
          },
          
        ]
      },
      {
        path:"/jobs/open-to-work",
        element: ( 
           <JobsOpenWork/>
        ),
        
        
        children:[
          {
            path:'/jobs/open-to-work/job-list',
            element:<Jobs/>
          }
        ]
      },
      {
        path:'/jobs/view-job/',
        element:(
          <JobDetails/>
        ),
        children:[
        {
          path:'/jobs/view-job/job-info/:jobId',
          element:<ViewJob/>
        }

        ]

      }
    ],
  },
  {
    path: '/visit-profile/',
    element: <ViewerProfile />,
    children: [
      {
        path: 'bio/:userId', 
        element: <ViewerBio />
      },
      {
        path:'posts/:userId',
        element:<ViewerPost/>
      },
      {
        path:'connections/:userId',
        element:<ViewerConnections/>
      },
      {
        path:'jobs/:userId',
        element:<ViewerJobs/>
      }

    ]
  },{

    path:'/people',
    element: (
      <Protect>
     <App/>
      </Protect>
    ),
    children:[
      {
        path:'/people',
        element:<People/>,
        children:[
          {
            path:'/people/discover',
            element:<PeopleDiscover/>
          }
        ]
      }
    ]
  },
  adminRoute,
  adminLoginRouter,
]);

export default appRouter;
