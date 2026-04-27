import axios from "axios";

const api = axios.create({
  baseURL: "https://dat255project-production.up.railway.app",
});

export default api;
