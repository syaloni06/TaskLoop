'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../services/api';
import { Task } from '../../types/index';
import useAuth from '@/app/hooks/useAuth';

export default function TaskDetailPage() {
  const isLoading = useAuth();

  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await api.get(`http://localhost:5100/task/${id}`);
        setTask(res.data);
      } catch (err) {
        console.log(err);
        console.error('Failed to fetch task');
      }
    }

    if (id) fetchTask();
  }, [id]);

  if (!task) return <p>Loading task details...</p>;
  if (isLoading) return null; 

  return (
    <div className="p-4 max-w-xl mx-auto border rounded shadow mt-48">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Created By:</strong> {task.createdBy.email}</p>
      <div>
  <strong>Assigned To:</strong>
  <div className="flex mt-1 space-x-1">
    {task.assignedTo.map((name, idx) => (
      <div
        key={idx}
        className=""
      >
        {name.email}
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
