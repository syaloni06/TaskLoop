'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <>
      <Header />
      <div className="flex flex-1">
        {!isLoginPage && <Sidebar />}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
