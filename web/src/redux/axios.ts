import axios from "axios";

import { API_URL } from "../util/constants";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
});

axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

export default axiosInstance;
