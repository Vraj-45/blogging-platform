import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const thumbUrl = blog.thumbnail ? (import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000') + blog.thumbnail : null;
  return (
    <Link to={`/${blog.slug}`} className="block border rounded bg-white overflow-hidden hover:shadow">
      {thumbUrl && <img src={thumbUrl} alt={blog.title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <p className="text-sm text-gray-500">{blog.category?.name}</p>
        <div className="mt-2 text-sm text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.description?.slice(0, 200) + '...' }} />
      </div>
    </Link>
  );
}
  