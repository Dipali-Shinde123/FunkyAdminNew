import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserAddPost } from '../../sections/managecontent';

// import { AddPost } from '../../sections/managecontent';

const UserAddPostCreate = () => {
    return (
        <>
            <Helmet>
                <title>Add Post</title>
            </Helmet>
            {/* <AddPost /> */}
            <UserAddPost/>

        </>
    )
}

export default UserAddPostCreate
