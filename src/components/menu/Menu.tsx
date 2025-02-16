'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { IUser } from '@/models/usersModels/IUser';

const Menu = ({ user }: { user: IUser }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (!isAuthenticated) {
        return null; // Якщо користувач не авторизований, не відображаємо меню
    }

    return (
        <div>
            <div>
                <ul>
                    <li><Link href="/">HOME</Link></li>
                    <li><Link href="/users">USERS</Link></li>
                    <li><Link href="/recipes">RECIPES</Link></li>
                    <li>
                        <Link href="/">
                            <button
                                onClick={() => {
                                    Cookies.remove('accessToken');
                                    Cookies.remove('refreshToken');
                                    setIsAuthenticated(false);
                                }}
                            >
                                LOGOUT
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                {user && <img src={user.image} alt={user.firstName} />}
            </div>
            <div>
                <h1>Welcome back, {user.firstName} ;) </h1>
            </div>
        </div>
    );
};

export default Menu;

