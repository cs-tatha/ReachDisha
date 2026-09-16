import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BrandIcon } from '@/components/common/BrandLogo'
import Button from '@/components/ui/Button'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'

export function Login() {
  const { t } = useTranslation()
  const { studentLogin, isAdmin, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = location.state?.from?.pathname || ROUTES.USER_DASHBOARD

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const cleanIdentifier = identifier.trim()
    if (!cleanIdentifier) {
      setError(t('auth.errors.loginEmptyIdentifier'))
      return
    }

    if (!password.trim()) {
      setError(t('auth.errors.loginEmptyPassword'))
      return
    }

    setIsLoading(true)
    try {
      await studentLogin({ identifier: cleanIdentifier, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || t('common.errorGeneric'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/70 relative overflow-hidden">
      {/* Subtle Background Ambience */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent pointer-events-none -z-10 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Single-Column Master Container (Wider: max-w-xl sm:max-w-2xl) */}
      <div className="w-full max-w-xl sm:max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden transition-all">
        
        {/* Colorful Brand Accent Top Ribbon */}
        <div
          className="h-2 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500"
          aria-hidden="true"
        />

        <div className="p-6 sm:p-10 md:p-12">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3.5">
              <BrandIcon className="w-12 h-12 sm:w-14 sm:h-14 shadow-sm ring-4 ring-blue-50 rounded-2xl hover:scale-105 transition-transform" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 mb-3 tracking-wide">
              <span>🎓</span>
              <span>{t('auth.studentBadge')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
              {t('auth.studentLoginTitle')}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 font-normal leading-relaxed max-w-md mx-auto m-0">
              {t('auth.studentLoginSubtitle')}
            </p>
          </div>

          {/* Admin Session Preservation Warning (if administrator is viewing) */}
          {isAdmin && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 text-xs sm:text-sm text-teal-950 shadow-2xs">
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>🛡️</span>
                <span>Administrator Session Active ({user?.phone || user?.userId})</span>
              </div>
              <p className="text-xs text-teal-800 leading-relaxed mb-2.5">
                Sign in with a student account below to switch view and take tests. Your administrative session is securely retained until a student successfully logs in.
              </p>
              <Link
                to={ROUTES.ADMIN_DASHBOARD}
                className="font-bold text-teal-900 hover:text-teal-950 underline underline-offset-2 inline-flex items-center gap-1 text-xs"
              >
                &larr; {t('navigation.adminPortal')}
              </Link>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-xs sm:text-sm mb-6 font-medium flex items-start gap-3 animate-fade-in shadow-2xs"
            >
              <span className="text-lg shrink-0">⚠️</span>
              <div className="leading-snug pt-0.5">{error}</div>
            </div>
          )}

          {/* Single-Column Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
            
            {/* Field 1: Mobile Number / Identifier */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="student-identifier"
                  className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{t('auth.mobileLabel')}</span>
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline-block">
                  10 Digits
                </span>
              </div>

              <div className="relative flex items-center rounded-2xl border-2 border-slate-200 bg-slate-50/60 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-150">
                <div className="pl-4 pr-3 py-3.5 border-r border-slate-200 text-xs sm:text-sm font-bold text-slate-600 select-none flex items-center gap-1.5 bg-slate-100/50 rounded-l-2xl">
                  <span>🇮🇳</span>
                  <span>{t('auth.mobilePrefix')}</span>
                </div>
                <input
                  id="student-identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={t('auth.mobilePlaceholder')}
                  required
                  autoComplete="username"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 text-base sm:text-lg font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
                {identifier && (
                  <button
                    type="button"
                    onClick={() => setIdentifier('')}
                    aria-label="Clear mobile number"
                    className="pr-4 text-slate-600 hover:text-slate-600 text-sm font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Field 2: Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="student-password"
                  className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>{t('auth.passwordLabel')}</span>
                  <span className="text-red-600 font-bold">*</span>
                </label>
              </div>

              <div className="relative flex items-center rounded-2xl border-2 border-slate-200 bg-slate-50/60 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-150">
                <input
                  id="student-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder')}
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full py-3.5 pl-4 pr-12 text-base sm:text-lg font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  className="absolute right-3 w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Row */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs sm:text-sm">
              <label className="flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500 cursor-pointer"
                />
                <span>{t('auth.rememberMe')}</span>
              </label>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg shadow-md hover:shadow-xl hover:shadow-blue-700/20 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
                isLoading={isLoading}
              >
                <span>{isLoading ? t('auth.loggingIn') : t('auth.loginButton')}</span>
                {!isLoading && (
                  <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-150" aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Registration Promotion Section */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600 mb-2">
              {t('auth.noAccountPrompt')}
            </p>
            <Link
              to={ROUTES.REGISTER}
              state={{ from: location.state?.from }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-extrabold text-blue-700 bg-blue-50/70 hover:bg-blue-100 border border-blue-200/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t('auth.registerLink')}</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Trust Footer Badges */}
          <div className="mt-8 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs text-slate-500">
            <div className="flex flex-col items-center gap-1">
              <span>🔒</span>
              <span className="font-semibold text-slate-700">100% Free & Safe</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span>🎯</span>
              <span className="font-semibold text-slate-700">Psychometric Guidance</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span>🏛️</span>
              <span className="font-semibold text-slate-700">Reach India Pvt. Ltd.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
