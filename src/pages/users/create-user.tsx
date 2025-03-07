import { Helmet } from 'react-helmet-async';
import { CreateUserView } from '../../sections/users';

const UserCreatePage = () => {
    return (
        <>
            <Helmet>
                <title>Add User</title>
            </Helmet>
            <CreateUserView />
        </>
    )
}

export default UserCreatePage
