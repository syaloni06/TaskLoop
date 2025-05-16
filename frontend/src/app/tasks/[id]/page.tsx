'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../services/api';
import { Task } from '../../types/index';

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.log(err);
        console.error('Failed to fetch task');
      }
    }

    if (id) fetchTask();
  }, [id]);

  if (!task) return <p>Loading task details...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo}</p>
      <p><strong>Created By:</strong> {task.createdBy}</p>
    </div>
  );
}
