import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PageLoading from '@/components/common/PageLoading'
import RouteErrorBoundary from '@/components/common/RouteErrorBoundary'
import Footer from '@/components/navigation/Footer'
import Navbar from '@/components/navigation/Navbar'
import ROUTES from '@/constants/routes'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Main Layout Shell
 * Pure Tailwind CSS layout with accessible skip-link and flex-grow main container
 */
export function MainLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const isAssessment = location.pathname === ROUTES.ASSESSMENT

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Accessibility: Skip Link for Keyboard & Screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-md focus:font-semibold focus:shadow-md outline-none"
      >
        {t('navigation.skipToContent')}
      </a>

      <Navbar />

      <main
        id="main-content"
        className={`flex-1 w-full outline-none ${
          isAssessment ? 'pb-24 sm:pb-28 lg:pb-12' : 'pb-16 sm:pb-20 lg:pb-0'
        }`}
        tabIndex="-1"
      >
        <RouteErrorBoundary>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </RouteErrorBoundary>
      </main>

      {!isAssessment && <Footer />}
    </div>
  )
}

export default MainLayout
