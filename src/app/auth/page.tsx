'use client';
import { useRouter } from 'next/navigation'; // Зверніть увагу на використання 'next/navigation'
import { login } from '@/services/serviceAuthLogin/api.auth.service';
import { IForm } from '@/models/iFormModel/IForm';
import { useForm } from 'react-hook-form';


const AuthPage = () => {

    const { handleSubmit, register } = useForm<IForm>({ mode: 'all' });
    const router =useRouter();

    const myHandleSubmit = async (data: IForm) => {
        try {
            if (data.password.includes(data.username)) {
                const loginData: IForm = {
                    username: data.username,
                    password: data.password,
                    expiresInMins: 1
                };
                await login(loginData);
                if (router) {
                    router.push('/menu');
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(myHandleSubmit)}>
                <label>
                    Username
                    <input type="text" {...register('username')} placeholder={'Enter your username'} />
                </label>
                <label>
                    Password
                    <input type="text" {...register('password')} placeholder={'Enter your password'} />
                </label>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
};

export default AuthPage;


