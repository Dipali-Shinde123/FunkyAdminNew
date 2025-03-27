import React from 'react';
import { Helmet } from 'react-helmet-async';
import {UserContentLists} from '../../sections/managecontent'


const UserContentList = () => {
    return (
        <>
            <Helmet>
                <title>UserContent</title>
            </Helmet>
           <UserContentLists/>
        </>
    )
}

export default UserContentList
