import React, { useEffect } from 'react';
import {Form,Formik,Field,ErrorMessage} from 'formik'
import { Link } from 'react-router-dom';
import { initialValues ,validationSchema} from '../../../utils/validation/LoginValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import TextError from '../../../Components/TextError'
import Linkup from '../../../assets/Linkup.svg'
import {AdminLoginPost} from '../../../services/api/admin/AdminApiMethods'
import { LoginAdmin } from '../../../utils/context/reducers/adminAuthSlice';
import './AdminLogin.css'
function AdminLogin() {

   const navigate=useNavigate()
   const dispatch=useDispatch()
   const submit=(values:any)=>{
    AdminLoginPost(values).then((response:any)=>{
        const data=response.data;
        if(response.status===200){
            toast.success(response.message)
            
            dispatch(LoginAdmin({admin:data}))
            console.log(data.token);
            localStorage.setItem("adminToken",data.token),
            navigate('/admin/');  
        }else{
            console.log(response.message);
            toast.error(response.message)
            
        }
    }).catch((error)=>{
        console.log(error?.message);
        toast.error(error?.message)

        
    })
   }

  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src={Linkup} alt="Logo"
              className="w-mx-auto"
          
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Admin Login</h1>
              </div>

              <div className="my-12 border-b text-center">
                
              </div>
            <Formik  initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
                <Form>
              <div className="mx-auto max-w-xs">
                <Field
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  name="email"
                />

                <ErrorMessage name='email' component={TextError} className="text-red-500 text-xs mt-1" />

                <Field
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  name="password"
                /><br></br>
                <ErrorMessage name='password' component={TextError} className="text-red-500 text-xs mt-1" />

                <button
                  className="mt-5 tracking-wide font-semibold  bg-green-700 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >

                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button><br></br>

              </div>
              </Form>
              </Formik>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center hidden lg:flex">
          <div id='images'
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
              "url('https://i.pinimg.com/564x/a5/00/a1/a500a116b35fbcadbfd9618c0406015e.jpg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
