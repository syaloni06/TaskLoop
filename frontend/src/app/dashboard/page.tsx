'use client';
import Dashboard from '../components/Dashboard';
import useAuth from '../hooks/useAuth';

export default function DashboardPage() {
  useAuth();
  return (
    <div className="mt-8">
      <Dashboard />
    </div>
  );
}
