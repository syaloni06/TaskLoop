// components/Dashboard.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  dueDate: string;
}

export default function Dashboard() {
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('/api/dashboard').then((res) => {
      setCreatedTasks(res.data.created);
      setAssignedTasks(res.data.assigned);
      setOverdueTasks(res.data.overdue);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tasks Assigned to Me</h2>
        {assignedTasks.map((task) => (
          <div key={task._id}>{task.title}</div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tasks I Created</h2>
        {createdTasks.map((task) => (
          <div key={task._id}>{task.title}</div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Overdue Tasks</h2>
        {overdueTasks.map((task) => (
          <div key={task._id}>{task.title}</div>
        ))}
      </section>
    </div>
  );
}
