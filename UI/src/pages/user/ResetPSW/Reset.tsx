import './Reset.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormValues, initialValues, validationSchema } from '../../../utils/validation/changePasswordValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { newPassword } from '../../../services/api/user/apiMethods';
import TextError from '../../../Components/TextError';

const Reset = () => {
  const navigate = useNavigate();

  const submit = (values: FormValues, { setSubmitting }: any) => {
    newPassword(values)
      .then((response: any) => {
        toast.success(response.message);
        navigate('/login');
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex h-screen">
      <div id="reset" className="hidden login lg:flex items-center justify-center flex-1 bg-white text-black"></div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center">
      
        <div className="max-w-md w-full p-6">
          <p className="title text-4xl font-black mb-2 text-black">Set new password.</p>
          <h1 className="text-sm mb-6 text-gray-500">Please use a strong password</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="mt-5 text-xs p-3 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  />
                  <ErrorMessage name="password" component={TextError} className="text-red-500 text-xs mt-1" />
                </div>
                <div className="mt-5">
                  <Field
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="mt-1 text-xs p-3 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  />
                  <ErrorMessage name="confirmPassword" component={TextError} className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full text-sm bg-green-700 text-white p-3 mt-8 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                    disabled={isSubmitting}
                  >
                    Reset Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Reset;
