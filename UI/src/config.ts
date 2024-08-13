console.log(import.meta.env.VITE_APP_BASEURL);

const config = {
    baseURL: import.meta.env.VITE_APP_BASEURL,
    socketBaseURL:import.meta.env.VITE_APP_SOCKET_BASEURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  export const baseURL = config.baseURL;
  export const socketBaseURL = config.socketBaseURL;
  export default config;
  