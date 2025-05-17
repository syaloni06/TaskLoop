'use client';
import TaskList from '../components/TaskList';
import useAuth from '../hooks/useAuth';


export default function TasksPage() {
  const isLoading = useAuth();
  if (isLoading) return null; 
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
      <TaskList />
    </div>
  );
}
