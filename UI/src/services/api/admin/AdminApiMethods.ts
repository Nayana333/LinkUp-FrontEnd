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


export const adminPostBlockReport=(postId:{postId:string,})=>{
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