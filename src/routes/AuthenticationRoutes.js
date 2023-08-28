import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const AuthCheckMail3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));
const AuthCodeVerification3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CodeVerification3')));

// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('views/pages/maintenance/Error')));
const MaintenanceComingSoon1 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon1')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('views/pages/maintenance/UnderConstruction')));

// landing & contact-us routing
const PagesContactUS = Loadable(lazy(() => import('views/pages/contact-us')));
const PagesFaqs = Loadable(lazy(() => import('views/pages/saas-pages/Faqs')));
const PagesPrivacyPolicy = Loadable(lazy(() => import('views/pages/saas-pages/PrivacyPolicy')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/pages/forgot-password/forgot-password3',
            element: <AuthForgotPassword3 />
        },
        {
            path: '/pages/check-mail/check-mail3',
            element: <AuthCheckMail3 />
        },
        {
            path: '/pages/reset-password/reset-password3',
            element: <AuthResetPassword3 />
        },
        {
            path: '/pages/code-verification/code-verification3',
            element: <AuthCodeVerification3 />
        },

        {
            path: '/pages/error',
            element: <MaintenanceError />
        },
        {
            path: '/pages/coming-soon1',
            element: <MaintenanceComingSoon1 />
        },
        {
            path: '/pages/coming-soon2',
            element: <MaintenanceComingSoon2 />
        },
        {
            path: '/pages/under-construction',
            element: <MaintenanceUnderConstruction />
        },
        {
            path: '/pages/contact-us',
            element: <PagesContactUS />
        },
        {
            path: '/pages/faqs',
            element: <PagesFaqs />
        },
        {
            path: '/pages/privacy-policy',
            element: <PagesPrivacyPolicy />
        }
    ]
};

export default AuthenticationRoutes;
