import { useState } from 'react';
import { NavLink } from 'react-router';

import { navigation } from '../../navigation';

export default function SideBar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`h-screen bg-panel border-r border-lines text-white flex flex-col transition-all duration-200 ease-in-out ${collapsed ? 'w-16' : 'w-56'}`}>
            <div className="flex-1 p-3">
                <nav aria-label="Main navigation">
                    <ul className="flex flex-col gap-0.5">
                        {navigation.map((navItem, index) => (
                            <NavLink
                                key={index}
                                to={navItem.path}
                                end
                                className={({ isActive }) => `flex flex-1 py-2 px-2 rounded-sm items-center gap-1 transition-all hover:bg-nav-active ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-nav-active' : ''}`}
                            >
                                <navItem.icon className="w-4" />

                                <span className={`${collapsed && 'hidden'}`}>{navItem.label}</span>
                            </NavLink>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="p-3">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full rounded-lg p-2 hover:bg-nav-active cursor-pointer"
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>
        </aside>
    );
}
