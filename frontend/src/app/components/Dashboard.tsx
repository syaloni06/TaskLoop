'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Task {
  _id: string;
  title: string;
  dueDate: string;
  status: string;
  priority: 'Low' | 'Medium' | 'High';
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .post('http://localhost:5100/dashboard', { userId })
      .then((res) => {
        const allTasks = [
          ...res.data.assigned
        ];
        setTasks(allTasks);
      })
      .catch((err) => console.error('Error fetching dashboard:', err));
  }, []);

  const totalTasks = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  const low = tasks.filter((t) => t.priority === 'Low').length;
  const medium = tasks.filter((t) => t.priority === 'Medium').length;
  const high = tasks.filter((t) => t.priority === 'High').length;

  const doughnutData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Task Distribution',
        data: [pending, inProgress, completed],
        backgroundColor: ['#8b5cf6', '#06b6d4', '#22c55e'],
      },
    ],
  };

  const barData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Task Priority Levels',
        data: [low, medium, high],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 pl-72">
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Good Morning! Mike</h2>
          <p className="text-sm text-gray-500">Tuesday 25th March 2025</p>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{totalTasks}</p>
            <p className="text-sm text-gray-500">Total Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-600">{inProgress}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium mb-4">Task Priority Levels</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
