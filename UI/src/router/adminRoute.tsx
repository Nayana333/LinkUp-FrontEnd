// import { Children } from 'react'
// import AdminLogin from '../pages/admin/AdminLogin/AdminLogin'
// import AdminDashboard from '../pages/admin/DashBoard/DashBoard'
// import UserList from '../pages/admin/UserList/UserList'



// export const adminLoginRouter = {
//     path: "/admin/login",
//     element: <AdminLogin />,
//   }


//   export const  adminRoute={
//     path:'/admin',
//     element:(
//     <AdminDashboard/>
//     ),
//     Children:[
//         {
//             path:'/admin/users',
//             element:(
//                 <UserList/>
//             )
            
//         }
    
    
//     ]

// }


import AdminLogin from '../pages/admin/AdminLogin/AdminLogin';
import AdminDashboard from '../pages/admin/DashBoard/DashBoard';
import UserList from '../pages/admin/UserList/UserList';

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
        },
        // Add other nested routes here
    ],
};