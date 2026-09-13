import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '@/components/common/Loading'
import Button from '@/components/ui/Button'
import ROUTES from '@/constants/routes'
import { getLocalizedCareerCategories } from '@/data/mock/careerData'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { careerService } from '@/services/career/careerService'

// Sector visual configuration for subtle, high-contrast category accents
const CATEGORY_THEMES = {
  bfsi: {
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
  it: {
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
  },
  retail: {
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
  },
  healthcare: {
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  },
}

export function Career() {
  const { t, language } = useTranslation()
  const { isAuthenticated } = useAuth()

  const [rawCategories, setRawCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    careerService
      .getCategories()
      .then((data) => {
        if (isMounted) {
          setRawCategories(data || [])
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

  // Localized categories responding dynamically to user's selected language
  const categories = useMemo(() => {
    return getLocalizedCareerCategories(rawCategories, language)
  }, [rawCategories, language])

  // Flatten all roles across categories with metadata
  const allRoles = useMemo(() => {
    return categories.flatMap((cat) =>
      (cat.roles || []).map((role) => ({
        ...role,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryFullName: cat.fullName,
        categoryIcon: cat.icon,
      }))
    )
  }, [categories])

  // Filtered roles based strictly on selected category
  const displayedRoles = useMemo(() => {
    if (selectedCategoryId === 'all') {
      return allRoles
    }
    return allRoles.filter((role) => role.categoryId === selectedCategoryId)
  }, [allRoles, selectedCategoryId])

  // Active Category metadata
  const activeCategory = useMemo(() => {
    if (selectedCategoryId === 'all') return null
    return categories.find((c) => c.id === selectedCategoryId)
  }, [categories, selectedCategoryId])

  // Determine target assessment route based on auth status
  const assessmentRoute = isAuthenticated ? ROUTES.ABOUT_ASSESSMENT : ROUTES.REGISTER

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-slate-50/50 min-h-screen">
      <div className="container max-w-6xl">
        
        {/* ========================================================================= */}
        {/* Level 1: Hero & Orientation                                               */}
        {/* ========================================================================= */}
        <header className="mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 mb-3 tracking-wide">
              <span>🧭</span>
              <span>{t('career.badge')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
              {t('career.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed m-0">
              {t('career.subtitle')}
            </p>
          </div>
        </header>

        {loading ? (
          <div className="py-16">
            <Loading />
          </div>
        ) : (
          <div>
            {/* ========================================================================= */}
            {/* Level 2: Sector Category Rail                                             */}
            {/* ========================================================================= */}
            <section aria-label="Career Sectors" className="mb-8 sm:mb-10">
              <div
                className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none"
                role="tablist"
                aria-label="Career Sectors"
              >
                {/* All Sectors Tab */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategoryId === 'all'}
                  onClick={() => setSelectedCategoryId('all')}
                  className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer transition-all shrink-0 border ${
                    selectedCategoryId === 'all'
                      ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span>✨</span>
                  <span>{t('career.allSectors')}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold leading-none ${
                      selectedCategoryId === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {allRoles.length}
                  </span>
                </button>

                {/* Sector Categories */}
                {categories.map((cat) => {
                  const isSelected = cat.id === selectedCategoryId
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer transition-all shrink-0 border ${
                        isSelected
                          ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-base" aria-hidden="true">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold leading-none ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {cat.roles?.length || 0}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* Level 3: Active Category Context (Unboxed)                                */}
            {/* ========================================================================= */}
            {activeCategory && (
              <div className="mb-6 sm:mb-8 border-l-4 border-l-blue-600 pl-4 sm:pl-5 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl" aria-hidden="true">{activeCategory.icon}</span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 m-0">
                    {activeCategory.fullName}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl m-0">
                  {activeCategory.description}
                </p>
              </div>
            )}

            {/* Roles Count Indicator */}
            <div className="mb-5 sm:mb-6 text-xs sm:text-sm text-slate-500">
              {t('career.showingRoles', {
                count: displayedRoles.length,
                roleText: displayedRoles.length === 1 ? t('common.role') : t('common.roles'),
                sectorContext:
                  selectedCategoryId !== 'all'
                    ? t('career.inSector', { name: activeCategory?.name })
                    : t('career.acrossAllSectors'),
              })}
            </div>

            {/* ========================================================================= */}
            {/* Roles Grid: Calm, Clean, Uncluttered                                      */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {displayedRoles.map((role) => {
                const theme = CATEGORY_THEMES[role.categoryId] || {
                  badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
                }

                return (
                  <article
                    key={role.id}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-5 sm:p-6 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Sector Badge */}
                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${theme.badgeClass}`}
                        >
                          <span aria-hidden="true">{role.categoryIcon}</span>
                          <span>{role.categoryName}</span>
                        </span>
                      </div>

                      {/* Role Title */}
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mb-2">
                        {role.title}
                      </h3>

                      {/* Role Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {role.description}
                      </p>

                      {/* Key Skills */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          {t('career.skillsHeading')}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {role.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* ========================================================================= */}
            {/* Level 4: The Assessment Bridge (Clean Closing Section)                    */}
            {/* ========================================================================= */}
            <section
              aria-label="Assessment Invitation"
              className="bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-lg overflow-hidden relative"
            >
              {/* Subtle Ambient Accents */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-100 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{t('career.bridge.badge')}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight mb-3">
                  {t('career.bridge.title')}
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-blue-100/90 leading-relaxed mb-6">
                  {t('career.bridge.desc')}
                </p>

                {/* Trust Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-blue-200 mb-8 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{t('career.bridge.check1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{t('career.bridge.check2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{t('career.bridge.check3')}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    to={assessmentRoute}
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto justify-center text-sm sm:text-base font-extrabold px-8 py-3.5 bg-white text-blue-900 hover:bg-blue-50 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t('career.bridge.cta')}
                  </Button>
                  <Link
                    to={ROUTES.HOME}
                    className="text-xs sm:text-sm text-blue-200 hover:text-white font-semibold text-center sm:text-left px-3 py-2"
                  >
                    {t('career.bridge.returnHome')}
                  </Link>
                </div>
              </div>
            </section>

            {/* Level 5: Transparency Note */}
            <aside className="mt-10 sm:mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
              <p className="m-0 leading-relaxed">
                {t('career.transparency')}
              </p>
            </aside>

          </div>
        )}

      </div>
    </div>
  )
}

export default Career
