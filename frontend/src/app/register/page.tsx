'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      alert('Registered successfully');
      router.push('/login');
    } catch (err) {
      console.log(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="Password" required />
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}
