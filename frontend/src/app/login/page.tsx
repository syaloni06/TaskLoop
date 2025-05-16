'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('http://localhost:5100/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="Password" required />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
