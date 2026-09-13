import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import BrandLogo from '@/components/common/BrandLogo'
import LanguageSelector from '@/components/common/LanguageSelector'
import LogoutConfirmModal from '@/components/common/LogoutConfirmModal'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { useAssessmentProgress } from '@/utils/assessmentProgress'

/**
 * Helper: Derive initials from name for avatar fallback
 */
function getInitials(name) {
  if (!name) return 'ST'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Modern Accessible Navbar
 * Features an Instagram-style bottom navigation bar for mobile
 * Top bar in mobile displays exclusively the Language Selector and the Profile Picture Icon with User Name underneath.
 * Desktop maintains a clean, centered pill navigation bar.
 */
export function Navbar() {
  const { t } = useTranslation()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { hasActiveAssessment } = useAssessmentProgress(user?.id)
  const navigate = useNavigate()
  const location = useLocation()
  const isAssessmentPage = location.pathname === ROUTES.ASSESSMENT

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setIsLogoutModalOpen(false)
    logout()
    navigate(ROUTES.HOME)
  }

  // Derived user display name for mobile profile button
  const mobileDisplayName = !isAuthenticated
    ? t('navigation.signIn')
    : isAdmin
    ? t('navigation.admin')
    : user?.firstName || user?.fullName?.trim().split(/\s+/)[0] || t('navigation.student')

  const initials = getInitials(user?.fullName)

  // Target route when tapping profile avatar
  const profileRoute = !isAuthenticated
    ? ROUTES.LOGIN
    : isAdmin
    ? ROUTES.ADMIN_DASHBOARD
    : ROUTES.USER_DASHBOARD

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 min-h-[40px] px-3 xl:px-4 py-2 rounded-full text-[14px] xl:text-[15px] font-semibold whitespace-nowrap shrink-0 transition-all duration-150 group ${
      isActive
        ? 'text-blue-700 bg-blue-50 font-bold shadow-2xs ring-1 ring-blue-300'
        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/90'
    }`

  const bottomNavLinkClass = ({ isActive }) =>
    `relative flex flex-col items-center justify-center flex-1 h-full min-h-[56px] py-1 px-0.5 transition-all duration-150 active:scale-90 select-none ${
      isActive
        ? 'text-blue-700 font-bold'
        : 'text-slate-500 font-medium hover:text-slate-800'
    }`

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. Top Header Bar                                                         */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="container">
          <div className="flex items-center justify-between min-h-[60px] sm:min-h-[68px] lg:min-h-[72px] gap-2 lg:gap-4">
            
            {/* Brand Logo & Identifier */}
            <Link
              to={ROUTES.HOME}
              className="text-slate-900 no-underline group focus-visible:outline-2 focus-visible:outline-blue-700 rounded-lg shrink-0"
              aria-label={t('common.appName')}
            >
              <BrandLogo />
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/70 p-1.5 rounded-full border border-slate-200 shadow-2xs shrink-0"
            >
              <NavLink to={ROUTES.HOME} className={navLinkClass}>
                <svg
                  className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
                  />
                </svg>
                <span className="whitespace-nowrap">{t('navigation.home')}</span>
              </NavLink>

              <NavLink to={ROUTES.ABOUT_ASSESSMENT} className={navLinkClass}>
                <svg
                  className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
                <span className="whitespace-nowrap">{t('navigation.aboutAssessment')}</span>
                {hasActiveAssessment && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span>{t('navigation.inProgress')}</span>
                  </span>
                )}
              </NavLink>

              <NavLink to={ROUTES.CAREER} className={navLinkClass}>
                <svg
                  className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="whitespace-nowrap">{t('navigation.careerPaths')}</span>
              </NavLink>
            </nav>

            {/* Desktop Right Actions & Auth Controls (>= 1024px) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3.5 shrink-0">
              <LanguageSelector id="desktop-lang-select" />

              <div className="h-5 w-px bg-slate-300" aria-hidden="true" />

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={profileRoute}
                    className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100/90 hover:bg-blue-50 border border-slate-200 shadow-2xs transition-all duration-150 group"
                    aria-label={`Go to ${mobileDisplayName}'s ${isAdmin ? 'Portal' : 'Dashboard'}`}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden text-white flex items-center justify-center font-extrabold text-[10px] bg-gradient-to-tr from-blue-700 to-indigo-600 shadow-2xs shrink-0">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                    <span className="truncate max-w-[120px]">{mobileDisplayName}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 border border-slate-300/80 shadow-2xs transition-all duration-150 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5" aria-hidden="true" />
                    {t('navigation.logout')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to={ROUTES.LOGIN}
                    className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full text-sm font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 shadow-2xs transition-all duration-150"
                  >
                    <span>{t('navigation.signIn')}</span>
                  </Link>
                  <Link
                    to={ROUTES.ADMIN_LOGIN}
                    className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/90 border border-slate-300/80 shadow-2xs transition-all duration-150"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-600 mr-2" aria-hidden="true" />
                    {t('navigation.loginAdmin')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Top Controls: Language Selector + (Single Admin Login Button OR Profile Picture Icon & Name) (< 1024px) */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
              <LanguageSelector id="mobile-quick-lang" />

              <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

              {!isAuthenticated ? (
                /* Single Admin Login Button when unauthenticated */
                <Link
                  to={ROUTES.ADMIN_LOGIN}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/90 hover:bg-teal-100 shadow-2xs transition-all active:scale-95"
                  aria-label={t('navigation.loginAdmin')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" aria-hidden="true" />
                  <span>{t('navigation.admin')}</span>
                </Link>
              ) : (
                /* Profile Picture Icon with User Name Directly Underneath when authenticated */
                <Link
                  to={profileRoute}
                  className="flex flex-col items-center justify-center py-0.5 px-1.5 rounded-xl hover:bg-slate-100/80 active:bg-slate-200/60 transition-colors group cursor-pointer"
                  aria-label={`Go to ${mobileDisplayName}'s ${isAdmin ? 'Portal' : 'Profile'}`}
                >
                  <div className="relative">
                    <div
                      className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden text-white flex items-center justify-center font-extrabold text-xs shadow-2xs border border-white group-hover:ring-2 transition-all ${
                        isAdmin
                          ? 'bg-teal-700 group-hover:ring-teal-400/50'
                          : 'bg-gradient-to-tr from-blue-700 to-indigo-600 group-hover:ring-blue-400/50'
                      }`}
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.fullName || (isAdmin ? 'Admin' : 'Student')}
                          className="w-full h-full object-cover"
                        />
                      ) : isAdmin ? (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"
                      title="Active"
                    />
                  </div>

                  {/* User Name Under Profile Picture */}
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 group-hover:text-blue-700 truncate max-w-[64px] text-center leading-tight mt-0.5">
                    {mobileDisplayName}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. Instagram-Style Bottom Navigation Bar for Mobile (< 1024px)             */}
      {/* (Hidden on active assessment to provide distraction-free test environment) */}
      {/* ========================================================================= */}
      {!isAssessmentPage && (
        <nav
          aria-label="Mobile Bottom Navigation"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] lg:hidden transition-transform duration-200"
        >
        <div className="container max-w-lg px-2">
          <div className="flex items-center justify-around h-[58px] sm:h-[62px]">
            {/* 1. Discover */}
            <NavLink to={ROUTES.HOME} end className={bottomNavLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute top-0 w-8 h-0.5 rounded-full bg-blue-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className={`transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={isActive ? '2.4' : '2'}
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
                      />
                    </svg>
                  </span>
                  <span className="text-[10px] font-semibold tracking-tight truncate max-w-full mt-0.5 leading-tight">
                    {t('navigation.home')}
                  </span>
                </>
              )}
            </NavLink>

            {/* 2. The Test */}
            <NavLink to={ROUTES.ABOUT_ASSESSMENT} className={bottomNavLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute top-0 w-8 h-0.5 rounded-full bg-blue-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className={`relative transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={isActive ? '2.4' : '2'}
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                    {hasActiveAssessment && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 border border-white" />
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-semibold tracking-tight truncate max-w-full mt-0.5 leading-tight flex items-center gap-1">
                    <span>{t('navigation.aboutAssessment')}</span>
                  </span>
                </>
              )}
            </NavLink>

            {/* 3. Careers */}
            <NavLink to={ROUTES.CAREER} className={bottomNavLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute top-0 w-8 h-0.5 rounded-full bg-blue-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className={`transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={isActive ? '2.4' : '2'}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="text-[10px] font-semibold tracking-tight truncate max-w-full mt-0.5 leading-tight">
                    {t('navigation.careerPaths')}
                  </span>
                </>
              )}
            </NavLink>

            {/* 4. Profile / Dashboard / Sign In */}
            <NavLink to={profileRoute} className={bottomNavLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute top-0 w-8 h-0.5 rounded-full bg-blue-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className={`transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}>
                    {isAuthenticated ? (
                      <div className="w-5 h-5 rounded-full overflow-hidden text-white flex items-center justify-center font-bold text-[9px] bg-gradient-to-tr from-blue-700 to-indigo-600 shadow-2xs">
                        {user?.avatar ? (
                          <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={isActive ? '2.4' : '2'}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-[10px] font-semibold tracking-tight truncate max-w-full mt-0.5 leading-tight">
                    {isAuthenticated
                      ? isAdmin
                        ? t('navigation.admin')
                        : t('navigation.dashboard')
                      : t('navigation.signIn')}
                  </span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
      )}

      {/* Confirmation Dialog for Safe Logout */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isAdmin={isAdmin}
      />
    </>
  )
}

export default Navbar
