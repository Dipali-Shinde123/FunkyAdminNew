import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import DashboardPage from '../../pages/dashboard/dashboard';
import { AuthGuard } from '../../auth/guard';
import UserViewPage from '../../pages/users/view-user';
import AppLayout from '../../layout/AppLayout';
import UserCreatePage from '../../pages/users/create-user';
import NewsViewPage from '../../pages/news-feed/view-news';
import NewsCreatePage from '../../pages/news-feed/create-news';
import MusicViewPage from '../../pages/music/view-music';
import MusicCreatePage from '../../pages/music/create-music';
import HashtagViewPage from '../../pages/hashtag/view-hashtag';
import HashtagCreatePage from '../../pages/hashtag/create-hashtag';
import CMSViewPage from '../../pages/cms/view-cms';
import CMSCreatePage from '../../pages/cms/create-cms';

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
            {
                path: 'news',
                children: [
                    { element: <NewsViewPage />, index: true },
                    { path: 'add-news', element: <NewsCreatePage /> },
                    // { path: ':id', element: <UserDetailPage /> },
                    // { path: 'edit-user/:id', element: <UserEditPage /> },

                ],
            },
            {
                path: 'music',
                children: [
                    { element: <MusicViewPage />, index: true },
                    { path: 'add-music', element: <MusicCreatePage /> },
                    // { path: ':id', element: <UserDetailPage /> },
                    // { path: 'edit-user/:id', element: <UserEditPage /> },

                ],
            },
            {
                path: 'hashtags',
                children: [
                    { element: <HashtagViewPage />, index: true },
                    { path: 'add-hashtag', element: <HashtagCreatePage /> },
                    // { path: ':id', element: <UserDetailPage /> },
                    // { path: 'edit-user/:id', element: <UserEditPage /> },

                ],
            },
            {
                path: 'cms',
                children: [
                    { element: <CMSViewPage />, index: true },
                    { path: 'add-cms', element: <CMSCreatePage /> },
                    // { path: ':id', element: <UserDetailPage /> },
                    // { path: 'edit-user/:id', element: <UserEditPage /> },

                ],
            },
        ],
    },
];