// app/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login or dashboard based on token
    const token = localStorage.getItem('token');
    router.push(token ? '/dashboard' : '/login');
  }, [router]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Redirecting...</h1>
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
