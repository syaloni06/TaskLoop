import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import AppLayout from './components/AppLayout';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Manage tasks efficiently in a small team.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
