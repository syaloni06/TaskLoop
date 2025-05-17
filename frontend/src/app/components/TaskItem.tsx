// components/TaskItem.tsx

import Link from "next/link";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignedTo: any[]; // assume comma-separated user image URLs or names
  createdBy: string;
  progress?: { completed: number; total: number }; // Optional addition for progress
}

const statusColorMap: Record<string, string> = {
  Pending: "bg-purple-100 text-purple-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const priorityColorMap: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskItem({ task }: { task: Task }) {
  const statusClass =
    statusColorMap[task.status] || "bg-gray-100 text-gray-700";
  const priorityClass =
    priorityColorMap[task.priority] || "bg-gray-100 text-gray-700";

  return (
    <Link
      href={`/tasks/${task._id}`}
      className="block h-full cursor-pointer hover:shadow-md transition"
    >
      <div className="h-full flex flex-col justify-evenly bg-white shadow rounded-xl p-4 w-full border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}
            >
              {task.status}
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${priorityClass}`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(task.dueDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(task.dueDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {task.assignedTo.map((user) => (
            <label
              key={user._id}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border cursor-pointer"
            >
              <span className="text-sm text-gray-800">{user.email}</span>
            </label>
          ))}
        </div>
      </div>
    </Link>
  );
}
