import { Helmet } from "react-helmet-async"
import { RewordsView } from "../../sections/Rewords";




const RewordsViewPage = ()=>{
    return (
        <>
        <Helmet>
            <title>Rewords List</title>
        </Helmet>
        <RewordsView/>
        </>
    )
}
export default RewordsViewPage ;