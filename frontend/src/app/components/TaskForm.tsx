"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../utils/API_URL";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export default function TaskForm() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => setUsers(res.data));
  }, []);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const userId = localStorage.getItem('userId');
    const taskPayload = {
      ...data,
      assignedTo: selectedUsers,
      status: "Pending",
      createdBy: userId,
      createdAt: new Date().toISOString()
    };
    
    await axios.post(`${API_URL}/task`, taskPayload);
    reset();
    setSelectedUsers([]);
    router.push("/tasks");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg mt-20 shadow space-y-6"
      >
        <h2 className="text-2xl font-bold">Create Task</h2>

        {/* Task Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter title"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Enter task description"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Priority, Due Date */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              {...register("priority")}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Assign To Button */}
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="w-full border rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
            >
              {selectedUsers.length > 0
                ? `${selectedUsers.length} user(s) selected`
                : "Select Users"}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold cursor-pointer"
          >
            Create Task
          </button>
        </div>
      </form>

      {/* Dialog Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-transparent flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">Select Users</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {users.map((user) => (
                <label key={user._id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                  />
                  <span>
                    {user.name} ({user.email})
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
