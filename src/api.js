import axios from "axios";

const api = axios.create({
  baseURL: "https://customerorder.netlify.app",
  withCredentials: true, // 🔴 VERY IMPORTANT (sends cookies)
});

export default api;
