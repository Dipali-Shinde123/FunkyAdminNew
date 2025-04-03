import { Helmet } from 'react-helmet-async';
import { EffectView } from '../../sections/Effects';


const EffectListPage = () => {
    return (
        <>
            <Helmet>
                <title>Add Effect</title>
            </Helmet>
            <EffectView/>
          
        </>
    )
}

export default EffectListPage