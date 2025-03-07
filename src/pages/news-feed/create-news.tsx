import { Helmet } from 'react-helmet-async';
import { CreateNewsView } from '../../sections/news-feed';

const NewsCreatePage = () => {
    return (
        <>
            <Helmet>
                <title>Add News</title>
            </Helmet>
            <CreateNewsView />
        </>
    )
}

export default NewsCreatePage
