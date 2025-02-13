'use client';
import React, {useState} from 'react';
import {IForm} from "@/models/iFormModel/IForm";
import {loginUser} from "@/services/serviceAuth/api.login.user";
import {useForm} from "react-hook-form";
import Menu from "@/components/menu/Menu";
import {IUser} from "@/models/usersModels/IUser";




const AuthPage = () => {

    const {handleSubmit, register} = useForm<IForm>({
        mode: "all",

    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);



    const myHandelSubmit = async (data: IForm) => {

        if (data.password.includes(data.username)) {
            const loginData: IForm = {
                username: data.username,
                password: data.password,
                expiresInMins: 1
            };
            try {
                const loginResponse = await loginUser(loginData);
                    setIsAuthenticated(true);
                // @ts-ignore
                setUser(loginResponse);


            } catch (error) {
                console.error("Error logging in:", error);
            }
        } else {
            console.log("Password does not include username");
        }
    };
    if (isAuthenticated && user) {
        return <Menu user={user}/>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(myHandelSubmit)}>
                <label>
                       <input type={'text'} {...register('username')} placeholder={'Enter your username'}/>
                </label>
                <label>
                       <input type={'text'} {...register('password')} placeholder={'Enter your password'}/>
                </label>
                <button>LOGIN</button>
            </form>
        </div>
    );
};

export default AuthPage;