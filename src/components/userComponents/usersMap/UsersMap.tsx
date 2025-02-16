'use client';
import React, {useEffect, useState} from 'react';
import {IUser} from "@/models/usersModels/IUser";
import UsersList from "@/components/userComponents/usersList/UsersList";
import {getUserInfo, refreshToken} from "@/services/serviceAuthLogin/api.auth.service";

const UsersMap = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserInfo();
            // @ts-ignore
            setUsers(result);
        };
        fetchData();
        refreshToken();
    }, []);
    return (
        <div>
            {
                users.map((user: IUser) => <UsersList key = {user.id} user={user}/>)
            }
        </div>
    );
};

export default UsersMap;