import axios,{AxiosError} from "axios";

export const api=axios.create({
    baseURL:'http://localhost:3000/api/',
    headers:{"Content-Type":'application/json'},
    withCredentials:true
})

api.interceptors.request.use(
    async (config) => {
  
  
  
      const authToken = localStorage.getItem('userToken');
         
      if (authToken) {
       
      config.headers['Authorization'] = `Bearer ${authToken}`;
      }
  
  
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );