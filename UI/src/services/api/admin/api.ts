import axios,{AxiosError} from "axios";
import config from "../../../config";

export const adminApi = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
    withCredentials: true,
  });