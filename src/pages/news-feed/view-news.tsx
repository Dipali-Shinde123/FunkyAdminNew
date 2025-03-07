import { Helmet } from 'react-helmet-async';
import { NewsView } from '../../sections/news-feed';

const NewsViewPage = () => {
    return (
        <>
            <Helmet>
                <title>News</title>
            </Helmet>
            <NewsView />
        </>
    )
}

export default NewsViewPage
