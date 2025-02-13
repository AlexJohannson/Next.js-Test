import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, expiresInMins: number) => {
    Cookies.set(key, value, { expires: expiresInMins / (24 * 60) });
};

export const getCookie = (key: string) => {
    return Cookies.get(key) || '';
};
