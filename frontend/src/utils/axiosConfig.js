import axios from "axios";

console.log("Backend URL:", import.meta.env.VITE_Backend_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_Backend_URL || "http://localhost:5000",
  withCredentials: true,
  timeout: 5000,
});

export default api;