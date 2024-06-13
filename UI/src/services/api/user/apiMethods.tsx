import { userUrls } from "../endPoints";
import apiCalls from "./apiCalls";
import { FormValues } from "../../../utils/validation/signUpValidation";
import { useRouteLoaderData } from "react-router-dom";

export const postRegister = (userData: FormValues) => { 
  console.log(userData);
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", userUrls.register, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject({ status: 500, message: "Error" });
    }
  });
};


export const postOtp = (otp: { otp: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", userUrls.verifyOTP, otp)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postResendOtp=(email:{email:string})=>{
  return new Promise((resolve,reject)=>{
    try{
      apiCalls("post",userUrls.resendOTP,email).then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:"something went wrong"})
    }
  })
}

export const postLogin = (userData:{email:string,password:string}) => {
  console.log(userData);
  
  return new Promise((resolve, reject) => {
      try {
          apiCalls('post', userUrls.login, userData).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          })
      } catch (error) {
          resolve({ status: 500, message:"Somethings wrong." });
      }
  })

}


export const postForgot=(email:{email:string})=>{
  console.log(email);
  
  return new Promise((resolve)=>{
    try{
      apiCalls('post',userUrls.forgotPsw,email).then((response)=>{

        resolve(response)
      })
    }catch(error){
      resolve({status:500,message:"something went wrong"})
    }
  })
}


export const postForgotOtp = (otp: { otp: string }) => {
  console.log(otp);
  
  return new Promise((resolve, reject) => {
    try {
      apiCalls("post", userUrls.forgotOtp, otp)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};


export const newPassword = (userData: { password: string; confirmPassword: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCalls('put', userUrls.newPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "something went wrong" });
    }
  });
};

export const  googleAuthenticate = (userData:{userName:string,email:string}) => {
  return new Promise((resolve, reject) => {
      try {
          apiCalls('post', userUrls.googleAuth, userData).then((response)=>{
              resolve(response);
          }).catch((err)=>{
              reject(err);
          })
      } catch (error) {
          resolve({ status: 500, message:"Somethings wrong." });
      }
  })

}

export const postPreferences = (userData:{userType:any,isHiring:any,userId:string}) => {
  return new Promise((resolve, reject) => { 
    try {
      apiCalls('post', userUrls.setPreferences, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: 'Something went wrong' }); 
    }
  });
};

export const setBasicInformation=(userData:any)=>{
  console.log(userData);
  
  return new Promise((resolve,reject)=>{
    try{
      apiCalls('post',userUrls.basicInformation,userData)
      .then((response)=>{
        resolve(response)
      })
      .catch((err)=>{
        reject(err)
      })
    }catch(error){
      resolve({status:500,message:"something went wrong"})
    }
  })
}