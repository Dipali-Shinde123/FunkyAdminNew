import { Helmet } from 'react-helmet-async';
import { DashbordView } from '../../sections/dashbord';


const DashbordViewPage = () => {
    return (
        <>
            <Helmet>
                <title>CMS</title>
            </Helmet>
            
            <DashbordView/>
        </>
    )
}

export default DashbordViewPage
