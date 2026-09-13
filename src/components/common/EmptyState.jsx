import { useTranslation } from '@/hooks/useTranslation'

/**
 * Accessible Empty State Component
 * Pure Tailwind CSS implementation
 */
export function EmptyState({ title, description, action }) {
  const { t } = useTranslation()

  return (
    <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-slate-300 my-6">
      <h3 className="text-slate-900 font-bold text-lg mb-1">
        {title || t('common.emptyData')}
      </h3>
      {description && (
        <p className={`text-slate-600 text-sm ${action ? 'mb-4' : 'mb-0'}`}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}

export default EmptyState
