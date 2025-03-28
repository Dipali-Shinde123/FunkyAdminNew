import { Helmet } from "react-helmet-async";
import { EditMusicView } from "../../sections/music";


const EditMusicviewPage =()=>{

    return (
        <>
        <Helmet>
        <title>Edit Music</title>
        </Helmet>
        <EditMusicView/>
        </>

    )
}
export default EditMusicviewPage