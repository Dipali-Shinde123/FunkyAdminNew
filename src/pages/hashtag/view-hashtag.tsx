import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HashtagView } from '../../sections/hashtag';

const HashtagViewPage = () => {
    return (
        <>
            <Helmet>
                <title>Hashtag</title>
            </Helmet>
            <HashtagView />
        </>
    )
}

export default HashtagViewPage
