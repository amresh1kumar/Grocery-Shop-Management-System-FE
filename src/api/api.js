import axios from "axios";
import config from "../config/config";

const api = axios.create({ 
   baseURL: config.API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

api.interceptors.request.use((req) => {
   const token = localStorage.getItem("token");
   if (token && !req.url.includes("register/") && !req.url.includes("login/")) {
      req.headers.Authorization = `Bearer ${token}`;
   }
   return req;
});

export default api;