import { Helmet } from 'react-helmet-async';
import { MusicView } from '../../sections/music';

const MusicViewPage = () => {
    return (
        <>
            <Helmet>
                <title>Music</title>
            </Helmet>
            <MusicView />
        </>
    )
}

export default MusicViewPage
