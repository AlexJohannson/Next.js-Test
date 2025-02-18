import React from 'react';
import UsersMap from "@/components/userComponents/usersMap/UsersMap";
import Search from "@/components/searchComponent/Search";



const UsersPage = () => {
    return (
        <div>
            <Search type={'users'}/>
            <UsersMap/>
        </div>
    );
};

export default UsersPage;