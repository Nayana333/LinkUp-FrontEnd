import {adminUrl} from '../endPoints'
import adminApiCalls from './AdminApiCalls'
import { adminApi } from './api';


export const AdminLoginPost=(adminData:any)=>{
    return new Promise((resolve,reject)=>{
        console.log(adminData);
        
        try{
            adminApiCalls("post",adminUrl.login,adminData).then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        }catch(error){
            reject(error)
    
        }
    })
}

export const adminUserList = (page:number) => {
    return new Promise((resolve, reject) => {
        try {
            const queryParams = `?page=${page}`
            adminApiCalls("get", adminUrl.adminUserList+queryParams, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

export const   adminUserBlock=(userId:{userId:string})=>{
    return new Promise((resolve,reject)=>{

        try{
            adminApiCalls('post',adminUrl.adminUserBlock,userId)
            .then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        }catch(error){
            reject(error)
        }
    })
}



export const ReportList=(page:number)=>{
    return new Promise((resolve,reject)=>{
        try{
        const queryParams=`?page=${page}`
        adminApiCalls('get',adminUrl.ReportList+queryParams,null)
        .then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    }catch(error){
        reject(error)
        
    }
    })
}


export const adminPostBlockReport=(postId:{postId:string})=>{
    return new Promise((resolve,reject)=>{
        try{
            adminApiCalls("post",adminUrl.reportPostBlock,postId)
            .then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        }catch(error){
            reject(error)
        }
    })
}

export const adminPostList=(page:number)=>{
    return new Promise((resolve,reject)=>{
        try{
        const queryParams=`?page=${page}`
        adminApiCalls('get',adminUrl.adminPostList+queryParams,null)
        .then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    }catch(error){
        reject(error)
        
    }
    })
}

export const postBlock=(postId:{postId:string})=>{
    return new Promise((resolve,reject)=>{
        try{
            adminApiCalls("post",adminUrl.postBlock,postId)
            .then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        }catch(error){
            reject(error)
        }
    })
}


export const adminJobList=(page:number)=>{
    return new Promise((resolve,reject)=>{
        try{
        const queryParams=`?page=${page}`
        adminApiCalls('get',adminUrl.adminJobList+queryParams,null)
        .then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    }catch(error){
        reject(error)
        
    }
    })
}


  export const jobBlock= (jobId:string) => {
    console.log('job id',jobId);
    
    return new Promise((resolve, reject) => {
        try {
         adminApiCalls("post",adminUrl.jobBlock , jobId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
  };


  export const getDashboardStatus= () => {
    return new Promise((resolve, reject) => {
      try {       
        adminApiCalls("get", adminUrl.getDashboardStatus,null)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };


  export const chartData = () => {
    return new Promise((resolve, reject) => {
      adminApiCalls('get', adminUrl.chartData, null)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  

  export const getAdminNotifications= (userId: { userId: string }) => {
    return new Promise((resolve, reject) => {
      try {
        
        
        adminApiCalls("post", adminUrl.getAdminNotifications, userId)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };