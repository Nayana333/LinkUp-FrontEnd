import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import  logo from '../../../assets/facebook.svg'
import  logo1 from '../../../assets/ADOBE.svg'
import  logo2 from '../../../assets/TESLA.svg'
import  logo3 from '../../../assets/amazon.svg'
import logo0 from '../../../assets/DigitalOcean.svg'
import Header from '../../../Components/Header';


const LandingPage:React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');



  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    navigate(`/register?email=${email}`);
  };

  const handleChange = (e:any) => {
    setEmail(e.target.value);
  };

  return (
    <>
    <Header/>
      <div className="container mx-auto px-6 py-16 pt-28 text-center">
        <div className="mx-auto max-w-lg">
          <h1 className="title text-black text-4xl">
            Platform to Connect & Hire Experts for any Job
          </h1>
          <p className="mt-6 text-xs text-gray-700">
            Build and engage with your professional network. Access knowledge, insights, and opportunities.
          </p>
          <div className="mx-auto mt-6 w-full max-w-sm bg-white rounded-md border focus-within:border-green-400 focus-within:ring focus-within:ring-green-300 focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-green-300">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                className="text-xs m-1 h-10 flex-1 appearance-none border-none px-4 py-2 text-gray-700 placeholder-gray-400 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:text-gray-700"
              />
              <button
                type="submit"
                className="text-xs m-1 h-10 transform rounded-md bg-green-700 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-900 focus:bg-green-400 focus:outline-none"
              >
                Join Us
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto mt-28 max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <img src={logo0} alt="Logo" />
            </div>
            <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <img src={logo} alt="Logo" />
            </div>
            <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <img src={logo1} alt="Logo" />
            </div>
            <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <img src={logo2} alt="Logo" />
            </div>
            <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <img src={logo3} alt="Logo" />
            </div>
          </div>

          
        </div>
      </div>

      <div className="circles">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default LandingPage;
