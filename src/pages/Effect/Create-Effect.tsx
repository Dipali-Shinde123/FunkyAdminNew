import { Helmet } from 'react-helmet-async';
import { CreateEffectView } from '../../sections/Effects';


const CreateEffectPage = () => {
    return (
        <>
            <Helmet>
                <title>Add Effect</title>
            </Helmet>
           <CreateEffectView/>
        </>
    )
}

export default CreateEffectPage