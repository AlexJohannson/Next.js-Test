import React from 'react';
import {IUser} from "@/models/usersModels/IUser";
import Link from "next/link";
import './UsersList.css';


type UserProps = {
    user: IUser
}

const UsersList = ({user}: UserProps) => {

    return (
        <div className={'users-list'}>
            <Link className={'users-list-link'} href={{pathname: '/users/' + user.id.toString(), query:{data: JSON.stringify(user)}}}>
                <h1>{user.firstName} {user.lastName}</h1>
            </Link>
            <h3>Email: {user.email}</h3>
            <h3>Phone: {user.phone}</h3>
        </div>
    );
};

export default UsersList;



