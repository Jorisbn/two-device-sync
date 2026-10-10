import { useLocation } from 'react-router';
import { navigation } from '../../navigation';

export default function Header() {
    const { pathname } = useLocation();

    if (pathname === '/') {
        return <header className="bg-panel border-b border-lines px-4 py-2">Dashboard</header>;
    }

    const segments = pathname.split('/').filter(Boolean);

    const breadcrumbs = segments.map((segment) => {
        const navItem = navigation.find((item) => item.path === `/${segment}`);

        return navItem?.label ?? segment;
    });

    return <header className="bg-panel border-b border-lines px-4 py-2">{breadcrumbs.join(' / ')}</header>;
}
