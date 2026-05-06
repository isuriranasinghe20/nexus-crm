import axios from "axios";

const API = axios.create({
  baseURL: "https://nexus-crm-1-0uxu.onrender.com/api"
});

API.interceptors.request.use(req=>{
  const token = localStorage.getItem("token");
  if(token) req.headers.Authorization = token;
  return req;
});

export default API;