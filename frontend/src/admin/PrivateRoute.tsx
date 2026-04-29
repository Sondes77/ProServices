// PrivateRoute.tsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('admin_token');
  const sessionStart = localStorage.getItem('admin_session_start');
  
  // Sécurité : Session expire après 2 heures
  const isExpired = sessionStart && Date.now() - parseInt(sessionStart) > 7200000;

  if (!token || isExpired) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default PrivateRoute;