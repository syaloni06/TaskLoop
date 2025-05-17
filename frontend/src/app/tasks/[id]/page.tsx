"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../services/api";
import { Task, User } from "../../types/index";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { API_URL } from "@/app/utils/API_URL";

export default function TaskDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    assignedTo: [] as string[], // user IDs now
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const taskRes = await api.get(`${API_URL}/task/${id}`);
        const usersRes = await api.get(`${API_URL}/users`);
        const taskData = taskRes.data;

        setTask(taskData);
        setUsers(usersRes.data);
        setFormData({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          dueDate: taskData.dueDate.split("T")[0],
          assignedTo: taskData.assignedTo.map((u: User) => u._id), // assuming _id is the user ID
        });
      } catch (err) {
        console.error("Failed to load data", err);
      }
    }

    if (id) fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignedChange = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(userId)
        ? prev.assignedTo.filter((id) => id !== userId)
        : [...prev.assignedTo, userId],
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.put(`${API_URL}/task/${id}`, formData);
      alert("Task updated successfully!");
      router.push("/tasks");
    } catch (err) {
      console.error("Failed to update task", err);
      alert("Update failed!");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`${API_URL}/task/${id}`);
      alert("Task deleted successfully!");
      router.push("/tasks"); // or your task list route
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Delete failed!");
    }
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 border border-gray-200 rounded-2xl shadow-lg bg-white space-y-6">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={handleDelete}
          className="text-red-600 border border-red-600 px-4 py-1  rounded flex gap-2 hover:bg-red-100"
        >
          <p className="text-xl font-semibold">Delete</p>
          <RiDeleteBin5Fill className="self-center text-2xl"/>
        </button>
      </div>
      <div>
        <label className="text-sm text-gray-500">Task Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full border rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-500">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-800"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-800"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-800"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500">Assigned To</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {users.map((user) => (
            <label
              key={user._id}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.assignedTo.includes(user._id)}
                onChange={() => handleAssignedChange(user._id)}
              />
              <span className="text-sm text-gray-800">{user.email}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500">Created By</label>
        <p className="text-gray-700 mt-1">{task.createdBy.email}</p>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 font-medium px-6 py-2 rounded shadow"
        >
         <FaEdit className="self-center text-2xl"/><p className="text-xl font-semibold">Update Task</p>
        </button>
      </div>
    </div>
  );
}
