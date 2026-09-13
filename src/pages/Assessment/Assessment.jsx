import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import {
  ASSESSMENT_SECTIONS,
  getLocalizedQuestion,
  getLocalizedSection,
} from '@/constants/assessmentQuestions'
import { questionService } from '@/services/assessment/questionService'
import { notifyAssessmentUpdated } from '@/utils/assessmentProgress'

const getProgressKey = (userId) => `ccc_assessment_progress_${userId || 'guest'}`

export function Assessment() {
  const { t, language, setLanguage } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const progressKey = getProgressKey(user?.id)

  // Scroll references
  const activeSectionTabRef = useRef(null)
  const activeChipRef = useRef(null)
  const questionRailRef = useRef(null)

  // ---------------------------------------------------------------------------
  // 1. Initial State Restoration from LocalStorage
  // ---------------------------------------------------------------------------
  const savedState = useMemo(() => {
    try {
      const raw = localStorage.getItem(progressKey)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [progressKey])

  // Questions Array
  const [questions, setQuestions] = useState(() => {
    if (savedState?.questions && Array.isArray(savedState.questions) && savedState.questions.length > 0) {
      return savedState.questions
    }
    return []
  })

  // Async preparation loader state
  const [isLoading, setIsLoading] = useState(false)

  // Pre-fetch questions from MySQL database before starting
  useEffect(() => {
    let isMounted = true
    if (!questions || questions.length === 0) {
      questionService.fetchAssessmentQuestions().then((fetched) => {
        if (isMounted && Array.isArray(fetched) && fetched.length > 0) {
          setQuestions(fetched)
        }
      }).catch((err) => console.warn('Database question prefetch error:', err))
    }
    return () => { isMounted = false }
  }, [questions])

  // Session Started flag
  const [isStarted, setIsStarted] = useState(() => Boolean(savedState?.isStarted && !savedState?.isCompleted))

  // Pointer to active question (0 to questions.length - 1)
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (savedState?.currentIndex !== undefined && !savedState?.isCompleted) {
      return Math.max(0, savedState.currentIndex)
    }
    return 0
  })

  // User Responses Map: { [questionId]: optionId }
  const [answers, setAnswers] = useState(() => savedState?.answers || {})

  // Skipped Questions List: [questionId, ...]
  const [skippedIds, setSkippedIds] = useState(() => savedState?.skippedIds || [])

  // Marked for Preview Questions List: [questionId, ...]
  const [markedIds, setMarkedIds] = useState(() => savedState?.markedIds || [])

  // Completion flag
  const [isCompleted, setIsCompleted] = useState(() => Boolean(savedState?.isCompleted))

  // Navigator Panel Filter State: 'all' | 'skipped' | 'marked' | 'answered'
  const [activePaletteFilter, setActivePaletteFilter] = useState('all')

  // Mobile Question Palette Drawer Toggle
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Final Review Modal before submission
  const [showReviewModal, setShowReviewModal] = useState(false)

  // Subtle section transition toast
  const [sectionNotice, setSectionNotice] = useState(null)

  // ---------------------------------------------------------------------------
  // 2. Sections Computation with Dynamic Variable Question Counts
  // ---------------------------------------------------------------------------
  const sectionsData = useMemo(() => {
    return ASSESSMENT_SECTIONS.map((sec, secIdx) => {
      const secQuestions = questions.filter((q) => q.sectionId === sec.id)
      const secQuestionIds = secQuestions.map((q) => q.id)
      const answeredInSec = secQuestionIds.filter((id) => Boolean(answers[id])).length
      const skippedInSec = secQuestionIds.filter((id) => skippedIds.includes(id)).length
      const markedInSec = secQuestionIds.filter((id) => markedIds.includes(id)).length

      const firstQuestionGlobalIndex = questions.findIndex((q) => q.sectionId === sec.id)
      const lastQuestionGlobalIndex = questions.findLastIndex
        ? questions.findLastIndex((q) => q.sectionId === sec.id)
        : questions.map((q) => q.sectionId).lastIndexOf(sec.id)

      return {
        ...sec,
        order: secIdx + 1,
        questions: secQuestions,
        questionCount: secQuestions.length,
        answeredCount: answeredInSec,
        skippedCount: skippedInSec,
        markedCount: markedInSec,
        isCompleted: secQuestions.length > 0 && answeredInSec === secQuestions.length,
        isStarted: answeredInSec > 0,
        startIndex: firstQuestionGlobalIndex >= 0 ? firstQuestionGlobalIndex : 0,
        endIndex: lastQuestionGlobalIndex >= 0 ? lastQuestionGlobalIndex : 0,
      }
    })
  }, [questions, answers, skippedIds, markedIds])

  const totalQuestions = questions.length
  const currentQuestionRaw = questions[currentIndex] || questions[0]
  const currentQuestion = getLocalizedQuestion(currentQuestionRaw, language)

  // Active section derived from current question
  const activeSectionId = currentQuestionRaw?.sectionId || 'aptitude'
  const activeSection = sectionsData.find((s) => s.id === activeSectionId) || sectionsData[0]
  const localizedActiveSection = getLocalizedSection(activeSection, language)

  // Index within active section (1-based)
  const questionIndexInSection = useMemo(() => {
    if (!currentQuestionRaw || !activeSection) return 1
    const idx = activeSection.questions.findIndex((q) => q.id === currentQuestionRaw.id)
    return idx >= 0 ? idx + 1 : 1
  }, [currentQuestionRaw, activeSection])

  const isLastQuestionOfSection = currentIndex === activeSection.endIndex
  const isLastSection = activeSection.order === sectionsData.length
  const nextSection = !isLastSection ? sectionsData[activeSection.order] : null
  const localizedNextSection = nextSection ? getLocalizedSection(nextSection, language) : null

  // Metric counts
  const answeredCount = Object.keys(answers).length
  const skippedCount = skippedIds.length
  const markedCount = markedIds.length
  const overallProgressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

  // Current question flags
  const selectedOption = currentQuestionRaw ? answers[currentQuestionRaw.id] : null
  const hasSelectedCurrent = Boolean(selectedOption)
  const isCurrentMarked = currentQuestionRaw ? markedIds.includes(currentQuestionRaw.id) : false
  const isCurrentSkipped = currentQuestionRaw ? skippedIds.includes(currentQuestionRaw.id) : false

  // ---------------------------------------------------------------------------
  // 3. Persistence Synchronization
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isStarted || questions.length === 0) return
    try {
      localStorage.setItem(
        progressKey,
        JSON.stringify({
          currentIndex,
          answers,
          skippedIds,
          markedIds,
          isStarted,
          isCompleted,
          questions,
          totalQuestions: questions.length,
          updatedAt: new Date().toISOString(),
        })
      )
      notifyAssessmentUpdated()
    } catch {
      // Ignore storage quota limits
    }
  }, [progressKey, currentIndex, answers, skippedIds, markedIds, isStarted, isCompleted, questions])

  // Scroll active tab into view
  useEffect(() => {
    if (activeSectionTabRef.current) {
      activeSectionTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
    if (activeChipRef.current && questionRailRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [currentIndex, activeSectionId])

  // ---------------------------------------------------------------------------
  // 4. Handlers
  // ---------------------------------------------------------------------------
  const handleStartAssessment = async () => {
    setIsLoading(true)
    try {
      const fetchedQuestions = await questionService.fetchAssessmentQuestions()
      setQuestions(fetchedQuestions)
      setIsStarted(true)
      setCurrentIndex(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Failed to load assessment questions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectOption = (optionId) => {
    if (!currentQuestionRaw) return
    const qId = currentQuestionRaw.id

    setAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }))

    if (skippedIds.includes(qId)) {
      setSkippedIds((prev) => prev.filter((id) => id !== qId))
    }
  }

  const handleNext = () => {
    if (!hasSelectedCurrent) return

    if (currentQuestionRaw && skippedIds.includes(currentQuestionRaw.id)) {
      setSkippedIds((prev) => prev.filter((id) => id !== currentQuestionRaw.id))
    }

    if (currentIndex < totalQuestions - 1) {
      const nextIndex = currentIndex + 1
      const nextQ = questions[nextIndex]
      if (nextQ && nextQ.sectionId !== activeSectionId) {
        const nextSec = sectionsData.find((s) => s.id === nextQ.sectionId)
        if (nextSec) {
          setSectionNotice(`Section ${nextSec.order} of 6: ${nextSec.title}`)
          setTimeout(() => setSectionNotice(null), 3000)
        }
      }
      setCurrentIndex(nextIndex)
      window.scrollTo({ top: 40, behavior: 'smooth' })
    } else {
      setShowReviewModal(true)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      window.scrollTo({ top: 40, behavior: 'smooth' })
    }
  }

  const handleSkip = () => {
    if (!currentQuestionRaw) return
    const qId = currentQuestionRaw.id

    setSkippedIds((prev) => (prev.includes(qId) ? prev : [...prev, qId]))

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
      window.scrollTo({ top: 40, behavior: 'smooth' })
    } else {
      setShowReviewModal(true)
    }
  }

  const handleToggleMark = () => {
    if (!currentQuestionRaw) return
    const qId = currentQuestionRaw.id

    setMarkedIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    )
  }

  const jumpToQuestion = (targetIndex) => {
    if (targetIndex >= 0 && targetIndex < totalQuestions) {
      setCurrentIndex(targetIndex)
      setIsPaletteOpen(false)
      setShowReviewModal(false)
      window.scrollTo({ top: 40, behavior: 'smooth' })
    }
  }

  const jumpToSection = (sectionId) => {
    const sec = sectionsData.find((s) => s.id === sectionId)
    if (!sec || sec.questions.length === 0) return

    const firstUnanswered = sec.questions.find((q) => !answers[q.id])
    if (firstUnanswered) {
      const idx = questions.findIndex((q) => q.id === firstUnanswered.id)
      jumpToQuestion(idx >= 0 ? idx : sec.startIndex)
    } else {
      jumpToQuestion(sec.startIndex)
    }
  }

  const handleFinalSubmit = async () => {
    setIsCompleted(true)
    setShowReviewModal(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const evaluation = await questionService.submitAssessment(answers)
      localStorage.setItem(`ccc_recommendation_${user?.id || 'guest'}`, JSON.stringify(evaluation))
    } catch (err) {
      console.error('Failed to submit assessment evaluation:', err)
    }
    notifyAssessmentUpdated()
  }

  const handleRetake = () => {
    setAnswers({})
    setSkippedIds([])
    setMarkedIds([])
    setCurrentIndex(0)
    setIsCompleted(false)
    setIsStarted(false)
    try {
      localStorage.removeItem(progressKey)
    } catch {
      // Ignore
    }
    notifyAssessmentUpdated()
  }

  // ---------------------------------------------------------------------------
  // 5. VIEW: Preparation Loader Screen
  // ---------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="py-12 sm:py-20 flex items-center justify-center min-h-[50vh] px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
            {t('assessment.loading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-4">
            Loading assessment sections from database...
          </p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200 mb-2">
            <div className="h-full bg-blue-600 rounded-full animate-pulse w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 6. VIEW: Pre-Start / Instructions Screen
  // ---------------------------------------------------------------------------
  if (!isStarted && !isCompleted) {
    return (
      <div className="py-6 sm:py-12 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white">
            <div className="text-center mb-6">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100 mb-3">
                {t('aboutAssessment.verifiedAccess', { name: user?.fullName || t('navigation.student') })}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {t('assessment.intro.title')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                {t('assessment.intro.subtitle')}
              </p>
            </div>

            {/* 6 Sections Summary (Text-based, clean) */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                6 Assessment Sections
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ASSESSMENT_SECTIONS.map((sec) => {
                  const localized = getLocalizedSection(sec, language)
                  return (
                    <div
                      key={sec.id}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="font-semibold text-slate-900">
                        <span className="text-slate-400 font-mono mr-1.5">{sec.order}.</span>
                        <span>{localized.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {localized.shortDesc}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Guidelines */}
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-700 mb-6 space-y-1.5">
              <div className="font-bold text-blue-900">Instructions:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Select one response per question to advance.</li>
                <li>You can skip any question and return to it later.</li>
                <li>Use the section bar at the top to navigate across sections anytime.</li>
                <li>Your progress is auto-saved automatically.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Button
                type="button"
                onClick={handleStartAssessment}
                size="md"
                variant="primary"
                className="w-full sm:w-auto px-6 py-2.5 font-bold shadow-xs text-sm"
              >
                {t('assessment.intro.startBtn')}
              </Button>
              <Button
                to={ROUTES.ABOUT_ASSESSMENT}
                size="md"
                variant="outline"
                className="w-full sm:w-auto text-sm"
              >
                Back to Overview
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 7. VIEW: Assessment Completed Screen
  // ---------------------------------------------------------------------------
  if (isCompleted) {
    return (
      <div className="py-8 sm:py-14 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-5 sm:p-8 text-center rounded-2xl sm:rounded-3xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xl inline-flex items-center justify-center mb-3 font-bold">
              ✓
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {t('assessment.results.badge')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
              Assessment submitted successfully for <strong className="text-slate-900">{user?.fullName || 'Student'}</strong>. All sectional responses have been logged.
            </p>

            {/* Sectional Summary (Clean Text) */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3 pb-2 border-b border-slate-200">
                <span>Sectional Completion</span>
                <span className="text-emerald-700">{answeredCount} of {totalQuestions} Answered</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {sectionsData.map((sec) => {
                  const localized = getLocalizedSection(sec, language)
                  return (
                    <div
                      key={sec.id}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-900">
                        {sec.order}. {localized.title}
                      </span>
                      <span className="font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                        {sec.answeredCount} / {sec.questionCount}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Button
                to={ROUTES.USER_DASHBOARD}
                variant="primary"
                size="md"
                className="w-full sm:w-auto shadow-xs text-sm"
              >
                {t('home.hero.ctaDashboard')} &rarr;
              </Button>
              <Button
                to={ROUTES.CAREER}
                variant="outline"
                size="md"
                className="w-full sm:w-auto text-sm"
              >
                {t('common.exploreCareers')}
              </Button>
              <button
                type="button"
                onClick={handleRetake}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 py-1.5 px-3 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t('assessment.results.retakeBtn')}
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!currentQuestionRaw) return null

  // ---------------------------------------------------------------------------
  // 8. VIEW: Active Test Taking Interface
  // ---------------------------------------------------------------------------
  return (
    <div className="py-2.5 sm:py-5 pb-28 lg:pb-12">
      <div className="container max-w-5xl px-2.5 sm:px-4 space-y-3 sm:space-y-4">
        
        {/* Subtle section transition notice */}
        {sectionNotice && (
          <div className="p-2.5 bg-slate-900 text-white text-xs font-medium rounded-xl shadow-xs text-center animate-fade-in">
            {sectionNotice}
          </div>
        )}

        {/* Minimal Header */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">
              Psychometric Assessment
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none">
              {user?.fullName || 'Student'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(ROUTES.USER_DASHBOARD)}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Save &amp; Exit
          </button>
        </div>

        {/* =========================================================================
            TOP 6-SECTION STEPPER: Clean, Text-First, Responsive
            - No emojis, clean sequence numbers (1 to 6)
            - Touch-friendly horizontal scroll on mobile with zero scrollbar clutter
            - Active highlight with clear visual feedback
            ========================================================================= */}
        <div className="bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 px-1 mb-1.5">
            <span>
              Section <strong className="text-slate-900">{activeSection.order}</strong> of 6
            </span>
            <span className="font-mono">
              {answeredCount}/{totalQuestions} Answered ({overallProgressPercent}%)
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
            aria-label="Assessment Sections"
          >
            {sectionsData.map((sec) => {
              const isActive = sec.id === activeSectionId
              const localized = getLocalizedSection(sec, language)
              return (
                <button
                  key={sec.id}
                  ref={isActive ? activeSectionTabRef : null}
                  type="button"
                  onClick={() => jumpToSection(sec.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : sec.isCompleted
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                      : sec.answeredCount > 0
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                  }`}>
                    {sec.order}
                  </span>
                  <span className="whitespace-nowrap font-medium text-xs">
                    {localized.title}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1 py-0.2 rounded font-bold ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : sec.isCompleted
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {sec.isCompleted ? '✓' : `${sec.answeredCount}/${sec.questionCount}`}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* =========================================================================
            MOBILE QUESTION RAIL: Active Section Focused (< 1024px)
            Keeps screen compact & relevant to active section questions
            ========================================================================= */}
        <div className="lg:hidden bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              {localizedActiveSection.title} (Questions {activeSection.startIndex + 1}-{activeSection.endIndex + 1})
            </span>
            <button
              type="button"
              onClick={() => setIsPaletteOpen(true)}
              className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 cursor-pointer"
            >
              All Grid
            </button>
          </div>

          <div
            ref={questionRailRef}
            className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none touch-pan-x"
          >
            {activeSection.questions.map((q, idxInSec) => {
              const globalIdx = activeSection.startIndex + idxInSec
              const isCurrent = globalIdx === currentIndex
              const isAns = Boolean(answers[q.id])
              const isSkp = skippedIds.includes(q.id)
              const isMrk = markedIds.includes(q.id)

              let chipStyle = 'bg-slate-100 text-slate-700 border-slate-200'
              if (isAns) chipStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
              else if (isSkp) chipStyle = 'bg-amber-50 text-amber-900 border-amber-300 font-bold'

              return (
                <button
                  key={q.id}
                  ref={isCurrent ? activeChipRef : null}
                  type="button"
                  onClick={() => jumpToQuestion(globalIdx)}
                  className={`relative flex-none min-w-[36px] h-9 px-2 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center cursor-pointer select-none active:scale-95 ${chipStyle} ${
                    isCurrent ? 'bg-blue-600 text-white border-blue-600 shadow-2xs z-10' : ''
                  }`}
                  aria-label={`Question ${globalIdx + 1}`}
                >
                  <span>Q{globalIdx + 1}</span>
                  {isMrk && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-600" />
                  )}
                  {isAns && !isCurrent && (
                    <span className="text-[9px] text-emerald-600 ml-0.5 font-bold">✓</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* =========================================================================
            MAIN STAGE: Left Question Column + Right Navigator
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-start">
          
          {/* Main Question Column (Col 8) */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            
            {/* Compact Section Context Strip */}
            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">
                  {localizedActiveSection.title} &bull; Question {questionIndexInSection} of {activeSection.questionCount}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Overall {currentIndex + 1} of {totalQuestions}
                </span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.round((activeSection.answeredCount / Math.max(1, activeSection.questionCount)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs bg-white relative">
              
              {/* Category & Mark Action */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                  {currentQuestion.category}
                </span>

                <button
                  type="button"
                  onClick={handleToggleMark}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer border ${
                    isCurrentMarked
                      ? 'bg-purple-50 text-purple-800 border-purple-200 font-bold'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
                  }`}
                  aria-pressed={isCurrentMarked}
                >
                  {isCurrentMarked ? 'Marked for Review' : 'Mark for Review'}
                </button>
              </div>

              {/* Question Text */}
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug mb-4">
                {currentQuestion.question}
              </h2>

              {/* Radio Options List */}
              <div className="space-y-2 sm:space-y-2.5" role="radiogroup" aria-label="Question Options">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      aria-checked={isSelected}
                      role="radio"
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all flex items-start gap-2.5 sm:gap-3 cursor-pointer active:scale-[0.99] min-h-[44px] ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'border border-slate-300 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {opt.id.toUpperCase()}
                      </span>
                      <span
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isSelected ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'
                        }`}
                      >
                        {opt.text}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Skipped Notice */}
              {isCurrentSkipped && !hasSelectedCurrent && (
                <div className="mt-3 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  This question was skipped. Choose an option to answer it.
                </div>
              )}
            </Card>

            {/* Desktop Action Controls */}
            <div className="hidden lg:flex bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}
              >
                Previous
              </Button>

              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Skip Question
              </button>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={!hasSelectedCurrent}
                className={!hasSelectedCurrent ? 'opacity-40 cursor-not-allowed' : ''}
              >
                {currentIndex === totalQuestions - 1
                  ? 'Review & Submit'
                  : isLastQuestionOfSection && localizedNextSection
                  ? `Next: ${localizedNextSection.title} →`
                  : 'Next Question →'}
              </Button>
            </div>
          </div>

          {/* Right Navigator Column (Desktop - Col 4) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              
              <div className="p-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-800">
                  <span>Questions Navigator</span>
                  <span className="font-mono text-slate-500">{currentIndex + 1} of {totalQuestions}</span>
                </div>

                {/* Filter Tabs */}
                <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-200/60 rounded-lg text-center text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setActivePaletteFilter('all')}
                    className={`py-1 rounded cursor-pointer ${
                      activePaletteFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    All ({totalQuestions})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaletteFilter('skipped')}
                    className={`py-1 rounded cursor-pointer ${
                      activePaletteFilter === 'skipped' ? 'bg-amber-100 text-amber-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Skip ({skippedCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaletteFilter('marked')}
                    className={`py-1 rounded cursor-pointer ${
                      activePaletteFilter === 'marked' ? 'bg-purple-100 text-purple-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Mark ({markedCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaletteFilter('answered')}
                    className={`py-1 rounded cursor-pointer ${
                      activePaletteFilter === 'answered' ? 'bg-emerald-100 text-emerald-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Ans ({answeredCount})
                  </button>
                </div>
              </div>

              {/* Navigator Content */}
              <div className="p-3 max-h-[440px] overflow-y-auto space-y-3">
                {activePaletteFilter === 'all' && (
                  <div className="space-y-3">
                    {sectionsData.map((sec) => {
                      const isCurrentSec = sec.id === activeSectionId
                      const localized = getLocalizedSection(sec, language)
                      return (
                        <div key={sec.id} className="space-y-1.5">
                          <div className={`flex items-center justify-between text-xs pb-1 border-b ${
                            isCurrentSec ? 'border-blue-300 text-blue-900 font-bold' : 'border-slate-100 text-slate-700'
                          }`}>
                            <span>{sec.order}. {localized.title}</span>
                            <span className="font-mono text-[11px] text-slate-500">
                              {sec.answeredCount}/{sec.questionCount}
                            </span>
                          </div>

                          <div className="grid grid-cols-5 gap-1.5">
                            {sec.questions.map((q) => {
                              const globalIdx = questions.findIndex((item) => item.id === q.id)
                              const isCurrent = globalIdx === currentIndex
                              const isAns = Boolean(answers[q.id])
                              const isSkp = skippedIds.includes(q.id)
                              const isMrk = markedIds.includes(q.id)

                              let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200'
                              if (isAns) badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold'
                              else if (isSkp) badgeStyle = 'bg-amber-50 text-amber-900 border-amber-200 font-bold'

                              return (
                                <button
                                  key={q.id}
                                  type="button"
                                  onClick={() => jumpToQuestion(globalIdx)}
                                  className={`relative h-8 rounded-lg border text-xs font-semibold cursor-pointer flex items-center justify-center ${badgeStyle} ${
                                    isCurrent ? 'bg-blue-600 text-white border-blue-600' : ''
                                  }`}
                                >
                                  <span>{globalIdx + 1}</span>
                                  {isMrk && (
                                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-600" />
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {activePaletteFilter === 'skipped' && (
                  <div className="space-y-1.5">
                    {skippedCount === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No skipped questions.</div>
                    ) : (
                      questions
                        .map((q, idx) => ({ ...getLocalizedQuestion(q, language), originalIndex: idx }))
                        .filter((q) => skippedIds.includes(q.id))
                        .map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => jumpToQuestion(q.originalIndex)}
                            className="w-full text-left p-2 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 cursor-pointer"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-0.5">
                              <span>Q{q.originalIndex + 1} &bull; {q.category}</span>
                              <span className="text-[10px] text-amber-800 underline">Jump</span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1 m-0">{q.question}</p>
                          </button>
                        ))
                    )}
                  </div>
                )}

                {activePaletteFilter === 'marked' && (
                  <div className="space-y-1.5">
                    {markedCount === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No questions marked.</div>
                    ) : (
                      questions
                        .map((q, idx) => ({ ...getLocalizedQuestion(q, language), originalIndex: idx }))
                        .filter((q) => markedIds.includes(q.id))
                        .map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => jumpToQuestion(q.originalIndex)}
                            className="w-full text-left p-2 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 cursor-pointer"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-0.5">
                              <span>Q{q.originalIndex + 1} &bull; {q.category}</span>
                              <span className="text-[10px] text-purple-800 underline">Jump</span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1 m-0">{q.question}</p>
                          </button>
                        ))
                    )}
                  </div>
                )}

                {activePaletteFilter === 'answered' && (
                  <div className="space-y-1.5">
                    {answeredCount === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No questions answered yet.</div>
                    ) : (
                      questions
                        .map((q, idx) => ({ ...getLocalizedQuestion(q, language), originalIndex: idx }))
                        .filter((q) => Boolean(answers[q.id]))
                        .map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => jumpToQuestion(q.originalIndex)}
                            className="w-full text-left p-2 rounded-lg border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-100/50 cursor-pointer"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-0.5">
                              <span>Q{q.originalIndex + 1}</span>
                              <span className="text-[10px] font-mono">Ans: {answers[q.id]?.toUpperCase()}</span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1 m-0">{q.question}</p>
                          </button>
                        ))
                    )}
                  </div>
                )}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-200">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setShowReviewModal(true)}
                  className="w-full justify-center text-xs font-bold py-2"
                >
                  Review All 6 Sections
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* =========================================================================
            MOBILE STICKY BOTTOM DOCK (< 1024px)
            Compact, thumb-friendly, high contrast, clean text
            ========================================================================= */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:p-3 shadow-lg">
          <div className="max-w-md mx-auto space-y-1.5">
            
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 px-0.5">
              <span>
                Q{currentIndex + 1}/{totalQuestions} &bull; {activeSection.title}
              </span>

              <button
                type="button"
                onClick={() => setIsPaletteOpen(true)}
                className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
              >
                Questions List
              </button>
            </div>

            <div className="grid grid-cols-12 gap-1.5 items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`col-span-3 py-2 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center ${
                  currentIndex === 0
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-300 active:bg-slate-100 cursor-pointer'
                }`}
              >
                Prev
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="col-span-4 py-2 rounded-lg border border-amber-200 bg-amber-50 active:bg-amber-100 text-amber-900 text-xs font-semibold transition-all flex items-center justify-center cursor-pointer"
              >
                Skip
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSelectedCurrent}
                className={`col-span-5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center select-none ${
                  hasSelectedCurrent
                    ? 'bg-blue-600 active:bg-blue-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentIndex === totalQuestions - 1 ? (
                  <span>Review</span>
                ) : isLastQuestionOfSection && localizedNextSection ? (
                  <span>Next Sec &rarr;</span>
                ) : (
                  <span>Next &rarr;</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE BOTTOM SHEET DRAWER (< 1024px)
            ========================================================================= */}
        {isPaletteOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-xs animate-fade-in lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white w-full max-w-lg rounded-t-2xl max-h-[80vh] flex flex-col shadow-xl overflow-hidden animate-slide-up">
              
              <div className="pt-2 pb-1 flex justify-center cursor-pointer" onClick={() => setIsPaletteOpen(false)}>
                <div className="w-8 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              </div>

              <div className="px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="text-xs font-bold text-slate-900">
                  Questions Navigator ({answeredCount}/{totalQuestions} Answered)
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaletteOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1 p-1.5 bg-slate-100 border-b border-slate-200 text-center text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setActivePaletteFilter('all')}
                  className={`py-1 rounded ${activePaletteFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  All ({totalQuestions})
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaletteFilter('skipped')}
                  className={`py-1 rounded ${activePaletteFilter === 'skipped' ? 'bg-amber-100 text-amber-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Skip ({skippedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaletteFilter('marked')}
                  className={`py-1 rounded ${activePaletteFilter === 'marked' ? 'bg-purple-100 text-purple-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Mark ({markedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaletteFilter('answered')}
                  className={`py-1 rounded ${activePaletteFilter === 'answered' ? 'bg-emerald-100 text-emerald-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Ans ({answeredCount})
                </button>
              </div>

              <div className="p-3 overflow-y-auto flex-1 space-y-3">
                {sectionsData.map((sec) => {
                  const localized = getLocalizedSection(sec, language)
                  return (
                    <div key={sec.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-0.5 border-b border-slate-100">
                        <span>{sec.order}. {localized.title}</span>
                        <span className="font-mono text-slate-500 text-[11px]">
                          {sec.answeredCount}/{sec.questionCount}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {sec.questions.map((q) => {
                          const globalIdx = questions.findIndex((item) => item.id === q.id)
                          const isCurrent = globalIdx === currentIndex
                          const isAns = Boolean(answers[q.id])
                          const isSkp = skippedIds.includes(q.id)
                          const isMrk = markedIds.includes(q.id)

                          let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200'
                          if (isAns) badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold'
                          else if (isSkp) badgeStyle = 'bg-amber-50 text-amber-900 border-amber-200 font-bold'

                          return (
                            <button
                              key={q.id}
                              type="button"
                              onClick={() => jumpToQuestion(globalIdx)}
                              className={`relative h-9 rounded-lg border text-xs font-semibold cursor-pointer flex items-center justify-center select-none active:scale-90 ${badgeStyle} ${
                                isCurrent ? 'bg-blue-600 text-white border-blue-600' : ''
                              }`}
                            >
                              <span>{globalIdx + 1}</span>
                              {isMrk && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-600" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-200">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsPaletteOpen(false)
                    setShowReviewModal(true)
                  }}
                  className="w-full justify-center text-xs font-bold"
                >
                  Review All 6 Sections
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            FINAL REVIEW & SUBMISSION MODAL
            Clean, text-first sectional scorecard
            ========================================================================= */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200 max-h-[88vh] overflow-y-auto">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                {t('assessment.modals.confirmFinishTitle')}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {t('assessment.modals.confirmFinishDesc', { answered: answeredCount, total: totalQuestions })}
              </p>

              {/* 6 Sections Breakdown Table */}
              <div className="space-y-1.5 mb-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  {t('assessment.modals.sectionalBreakdown')}
                </div>
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                  {sectionsData.map((sec) => {
                    const localized = getLocalizedSection(sec, language)
                    const isSecComplete = sec.answeredCount === sec.questionCount
                    return (
                      <div
                        key={sec.id}
                        className="flex items-center justify-between py-1.5 border-b border-slate-200/60 last:border-0"
                      >
                        <span className="font-semibold text-slate-800">
                          {sec.order}. {localized.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-600 text-[11px]">
                            {sec.answeredCount}/{sec.questionCount}
                          </span>
                          {isSecComplete ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Complete
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => jumpToSection(sec.id)}
                              className="text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors cursor-pointer"
                            >
                              Jump &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5 text-center text-xs">
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="font-bold text-emerald-700">{answeredCount}</div>
                  <div className="text-slate-600 text-[10px]">Answered</div>
                </div>
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="font-bold text-amber-800">{skippedCount}</div>
                  <div className="text-slate-600 text-[10px]">Skipped</div>
                </div>
                <div className="p-2 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-bold text-purple-800">{markedCount}</div>
                  <div className="text-slate-600 text-[10px]">Marked</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  {t('assessment.modals.cancelBtn')}
                </button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-auto shadow-xs text-xs font-bold"
                >
                  {t('assessment.modals.submitBtn')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Assessment
