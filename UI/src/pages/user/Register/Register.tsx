import './Register.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postRegister } from '../../../services/api/user/apiMethods';
import {  logged } from '../../../utils/context/reducers/authSlice';
import { FormValues,initialValues } from '../../../utils/validation/signUpValidation';

function Register() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const [userEmail, setUserEmail] = useState(email);  

  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const initialValues = { 
    userName: '', 
    email: userEmail, 
    password: '', 
    confirmPassword: '' 
  };

  useEffect(() => {
    if (email.length !== 0) {
      initialValues.email = userEmail;
    }
  }, [initialValues, userEmail]);

  const submit = (values: FormValues) => {
    postRegister(values)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(response.message);
        } else {
          console.log(response.message);
        }
      })
      .catch((error: Error) => {
        console.log(error?.message);
      });
  };
   
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  {/* Google Sign Up Button */}
                </button>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>
                
                <Formik initialValues={initialValues} onSubmit={submit}>
                  <Form className="mx-auto max-w-xs">
                    <Field
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text" 
                      name="userName" 
                      id="userName"
                      placeholder="User Name"
                    />
                    <ErrorMessage name='userName' component="div" />
                    {/* Similar fields for email, password, confirmPassword */}
                    <button 
                      type="submit" 
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                      <span className="ml-3">Sign Up</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by templatana's
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p>              
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="flex-1 bg-indigo-100 text-center hidden lg:flex" 
          id='signup'
          style={{
            backgroundImage: "url('src/assets/bg1.jpg')",
          }}
        ></div>
      </div>
    </div>
  );    
};

export default Register;
