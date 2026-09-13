import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Loading from '@/components/common/Loading'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

/**
 * Route guard requiring active authenticated session.
 * Denies administrator access to student assessment test pages:
 * Administrators must first log in as a student to access the test.
 */
export function ProtectedRoute({ children, allowAdmin = false }) {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }

  // 1. If not logged in at all, redirect to student login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  // 2. If logged in as an administrator and accessing student test/dashboard routes: Deny access!
  if (isAdmin && !allowAdmin) {
    const handleSwitchToStudent = () => {
      // Do NOT log out admin immediately; preserve session until student login/registration actually succeeds
      navigate(ROUTES.LOGIN, { state: { from: location } })
    }

    return (
      <div className="py-12 sm:py-20 bg-slate-50 min-h-[75vh] flex items-center justify-center">
        <div className="container max-w-lg px-4">
          <Card className="p-6 sm:p-10 rounded-3xl border border-amber-200 shadow-lg bg-white text-center">
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 text-3xl inline-flex items-center justify-center mb-4 shadow-2xs">
              🔒
            </div>

            <div className="inline-block bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              Admin Access Denied
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              Student Account Required
            </h1>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 space-y-2">
              <p>
                You are currently logged in with administrative credentials (
                <span className="font-mono font-semibold text-slate-800">{user?.phone || user?.userId}</span>).
              </p>
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 font-bold text-xs sm:text-sm">
                ⚠️ Administrators cannot access or take the test page. 1st login as a student, then you can access the test page.
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleSwitchToStudent}
                className="w-full sm:w-auto justify-center shadow-xs"
              >
                Log In as a Student &rarr;
              </Button>

              <Button
                to={ROUTES.ADMIN_DASHBOARD}
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center border-slate-300"
              >
                Return to Admin Dashboard
              </Button>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              Your administrator session will remain securely active until you actually complete a student login or registration.
            </p>

            {/* Hint for tester */}
            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
              Don&apos;t have a student account?{' '}
              <button
                type="button"
                onClick={() => navigate(ROUTES.REGISTER, { state: { from: location } })}
                className="font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Register as Student &rarr;
              </button>
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
