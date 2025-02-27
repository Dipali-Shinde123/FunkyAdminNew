import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import DashboardPage from '../../pages/dashboard/dashboard';
import { AuthGuard } from '../../auth/guard';
import UserViewPage from '../../pages/users/view-user';
import AppLayout from '../../layout/AppLayout';
import UserCreatePage from '../../pages/users/create-user';

export const dashboardRoutes = [
    {
        path: '/',
        element: (
            <AuthGuard>
                <AppLayout>
                    {/* <Suspense fallback={<LoadingScreen />}> */}
                    <Outlet />
                    {/* </Suspense> */}
                </AppLayout>
            </AuthGuard>
        ),
        children: [
            // {
            //     path: 'dashboard',
            //     element: <DashboardPage />,
            // },
            {
                path: 'users',
                children: [
                    { element: <UserViewPage />, index: true },
                    { path: 'add-user', element: <UserCreatePage /> },
                    // { path: ':id', element: <UserDetailPage /> },
                    // { path: 'edit-user/:id', element: <UserEditPage /> },

                ],
            },
        ],
    },
];