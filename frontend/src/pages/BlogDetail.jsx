import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import Header from '../components/Header';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get(`/blogs/slug/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [slug]);

  if (!blog) return <div><Header /><div className="container mx-auto p-4">Loading...</div></div>;

  const imageBase = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';
  const thumb = blog.featuredImage ? imageBase + blog.featuredImage : blog.thumbnail ? imageBase + blog.thumbnail : null;

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <div className="mb-4">
          <Link to="/" className="text-blue-600">&larr; Back</Link>
        </div>
        <article className="bg-white p-4 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{blog.category?.name} • {new Date(blog.publishDate).toLocaleDateString()}</p>
          {thumb && <img src={thumb} alt={blog.title} className="w-full max-h-96 object-cover mb-4" />}
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
        </article>
      </main>
    </>
  );
}
