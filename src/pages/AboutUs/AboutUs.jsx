import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ROUTES from '@/constants/routes'
import { useTranslation } from '@/hooks/useTranslation'

export function AboutUs() {
  const { t } = useTranslation()

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="container max-w-4xl">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
            {t('aboutUs.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('aboutUs.subtitle')}
          </p>
        </header>

        {/* Mission Statement: Clean typographic presentation with subtle accent, eliminating boxed card visual noise */}
        <section className="mb-10 sm:mb-14 border-l-4 border-l-blue-600 pl-4 sm:pl-6 py-1" aria-labelledby="mission-title">
          <h2 id="mission-title" className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2">
            {t('aboutUs.missionTitle')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl m-0">
            {t('aboutUs.missionDesc')}
          </p>
        </section>

        {/* Core Pillars of Student Support: 1 col on mobile, 3 cols on md+ */}
        <section className="mb-10 sm:mb-14" aria-labelledby="pillars-title">
          <h2 id="pillars-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
            {t('aboutUs.whatWeDoTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-sm transition-shadow">
              <div className="text-3xl mb-3" aria-hidden="true">🧭</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {t('aboutUs.support1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                {t('aboutUs.support1Desc')}
              </p>
            </Card>

            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-sm transition-shadow">
              <div className="text-3xl mb-3" aria-hidden="true">💼</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {t('aboutUs.support2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                {t('aboutUs.support2Desc')}
              </p>
            </Card>

            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-sm transition-shadow">
              <div className="text-3xl mb-3" aria-hidden="true">🤝</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {t('aboutUs.support3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                {t('aboutUs.support3Desc')}
              </p>
            </Card>
          </div>
        </section>

        {/* Navigation Prompt - Soothing, non-overpowering invitation */}
        <div className="text-center p-6 sm:p-8 md:p-10 bg-slate-50/80 rounded-2xl border border-slate-200 shadow-2xs">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2">
            {t('aboutUs.readyTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
            {t('aboutUs.readySubtitle')}
          </p>
          <Button to={ROUTES.HOME} size="lg" variant="primary" className="w-full sm:w-auto justify-center shadow-xs">
            {t('common.startAssessment')} &rarr;
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
