import axios from "axios";
import Cookies from "js-cookie";


export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {'Content-Type': 'application/json'},
});

axiosInstance.interceptors.request.use((request) => {
    if (request.method?.toUpperCase() === 'GET') {
        const token = Cookies.get('accessToken');
        if (token) {
            request.headers.Authorization = 'Bearer ' + token;
        }
    }
    return request;
});

