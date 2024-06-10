import {adminUrl} from '../endPoints'
import adminApiCalls from './AdminApiCalls'


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