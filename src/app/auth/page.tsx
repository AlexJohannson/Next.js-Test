'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {IForm} from "@/models/iFormModel/IForm";
import {IUserWithTokens} from "@/models/authModel/IUserWithTokens";
import {login} from "@/services/serviceAuthLogin/api.auth.service";


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const form: IForm = { username, password, expiresInMins: 30 };

        try {
            const iuserWithTokens: IUserWithTokens = await login(form);
            // Направляємо на головну сторінку після логіну
            router.push('/home');
        } catch (err) {
            console.log(err);
            setError('Не вдалося виконати вхід');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Логін:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Пароль:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Увійти</button>
        </form>
    );
};

export default LoginPage;
