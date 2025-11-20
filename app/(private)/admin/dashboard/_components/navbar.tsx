'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  Menu, 
  X, 
  Shield,
  LogOut
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/dashboard/users', icon: Users },
  { name: 'Stories', href: '/admin/dashboard/stories', icon: BookOpen },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ item, onClick }: { item: typeof navItems[0], onClick?: () => void }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-2
          ${isActive 
            ? 'bg-violet-600/10 text-violet-400 border border-violet-600/20' 
            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
          }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-slate-500'}`} />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-violet-500" />
          <span className="font-serif font-bold text-lg text-slate-100">Admin</span>
        </div>
        <button onClick={toggleMenu} className="text-slate-400 hover:text-white p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-slate-950 border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:block
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-violet-500" />
              <span className="font-serif font-bold text-xl text-slate-100">My Chronicle</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
            <div className="px-6 mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Menu
              </p>
            </div>
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} onClick={() => setIsOpen(false)} />
            ))}
          </nav>

          {/* User / Footer Area */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/30">
            <div className="flex items-center gap-3 px-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">Manage App</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}