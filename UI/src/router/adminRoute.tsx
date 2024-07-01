


import AdminLogin from '../pages/admin/AdminLogin/AdminLogin';
import AdminDashboard from '../pages/admin/DashBoard/DashBoard';
import UserList from '../pages/admin/UserList/UserList';
import Error from '../Components/ErrorPage/Error';
import AdminReportList from '../pages/admin/ReportList/ReportList';
import PostList from '../pages/admin/PostList/PostList';

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />,
};

export const adminRoute = {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
        {
            path: 'users',
            element: <UserList />,
            errorElement: <Error />,

        },
        
       {
        path:'reports',
        element:<AdminReportList/>
       },{
        path:'posts',
        element:<PostList/>
       }
    ],
};