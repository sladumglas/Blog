import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

export default function PrivateRoute({ children }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p className="container">Проверка авторизации...</p>;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}