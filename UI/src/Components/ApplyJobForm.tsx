import React, { useState } from 'react';
import { Button, Modal, Spinner } from "flowbite-react";
import { X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { updateUser } from '../utils/context/reducers/authSlice';
import { baseURL } from '../config';

interface Job {
  _id: string;
  jobRole: string;
  companyName: string;
}

interface ApplyJobFormProps {
  job: Job | null;
  cancelApplyJob: () => void;
}

const ApplyJobForm: React.FC<ApplyJobFormProps> = ({ job, cancelApplyJob }) => {
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user || '';
  const user = useSelector(selectUser) || '';
  const userId = user._id;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    resume: Yup.mixed().required('Resume is required')
      .test('fileSize', 'File too large', (value: any) => value && value.size <= 5000000)
      .test('fileType', 'Invalid file type', (value: any) => value && value.type === 'application/pdf'),
    coverLetter: Yup.string().required('Cover letter is required'),
  });

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('jobId', job?._id || '');
      formData.append('applicantId', userId);
      formData.append('coverLetter', values.coverLetter);
      formData.append('resume', values.resume);

      const response = await axios.post(`${baseURL}job/apply-job`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        dispatch(updateUser({ user: response.data }));
      } else {
        toast.error(response.data.message);
      }
      resetForm();
      cancelApplyJob();
    } catch (error) {
      console.log('error in uploading file', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Modal show={true}>
      <Modal.Body>
        <div className='flex justify-between items-center mb-3'>
          <p className='text-sm font-semibold'>Apply Job</p>
          <button onClick={cancelApplyJob}>
            <X size={18} color='gray' />
          </button>
        </div>
        <div className="w-full mb-4 text-xs rounded-md">
          <div className="flex gap-2">
            <p className="text-xs text-gray-600">Applying for the position of:</p>
            <p className="font-semibold">{job?.jobRole || 'N/A'}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xs text-gray-600">Applying at:</p>
            <p className="font-semibold">{job?.companyName || 'N/A'}</p>
          </div>
        </div>
        <Formik
          initialValues={{ resume: null, coverLetter: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full p-5">
              <div className="mb-4 w-full flex flex-col gap-2">
                <label className="text-xs text-gray-600" htmlFor="coverLetter">Cover Letter:</label>
                <Field name="coverLetter" as="textarea" className="h-40 text-xs p-3 w-full border border-gray-300 rounded-md" />
                <ErrorMessage name="coverLetter" component="div" className="text-red-500" />
              </div>
              <div className="mb-4 w-full flex flex-col gap-2">
                <label className="text-xs text-gray-600" htmlFor="resume">Resume (PDF only):</label>
                <Field name="resume">
                  {({ form, field }: any) => (
                    <input
                      type="file"
                      id="resume"
                      className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      accept=".pdf"
                      onChange={(event: any) => {
                        const file = event.currentTarget.files[0];
                        if (file && file.type === 'application/pdf') {
                          form.setFieldValue('resume', file);
                        } else {
                          form.setFieldValue('resume', null);
                          toast.error('Invalid file type. Only PDF files are allowed.');
                        }
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="resume" component="div" className="text-red-500" />
              </div>
              <div className="buttons flex justify-end w-full">
                <div
                  onClick={cancelApplyJob}
                  className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </div>
                {loading ? (
                  <Button className="bg-gray-900 rounded ml-2" style={{ height: '35px' }}>
                    <Spinner aria-label="Spinner button example" />
                    <span className="pl-3 text-xs">Applying...</span>
                  </Button>
                ) : (
                  <button
                    type="submit"
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600"
                    disabled={isSubmitting}
                  >
                    Apply Job
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyJobForm;
