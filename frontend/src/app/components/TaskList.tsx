'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  assignedTo: [];
  createdBy: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5100/task');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Re-fetch when reload value changes



return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-72">
    {tasks.map((task) => (
      <TaskItem key={task._id} task={task} />
    ))}
  </div>
);

}
