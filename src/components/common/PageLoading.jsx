import { useTranslation } from '@/hooks/useTranslation'

/**
 * Branded Page Loading Fallback for Suspense
 * Features:
 * - Subtle top progress accent bar
 * - Accessible loading spinner with smooth pulse
 * - Prevents layout shift during route chunk fetching
 */
export function PageLoading() {
  const { t } = useTranslation()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={t('common.loading')}
      className="relative w-full min-h-[65vh] flex flex-col items-center justify-center p-6 select-none animate-in fade-in duration-150"
    >
      {/* Top Subtle Animated Accent Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 animate-pulse z-50" />

      {/* Branded Loading Orb */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-blue-600 animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-blue-50 animate-ping opacity-40" />
      </div>

      <p className="text-xs sm:text-sm font-semibold text-slate-600 tracking-tight animate-pulse">
        {t('common.loading')}
      </p>
    </div>
  )
}

export default PageLoading
