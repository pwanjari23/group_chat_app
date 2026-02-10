import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/user", // your backend base URL
});

export default API;
