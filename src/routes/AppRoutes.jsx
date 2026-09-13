import { lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import ROUTES from '@/constants/routes'
import Home from '@/pages/Home/Home'
import AdminRoute from '@/routes/AdminRoute'
import ProtectedRoute from '@/routes/ProtectedRoute'

/**
 * Resilient Dynamic Import with Auto-Retry
 * Automatically retries chunk fetches up to 2 times on mobile network hiccups
 */
function lazyWithRetry(importFn, retries = 2, interval = 500) {
  return lazy(() =>
    new Promise((resolve, reject) => {
      function attempt() {
        importFn()
          .then(resolve)
          .catch((error) => {
            if (retries > 0) {
              retries--
              setTimeout(attempt, interval)
            } else {
              reject(error)
            }
          })
      }
      attempt()
    })
  )
}

// Route-level code-split chunks
const AboutAssessment = lazyWithRetry(() => import('@/pages/AboutAssessment/AboutAssessment'))
const AdminDashboard = lazyWithRetry(() => import('@/pages/Admin/Dashboard'))
const AdminLogin = lazyWithRetry(() => import('@/pages/Auth/AdminLogin'))
const Login = lazyWithRetry(() => import('@/pages/Auth/Login'))
const Register = lazyWithRetry(() => import('@/pages/Auth/Register'))
const Assessment = lazyWithRetry(() => import('@/pages/Assessment/Assessment'))
const Career = lazyWithRetry(() => import('@/pages/Career/Career'))
const Dashboard = lazyWithRetry(() => import('@/pages/User/Dashboard'))
const NotFound = lazyWithRetry(() => import('@/pages/NotFound/NotFound'))

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
