import { Helmet } from "react-helmet-async"
import { CreateRewordsView } from "../../sections/Rewords"



const CreateRewordPage = ()=>{
    return (
        <>
        <Helmet>
            <title>Add Rewords</title>
        </Helmet>
        <CreateRewordsView/>
        </>
    )
}
export default  CreateRewordPage;