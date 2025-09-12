import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const fetch = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => { fetch(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      fetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Categories</h3>
        <Link to="/admin/add-category" className="bg-blue-600 text-white px-3 py-1 rounded">Add Category</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead><tr><th className="border p-2">Name</th><th className="border p-2">Actions</th></tr></thead>
        <tbody>
          {categories.map(c => (
            <tr key={c._id}><td className="border p-2">{c.name}</td><td className="border p-2"><button onClick={() => remove(c._id)} className="text-red-600">Delete</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
