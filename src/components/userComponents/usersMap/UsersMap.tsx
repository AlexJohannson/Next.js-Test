'use client';
import React, {useEffect, useState} from 'react';
import {getData} from "@/services/userService/api.user.service";
import {IUser} from "@/models/usersModels/IUser";
import {refresh} from "@/services/serviceAuth/api.login.user";
import UsersList from "@/components/userComponents/usersList/UsersList";

const UsersMap = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData.getUser();
            setUsers(result.users);
        };
        fetchData();
        refresh();
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