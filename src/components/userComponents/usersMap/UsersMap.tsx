'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IUser } from "@/models/usersModels/IUser";
import {getData} from "@/services/userService/api.user.service";
import UsersList from "@/components/userComponents/usersList/UsersList";
import PaginationComponent from "@/components/paginationComponent/PaginationComponent";


const UsersMap = () => {
    const searchParams = useSearchParams();
    const [users, setUsers] = useState<IUser[]>([]);
    const currentPage = searchParams.get('page') || '1';

    useEffect(() => {
        const fetchUsers = async () => {
            const usersResponse = await getData.getUsersWithPagination(currentPage);
            setUsers(usersResponse.users);
        };
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        window.history.pushState({}, '', `?${newParams.toString()}`);
    };

    return (
        <div>
            {users.length > 0 ? (
                users.map((user: IUser) => <UsersList key={user.id} user={user} />)
            ) : (
                <div>
                    <h1>No users found.</h1>
                </div>
            )}
            <PaginationComponent onPageChange={handlePageChange} />
        </div>
    );
};

export default UsersMap;


