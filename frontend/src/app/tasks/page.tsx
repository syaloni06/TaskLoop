'use client';
import TaskList from '../components/TaskList';



export default function TasksPage() { 
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
      <TaskList />
    </div>
  );
}
