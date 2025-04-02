import { Helmet } from "react-helmet-async"
import { CreatePPvView } from "../../sections/PPVControl";



const CreatePPVviewPage = ()=>{
    return (
        <>
        <Helmet>
            <title>ADD PPV</title>
        </Helmet>
        <CreatePPvView/>
        </>
    )
}
export default CreatePPVviewPage;