import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/articles" replace />;
  }

  return children;
}