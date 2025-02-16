import Cookies from 'js-cookie';
import { IForm } from '@/models/iFormModel/IForm';
import { IUserWithTokens } from '@/models/authModel/IUserWithTokens';
import { ITokenPair } from '@/models/authModel/ITokenPair';
import { IUser } from '@/models/usersModels/IUser';

// Логіка для логіну
export const login = async ({ username, password, expiresInMins }: IForm): Promise<IUserWithTokens> => {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                expiresInMins,
            }),
            credentials: 'include', // важливо для збереження токенів в куках
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data: IUserWithTokens = await response.json(); // Типізуємо дані як IUserWithTokens
        console.log('Login successful:', data);

        // Зберігаємо токени в куках
        Cookies.set('accessToken', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);

        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Викидаємо помилку, щоб її можна було обробити на рівні виклику
    }
};

// Логіка для отримання даних про користувача
export const getUserInfo = async (): Promise<IUser> => {
    try {
        const accessToken = Cookies.get('accessToken'); // Отримуємо токен з куків

        const response = await fetch('https://dummyjson.com/auth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include', // Включаємо куки
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        const data: IUser = await response.json(); // Типізуємо дані як IUser
        console.log('User info:', data);

        return data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

// Логіка для оновлення токенів
export const refreshToken = async (): Promise<ITokenPair> => {
    try {
        const storedRefreshToken = Cookies.get('refreshToken'); // Отримуємо refreshToken з куків

        const response = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: storedRefreshToken, // відправляємо refreshToken
                expiresInMins: 30,
            }),
            credentials: 'include', // Включаємо куки
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data: ITokenPair = await response.json(); // Типізуємо дані як ITokenPair
        console.log('Token refreshed:', data);

        // Оновлюємо accessToken в куках
        Cookies.set('accessToken', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);

        return data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};
