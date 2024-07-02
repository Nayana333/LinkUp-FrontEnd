import axios,{AxiosError} from "axios";
import config from "../../../config";

export const adminApi = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
    withCredentials: true,
  });

  adminApi.interceptors.request.use(
    async (config) => {
      const adminToken = localStorage.getItem('adminToken');
    
     
      if (adminToken) {
        config.headers['Authorization'] = `Bearer ${adminToken}`;
      }
  
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );