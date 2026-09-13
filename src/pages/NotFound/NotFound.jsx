import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ROUTES from '@/constants/routes'
import { useTranslation } from '@/hooks/useTranslation'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="container max-w-xl mx-auto px-4 text-center">
        <Card padding="xl">
          <div className="text-5xl mb-3" aria-hidden="true">
            🔍
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {t('common.notFoundTitle')}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
            {t('common.notFoundDesc')}
          </p>
          <Button to={ROUTES.HOME} size="lg" variant="primary">
            {t('navigation.home')} &rarr;
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default NotFound
