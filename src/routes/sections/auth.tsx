import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const SignInPage = lazy(() => import('../../pages/AuthPages/SignIn'));

export const authRoutes = [
    {
        path: 'auth',
        element: <Outlet />,
        children: [
            {
                path: 'sign-in',
                element: <SignInPage />,
            },
        ],
    },
];