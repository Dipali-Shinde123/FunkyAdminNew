import { Helmet } from "react-helmet-async"
import { EditPPVView } from "../../sections/PPVControl"




const EditPPVViewPage = () =>{
    return (
        <>
        <Helmet>
            <title>Edit PPV</title>
        </Helmet>
        <EditPPVView/>
        </>
    )
}
export default EditPPVViewPage;