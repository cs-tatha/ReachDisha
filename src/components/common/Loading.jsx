import { useTranslation } from '@/hooks/useTranslation'

/**
 * Accessible Loading Indicator
 * Pure Tailwind CSS implementation
 */
export function Loading({ message }) {
  const { t } = useTranslation()
  const displayMessage = message || t('common.loading')

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-12 px-4 gap-4 text-slate-600"
    >
      <div
        className="w-9 h-9 border-3 border-slate-300 border-t-blue-700 rounded-full animate-spin"
        aria-hidden="true"
      />
      <p className="m-0 text-base font-medium">
        {displayMessage}
      </p>
    </div>
  )
}

export default Loading
