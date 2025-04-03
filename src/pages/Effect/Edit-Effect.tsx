import { Helmet } from 'react-helmet-async';
import { EditEffectView } from '../../sections/Effects';


const EditEffectPage = () => {
    return (
        <>
            <Helmet>
                <title>Add Effect</title>
            </Helmet>
          <EditEffectView/>
        </>
    )
}

export default EditEffectPage