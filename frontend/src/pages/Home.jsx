import { useEffect, useState } from 'react';
import API from '../services/api';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (search) => {
    try {
      setLoading(true);
      const res = await API.get('/blogs', { params: { search } });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Search by title" value={q} onChange={(e) => setQ(e.target.value)} />
          <button onClick={() => fetchBlogs(q)} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
        </div>

        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map(b => <BlogCard key={b._id} blog={b} />)}
          </div>
        )}
      </main>
    </>
  );
}
