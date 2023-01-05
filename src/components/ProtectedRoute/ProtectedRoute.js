import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute( { isLogged }) {
  if (!isLogged) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}

export default ProtectedRoute;
