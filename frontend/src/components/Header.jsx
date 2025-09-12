import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdminLogin = location.pathname === '/admin/login';

  return (
    <header className="bg-white shadow p-4 flex items-center">
      <h1 className="text-xl font-bold flex-1">
        <Link to="/">Blog Platform</Link>
      </h1>
      {isHome && (
        <Link
          to="/admin/login"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Login
        </Link>
      )}
      {isAdminLogin && (
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Home
        </Link>
      )}
    </header>
  );
}
