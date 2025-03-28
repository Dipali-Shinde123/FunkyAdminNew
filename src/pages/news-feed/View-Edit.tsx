import { Helmet } from "react-helmet-async";
import { EditNewsView } from "../../sections/news-feed";


const  EditViewPage = ()=>{
     return (
        <>
        <Helmet>
            <title>Edit News</title>
        </Helmet>
        <EditNewsView/>
        </>
     )

}
export default EditViewPage