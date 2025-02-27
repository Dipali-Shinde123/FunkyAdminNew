import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserView } from '../../sections/users';

const UserViewPage = () => {
    return (
        <>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <UserView />
        </>
    )
}

export default UserViewPage
