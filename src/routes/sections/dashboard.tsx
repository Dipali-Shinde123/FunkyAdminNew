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
import CMSEditPage from '../../pages/cms/edit-cms';
import UserAddPostCreate from '../../pages/post/add-post';
import UserContentList from '../../pages/post/user-content';
import UserCreateStrory from '../../pages/post/Create-Story';
import EditViewPage from '../../pages/news-feed/View-Edit';
import EditMusicviewPage from '../../pages/music/Edit-music';
import CreateAdvertiseViewPage from '../../pages/Advertise/Create-addvertise';
import AdvertiseViewPage from '../../pages/Advertise/View-Advertise';
import CreateRewordPage from '../../pages/Rewords/Create-Reword';
import RewordsViewPage from '../../pages/Rewords/View-Rewords';
import CreatePPVviewPage from '../../pages/PPV/Create-PPV';
import PPVViewPage from '../../pages/PPV/View-PPV';
import EditPPVViewPage from '../../pages/PPV/Edit-PPV';
import CreateEffectPage from '../../pages/Effect/Create-Effect';
import EffectListPage from '../../pages/Effect/Effect-List';
import EditEffectPage from '../../pages/Effect/Edit-Effect';
import DashbordViewPage from '../../pages/dashbord/view-dashbord';

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
            {
                
                element: <DashbordViewPage/>, index: true
            },
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
                    { path: 'edit-news/:id', element: <EditViewPage /> },

                ],
            },
            {
                path: 'music',
                children: [
                    { element: <MusicViewPage />, index: true },
                    { path: 'add-music', element: <MusicCreatePage /> },
                    // { path: ':id', element: <UserDetailPage /> },
                    { path: 'edit-music/:id', element: <EditMusicviewPage/> },

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
                    { path: 'edit-cms/:id', element: <CMSEditPage /> },

                ],
            },
            {
                path: 'posts', 
                children: [
                    { path: 'add-post', element: <UserAddPostCreate/>}, 
                ],
            },
            {
                path: 'contents',
                children: [
                    {path: 'user-content', element: <UserContentList/>},
                ]
            },
            { path: 'story',
           children:[
                {path: 'add-story', element: <UserCreateStrory/> }
            ]},

            {
                path: 'advertisement',
                children:[
                    {path: 'add-advertisement', element: <CreateAdvertiseViewPage/>},
                    {path: 'view-advertisemt', element: <AdvertiseViewPage/>}
                ]
            },

            {
                path: 'reword',
                children:[
                       {path: 'add-reword', element:<CreateRewordPage/>},
                       {path: 'view-reword', element:<RewordsViewPage/>}
                      
                ]
            },
            {
                path: 'PPV',
                children: [
                    {path: 'add-ppv', element:<CreatePPVviewPage/>},
                    {path: 'view-ppv', element:<PPVViewPage/>},
                    {path: 'Edit-ppv/:id', element:<EditPPVViewPage/>}
                    
                ]
            },

            {
                path: 'Effect',
                children: [
                    {path: 'add-effect', element:<CreateEffectPage/>},
                    {path: 'effect-list', element:<EffectListPage/>},
                    {path: 'edit-effect/:id', element:<EditEffectPage/>}
                ]
            }

        ],
    },
];