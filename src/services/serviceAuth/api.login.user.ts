import axios from "axios";
import {IUserWithTokens} from "@/models/authModel/IUserWithTokens";
import {getCookie, setCookie} from "@/services/serviceAuth/api.helper";
import {ITokenPair} from "@/models/authModel/ITokenPair";
import {baseUrl} from "@/services/api.service";




export const axiosInstanceAuth = axios.create({
    baseURL: baseUrl,
    headers: {},
});

type LoginType = {
    username: string;
    password: string;
    expiresInMins: number;
};


export const loginUser = async ({username, password, expiresInMins}: LoginType) => {
    const response = await axiosInstanceAuth.post<IUserWithTokens>('/auth/login', { username, password, expiresInMins });
    const {accessToken, refreshToken, image, firstName} = response.data;
    setCookie('accessToken', accessToken, expiresInMins);
    setCookie('refreshToken', refreshToken, expiresInMins);
    return {accessToken, refreshToken, image, firstName};
};

export const refresh = async () => {
    const refreshToken = getCookie('refreshToken');
    const response = await axiosInstanceAuth.post<ITokenPair>('/auth/refresh', {
        refreshToken: refreshToken,
        expiresInMins: 1,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setCookie('accessToken', accessToken, 1);
    setCookie('refreshToken', newRefreshToken, 1);
    return response;
};
