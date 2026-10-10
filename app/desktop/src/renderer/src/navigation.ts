import DashboardIcon from './assets/dashboard-icon.svg?react';
import FilesIcon from './assets/files-icon.svg?react';
import SettingsIcon from './assets/settings-icon.svg?react';

import type { ComponentType, SVGProps } from 'react';

export type NavItem = {
    label: string;
    path: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const navigation: NavItem[] = [
    {
        label: 'Dashboard',
        path: '/',
        icon: DashboardIcon,
    },
    {
        label: 'Files',
        path: '/files',
        icon: FilesIcon,
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: SettingsIcon,
    },
];
