import { useState } from 'react';
import API, { setAuthToken } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('adminToken', token);
      setAuthToken(token);
      navigate('/admin/all-blogs');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={submit}
          className="bg-white p-8 rounded shadow w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          {err && <div className="text-red-600 mb-2">{err}</div>}
          <input
            className="w-full border p-2 mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border p-2 mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
