import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError';
import {addJob} from '../services/api/user/apiMethods'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {

const navigate=useNavigate()
const selectUser=(state:any)=>state.auth.user;
const user=useSelector(selectUser) || ''
const userId=user._id ||''

const initialValues={
    companyName:"",
    jobRole:'',
    experience:'',
    salary:'',
    jobType:'',
    jobLocation:'',
    lastDateToApply:'',
    requiredSkills:'',
    jobDescription:'',
    qualification:''
}
const validationSchema = Yup.object({
    companyName: Yup.string()
      .trim()
      .required('Company name is required'),
    jobRole: Yup.string()
      .trim()
      .required('Job role is required')
      .matches(/^[^\d]+$/, 'Job role cannot contain numbers'),
    experience: Yup.number()
      .typeError('Experience must be a number')
      .required('Experience is required')
      .min(0, 'Experience cannot be less than 0'),
      salary: Yup.number()
      .typeError('Salary must be a number')
      .required('Salary is required')
      .min(0, 'Salary cannot be less than 0'),
  
    jobType: Yup.string()
      .trim()
      .required('Job type is required'),
    jobLocation: Yup.string()
      .trim()
      .required('Job location is required')
      .matches(/^[^\d]+$/, 'Job Location cannot contain numbers'),
    lastDateToApply: Yup.date()
      .required('Last date to apply is required')
      .min(new Date(), 'Last date to apply must be a future date'),
    requiredSkills: Yup.string()
      .trim()
      .required('Required skills are required')
      .matches(/^[^\d]+$/, 'skills  cannot contain numbers'),
    jobDescription: Yup.string()
      .trim()
      .required('Job description is required'),
    qualification: Yup.string()
      .trim()
      .required('Qualification is required')
      .matches(/^[^\d]+$/, 'Qualification cannot contain numbers')
      , 
  });


  const handleSubmit=(values:any,{setSubmitting}:any)=>{
    console.log(values);
    const data={...values,userId:userId}
    addJob(data)
    setSubmitting(false)
    // navigate('/jobs/hiring/job-list')

    
  }




   
}

export default AddJob