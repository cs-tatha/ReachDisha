import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Accessible, role-aware error-prevention modal to confirm intentional user logout.
 * 
 * UX Design Principles:
 * - Error Prevention: Intercepts accidental clicks/taps before session is destroyed.
 * - Role-Appropriate Clarity: Distinct, crystal-clear messages for Students (assessment & profile data preserved) vs Admins (staff session closure).
 * - User Control & Freedom: Reassures user with safe "Stay Logged In" / "Stay in Portal" cancel action and Esc dismiss.
 * - Universal Accessibility: Includes ARIA dialog semantics, backdrop dismissal, and focus containment.
 */
export function LogoutConfirmModal({ isOpen, onClose, onConfirm, isAdmin: isAdminProp }) {
  const { t } = useTranslation()
  const { isAdmin: authIsAdmin } = useAuth()
  const isAdmin = typeof isAdminProp === 'boolean' ? isAdminProp : Boolean(authIsAdmin)

  // Dismiss on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // Role-specific messaging & styling
  const badgeText = isAdmin ? t('navigation.logoutAdminBadge') : t('navigation.logoutStudentBadge')
  const titleText = isAdmin ? t('navigation.logoutAdminTitle') : t('navigation.logoutStudentTitle')
  const messageText = isAdmin ? t('navigation.logoutAdminMessage') : t('navigation.logoutStudentMessage')
  const cancelText = isAdmin ? t('navigation.logoutAdminCancel') : t('navigation.logoutStudentCancel')
  const confirmText = isAdmin ? t('navigation.logoutAdminConfirm') : t('navigation.logoutStudentConfirm')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-7 text-center animate-in zoom-in-95 duration-150 select-none">
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-xs font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Role Identification Pill */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${
              isAdmin
                ? 'text-teal-800 bg-teal-50 border-teal-200'
                : 'text-blue-800 bg-blue-50 border-blue-200'
            }`}
          >
            {badgeText}
          </span>
        </div>

        {/* Visual Icon Badge */}
        {isAdmin ? (
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shadow-2xs">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        ) : (
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-2xs">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        )}

        {/* Role-Specific Title */}
        <h2
          id="logout-modal-title"
          className="text-lg sm:text-xl font-black text-slate-900 tracking-tight"
        >
          {titleText}
        </h2>

        {/* Role-Specific Explanatory Description */}
        <p
          id="logout-modal-desc"
          className="text-xs sm:text-sm text-slate-600 mt-2 mb-6 leading-relaxed"
        >
          {messageText}
        </p>

        {/* Action Buttons: Cancel vs Confirm */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-all cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer ${
              isAdmin
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmModal
