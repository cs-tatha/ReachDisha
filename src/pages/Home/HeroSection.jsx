import heroImage from '@/assets/images/hero.png'
import Button from '@/components/ui/Button'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const { t } = useTranslation()
  const { isAuthenticated, isAdmin } = useAuth()

  return (
    <section className="bg-white border-b border-slate-200 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
            {/* Trust / Category Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-4 sm:mb-5">
              <span aria-hidden="true">✦</span> {t('home.hero.badge')}
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4 leading-tight">
              {t('home.hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal mb-3 sm:mb-4 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>

            {/* Simple Description for Less Experienced Users */}
            <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              {t('home.hero.description')}
            </p>

            {/* Action Buttons: Separate Registration & Login */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
              {isAuthenticated ? (
                isAdmin ? (
                  <Button
                    to={ROUTES.ADMIN_DASHBOARD}
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto justify-center text-base sm:text-lg font-bold shadow-sm px-7 py-3 bg-teal-700 hover:bg-teal-800"
                  >
                    {t('home.hero.adminPortalCta')}
                  </Button>
                ) : (
                  <>
                    <Button
                      to={ROUTES.ABOUT_ASSESSMENT}
                      size="lg"
                      variant="primary"
                      className="w-full sm:w-auto justify-center text-base sm:text-lg font-bold shadow-sm px-7 py-3"
                    >
                      {t('home.hero.ctaContinueTest')} &rarr;
                    </Button>
                    <Button
                      to={ROUTES.USER_DASHBOARD}
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto justify-center text-base sm:text-lg font-bold px-7 py-3"
                    >
                      {t('home.hero.ctaDashboard')}
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Button
                    to={ROUTES.REGISTER}
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto justify-center text-base sm:text-lg font-bold shadow-sm px-7 py-3"
                  >
                    {t('home.hero.ctaRegister')} &rarr;
                  </Button>
                  <Button
                    to={ROUTES.LOGIN}
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto justify-center text-base sm:text-lg font-bold px-7 py-3 border-slate-300 hover:bg-slate-50"
                  >
                    {t('home.hero.ctaLogin')}
                  </Button>
                </>
              )}
            </div>

            {/* Trust Checks: Wrap on Mobile, Inline on Desktop */}
            <div className="w-full pt-4 sm:pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-base" aria-hidden="true">✓</span>
                <span>{t('home.hero.feature1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-base" aria-hidden="true">✓</span>
                <span>{t('home.hero.feature2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-base" aria-hidden="true">✓</span>
                <span>{t('home.hero.feature3')}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column: Optimized for 2:1 Horizontal Story Illustration */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center items-center w-full">
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-none group">
              {/* Soft atmospheric ambient glow */}
              <div
                className="absolute -inset-3 bg-gradient-to-r from-blue-100/60 via-indigo-50/40 to-emerald-100/50 rounded-3xl blur-xl -z-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/85 p-2 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300">
                <img
                  src={heroImage}
                  alt="Interactive journey from career uncertainty through quick assessment to bright future career pathways"
                  className="w-full h-auto object-contain rounded-xl sm:rounded-2xl"
                  loading="eager"
                  width="1024"
                  height="512"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
