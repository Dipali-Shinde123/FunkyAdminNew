import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingScreen } from '../../components/loading-screen';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { Outlet } from 'react-router-dom';

const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <Suspense fallback={<LoadingScreen/>}>
                    <Outlet />
                </Suspense>
            ),
            children: [...authRoutes, ...dashboardRoutes]
        }
    ])
};

export default Router;