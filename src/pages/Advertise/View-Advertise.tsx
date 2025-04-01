import { Helmet } from "react-helmet-async"
import { AdvertiseView } from "../../sections/advertisement"



const  AdvertiseViewPage =()=>{
    return (
        <>
        <Helmet>
            <title>Advertise List</title>
        </Helmet>
        <AdvertiseView/>
        </>
    )
}
export default AdvertiseViewPage