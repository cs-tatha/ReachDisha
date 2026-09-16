import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandIcon } from '@/components/common/BrandLogo'
import Button from '@/components/ui/Button'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'

export function AdminLogin() {
  const { t } = useTranslation()
  const { adminLogin } = useAuth()
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const cleanIdentifier = identifier.trim()
    if (!cleanIdentifier) {
      setError(t('auth.errors.adminEmptyEmail'))
      return
    }

    if (!password.trim()) {
      setError(t('auth.errors.adminEmptyPassword'))
      return
    }

    setIsLoading(true)
    try {
      await adminLogin({ identifier: cleanIdentifier, password })
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true })
    } catch (err) {
      setError(err.message || t('common.errorGeneric'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/70 relative overflow-hidden">
      {/* Subtle Background Teal Ambience */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-100/30 via-emerald-50/20 to-transparent pointer-events-none -z-10 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Single-Column Container (Wider: max-w-xl sm:max-w-2xl) */}
      <div className="w-full max-w-xl sm:max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden transition-all">
        
        {/* Teal Brand Accent Top Ribbon */}
        <div
          className="h-2 w-full bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500"
          aria-hidden="true"
        />

        <div className="p-6 sm:p-10 md:p-12">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3.5">
              <BrandIcon className="w-12 h-12 sm:w-14 sm:h-14 shadow-sm ring-4 ring-teal-50 rounded-2xl hover:scale-105 transition-transform" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/80 mb-3 tracking-wide">
              <span>🔒</span>
              <span>{t('auth.adminBadge')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
              {t('auth.adminLoginTitle')}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 font-normal leading-relaxed max-w-md mx-auto m-0">
              {t('auth.adminLoginSubtitle')}
            </p>
          </div>

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
            
            {/* Field 1: Administrator Mobile Number / ID */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="admin-identifier"
                  className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 text-teal-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{t('auth.adminEmailLabel')}</span>
                  <span className="text-red-600 font-bold">*</span>
                </label>
              </div>

              <div className="relative flex items-center rounded-2xl border-2 border-slate-200 bg-slate-50/60 focus-within:border-teal-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-100 transition-all duration-150">
                <input
                  id="admin-identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={t('auth.adminEmailPlaceholder')}
                  required
                  autoComplete="username"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 text-base sm:text-lg font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
                {identifier && (
                  <button
                    type="button"
                    onClick={() => setIdentifier('')}
                    aria-label="Clear input"
                    className="pr-4 text-slate-600 hover:text-slate-700 text-sm font-bold cursor-pointer"
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
                  htmlFor="admin-password"
                  className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 text-teal-700"
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
                  <span>{t('auth.adminPasswordLabel')}</span>
                  <span className="text-red-600 font-bold">*</span>
                </label>
              </div>

              <div className="relative flex items-center rounded-2xl border-2 border-slate-200 bg-slate-50/60 focus-within:border-teal-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-100 transition-all duration-150">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.adminPasswordPlaceholder') || t('auth.passwordPlaceholder')}
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

            {/* Primary Action Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 hover:via-teal-700 hover:to-emerald-700 text-white font-black text-base sm:text-lg shadow-md hover:shadow-xl hover:shadow-teal-700/20 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
                isLoading={isLoading}
              >
                <span>{isLoading ? t('auth.loggingIn') : t('auth.adminLoginButton')}</span>
                {!isLoading && (
                  <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-150" aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Return Link Section */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>{t('auth.returnToStudentLogin')}</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminLogin
