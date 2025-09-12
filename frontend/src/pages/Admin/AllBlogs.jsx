import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Blogs</h3>
        <Link to="/admin/add-blog" className="bg-blue-600 text-white px-3 py-1 rounded">Add New</Link>
      </div>
      {loading ? <div>Loading...</div> : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Published</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(b => (
              <tr key={b._id}>
                <td className="border p-2">{b.title}</td>
                <td className="border p-2">{b.category?.name}</td>
                <td className="border p-2">{new Date(b.publishDate).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button onClick={() => navigate(`/admin/edit-blog/${b._id}`)} className="mr-2 text-blue-600">Edit</button>
                  <button onClick={() => remove(b._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
