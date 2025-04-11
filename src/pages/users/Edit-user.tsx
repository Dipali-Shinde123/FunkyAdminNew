import { Helmet } from 'react-helmet-async';
import { EditUserView } from '../../sections/users';

const UserEditPage = () => {
    return (
        <>
            <Helmet>
                <title>User Edit</title>
            </Helmet>
           <EditUserView/>
        </>
    )
}

export default UserEditPage
