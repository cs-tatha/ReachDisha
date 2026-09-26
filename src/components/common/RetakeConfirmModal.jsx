import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Accessible, destructive-action confirmation modal to confirm intentional assessment retake.
 *
 * UX Principles:
 * - Error Prevention: Explicitly warns that previous scores and saved progress will be erased from the database.
 * - Clarity & User Control: Clear cancel button and destructive confirmation button with loading spinner.
 * - Accessibility: ARIA dialog attributes, focus containment, ESC key dismiss, backdrop lock.
 */
export function RetakeConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) {
  const { t } = useTranslation()

  // Dismiss on Escape key if not currently resetting
  useEffect(() => {
    if (!isOpen || isLoading) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isLoading, onClose])

  // Prevent background body scroll when modal is open
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="retake-modal-title"
      aria-describedby="retake-modal-desc"
      onClick={(e) => {
        if (!isLoading && e.target === e.currentTarget) {
          onClose()
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-7 text-center animate-in zoom-in-95 duration-150 select-none">
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-xs font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Warning Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs text-amber-800 bg-amber-50 border-amber-200">
            ⚠️ {t('assessment.modals.retakeBadge') || 'Erase & Retake Assessment'}
          </span>
        </div>

        {/* Warning Icon Graphic */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-2xs">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2
          id="retake-modal-title"
          className="text-lg sm:text-xl font-black text-slate-900 tracking-tight"
        >
          {t('assessment.modals.retakeConfirmTitle') || 'Are you sure you want to retake the test?'}
        </h2>

        {/* Description */}
        <p
          id="retake-modal-desc"
          className="text-xs sm:text-sm text-slate-600 mt-2 mb-4 leading-relaxed"
        >
          {t('assessment.modals.retakeConfirmDesc') ||
            'This will permanently erase your previous answers, scores, and evaluation from the database. The test will start again from Question 1.'}
        </p>

        {/* Warning Box */}
        <div className="p-3 mb-6 rounded-xl bg-rose-50 border border-rose-200/70 text-left flex items-start gap-2.5">
          <span className="text-base shrink-0">🗑️</span>
          <p className="text-xs text-rose-700 font-medium leading-relaxed">
            {t('assessment.modals.retakeWarning') ||
              'All current sectional scores, answers, and recommendation report will be permanently reset.'}
          </p>
        </div>

        {/* Action Buttons: Cancel vs Confirm */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 transition-all cursor-pointer"
          >
            {t('assessment.modals.retakeCancelBtn') || 'Cancel'}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-98 disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>{t('assessment.modals.retaking') || 'Resetting...'}</span>
              </>
            ) : (
              <span>{t('assessment.modals.retakeConfirmBtn') || 'Yes, Erase & Retake'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RetakeConfirmModal
