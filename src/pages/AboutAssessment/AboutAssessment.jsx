import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { useAssessmentProgress } from '@/utils/assessmentProgress'
import { questionService } from '@/services/assessment/questionService'
import { getLocalizedSection } from '@/constants/assessmentQuestions'

export function AboutAssessment() {
  const { t, language } = useTranslation()
  const { user } = useAuth()
  const { hasActiveAssessment, currentIndex, answeredCount, totalQuestions } = useAssessmentProgress(user?.id)
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0
  const sections = questionService.getSections()

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="container max-w-4xl">
        {/* Header with Verified Student Badge */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" aria-hidden="true" />
              {t('aboutAssessment.verifiedAccess', { name: user?.fullName || t('navigation.student') })}
            </span>
            <span className="inline-block bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-blue-100">
              {t('common.readTime')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
            {t('aboutAssessment.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            {t('aboutAssessment.subtitle')}
          </p>
        </header>

        {/* ACTIVE ASSESSMENT IN-PROGRESS BANNER */}
        {hasActiveAssessment && (
          <aside
            aria-label="Active Assessment Session"
            className="mb-8 sm:mb-12 p-5 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-50/90 via-amber-50/60 to-orange-50/50 border-2 border-amber-300 shadow-xs animate-in fade-in duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2.5 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-amber-100/90 text-amber-900 border border-amber-300/90 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>{t('aboutAssessment.activeSession.badge')}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t('aboutAssessment.activeSession.title')}
                </h2>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {t('aboutAssessment.activeSession.subtitle')}
                </p>

                {/* Progress bar and metric pill */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="text-amber-950 font-extrabold">
                      {t('aboutAssessment.activeSession.statusPill', {
                        current: currentIndex + 1,
                        total: totalQuestions,
                        answered: answeredCount,
                      })}
                    </span>
                    <span className="text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md font-mono text-[11px] font-extrabold">
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-amber-200/70 rounded-full overflow-hidden border border-amber-300/80">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.max(5, progressPercent)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Resume Assessment + Go to Dashboard */}
              <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2.5">
                <Button
                  to={ROUTES.ASSESSMENT}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md gap-2 justify-center font-black bg-blue-700 hover:bg-blue-800 text-white text-base px-6 py-3"
                >
                  <span>{t('aboutAssessment.activeSession.resumeCta')}</span>
                </Button>

                <Button
                  to={`${ROUTES.USER_DASHBOARD}?tab=assessment`}
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto shadow-2xs gap-2 justify-center font-bold bg-white text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-50"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{t('aboutAssessment.activeSession.dashboardCta')}</span>
                </Button>
              </div>
            </div>

            {/* Profile Icon / Dashboard Instruction Hint */}
            <div className="mt-4 pt-3.5 border-t border-amber-200/80 flex items-center gap-2 text-xs font-semibold text-amber-950">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-200/60 text-amber-900 px-1.5 py-0.5 rounded">Tip</span>
              <p className="m-0 leading-normal">
                {t('aboutAssessment.activeSession.profileTip')}
              </p>
            </div>
          </aside>
        )}

        {/* Why Take Assessment Section */}
        <section className="mb-10 sm:mb-14" aria-labelledby="why-section-title">
          <h2 id="why-section-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
            {t('aboutAssessment.whySection.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="text-xs font-black tracking-wider text-blue-700 uppercase mb-2 font-mono">01 &bull; Clarity</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {t('aboutAssessment.whySection.point1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                {t('aboutAssessment.whySection.point1Desc')}
              </p>
            </Card>

            <Card className="p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="text-xs font-black tracking-wider text-blue-700 uppercase mb-2 font-mono">02 &bull; Alignment</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {t('aboutAssessment.whySection.point2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                {t('aboutAssessment.whySection.point2Desc')}
              </p>
            </Card>

            <Card className="p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="text-xs font-black tracking-wider text-blue-700 uppercase mb-2 font-mono">03 &bull; Direction</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {t('aboutAssessment.whySection.point3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                {t('aboutAssessment.whySection.point3Desc')}
              </p>
            </Card>
          </div>
        </section>

        {/* 6 Comprehensive Assessment Sections */}
        <section className="mb-10 sm:mb-14" aria-labelledby="sections-breakdown-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-2">
                6 Evaluation Dimensions
              </span>
              <h2 id="sections-breakdown-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                What the Assessment Measures
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
              {totalQuestions} Total Questions Across 6 Sections
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sections.map((sec, idx) => {
              const localized = getLocalizedSection(sec, language)
              return (
                <Card
                  key={sec.id}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-mono">
                        {sec.questionCount} Questions
                      </span>
                    </div>
                    <div className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider mb-1">
                      Section {idx + 1} of 6
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                      {localized.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {localized.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">{localized.shortDesc}</span>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* How It Works: Clean, vertical step layout with numbered badges and calm typography */}
        <section className="mb-10 sm:mb-14" aria-labelledby="how-it-works-title">
          <h2 id="how-it-works-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
            {t('aboutAssessment.howItWorks.title')}
          </h2>
          <div className="space-y-6 sm:space-y-8 max-w-3xl">
            {/* Step 1 */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-base sm:text-lg flex items-center justify-center flex-none shadow-2xs"
                aria-hidden="true"
              >
                1
              </div>
              <div className="pt-0.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {t('aboutAssessment.howItWorks.step1Title')}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed m-0">
                  {t('aboutAssessment.howItWorks.step1Desc')}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-base sm:text-lg flex items-center justify-center flex-none shadow-2xs"
                aria-hidden="true"
              >
                2
              </div>
              <div className="pt-0.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {t('aboutAssessment.howItWorks.step2Title')}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed m-0">
                  {t('aboutAssessment.howItWorks.step2Desc')}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-base sm:text-lg flex items-center justify-center flex-none shadow-2xs"
                aria-hidden="true"
              >
                3
              </div>
              <div className="pt-0.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {t('aboutAssessment.howItWorks.step3Title')}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed m-0">
                  {t('aboutAssessment.howItWorks.step3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment Ready Launch Card */}
        <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 border border-blue-200 text-center rounded-2xl sm:rounded-3xl shadow-2xs">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Assessment Gateway
          </span>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            {hasActiveAssessment
              ? t('aboutAssessment.activeSession.readyResumeTitle')
              : t('aboutAssessment.readyTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            {hasActiveAssessment
              ? t('aboutAssessment.activeSession.readyResumeDesc', { name: user?.fullName || t('navigation.student') })
              : t('aboutAssessment.readyDesc', { name: user?.fullName || t('navigation.student') })}
          </p>

          {/* Quick Assessment Facts Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto mb-8 text-xs sm:text-sm">
            <div className="bg-white border border-slate-200 p-2.5 sm:p-3 rounded-xl flex items-center justify-center text-slate-700 font-medium shadow-2xs">
              <span>{t('aboutAssessment.factTime')}</span>
            </div>
            <div className="bg-white border border-slate-200 p-2.5 sm:p-3 rounded-xl flex items-center justify-center text-slate-700 font-medium shadow-2xs">
              <span>{t('aboutAssessment.factQuestions')}</span>
            </div>
            <div className="bg-white border border-slate-200 p-2.5 sm:p-3 rounded-xl flex items-center justify-center text-slate-700 font-medium shadow-2xs">
              <span>{t('aboutAssessment.factSaved')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              to={ROUTES.ASSESSMENT}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto justify-center text-base sm:text-lg font-bold shadow-sm px-8 py-3.5"
            >
              {hasActiveAssessment
                ? t('aboutAssessment.activeSession.resumeCta')
                : t('aboutAssessment.proceedCta')}
            </Button>
            {hasActiveAssessment ? (
              <Button
                to={`${ROUTES.USER_DASHBOARD}?tab=assessment`}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto justify-center font-bold"
              >
                {t('aboutAssessment.activeSession.dashboardCta')}
              </Button>
            ) : (
              <Button
                to={ROUTES.CAREER}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto justify-center"
              >
                {t('common.exploreCareers')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutAssessment
