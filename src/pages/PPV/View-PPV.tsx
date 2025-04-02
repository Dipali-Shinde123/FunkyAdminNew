import { Helmet } from "react-helmet-async"
import { PPVControlView } from "../../sections/PPVControl";



const PPVViewPage =() =>{
    return (
        <>
        <Helmet><title>PPV List</title></Helmet>
        <PPVControlView/>
        </>
    )
}
export default PPVViewPage;