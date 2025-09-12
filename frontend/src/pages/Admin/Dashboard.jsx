import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/all-blogs" className={({isActive}) => isActive ? 'font-semibold' : ''}>All Blogs</NavLink>
          <NavLink to="/admin/add-blog" className={({isActive}) => isActive ? 'font-semibold' : ''}>Add New Blog</NavLink>
          <NavLink to="/admin/categories" className={({isActive}) => isActive ? 'font-semibold' : ''}>All Categories</NavLink>
          <NavLink to="/admin/add-category" className={({isActive}) => isActive ? 'font-semibold' : ''}>Add New Category</NavLink>
          <button onClick={logout} className="mt-4 text-left text-red-600">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
