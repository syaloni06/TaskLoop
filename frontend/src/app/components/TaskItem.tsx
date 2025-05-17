// components/TaskItem.tsx

import Link from "next/link";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  assignedTo: []; // assume comma-separated user image URLs or names
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

  const completed = task.progress?.completed ?? 0;
  const total = task.progress?.total ?? 5;
  const percentComplete = Math.min((completed / total) * 100, 100);

  return (
    <Link href={`/tasks/${task._id}`} className="block cursor-pointer hover:shadow-md transition">
 

    <div className="bg-white shadow rounded-xl p-4 w-full border space-y-3">
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

      <div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      <div>
        <p className="text-sm font-medium">
          Task Done: {completed} / {total}
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
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

      {/* <div className="flex space-x-1">
        {task.assignedTo.map((name, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full border-2 border-white bg-gray-500 text-white text-xs flex items-center justify-center -ml-1"
          >
            {name[0]}
          </div>
        ))}
      </div> */}
    </div>
    </Link>
  );
}
