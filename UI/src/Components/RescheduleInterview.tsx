import { Modal } from "flowbite-react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { addDays } from 'date-fns';
import TextError from "./TextError";
import { editInterview, getUserConnection } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

interface Connection {
    _id: string;
    profile: {
        fullname: string;
    };
    companyProfile?: {
        companyName: string;
    };
}

interface Interview {
    _id: string;
    interviewDate: string;
    interviewTime: string;
    jury: string[];
}

interface RescheduleInterviewProps {
    interview: Interview;
    onCancelEdit: () => void;
    setInterviews: (interviews: Interview[]) => void;
}

interface FormValues {
    interviewDate: string;
    interviewTime: string;
    jury: string[];
}

const validationSchema = Yup.object().shape({
    interviewDate: Yup.date()
        .min(addDays(new Date(), -1), 'Interview date cannot be before today')
        .required('Interview date is required'),
    interviewTime: Yup.string().required('Interview time is required'),
    jury: Yup.array().min(1, 'Select at least one jury member'),
});

const RescheduleInterview: React.FC<RescheduleInterviewProps> = ({ interview, onCancelEdit, setInterviews }) => {
    const { jobId } = useParams<{ jobId: string }>();
    const location = useLocation();
    const { pathname } = location;

    const userData = useSelector((state: any) => state.auth.user);
    const userId = userData._id;
    const [connections, setConnections] = useState<Connection[] | null>(null);
    const [initialValues, setInitialValues] = useState<FormValues>({
        interviewDate: interview.interviewDate || '',
        interviewTime: interview.interviewTime || '',
        jury: interview.jury || [],
    });

    const juryOptions = connections?.map((values) => ({
        value: values._id,
        label: values.profile.fullname ? values.profile.fullname : values.companyProfile?.companyName || ''
    }));

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const response: any = await getUserConnection({ userId });
                const connectionData = response.data.connection;
                setConnections(connectionData.connections);
            } catch (error) {
                console.log(error);
            }
        };

        fetchConnections();
    }, [userId]);

    const handleRescheduleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const { interviewDate, interviewTime, jury } = values;
        const interviewId = interview._id;

        try {
            const response: any = await editInterview({ interviewId, jury, interviewDate, interviewTime });
            const interviewsData = response.data.interviews;

            setInterviews(interviewsData);
            toast.success(response.data.message);
            onCancelEdit();
        } catch (error) {
            console.error(error);
            toast.error("Failed to reschedule interview");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={true}>
            <Modal.Body>
                <div className='flex justify-between items-center'>
                    <p className='text-sm font-semibold'>Reschedule Interview</p>
                    <button onClick={() => onCancelEdit()}>
                        <X size={18} color='gray' />
                    </button>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRescheduleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="w-full">
                            <div className="flex w-full justify-between px-3">
                                <div className="w-1/2">
                                    <label className='text-xs text-gray-600 mt-3' htmlFor="interviewDate">Interview Date</label>
                                    <Field
                                        className="text-xs w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                                        type="date"
                                        id="interviewDate"
                                        name="interviewDate"
                                    />
                                    <ErrorMessage name="interviewDate" component={TextError} className="error-message" />
                                </div>

                                <div className="w-1/2 ms-3">
                                    <label className='text-xs text-gray-600 mt-3' htmlFor="interviewTime">Interview Time</label>
                                    <Field
                                        className="text-xs w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                                        type="time"
                                        id="interviewTime"
                                        name="interviewTime"
                                    />
                                    <ErrorMessage name="interviewTime" component={TextError} className="error-message" />
                                </div>
                            </div>

                            <div className="w-full mt-4">
                                <label className='text-xs text-gray-600 ms-3 mt-3' htmlFor="jury">Jury Members</label>
                                <Select
                                    className="text-xs text-gray-500 p-3 w-full rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                                    id="jury"
                                    name="jury"
                                    options={juryOptions}
                                    isMulti
                                    placeholder="Select jury members"
                                    onChange={(selectedOptions) => {
                                        setFieldValue('jury', selectedOptions ? selectedOptions.map((option) => option.value) : []);
                                    }}
                                />
                                <ErrorMessage name="jury" component={TextError} className="error-message" />
                            </div>

                            <div className="buttons flex justify-end w-full mt-6">
                                <div
                                    onClick={() => onCancelEdit()}
                                    className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white"
                                >
                                    Cancel
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600"
                                >
                                    Re-Schedule Interview
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Footer>
        </Modal>
    );
}

export default RescheduleInterview;
