'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPage = pathname === '/login' || pathname === '/register';


  return (
    <>
      <Header />
      <div className="flex flex-1">
        { !isPage  && <Sidebar />}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
