import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';
import Login1 from 'views/pages/authentication/authentication1/Login1';

const PagesLanding = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, MainRoutes, Login1]);
}
