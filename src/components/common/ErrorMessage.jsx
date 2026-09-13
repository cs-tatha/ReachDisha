import Button from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * Accessible, Friendly Error Message Component
 * Pure Tailwind CSS implementation
 */
export function ErrorMessage({ message, onRetry }) {
  const { t } = useTranslation()
  const displayMessage = message || t('common.errorGeneric')

  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-300 rounded-lg p-6 my-6 text-center text-red-700"
    >
      <p className="m-0 mb-4 font-medium">
        {displayMessage}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage
