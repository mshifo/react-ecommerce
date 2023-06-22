import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`
});


export default axiosInstance;