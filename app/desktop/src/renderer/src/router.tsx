import { createHashRouter } from 'react-router';

import App from './App';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Settings from './pages/Settings';

export const router = createHashRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Dashboard,
            },
            {
                path: 'files/*',
                Component: Files,
            },
            {
                path: 'settings',
                Component: Settings,
            },
        ],
    },
]);
