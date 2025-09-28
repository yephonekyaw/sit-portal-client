import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
