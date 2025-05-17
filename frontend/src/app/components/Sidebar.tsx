'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, ClipboardList, PlusSquare, LogOut} from 'lucide-react';
import { useState, useEffect } from 'react';


const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Manage Tasks', href: '/tasks', icon: <ClipboardList size={18} /> },
  { label: 'Create Task', href: '/createtask', icon: <PlusSquare size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleLogout = () => {
    // Your logout logic here
    // For example: clear auth tokens, redirect to login, etc.
    console.log('Logging out...');
    setShowConfirm(false);
    // Example: redirect
    localStorage.clear();
    window.location.href = '/login'; // or use router.push if using next/router
  };

  useEffect(() => {
   const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);
  return (
    <aside className="fixed bottom-0 top-16 left-0 h-screen w-64 bg-white py-6 shadow-md hidden md:flex flex-col">
      {/* Profile */}
      <div className="text-center mb-10">
        <p className="mt-2 font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={clsx(
                  'flex items-center gap-3 px-4 py-2 transition cursor-pointer',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-600'
                    : 'text-gray-800 hover:bg-gray-100'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        {/* Logout item */}
        <div
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </nav>

      {/* Confirm Logout Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-xs bg-transparent flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
