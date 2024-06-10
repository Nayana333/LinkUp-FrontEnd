import AdminLogin from '../pages/admin/AdminLogin/AdminLogin'
import AdminDashboard from '../pages/admin/DashBoard/DashBoard'

export const  adminRoute={
    path:'/admin',
    element:<AdminDashboard/>

}

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />,
  }