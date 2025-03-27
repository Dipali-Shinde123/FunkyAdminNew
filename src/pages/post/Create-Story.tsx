// import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserAddStory } from '../../sections/managecontent';


const UserCreateStrory = () => {
    return (
        <>
            <Helmet>
                <title>Add Story</title>
            </Helmet>
            {/* <AddPost /> */}
           <UserAddStory/>
        </>
    )
}

export default UserCreateStrory
