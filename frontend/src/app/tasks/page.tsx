'use client';
import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function TasksPage() {
  const [reload, setReload] = useState(false);

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
      <TaskForm onSuccess={() => setReload(!reload)} />
      <TaskList reload={reload} />
    </div>
  );
}
