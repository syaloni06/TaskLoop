// components/TaskForm.tsx

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
}

export default function TaskForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get('/api/users').then((res: any) => setUsers(res.data));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await axios.post('/api/tasks', data);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <input placeholder="Title" {...register('title')} className="input" />
      <textarea placeholder="Description" {...register('description')} className="input" />
      <input type="date" {...register('dueDate')} className="input" />
      <select {...register('priority')} className="input">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select {...register('assignedTo')} className="input">
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.username}
          </option>
        ))}
      </select>
      <button type="submit" className="btn">
        Create Task
      </button>
    </form>
  );
}
