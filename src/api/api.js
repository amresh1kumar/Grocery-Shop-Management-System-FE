import axios from "axios";
import config from "../config/config";

// console.log(config)  //  API_BASE_URL: "http://localhost:8000/"


const API = axios.create({
   baseURL: config.API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

// API.interceptors.request.use((req) => {
//    const token = localStorage.getItem("token");
//    if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//    }
//    return req;
// });
// Add auth token automatically if available

API.interceptors.request.use((req) => {
   const token = localStorage.getItem("token");
   if (token && !req.url.includes("register/") && !req.url.includes("login/")) {
      req.headers.Authorization = `Bearer ${token}`;
   }
   return req;
});




export default API;
