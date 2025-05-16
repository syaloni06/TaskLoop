
import "./globals.css";
import { ReactNode } from 'react';

export const metadata = {
  title: 'Task Manager',
  description: 'Manage tasks efficiently in a small team.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
