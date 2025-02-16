import { setCookie, getCookie, deleteCookie} from 'cookies-next';
import {IUserWithTokens} from "@/models/authModel/IUserWithTokens";
import {IForm} from "@/models/iFormModel/IForm";
import {axiosInstance} from "@/services/api.service";
import {ITokenPair} from "@/models/authModel/ITokenPair";


// Логін користувача та збереження токенів в куках
export const login = async ({
                                username,
                                password,
                                expiresInMins,
                            }: IForm): Promise<IUserWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IUserWithTokens>('/auth/login', {
        username,
        password,
        expiresInMins,
    });

    // Збереження токенів у куки
    setCookie('accessToken', userWithTokens.accessToken, { maxAge: expiresInMins * 60 });
    setCookie('refreshToken', userWithTokens.refreshToken, { maxAge: expiresInMins * 60 });

    return userWithTokens;
};

// Оновлення токенів за допомогою refreshToken
export const refresh = async () => {
    const refreshToken = getCookie('refreshToken') as string | undefined;
    if (!refreshToken) {
        throw new Error('Refresh token не знайдено');
    }

    const { data: { accessToken, refreshToken: newRefreshToken } } = await axiosInstance.post<ITokenPair>('/auth/refresh', {
        refreshToken,
        expiresInMins: 1, // Термін дії токенів (можна задати інший час)
    });

    // Оновлюємо токени в куках
    setCookie('accessToken', accessToken, { maxAge: 1 * 60 }); // Термін дії 1 хвилина
    setCookie('refreshToken', newRefreshToken, { maxAge: 1 * 60 }); // Термін дії 1 хвилина
};


// Зберігаємо об'єкт у куках (можна додавати термін дії)
export const saveToCookies = (key: string, value: string, expiresInMins: number) => {
    setCookie(key, JSON.stringify(value), { maxAge: expiresInMins * 60 });
};

// Отримуємо об'єкт з куків
export const retriveFromCookies = <T>(key: string): T | null => {
    const value = getCookie(key) as string | undefined;
    if (value) {
        return JSON.parse(value) as T;
    }
    return null;
};

// Видаляємо об'єкт з куків
export const removeFromCookies = (key: string) => {
    deleteCookie(key);
};
