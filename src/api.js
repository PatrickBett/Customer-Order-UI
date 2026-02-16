import axios from "axios";

const api = axios.create({
  baseURL: "https://customers-and-orders-api.onrender.com",
  withCredentials: true, // 🔴 VERY IMPORTANT (sends cookies)
});

export default api;
