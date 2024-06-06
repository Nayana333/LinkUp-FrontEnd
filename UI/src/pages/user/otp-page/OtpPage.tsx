import React, { useState, ChangeEvent, FormEvent ,useRef, useEffect} from 'react';
import { toast } from 'sonner';
import './OtpPage.css'
import { useLocation, useNavigate } from 'react-router-dom';

function OtpPage() {
  const [code, setCode] = useState<string[]>(Array(4).fill(''));

  const location=useLocation()
  const navigate=useNavigate()

  const queryParams=new URLSearchParams(location.search)
  const email=queryParams.get('email') || ""
  
  
  const[otp1,setOtp1]=useState<string>('');
  const[otp2,setOtp2]=useState<string>('');
  const[otp3,setOtp3]=useState<string>('');
  const[otp4,setOtp4]=useState<string>('')


  const otp1Reg=useRef<HTMLInputElement>(null);
  const otp2Reg=useRef<HTMLInputElement>(null);
  const otp3Reg=useRef<HTMLInputElement>(null)
  const otp4Reg=useRef<HTMLInputElement>(null)



  const initialTimer=parseInt(localStorage.getItem('otptimer') || "60")
  const [timer,setTimer]=useState<number>(initialTimer)
  const [resend,setResend]=useState<boolean>(false)


  useEffect(()=>{
    const countdownIntervel=setInterval(()=>{
      if(timer >0){
        setTimer(timer-1)
        localStorage.setItem("otpTimer",(timer-1).toString())
      }else{
          clearInterval(countdownIntervel)
          setResend(true)
          toast.error("time expired please resend otp")

      }
    },1000)
    return()=>{
      clearInterval(countdownIntervel)
    }
  },[timer])


  const startResendTimer=()=>{
    setResend(false);
    setTimer(60),
    localStorage.setItem("otpTimer","60")
  }

    const handleResendClick=()=>{
      console.log("hello");
      startResendTimer()
      setOtp1('');
      setOtp2('');
      setOtp3('');
      setOtp4('');
      
      
    }


  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(0, 1); 
    setCode(newCode);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Verification Code:', verificationCode);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {code.map((digit, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50  "
                        type="text"
                        value={digit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" id='button'
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <a className="flex flex-row items-center text-custom-green" href="http://" target="_blank" rel="noopener noreferrer">
                      Resend
                    </a>
                  </div>
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
