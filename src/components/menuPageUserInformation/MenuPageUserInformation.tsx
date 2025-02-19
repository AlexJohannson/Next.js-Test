'use client';
import { useEffect, useState } from 'react';
import { getData } from "@/services/userService/api.user.service";
import { IUser } from "@/models/usersModels/IUser";
import { IUserResponse } from "@/models/usersModels/IUserResponse";
import './MenuPageUserInformation.css';

const MenuPageUserInformation = () => {

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const userData: IUserResponse = await getData.getUser();
                const [firstUser] = userData.users;
                setUser(firstUser);
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return;
    }

    return (
        <div className={'message-user'}>
            <div className={'message-information-user'}>
                <img src={user.image} alt={user.firstName} />
                <h1>Welcome back, {user.firstName}!</h1>
            </div>
        </div>
    );
};

export default MenuPageUserInformation;