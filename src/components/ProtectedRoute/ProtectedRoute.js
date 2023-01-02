import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute( { isLogged }) {
  if (isLogged) {
    return (
      <Outlet />
    )
  }
  return (
    <Navigate to='/' replace />
  )
}

export default ProtectedRoute;
