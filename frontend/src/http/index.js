import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
  }
);

http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return error
  }
)

export default http;
