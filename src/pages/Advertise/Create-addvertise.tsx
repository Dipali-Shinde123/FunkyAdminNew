import { Helmet } from "react-helmet-async"
import { CreateAdvertiseView } from "../../sections/advertisement"



const  CreateAdvertiseViewPage =()=>{
    return (
        <>
        <Helmet>
            <title>Add Advertisement</title>
        </Helmet>
        <CreateAdvertiseView/>
        </>
    )
}
export default CreateAdvertiseViewPage