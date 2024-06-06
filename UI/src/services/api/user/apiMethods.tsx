import { userUrls } from "../endPoints";
import apiCalls from "./apiCalls";
import { FormValues } from "../../../utils/validation/signUpValidation";

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
