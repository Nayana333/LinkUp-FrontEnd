import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import './OtpPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { postOtp,postResendOtp } from '../../../services/api/user/apiMethods';
import Linkup from '../../../assets/Linkup.svg'
function OtpPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || "";

  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');

  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);

  const initialTimer = parseInt(localStorage.getItem('otptimer') || "60");
  const [timer, setTimer] = useState<number>(initialTimer);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        localStorage.setItem("otpTimer", (timer - 1).toString());
      } else {
        clearInterval(countdownInterval);
        setResend(true);
        toast.error("Time expired, please resend OTP");
      }
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
  }, [timer]);

  const startResendTimer = () => {
    setResend(false);
    setTimer(60);
    localStorage.setItem("otpTimer", "60");
  };

  const handleResendClick = () => {
    console.log("hello");
    startResendTimer();
    setOtp1('');
    setOtp2('');
    setOtp3('');
    setOtp4('');

    // Assuming postResendOtp is a function that sends a request to resend the OTP
    postResendOtp({ email: email }).then((response: any) => {
      toast.success("OTP has been resent to " + response.data.email);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleOtpChange = (
    otp: string,
    setOtp: React.Dispatch<React.SetStateAction<string>>,
    prevRef: React.RefObject<HTMLInputElement> | null,
    nextRef: React.RefObject<HTMLInputElement> | null,
  ) => {
    const regex = /^[0-9\b]+$/;
    if (otp === '' || regex.test(otp)) {
      setOtp(otp);
      if (otp === '' && prevRef && prevRef.current) {
        prevRef.current.focus();
      } else if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timer === 0) {
      setResend(true);
      toast.info("OTP has expired, please resend");
      return;
    }

    const otp: string = otp1 + otp2 + otp3 + otp4 || "";
    if (otp.trim().length !== 4) {
      toast.error("Enter valid OTP");
      return;
    }

    const payload = { otp };
    postOtp(payload).then((response: any) => {
      localStorage.removeItem('otpTimer');
      const data = response.data;
      if (response.status === 200) {
        toast.success(data.message);
        navigate('/success')
      } else {
        console.log(response.message);
        toast.error(data.message);
      }
    }).catch((error) => {
      console.log(error?.message);
    });
  };

  return (
    
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
       { <img
            src={Linkup}
            className="mr-3 h-6 sm:h-9"
            alt="CircleUp logo"
          /> }<br></br>
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>OTP Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} method="post">
              <div className="flex flex-col space-y-8">
                <div className="flex justify-between" id="box">
                  <div className="w-16 h-16">
                    <input
                      ref={otp1Ref}
                      type="text"
                      value={otp1}
                      onChange={(e) => handleOtpChange(e.target.value, setOtp1, null, otp2Ref)}
                      maxLength={1}
                      className="otp-input w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      ref={otp2Ref}
                      type="text"
                      value={otp2}
                      onChange={(e) => handleOtpChange(e.target.value, setOtp2, otp1Ref, otp3Ref)}
                      maxLength={1}
                      className="otp-input w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      ref={otp3Ref}
                      type="text"
                      value={otp3}
                      onChange={(e) => handleOtpChange(e.target.value, setOtp3, otp2Ref, otp4Ref)}
                      maxLength={1}
                      className="otp-input w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      ref={otp4Ref}
                      type="text"
                      value={otp4}
                      onChange={(e) => handleOtpChange(e.target.value, setOtp4, otp3Ref, null)}
                      maxLength={1}
                      className="otp-input w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                    />
                  </div>
                </div>

                <div className='flex justify-between  items-center ' >
                  <div className='flex gap-2  items-center'>
                    <p className='text-xs text-grey-600'>Expires in {timer} seconds</p>
                  </div>
                  {resend ? <button
                    onClick={handleResendClick}
                    className='text-xs font-semibold text-red-600 hover:underline focus:outline-none'
                  >
                    Resend OTP
                  </button> : ""}
                </div>
                <div>
                  <button type="submit" className="w-full text-sm bg-green-600 text-white p-3 mt-5 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Verify Account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
