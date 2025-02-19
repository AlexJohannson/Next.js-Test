'use client';
import { useRouter } from 'next/navigation';
import { login } from '@/services/serviceAuthLogin/api.auth.service';
import { IForm } from '@/models/iFormModel/IForm';
import { useForm } from 'react-hook-form';
import {joiResolver} from "@hookform/resolvers/joi";
import {loginValidator} from "@/validator/loginValidator";
import './AuthComponent.css';


const AuthComponent = () => {

    const { handleSubmit, register, formState: {errors}} = useForm<IForm>(
        {
            mode: 'all',
            resolver: joiResolver(loginValidator)
        }
        );
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
        }
        catch (error) {
            console.error('Error logging', error);
        }
    };
    return (
        <div className={'login-container'}>
            <form className={'login-form'} onSubmit={handleSubmit(myHandleSubmit)}>
                <h2>LOGIN</h2>
                <div className={'error-message'}>
                    {
                        errors.username  && <div className={'error-message-text'}>{errors.username.message}</div>
                    }
                </div>
                <label className={'label-input'}>
                    <span>Username:</span>
                    <input className={'input-login'} type="text" {...register('username')} placeholder={'Enter your username'} />
                </label>
                <div className={'error-message'}>
                    {
                        errors.password  && <div className={'error-message-text'}>{errors.password.message}</div>
                    }
                </div>
                <label className={'label-input'}>
                    <span>Password:</span>
                    <input className={'input-login'} type="text" {...register('password')} placeholder={'Enter your password'} />
                </label>
                <button className={'login-button'} type="submit">LOGIN</button>
            </form>
        </div>
    );
};

export default AuthComponent;