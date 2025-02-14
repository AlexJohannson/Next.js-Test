import React from 'react';
import {IUser} from "@/models/usersModels/IUser";


type UserProps = {
    user: IUser
}

const UsersList = ({user}: UserProps) => {
    return (
        <div>
            {user.firstName}
        </div>
    );
};

export default UsersList;