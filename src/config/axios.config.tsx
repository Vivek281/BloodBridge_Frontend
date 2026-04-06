import axios from "axios";
import { AppConfig } from "./appConfig";
import Cookies from "js-cookie";


const axiosInstance = axios.create({
    baseURL: AppConfig.baseUrl,
    timeout: 30000,
    timeoutErrorMessage: "Server timed out. Please try again later.",
    responseType: "json",
    headers:{
        "Content-Type" : "application/json"
    }
})


// TODO: Setup interceptors in request as well as response to handle the errors and success rates
axiosInstance.interceptors.response.use((response) =>{
    return response.data;
}, (error) =>{
    throw{
        code: error.status,
        ...error?.response?.data

    }
})


axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("_at");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance