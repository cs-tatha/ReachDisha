import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loading from '@/components/common/Loading'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

/**
 * Route guard requiring active administrator session.
 * Unauthorized visitors are redirected to the dedicated Admin Login portal.
 */
export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}

export default AdminRoute
