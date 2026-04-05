import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /auth page, but save the current location they were trying to go to when they were redirected
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!role) {
    // Authenticated but no role, theoretically shouldn't happen with updated fixed credentials logic
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role not authorized, so redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
