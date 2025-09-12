import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { setAuthToken } from '../services/api';

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setAuthToken(token);
  }, []);
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}
