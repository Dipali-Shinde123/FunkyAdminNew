import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CreateMusicView } from '../../sections/music';

const MusicCreatePage = () => {
    return (
        <>
            <Helmet>
                <title>Add Music</title>
            </Helmet>
            <CreateMusicView />
        </>
    )
}

export default MusicCreatePage
