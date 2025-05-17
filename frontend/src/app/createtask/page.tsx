'use client';
import TaskForm from '../components/TaskForm';
import useAuth from '../hooks/useAuth';

export default function DashboardPage() {
    useAuth();
  return (
    <div className="mt-8">
      <TaskForm />
    </div>
  );
}
