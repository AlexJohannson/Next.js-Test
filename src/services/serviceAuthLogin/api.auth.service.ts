import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import {dummyUrlApi} from "@/services/api.service";
import {ITokenPair} from "@/models/authModel/ITokenPair";
import {IForm} from "@/models/iFormModel/IForm";
import {IUserWithTokens} from "@/models/authModel/IUserWithTokens";

export const axiosInstance = axios.create({
    baseURL: dummyUrlApi,
    headers: {}
});

axiosInstance.interceptors.request.use((request) => {
    if (request.method?.toLocaleUpperCase() === 'GET') {
        const accessToken = getCookie('accessToken');
        request.headers.Authorization = 'Bearer ' + accessToken;
    }
    return request;
});

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refresh();
                const accessToken = getCookie('accessToken');
                originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                return axiosInstance(originalRequest);
            }
            catch (e) {
                console.error('Error refreshing token:', e);

                if (typeof window !== 'undefined') {
                    window.location.href = '/auth';
                }
            }
        }
        return Promise.reject(error);
    }
);

export const refresh = async () => {
    const refreshToken = getCookie('refreshToken');
    const { data: { accessToken, refreshToken: newRefreshToken } } = await axiosInstance.post<ITokenPair>('/auth/refresh', { refreshToken, expiresInMins: 1 });
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', newRefreshToken);
};

export const login = async ({ username, password, expiresInMins }: IForm): Promise<IUserWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IUserWithTokens>('/auth/login', { username, password, expiresInMins });
    setCookie('accessToken', userWithTokens.accessToken);
    setCookie('refreshToken', userWithTokens.refreshToken);
    return userWithTokens;
};

