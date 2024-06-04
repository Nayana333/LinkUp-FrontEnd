import axios, { AxiosResponse, AxiosError } from 'axios';

export const apiCall = async (method: string, url: string, data: any): Promise<any> => {
  try {
    let response: AxiosResponse;
    
    if (method === 'post') {
      response = await axios.post(url, data);
    } else if (method === 'get') {
      response = await axios.get(url, { params: data });
    } else if (method === 'put') {
      response = await axios.put(url, data);
    } else if (method === 'patch') {
      response = await axios.patch(url, data);
    } else if (method === 'delete') {
      response = await axios.delete(url, { data });
    } else {
      throw new Error('Invalid HTTP method');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code
        throw axiosError.response.data;
      } else if (axiosError.request) {
        // No response received
        throw { status: 500, message: 'No response from server' };
      } else {
        // Request setup error
        throw { status: 500, message: axiosError.message || 'Unknown error' };
      }
    } 
  }
};
