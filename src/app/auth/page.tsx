'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IForm } from '@/models/iFormModel/IForm';
import { login } from '@/services/serviceAuthLogin/api.auth.service';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData: IForm = {
                username,
                password,
                expiresInMins: 30,
            };
            await login(formData); // Викликає функцію логіну
            router.push('/'); // Переходимо на головну сторінку після успішного логіну
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
