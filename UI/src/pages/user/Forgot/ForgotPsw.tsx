import './ForgotPsw.css'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast,Toaster } from 'sonner'
import { postForgot } from '../../../services/api/user/apiMethods'
import Linkup from '../../../assets/Linkup.svg'

const ForgotPsw = () => {
  const navigate = useNavigate();
  localStorage.removeItem('otpTimer');

  const initialValues = { email: "" };
  const submit = (values: { email: string }) => {
    postForgot(values)
      .then((response: any) => {
        const data = response.data;
        toast.success(data.message);
        navigate(`/forgot-otp?email=${data.email}`)
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      
      <Toaster/>
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      { <img
            src={Linkup}
            className="mr-3 h-6 sm:h-9"
            alt="CircleUp logo"
          /> }
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <p className="title text-4xl font-black mb-2 text-black">Forgot Password.</p>
                <h1 className="text-sm mb-6 text-gray-500">Enter your email for password reset instructions</h1>
              </div>
              <div className="mx-auto max-w-xs">
                <Formik initialValues={initialValues} onSubmit={submit}>
                  <Form>
                    <Field
                      style={{ height: '50px' }}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    <button
                      type="submit"
                      style={{ letterSpacing: 'normal', fontWeight: 300 }}
                      className="mt-5 tracking-wide font-semibold bg-green-700 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Send password reset link
                      <span className="ml-3"></span>
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1   lg:flex">
          <div
            className=" w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://i.pinimg.com/736x/62/b0/81/62b081991ac67bb1345112c553612737.jpg')",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPsw;
