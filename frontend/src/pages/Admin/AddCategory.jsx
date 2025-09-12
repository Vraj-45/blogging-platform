import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      await API.post('/categories', { name });
      navigate('/admin/categories');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Add Category</h3>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <input className="w-full border p-2 mb-3" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <div><button className="bg-green-600 text-white px-3 py-2 rounded">Save</button></div>
      </form>
    </div>
  );
}
