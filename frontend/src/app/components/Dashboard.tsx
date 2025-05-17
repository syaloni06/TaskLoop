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
import { API_URL } from '../utils/API_URL';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Task {
  _id: string;
  title: string;
  dueDate: string;
  status: string;
  priority: 'Low' | 'Medium' | 'High';
  createdBy?: string;
}

export default function Dashboard() {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState('');
  
  useEffect(() => {
    const id = localStorage.getItem('userId');
    const storedName = localStorage.getItem("name");
    setUserId(id);
    if (storedName) setName(storedName);
    axios
      .post(`${API_URL}/dashboard`, { userId: id })
      .then((res) => {
        setAssignedTasks(res.data.assigned || []);
        setCreatedTasks(res.data.created || []);
      })
      .catch((err) => console.error('Error fetching dashboard:', err));
  }, []);

  const tasks = [...assignedTasks, ...createdTasks];
  const totalTasks = tasks.length;

  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  const low = tasks.filter((t) => t.priority === 'Low').length;
  const medium = tasks.filter((t) => t.priority === 'Medium').length;
  const high = tasks.filter((t) => t.priority === 'High').length;

  const overdueTasks = tasks.filter(
    (t) =>
      new Date(t.dueDate) < new Date() &&
      t.status !== 'Completed'
  );

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

 const renderTaskList = (title: string, tasks: Task[]) => (
  <div className="bg-white p-6 rounded-xl shadow mb-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {tasks.length === 0 ? (
      <p className="text-sm text-gray-500">No tasks found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-shadow"
          >
            <h4 className="text-md font-semibold mb-1 text-purple-700">
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Due:</span>{' '}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Status:</span>{' '}
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                  task.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : task.status === 'In Progress'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {task.status}
              </span>
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Priority:</span>{' '}
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                  task.priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {task.priority}
              </span>
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

  return (
    <div className="p-6 space-y-6 pl-72">
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Welcome! {name}</h2>
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

      {/* Charts */}
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

      {/* Task Lists */}
      {renderTaskList('Tasks Assigned to You', assignedTasks)}
      {renderTaskList('Tasks You Created', createdTasks)}
      {renderTaskList('Overdue Tasks', overdueTasks)}
    </div>
  );
}
