import { useEffect, useState } from 'react'
import Loading from '@/components/common/Loading'
import { useTranslation } from '@/hooks/useTranslation'
import { homeService } from '@/services/home/homeService'

export function StudentSuccess() {
  const { t } = useTranslation()
  const [stories, setStories] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    homeService
      .getStudentStories()
      .then((data) => {
        if (isMounted) {
          setStories(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Auto-advance interval: smooth 4.5s countdown, resets on manual navigation, pauses on card hover
  useEffect(() => {
    if (!stories.length || isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [stories.length, isPaused, timerKey])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1))
    setTimerKey((k) => k + 1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
    setTimerKey((k) => k + 1)
  }

  const handleSelectDot = (idx) => {
    setCurrentIndex(idx)
    setTimerKey((k) => k + 1)
  }

  return (
    <section
      className="bg-white border-b border-slate-200 py-8 sm:py-12 md:py-16 select-none"
      aria-labelledby="student-success-title"
    >
      <div className="container max-w-4xl">
        {/* Section Header with Left Titles & Right Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2
              id="student-success-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1 sm:mb-2 tracking-tight"
            >
              {t('home.testimonials.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          {/* Accessible Carousel Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t('home.testimonials.prev')}
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs hover:shadow-sm"
            >
              <span aria-hidden="true">&larr;</span>
              <span>{t('home.testimonials.prev')}</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t('home.testimonials.next')}
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs hover:shadow-sm"
            >
              <span>{t('home.testimonials.next')}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : stories.length === 0 ? null : (
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('home.testimonials.title')}
          >
            {/* Pinterest-Style Layered Card Depth Backdrops */}
            <div
              className="absolute inset-0 bg-slate-100/80 rounded-3xl translate-y-2.5 scale-[0.97] -z-10 border border-slate-200/60 hidden sm:block transition-transform duration-300"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-slate-50 rounded-3xl translate-y-1 scale-[0.985] -z-10 border border-slate-200/40 hidden sm:block"
              aria-hidden="true"
            />

            {/* Main Stage: CSS Grid Cell maintaining consistent height with zero-layout-shift crossfade */}
            <div className="grid grid-cols-1 grid-rows-1 overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 relative">
              {stories.map((student, idx) => {
                const isActive = idx === currentIndex
                return (
                  <article
                    key={student.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} of ${stories.length}`}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 translate-x-8 scale-[0.98] pointer-events-none z-0'
                    }`}
                  >
                    {/* Top Header: Student Avatar, Name, Role & Company Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        {/* Squircle Initials Avatar */}
                        <div
                          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-xs flex-none ${
                            student.bgClass || 'bg-blue-700'
                          }`}
                          aria-hidden="true"
                        >
                          {student.initials}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight">
                              {student.name}
                            </h3>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                              <span aria-hidden="true">✓</span> {t('home.testimonials.verified')}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                            {student.role}
                          </p>
                        </div>
                      </div>

                      {/* Prominent Company Pill Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs self-start sm:self-auto">
                        <span aria-hidden="true">🏢</span>
                        <span>{student.company}</span>
                      </div>
                    </div>

                    {/* Testimonial Quote with Typographic Warmth */}
                    <div className="relative my-2 sm:my-3">
                      <span
                        className="text-4xl sm:text-5xl text-blue-400/30 font-serif leading-none select-none block -mb-4"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <blockquote className="text-slate-700 text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-8 pl-1">
                        {student.testimonial}
                      </blockquote>
                    </div>

                    {/* Bottom Metadata & Pagination Indicators */}
                    <div className="pt-5 mt-4 sm:mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">{student.company}</span>
                        <span className="text-slate-300">•</span>
                        <span>{t('home.testimonials.batchOf', { year: student.batch })}</span>
                      </div>

                      {/* Status Feedback & Dot Indicators */}
                      <div className="flex items-center gap-2.5 self-center sm:self-auto">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors ${
                            isPaused
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPaused ? 'bg-amber-500' : 'bg-blue-600 animate-pulse'
                            }`}
                            aria-hidden="true"
                          />
                          {isPaused
                            ? t('home.testimonials.paused')
                            : t('home.testimonials.autoTimer', { seconds: '4.5' })}
                        </span>

                        <span className="text-xs text-slate-400 font-semibold" aria-live="polite">
                          {currentIndex + 1} / {stories.length}
                        </span>

                        <div className="flex items-center gap-1.5 ml-1" role="tablist" aria-label="Testimonial slides">
                          {stories.map((story, dotIdx) => (
                            <button
                              key={story.id}
                              type="button"
                              role="tab"
                              aria-selected={dotIdx === currentIndex}
                              aria-label={`Go to slide ${dotIdx + 1}`}
                              onClick={() => handleSelectDot(dotIdx)}
                              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                dotIdx === currentIndex
                                  ? 'w-7 bg-blue-700 shadow-2xs'
                                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}

              {/* Slender Visual Countdown Progress Bar at Bottom of Stage */}
              <div className="h-1 bg-slate-100 w-full overflow-hidden absolute bottom-0 left-0 right-0 z-20">
                <div
                  key={`${currentIndex}-${timerKey}`}
                  className={`h-full bg-blue-600 transition-all ${
                    isPaused ? 'animate-card-progress [animation-play-state:paused]' : 'animate-card-progress'
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default StudentSuccess
