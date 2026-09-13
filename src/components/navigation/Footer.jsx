import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-5 sm:py-6">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p className="m-0">
            {t('common.footer.rights', { year: currentYear })}
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-500">
            <span>{t('common.footer.accessibleDesign')}</span>
            <span>•</span>
            <span>{t('common.footer.mobileFirst')}</span>
            <span>•</span>
            <span>{t('common.footer.multiLanguage')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
