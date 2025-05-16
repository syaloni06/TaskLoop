// components/TaskItem.tsx

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  assignedTo: string;
  createdBy: string;
}

export default function TaskItem({ task }: { task: Task }) {
  return (
    <div className="p-4 border mb-2 rounded">
      <h2 className="text-xl font-semibold">
        {task.title} - {task.priority}
      </h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
}
