import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/Admin/Login';
import AdminLayout from './pages/Admin/Dashboard';
import AllBlogs from './pages/Admin/AllBlogs';
import AddEditBlog from './pages/Admin/AddEditBlog';
import AllCategories from './pages/Admin/AllCategories';
import AddCategory from './pages/Admin/AddCategory';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<BlogDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AllBlogs />} />
        <Route path="all-blogs" element={<AllBlogs />} />
        <Route path="add-blog" element={<AddEditBlog />} />
        <Route path="edit-blog/:id" element={<AddEditBlog />} />
        <Route path="categories" element={<AllCategories />} />
        <Route path="add-category" element={<AddCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

