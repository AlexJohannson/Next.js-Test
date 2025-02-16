import axios from 'axios';
import {getCookie} from 'cookies-next';


export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {},
});

// Додаємо інтерцептор для автоматичного додавання accessToken у заголовок
axiosInstance.interceptors.request.use((request) => {
    const accessToken = getCookie('accessToken') as string | undefined;
    if (accessToken && request.method?.toLocaleUpperCase() === 'GET') {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
});
