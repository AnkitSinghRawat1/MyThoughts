import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor

http.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && originalRequest && !originalRequest._isRetry){
      originalRequest._isRetry = true
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });

        return http.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error
  }
);

// response interceptor
http.interceptors.response.use(
  (res) => {
    console.log(res.data);
    return res.data
  },
  (error) => {
    return error.response.data
  }
)

export default http;
