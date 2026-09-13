import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import ROUTES from '@/constants/routes'
import AboutAssessment from '@/pages/AboutAssessment/AboutAssessment'
import AdminDashboard from '@/pages/Admin/Dashboard'
import AdminLogin from '@/pages/Auth/AdminLogin'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Assessment from '@/pages/Assessment/Assessment'
import Career from '@/pages/Career/Career'
import Home from '@/pages/Home/Home'
import NotFound from '@/pages/NotFound/NotFound'
import Dashboard from '@/pages/User/Dashboard'
import AdminRoute from '@/routes/AdminRoute'
import ProtectedRoute from '@/routes/ProtectedRoute'

/**
 * Automatically scrolls to top on route change to prevent stale scroll positions.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Website Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CAREER} element={<Career />} />
          <Route path={ROUTES.ABOUT_US} element={<Navigate to={ROUTES.HOME} replace />} />
          
          {/* Authentication Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />

          {/* Protected Student / User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.ABOUT_ASSESSMENT} element={<AboutAssessment />} />
            <Route path={ROUTES.ASSESSMENT} element={<Assessment />} />
            <Route path={ROUTES.USER_DASHBOARD} element={<Dashboard />} />
          </Route>

          {/* Protected Administrator Routes */}
          <Route element={<AdminRoute />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default AppRoutes
