import { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function AddEditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlog = async () => {
    if (!id) return;
    try {
      setLoading(true);
      // no direct API for single blog by id, fetch list and find - or add endpoint
      const res = await API.get('/blogs');
      const blog = res.data.find(x => x._id === id);
      if (blog) {
        setTitle(blog.title);
        setCategory(blog.category?._id || '');
        setDescription(blog.description || '');
        setPublishDate(new Date(blog.publishDate).toISOString().slice(0,10));
      }
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchCategories();
    fetchBlog();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('publishDate', publishDate);
      if (thumbnail) formData.append('thumbnail', thumbnail);
      if (featuredImage) formData.append('featuredImage', featuredImage);

      if (id) {
        await API.put(`/blogs/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await API.post('/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/admin/all-blogs');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{id ? 'Edit Blog' : 'Add New Blog'}</h3>
      <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block mb-1">Title</label>
          <input className="w-full border p-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select className="w-full border p-2" value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription} />
        </div>
        <div>
          <label className="block mb-1">Publish Date</label>
          <input type="date" className="border p-2" value={publishDate} onChange={e => setPublishDate(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Thumbnail</label>
          <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
        </div>
        <div>
          <label className="block mb-1">Featured Image</label>
          <input type="file" accept="image/*" onChange={e => setFeaturedImage(e.target.files[0])} />
        </div>
        <div>
          <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{id ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
