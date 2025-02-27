import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from '../../routes/hooks';
import { paths } from '../../routes/paths';
import { useAuthContext } from '../hooks';
import { isValidToken, setLocalStorage } from '../context/utils';
import { ReactNode } from 'react'; // Import ReactNode

const loginPaths = {
    login: paths.auth.signin
}

interface AuthGuardProps {
    children: ReactNode;  // Define the type of children explicitly
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { loading } = useAuthContext();

    return <>{loading ? 'loading' : <Container>{children}</Container>}</>;
}

AuthGuard.propTypes = {
    children: PropTypes.node,
}

interface ContainerProps {
    children: ReactNode;  // Define the type of children explicitly
}

export const Container = ({ children }: ContainerProps) => {
    const router = useRouter();
    const { authenticated } = useAuthContext();
    const token = localStorage.getItem('token');

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!authenticated && !token) {
            const searchParams = new URLSearchParams({
                returnTo: window.location.pathname,
            }).toString();

            const loginPath = loginPaths.login;
            const href = `${loginPath}?${searchParams}`;

            router.replace(href);
        }
        else if (token && !isValidToken(token)) { // If token is expired
            // If token is expired, remove it from localStorage and redirect
            setLocalStorage(null); // This will also remove the token from localStorage and headers
            router.replace(loginPaths.login); // Redirect to login page
        } else {
            setChecked(true); // If token is valid, proceed with loading the children
        }
    }, [authenticated, router, token]);

    useEffect(() => {
        check(); // Call check on component mount
    }, [check]);

    if (!checked) {
        return null; // Show nothing while checking
    }

    return <>{children}</>;
}

Container.propTypes = {
    children: PropTypes.node
}