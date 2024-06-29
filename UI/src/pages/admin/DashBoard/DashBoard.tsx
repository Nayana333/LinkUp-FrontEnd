import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from '../../../Components/AdminHeader'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminSideNav from "../AdminSideNav/AdminSideNav";

function AdminDashboard() {
    const selectUser = (state:any)=>state.adminAuth.admin;
    const admin = useSelector(selectUser);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!admin ) {
        navigate("/admin/login");
      }
    },[admin,  navigate]);
    return (
      <div className='main bg-gray-100 ' style={{height:"900px"}}>
  <AdminHeader/>
  <div className='flex '>
    <AdminSideNav/>
    <Outlet/>
  
  </div>
  </div>
    )
  }
  
  export default AdminDashboard