'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getData } from "@/services/userService/api.user.service";
import { IUser } from "@/models/usersModels/IUser";
import { IUserResponse } from "@/models/usersModels/IUserResponse";
import { deleteCookie } from 'cookies-next';
import './MenuNavigator.css';

const MenuNavigator = () => {

    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter();

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

    const handleLogout = () => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        router.push('/');
    };

    if (!user) {
        return;
    }

    return (
        <div className={'menu-header'}>
                <nav>
                    <ul>
                        <li><Link className={'link-menu'} href="/menu">HOME</Link></li>
                        <li><Link className={'link-menu'} href="/users">USERS</Link></li>
                        <li><Link className={'link-menu'} href="/recipes">RECIPES</Link></li>
                        <button className={'button-logout'} onClick={handleLogout}>LOGOUT</button>
                    </ul>
                </nav>
        </div>
    );
};

export default MenuNavigator;

