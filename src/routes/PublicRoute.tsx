import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

const PublicRoute = () => {
  const { isLoggedIn, role } = useAuthStore();

  if (isLoggedIn && role === "ADMIN") {
    return <Navigate to="/dashboard" />;
  }else if (isLoggedIn && role === "CLIENT") {
    return <Navigate to="/produtos" />;
  }

  return <Outlet />; 
};

export default PublicRoute;
