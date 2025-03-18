import { Helmet } from 'react-helmet-async';
import { EditCMSView } from '../../sections/cms';

const CMSEditPage = () => {
    return (
        <>
            <Helmet>
                <title>Edit CMS Page</title>
            </Helmet>
            <EditCMSView />
        </>
    )
}

export default CMSEditPage
