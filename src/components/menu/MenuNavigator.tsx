'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getData } from "@/services/userService/api.user.service";
import { IUser } from "@/models/usersModels/IUser";
import { IUserResponse } from "@/models/usersModels/IUserResponse";
import { deleteCookie } from 'cookies-next';

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
        <div>
            <nav>
                    <ul>
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="/users">USERS</Link></li>
                        <li><Link href="/recipes">RECIPES</Link></li>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </ul>
                </nav>
        </div>
    );
};

export default MenuNavigator;

