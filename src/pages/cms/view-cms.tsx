import { Helmet } from 'react-helmet-async';
import { CMSView } from '../../sections/cms';

const CMSViewPage = () => {
    return (
        <>
            <Helmet>
                <title>CMS</title>
            </Helmet>
            <CMSView />
        </>
    )
}

export default CMSViewPage
