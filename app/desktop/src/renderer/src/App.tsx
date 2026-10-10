import { Outlet } from 'react-router';

import Header from './shared/components/Header';
import SideBar from './shared/components/Sidebar';

export default function App() {
    return (
        <div className="flex bg-app">
            <SideBar />
            <main className="flex-1 text-white">
                <Header />

                <Outlet />
            </main>
        </div>
    );
}
