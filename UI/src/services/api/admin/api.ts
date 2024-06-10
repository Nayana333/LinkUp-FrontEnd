import axios,{AxiosError} from "axios";

export const adminApi=axios.create({
    baseURL:'http://localhost:3000/api/',
    headers:{"Content-Type":'application/json'},
    withCredentials:true
})