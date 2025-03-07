import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CreateHashtagView } from '../../sections/hashtag';

const HashtagCreatePage = () => {
    return (
        <>
            <Helmet>
                <title>Add Hashtag</title>
            </Helmet>
            <CreateHashtagView />
        </>
    )
}

export default HashtagCreatePage
