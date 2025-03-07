import { Helmet } from 'react-helmet-async';
import { CreateCMSView } from '../../sections/cms';

const CMSCreatePage = () => {
    return (
        <>
            <Helmet>
                <title>Add CMS Page</title>
            </Helmet>
            <CreateCMSView />
        </>
    )
}

export default CMSCreatePage
