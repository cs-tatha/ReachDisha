import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LogoutConfirmModal from '@/components/common/LogoutConfirmModal'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { authService } from '@/services/auth/authService'
import { questionService } from '@/services/assessment/questionService'
import { ASSESSMENT_SECTIONS } from '@/constants/assessmentQuestions'
import { homeService } from '@/services/home/homeService'
import { queryService } from '@/services/support/queryService'

export function AdminDashboard() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  // Active Management Tab: 'students' | 'questions' | 'stories' | 'partners' | 'queries'
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTabFromUrl = searchParams.get('tab')
  const validTabs = ['students', 'questions', 'stories', 'partners', 'queries']
  const activeTab = currentTabFromUrl && validTabs.includes(currentTabFromUrl) ? currentTabFromUrl : 'students'

  const handleSelectTab = (tabId) => {
    setSearchParams({ tab: tabId }, { replace: true })
  }

  // Global Notification Alert
  const [alertMessage, setAlertMessage] = useState('')
  const triggerAlert = (msg) => {
    setAlertMessage(msg)
    setTimeout(() => setAlertMessage(''), 4500)
  }

  // =========================================================================
  // 1. Data States
  // =========================================================================
  const [students, setStudents] = useState([])
  const [studentPagination, setStudentPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasMore: false,
  })
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [questions, setQuestions] = useState(() => {
    try {
      return questionService.getAllQuestions()
    } catch {
      return []
    }
  })
  const [stories, setStories] = useState([])
  const [partners, setPartners] = useState([])
  const [queries, setQueries] = useState(() => {
    try {
      return queryService.getQueries()
    } catch {
      return []
    }
  })

  useEffect(() => {
    let mounted = true
    homeService.getStudentStories().then((res) => {
      if (mounted) setStories(res)
    })
    homeService.getPlacementPartners().then((res) => {
      if (mounted) setPartners(res)
    })
    return () => {
      mounted = false
    }
  }, [])

  const handleLogout = () => {
    setIsLogoutModalOpen(false)
    logout()
    navigate(ROUTES.ADMIN_LOGIN, { replace: true })
  }

  // =========================================================================
  // 2. Student Tracking & Timeline State
  // =========================================================================
  const [studentSearch, setStudentSearch] = useState('')
  const [studentStatusFilter, setStudentStatusFilter] = useState('all')
  const [selectedStudentForTimeline, setSelectedStudentForTimeline] = useState(null)
  const [counselorNote, setCounselorNote] = useState('')

  // Student Assessment Report Card State
  const [selectedStudentForReport, setSelectedStudentForReport] = useState(null)
  const [isLoadingStudentReport, setIsLoadingStudentReport] = useState(false)
  const [studentReportData, setStudentReportData] = useState(null)

  const handleOpenStudentReport = async (student) => {
    setSelectedStudentForReport(student)
    setStudentReportData(student.assessmentResult || null)

    try {
      setIsLoadingStudentReport(true)
      const res = await authService.getStudentAssessmentReport(student.userId || student.phone || student.id)
      if (res?.report) {
        setStudentReportData(res.report)
      }
    } catch (err) {
      console.warn('Failed to load full student report:', err)
    } finally {
      setIsLoadingStudentReport(false)
    }
  }

  const fetchStudents = useCallback(async (page = 1, append = false) => {
    try {
      if (page === 1) setIsLoadingStudents(true)
      else setIsLoadingMore(true)

      const res = await authService.getPaginatedStudents({
        page,
        limit: 10,
        search: studentSearch,
      })

      if (append) {
        setStudents((prev) => [...prev, ...res.students])
      } else {
        setStudents(res.students)
      }
      setStudentPagination(res.pagination)
    } catch (err) {
      console.error('Failed to load students:', err)
    } finally {
      setIsLoadingStudents(false)
      setIsLoadingMore(false)
    }
  }, [studentSearch])

  useEffect(() => {
    fetchStudents(1, false)
  }, [fetchStudents])

  useEffect(() => {
    questionService.fetchAssessmentQuestions().then((qs) => {
      if (Array.isArray(qs) && qs.length > 0) setQuestions(qs)
    }).catch(() => {})
  }, [])

  const handleLoadMoreStudents = () => {
    if (studentPagination.hasMore && !isLoadingMore) {
      fetchStudents(studentPagination.page + 1, true)
    }
  }

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = studentSearch.toLowerCase().trim()
      const matchesQuery =
        !q ||
        s.fullName?.toLowerCase().includes(q) ||
        s.phone?.includes(q) ||
        s.userId?.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q)

      if (!matchesQuery) return false

      if (studentStatusFilter === 'completed') return s.assessment?.isCompleted
      if (studentStatusFilter === 'in_progress')
        return s.assessment?.answeredCount > 0 && !s.assessment?.isCompleted
      if (studentStatusFilter === 'registered')
        return !s.assessment?.answeredCount || s.assessment?.answeredCount === 0

      return true
    })
  }, [students, studentSearch, studentStatusFilter])

  // =========================================================================
  // 3. Question Bank Management State
  // =========================================================================
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false)
  const [questionSearch, setQuestionSearch] = useState('')
  const [questionSectionFilter, setQuestionSectionFilter] = useState('all')
  const [newQuestionData, setNewQuestionData] = useState({
    sectionId: 'aptitude',
    category: 'Analytical & Problem Solving',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
  })
  const [questionErrors, setQuestionErrors] = useState({})

  const filteredQuestions = useMemo(() => {
    const q = questionSearch.toLowerCase().trim()
    return questions.filter((item) => {
      const matchSearch =
        !q ||
        item.question?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
      const matchSection =
        questionSectionFilter === 'all' || item.sectionId === questionSectionFilter
      return matchSearch && matchSection
    })
  }, [questions, questionSearch, questionSectionFilter])

  const handleSaveNewQuestion = async (e) => {
    e.preventDefault()
    const errors = {}
    if (!newQuestionData.question.trim()) errors.question = 'Question text is required'
    if (!newQuestionData.optionA.trim()) errors.optionA = 'Option A is required'
    if (!newQuestionData.optionB.trim()) errors.optionB = 'Option B is required'
    if (!newQuestionData.optionC.trim()) errors.optionC = 'Option C is required'
    if (!newQuestionData.optionD.trim()) errors.optionD = 'Option D is required'

    if (Object.keys(errors).length > 0) {
      setQuestionErrors(errors)
      return
    }

    await questionService.addQuestion({
      sectionId: newQuestionData.sectionId,
      category: newQuestionData.category,
      question: newQuestionData.question,
      options: [
        { id: 'a', text: newQuestionData.optionA },
        { id: 'b', text: newQuestionData.optionB },
        { id: 'c', text: newQuestionData.optionC },
        { id: 'd', text: newQuestionData.optionD },
      ],
    })

    setQuestions(questionService.getAllQuestions())
    setIsAddQuestionModalOpen(false)
    setNewQuestionData({
      sectionId: 'aptitude',
      category: 'Analytical & Problem Solving',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
    })
    setQuestionErrors({})
    triggerAlert('✓ New question added to test bank and synchronized live with student assessment!')
  }

  const handleDeleteCustomQuestion = async (id) => {
    if (window.confirm('Delete this question from the test bank?')) {
      await questionService.deleteQuestion(id)
      setQuestions(questionService.getAllQuestions())
      triggerAlert('Question removed from test bank.')
    }
  }

  // =========================================================================
  // 4. Student Success Stories State
  // =========================================================================
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false)
  const [newStoryData, setNewStoryData] = useState({
    name: '',
    role: '',
    company: '',
    batch: '2025',
    testimonial: '',
    color: '#1e40af',
    bgClass: 'bg-blue-800',
  })

  const handleSaveNewStory = async (e) => {
    e.preventDefault()
    if (!newStoryData.name.trim() || !newStoryData.testimonial.trim()) return

    await homeService.addStudentStory(newStoryData)
    const updated = await homeService.getStudentStories()
    setStories(updated)
    setIsAddStoryModalOpen(false)
    setNewStoryData({
      name: '',
      role: '',
      company: '',
      batch: '2025',
      testimonial: '',
      color: '#1e40af',
      bgClass: 'bg-blue-800',
    })
    triggerAlert('✓ New student success story published to the homepage carousel!')
  }

  const handleDeleteStory = async (id) => {
    if (window.confirm('Remove this success story from the homepage?')) {
      await homeService.deleteStudentStory(id)
      const updated = await homeService.getStudentStories()
      setStories(updated)
      triggerAlert('Story removed.')
    }
  }

  // =========================================================================
  // 5. Placement Partners State
  // =========================================================================
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false)
  const [newPartnerData, setNewPartnerData] = useState({
    name: '',
    badge: 'Hiring Partner',
  })

  const handleSaveNewPartner = async (e) => {
    e.preventDefault()
    if (!newPartnerData.name.trim()) return

    await homeService.addPlacementPartner({
      name: newPartnerData.name.trim(),
      badge: newPartnerData.badge?.trim() || 'Hiring Partner',
      sector: newPartnerData.badge?.trim() || 'Corporate',
    })
    const updated = await homeService.getPlacementPartners()
    setPartners(updated)
    setIsAddPartnerModalOpen(false)
    setNewPartnerData({
      name: '',
      badge: 'Hiring Partner',
    })
    triggerAlert('✓ Placement partner organization added to the hiring network!')
  }

  const handleDeletePartner = async (id) => {
    if (window.confirm('Remove this placement partner from the directory?')) {
      await homeService.deletePlacementPartner(id)
      const updated = await homeService.getPlacementPartners()
      setPartners(updated)
      triggerAlert('Partner organization removed.')
    }
  }

  // =========================================================================
  // 6. Student Support Queries State
  // =========================================================================
  const [queryStatusFilter, setQueryStatusFilter] = useState('all')
  const [resolvingQueryId, setResolvingQueryId] = useState(null)
  const [resolutionInput, setResolutionInput] = useState('')

  const filteredQueries = useMemo(() => {
    if (queryStatusFilter === 'all') return queries
    return queries.filter((q) => q.status.toLowerCase() === queryStatusFilter.toLowerCase())
  }, [queries, queryStatusFilter])

  const handleUpdateQueryStatus = async (id, newStatus, notes = '') => {
    await queryService.updateQueryStatus(id, newStatus, notes)
    setQueries(queryService.getQueries())
    setResolvingQueryId(null)
    setResolutionInput('')
    triggerAlert(`✓ Ticket status updated to "${newStatus}"!`)
  }

  const pendingQueriesCount = queries.filter((q) => q.status === 'Pending').length

  // Left Strip Navigation Items (Icon on top, title directly underneath)
  const navItems = useMemo(
    () => [
      {
        id: 'students',
        title: t('dashboard.admin.tabs.students'),
        badge: students.length,
        icon: (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
      },
      {
        id: 'questions',
        title: t('dashboard.admin.tabs.questions'),
        badge: questions.length,
        icon: (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"
            />
          </svg>
        ),
      },
      {
        id: 'stories',
        title: t('dashboard.admin.tabs.stories'),
        badge: stories.length,
        icon: (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ),
      },
      {
        id: 'partners',
        title: t('dashboard.admin.tabs.partners'),
        badge: partners.length,
        icon: (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        ),
      },
      {
        id: 'queries',
        title: t('dashboard.admin.tabs.queries'),
        badge: pendingQueriesCount > 0 ? pendingQueriesCount : queries.length,
        isAlert: pendingQueriesCount > 0,
        icon: (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        ),
      },
    ],
    [t, students.length, questions.length, stories.length, partners.length, queries.length, pendingQueriesCount]
  )

  return (
    <div className="py-6 sm:py-10 bg-slate-50/50 min-h-screen">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 space-y-4 sm:space-y-6">
        
        {/* Global Toast Alert */}
        {alertMessage && (
          <div
            role="status"
            className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">✓</span>
              <span>{alertMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setAlertMessage('')}
              className="text-teal-700 hover:text-teal-950 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Main Section: Left Vertical Strip + Right Multi-Module Stage              */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* Left Vertical Strip Navigation (Icon on top, label directly underneath) */}
          {/* ----------------------------------------------------------------------- */}
          <aside
            aria-label="Admin Dashboard Navigation"
            className="w-full md:w-20 lg:w-24 shrink-0 md:sticky md:top-24 select-none"
          >
            <nav
              role="tablist"
              aria-label="Admin views"
              className="flex flex-row md:flex-col items-center justify-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {navItems.map((item) => {
                const isSelected = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex-1 md:flex-none min-w-[64px] sm:min-w-[72px] md:min-w-0 md:w-full shrink-0 flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer group relative min-h-[58px] sm:min-h-[66px] ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-semibold'
                    }`}
                  >
                    {/* Icon on Top */}
                    <div
                      className={`transition-transform duration-150 group-hover:scale-110 flex items-center justify-center ${
                        isSelected ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'
                      }`}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>

                    {/* Label directly underneath */}
                    <span
                      className={`text-[11px] sm:text-xs text-center leading-tight tracking-tight mt-1.5 block max-w-full truncate px-0.5 ${
                        isSelected ? 'text-white font-black' : 'text-slate-700 font-medium'
                      }`}
                    >
                      {item.title}
                    </span>

                    {/* Subtle count / alert badge */}
                    {item.badge !== undefined && (
                      <span
                        className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold leading-none ${
                          item.isAlert
                            ? 'bg-rose-600 text-white ring-2 ring-white animate-pulse'
                            : isSelected
                            ? 'bg-white/25 text-white'
                            : 'bg-slate-200/90 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}

              {/* Mobile-Only Logout Option in Horizontal Scrollable Tab Strip */}
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex-1 md:flex-none md:hidden min-w-[64px] sm:min-w-[72px] shrink-0 flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer group relative min-h-[58px] sm:min-h-[66px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 active:bg-rose-100 font-semibold"
                aria-label={t('navigation.logout')}
              >
                {/* Icon on Top */}
                <div
                  className="transition-transform duration-150 group-hover:scale-110 flex items-center justify-center text-rose-600"
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>

                {/* Label directly underneath */}
                <span className="text-[11px] sm:text-xs text-center leading-tight tracking-tight mt-1.5 block max-w-full truncate px-0.5 text-rose-700 font-bold">
                  {t('navigation.logout')}
                </span>
              </button>
            </nav>
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* Right Stage: Displays Header, Metrics Overview & Single Active Card     */}
          {/* ----------------------------------------------------------------------- */}
          <main className="flex-1 min-w-0 w-full space-y-4 sm:space-y-6">

            {/* 1. Header Bar: Admin Identity & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-1.5 uppercase tracking-wider">
              <span>🔒 {t('dashboard.admin.staffControl')}</span>
              <span className="text-slate-300">•</span>
              <span>{t('dashboard.admin.administrator')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('dashboard.admin.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 m-0">
              {t('dashboard.admin.subtitle')}
            </p>
          </div>

          {(user?.phone || user?.userId) && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-teal-500" aria-hidden="true" />
              <span className="text-xs text-slate-600 font-mono font-medium">
                {user.phone ? `+91 ${user.phone}` : user.userId}
              </span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: Direct Student Tracking & Complete Timeline                        */}
        {/* ========================================================================= */}
        {activeTab === 'students' && (
          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Student Registration &amp; Assessment Timeline Tracker
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Directly inspect every student&apos;s registration milestones and assessment progression in real time.
                </p>
              </div>

              {/* Status Filter: Touch Scrollable on Mobile */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStudentStatusFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-all ${
                    studentStatusFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t('dashboard.admin.allStatuses')} ({students.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStudentStatusFilter('completed')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-all ${
                    studentStatusFilter === 'completed'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  ✓ {t('dashboard.admin.statusCompleted')} ({students.filter((s) => s.assessment?.isCompleted).length})
                </button>
                <button
                  type="button"
                  onClick={() => setStudentStatusFilter('in_progress')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-all ${
                    studentStatusFilter === 'in_progress'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  ⏳ {t('dashboard.admin.statusInProgress')} ({students.filter((s) => s.assessment?.answeredCount > 0 && !s.assessment?.isCompleted).length})
                </button>
                <button
                  type="button"
                  onClick={() => setStudentStatusFilter('registered')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-all ${
                    studentStatusFilter === 'registered'
                      ? 'bg-slate-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  📝 {t('dashboard.admin.statusRegistered')} ({students.filter((s) => !s.assessment?.answeredCount || s.assessment?.answeredCount === 0).length})
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Input
                name="studentSearch"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder={t('dashboard.admin.searchStudents')}
                className="mb-0"
              />
            </div>

            {/* ========================================================================= */}
            {/* VIEW A: Mobile Responsive Student Cards (< md screens)                     */}
            {/* ========================================================================= */}
            <div className="block md:hidden space-y-3">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-medium bg-slate-50 rounded-2xl border border-slate-200">
                  {t('dashboard.admin.noStudentsFound')}
                </div>
              ) : (
                filteredStudents.map((s) => {
                  const isComp = Boolean(s.assessment?.isCompleted)
                  const answered = s.assessment?.answeredCount || 0
                  const total = s.assessment?.totalQuestions || 45
                  const percent = s.assessment?.percentage || 0
                  const studentPhone = s.phone || s.mobile || ''

                  return (
                    <div
                      key={s.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all space-y-3"
                    >
                      {/* Top Row: Name, Age & Status Pill */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {s.fullName?.slice(0, 2).toUpperCase() || 'ST'}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-snug">
                              {s.fullName}
                            </h3>
                            <div className="text-[11px] text-slate-500">
                              {s.age ? `Age: ${s.age}` : 'Age: N/A'} • {s.education || 'Student'}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                            isComp
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : answered > 0
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {isComp && <span>✓</span>}
                          <span>{s.assessment?.status || 'Not Started'}</span>
                        </span>
                      </div>

                      {/* Middle Row: Phone with Click-to-Call & Location */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Mobile Number
                          </span>
                          {studentPhone ? (
                            <a
                              href={`tel:${studentPhone}`}
                              className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 mt-0.5"
                            >
                              <span>📞</span>
                              <span>+91 {studentPhone}</span>
                            </a>
                          ) : (
                            <span className="text-slate-500 font-medium">N/A</span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Location
                          </span>
                          <span className="font-medium text-slate-800 truncate block mt-0.5">
                            {[s.city, s.state].filter(Boolean).join(', ') || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                          <span>Assessment Progression</span>
                          <span className="font-mono font-bold text-slate-800">
                            {answered}/{total} Qs ({percent}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isComp ? 'bg-emerald-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex items-center gap-2 pt-1">
                        {isComp ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenStudentReport(s)}
                              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span>📊</span>
                              <span>View Report Card</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedStudentForTimeline(s)}
                              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Timeline
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForTimeline(s)}
                            className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>🕒</span>
                            <span>View Timeline &amp; Notes &rarr;</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* ========================================================================= */}
            {/* VIEW B: Desktop Multi-Column Data Table (>= md screens)                   */}
            {/* ========================================================================= */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">{t('dashboard.admin.studentCol')}</th>
                    <th className="py-3.5 px-4">{t('dashboard.student.mobileNumber')}</th>
                    <th className="py-3.5 px-4">{t('dashboard.admin.locationCol')}</th>
                    <th className="py-3.5 px-4">{t('dashboard.admin.progressCol')}</th>
                    <th className="py-3.5 px-4 text-right">{t('dashboard.admin.actionCol')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">
                        {t('dashboard.admin.noStudentsFound')}
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{s.fullName}</div>
                          <div className="text-[11px] text-slate-500">
                            Age: {s.age || 'N/A'} • {s.education || 'Student'}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-900 font-semibold font-mono">
                            {s.phone ? `+91 ${s.phone}` : s.mobile ? `+91 ${s.mobile}` : 'N/A'}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            ID: {s.userId || `u-${s.id}`}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-medium">{s.city || 'N/A'}</div>
                          <div className="text-[11px] text-slate-500">{s.state || 'N/A'}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                s.assessment?.isCompleted
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : s.assessment?.answeredCount > 0
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {s.assessment?.status}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">
                              {s.assessment?.answeredCount} / {s.assessment?.totalQuestions} Qs
                            </span>
                          </div>
                          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${s.assessment?.percentage || 0}%` }}
                            />
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {s.assessment?.isCompleted && (
                              <button
                                type="button"
                                onClick={() => handleOpenStudentReport(s)}
                                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                              >
                                <span>📊</span>
                                <span>Report Card</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedStudentForTimeline(s)}
                              className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              {t('dashboard.admin.viewTimelineBtn')} &rarr;
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls & Load More Students Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 font-medium">
                Showing <span className="font-bold text-slate-800">{students.length}</span> of{' '}
                <span className="font-bold text-slate-800">{studentPagination.total}</span> registered students
              </div>

              {studentPagination.hasMore && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleLoadMoreStudents}
                  disabled={isLoadingMore}
                  className="gap-2 shadow-2xs cursor-pointer"
                >
                  {isLoadingMore ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                      <span>Loading more students...</span>
                    </>
                  ) : (
                    <>
                      <span>⬇️ Load More Students</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: Questions Bank Manager                                            */}
        {/* ========================================================================= */}
        {activeTab === 'questions' && (
          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Psychometric Questions Bank ({questions.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Add, review, and synchronize situational questions tested during student career evaluations.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setIsAddQuestionModalOpen(true)}
                className="gap-2 shadow-xs"
              >
                <span>{t('dashboard.admin.addQuestionBtn')}</span>
              </Button>
            </div>

            {/* Section Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              <button
                type="button"
                onClick={() => setQuestionSectionFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  questionSectionFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Sections ({questions.length})
              </button>
              {ASSESSMENT_SECTIONS.map((sec) => {
                const count = questions.filter((q) => q.sectionId === sec.id).length
                const isSelected = questionSectionFilter === sec.id
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setQuestionSectionFilter(sec.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[11px] opacity-80">{sec.order}.</span>
                    <span>{sec.title}</span>
                    <span className="text-[10px] opacity-80 font-mono">({count})</span>
                  </button>
                )
              })}
            </div>

            {/* Question Search */}
            <Input
              name="questionSearch"
              value={questionSearch}
              onChange={(e) => setQuestionSearch(e.target.value)}
              placeholder={t('dashboard.admin.searchQuestions')}
              className="mb-0"
            />

            {/* Questions Roster */}
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 text-xs font-black flex items-center justify-center font-mono">
                        #{idx + 1}
                      </span>
                      {q.sectionId && (
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-200 px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                          <span className="text-slate-400 font-mono">Sec {ASSESSMENT_SECTIONS.find((s) => s.id === q.sectionId)?.order || '•'}:</span>
                          <span>{ASSESSMENT_SECTIONS.find((s) => s.id === q.sectionId)?.title || q.sectionId}</span>
                        </span>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                        {q.category}
                      </span>
                      {q.isCustom && (
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                          Admin Custom
                        </span>
                      )}
                    </div>

                    {q.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomQuestion(q.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        Delete Question
                      </button>
                    )}
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {q.question}
                  </p>

                  {/* Options Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2"
                      >
                        <span className="font-bold text-blue-700 uppercase shrink-0">
                          {opt.id}.
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: Student Success Stories Manager                                    */}
        {/* ========================================================================= */}
        {activeTab === 'stories' && (
          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Student Success Stories ({stories.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Add verified student testimonials published directly to the homepage carousel.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setIsAddStoryModalOpen(true)}
                className="gap-2 shadow-xs"
              >
                <span>+</span>
                <span>Add Success Story</span>
              </Button>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${story.bgClass || 'bg-blue-800'} text-white font-extrabold text-sm flex items-center justify-center`}
                        >
                          {story.initials || 'ST'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{story.name}</div>
                          <div className="text-xs text-slate-500">
                            {story.role} • <strong className="text-slate-800">{story.company}</strong>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteStory(story.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 cursor-pointer font-semibold"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      &ldquo;{story.testimonial}&rdquo;
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 font-semibold border-t border-slate-200 pt-2 flex items-center justify-between">
                    <span>Batch: {story.batch}</span>
                    <span className="text-emerald-700">✓ Verified Story</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: Placement Partners Manager                                         */}
        {/* ========================================================================= */}
        {activeTab === 'partners' && (
          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Placement Support &amp; Hiring Partners ({partners.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Manage placement partner organizations hiring students across banking, IT, retail, and healthcare.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setIsAddPartnerModalOpen(true)}
                className="gap-2 shadow-xs"
              >
                <span>+</span>
                <span>Add Placement Partner</span>
              </Button>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partners.map((p) => (
                <div
                  key={p.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-3 hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                      {p.badge || p.sector || 'Partner'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeletePartner(p.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer font-semibold"
                      title="Remove partner"
                    >
                      Remove
                    </button>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">
                    {p.name}
                  </h3>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: Student Queries & Help Desk Support                                */}
        {/* ========================================================================= */}
        {activeTab === 'queries' && (
          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Student Help Desk Inquiries ({queries.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Review student queries submitted via their dashboard help desk, update ticket status, and log counselor resolution notes.
                </p>
              </div>

              {/* Query Status Filters */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQueryStatusFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                    queryStatusFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All ({queries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setQueryStatusFilter('pending')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                    queryStatusFilter === 'pending'
                      ? 'bg-rose-700 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Pending ({queries.filter((q) => q.status === 'Pending').length})
                </button>
                <button
                  type="button"
                  onClick={() => setQueryStatusFilter('in review')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                    queryStatusFilter === 'in review'
                      ? 'bg-blue-700 text-white'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  In Review ({queries.filter((q) => q.status === 'In Review').length})
                </button>
                <button
                  type="button"
                  onClick={() => setQueryStatusFilter('resolved')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                    queryStatusFilter === 'resolved'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Resolved ({queries.filter((q) => q.status === 'Resolved').length})
                </button>
              </div>
            </div>

            {/* Queries List */}
            <div className="space-y-4">
              {filteredQueries.length === 0 ? (
                <div className="py-8 text-center text-slate-500 font-medium">
                  No inquiries found under this filter.
                </div>
              ) : (
                filteredQueries.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-slate-900 bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                          {ticket.ticketId}
                        </span>
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                          {ticket.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                            ticket.status === 'Resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ticket.status === 'In Review'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          ● {ticket.status}
                        </span>
                        <span className="text-slate-400 text-xs font-mono">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {ticket.subject}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                        {ticket.message}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        Candidate: <strong className="text-slate-900">{ticket.studentName}</strong> •{' '}
                        <span>{ticket.studentEmail}</span> •{' '}
                        <span className="font-mono">{ticket.studentMobile}</span>
                      </div>

                      {/* Quick Status Changers */}
                      <div className="flex items-center gap-1.5">
                        {ticket.status !== 'Resolved' && (
                          <button
                            type="button"
                            onClick={() => {
                              setResolvingQueryId(ticket.id)
                              setResolutionInput(ticket.resolutionNotes || '')
                            }}
                            className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer"
                          >
                            Mark Resolved ✓
                          </button>
                        )}
                        {ticket.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateQueryStatus(ticket.id, 'In Review')}
                            className="px-2.5 py-1 text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg cursor-pointer"
                          >
                            Set In Review
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Resolution Notes Display or Input */}
                    {resolvingQueryId === ticket.id ? (
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                        <label className="block text-xs font-bold text-emerald-900">
                          Log Resolution Note / Counselor Feedback:
                        </label>
                        <Input
                          name="resolutionInput"
                          value={resolutionInput}
                          onChange={(e) => setResolutionInput(e.target.value)}
                          placeholder="e.g. Connected with student via phone, resolved question clarification..."
                          className="mb-0"
                        />
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setResolvingQueryId(null)}
                            className="text-xs text-slate-600 hover:text-slate-800 font-semibold px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQueryStatus(ticket.id, 'Resolved', resolutionInput)
                            }
                            className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1 rounded-lg"
                          >
                            Confirm Resolved
                          </button>
                        </div>
                      </div>
                    ) : (
                      ticket.resolutionNotes && (
                        <div className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-900 p-2.5 rounded-lg">
                          <strong>Counselor Note:</strong> {ticket.resolutionNotes}
                        </div>
                      )
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: Student Interactive Timeline View                                 */}
      {/* ========================================================================= */}
      {selectedStudentForTimeline && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                  Student Journey Timeline
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {selectedStudentForTimeline.fullName}
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  ID: {selectedStudentForTimeline.id} • Registered:{' '}
                  {selectedStudentForTimeline.createdAt
                    ? new Date(selectedStudentForTimeline.createdAt).toLocaleDateString()
                    : 'Active Record'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudentForTimeline(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Visual Timeline Steps */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {/* Timeline Step 1: Registration */}
              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 ring-4 ring-white">
                  ✓
                </div>
                <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Phase 1: Student Registration Completed
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                      Verified
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div>Mobile: <strong className="text-slate-800">{selectedStudentForTimeline.phone || selectedStudentForTimeline.mobile || 'N/A'}</strong></div>
                    <div>Student ID: <strong className="text-slate-800 font-mono">{selectedStudentForTimeline.userId || `u-${selectedStudentForTimeline.id}`}</strong></div>
                    <div>Father: <span className="text-slate-800">{selectedStudentForTimeline.fatherName || 'N/A'}</span></div>
                    <div>Mother: <span className="text-slate-800">{selectedStudentForTimeline.motherName || 'N/A'}</span></div>
                    <div className="col-span-2">
                      Location: <span className="text-slate-800">{selectedStudentForTimeline.city}, {selectedStudentForTimeline.state} ({selectedStudentForTimeline.pincode})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Step 2: Assessment Progress */}
              <div className="relative flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 ring-4 ring-white ${
                    selectedStudentForTimeline.assessment?.isCompleted
                      ? 'bg-emerald-600'
                      : selectedStudentForTimeline.assessment?.answeredCount > 0
                      ? 'bg-amber-500'
                      : 'bg-slate-300'
                  }`}
                >
                  {selectedStudentForTimeline.assessment?.isCompleted ? '✓' : '2'}
                </div>
                <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Phase 2: Psychometric Assessment
                    </h3>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        selectedStudentForTimeline.assessment?.isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedStudentForTimeline.assessment?.answeredCount > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedStudentForTimeline.assessment?.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                      <span>
                        Answered: {selectedStudentForTimeline.assessment?.answeredCount} of{' '}
                        {selectedStudentForTimeline.assessment?.totalQuestions} Questions
                      </span>
                      <span>{selectedStudentForTimeline.assessment?.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${selectedStudentForTimeline.assessment?.percentage || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    Remaining Questions:{' '}
                    <strong className="text-slate-800">
                      {selectedStudentForTimeline.assessment?.leftCount}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Timeline Step 3: Evaluation & Guidance */}
              <div className="relative flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 ring-4 ring-white ${
                    selectedStudentForTimeline.assessment?.isCompleted
                      ? 'bg-indigo-600'
                      : 'bg-slate-300'
                  }`}
                >
                  3
                </div>
                <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Phase 3: Career Evaluation &amp; Report
                  </h3>
                  {selectedStudentForTimeline.assessment?.isCompleted ? (
                    <div className="space-y-2.5 pt-1">
                      <p className="text-xs text-emerald-800 font-medium">
                        All 45 situational questions completed! Psychometric profile, 11-sector curriculum alignment, and Top 3 Vocational Recommendations are ready for review.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const student = selectedStudentForTimeline
                          setSelectedStudentForTimeline(null)
                          handleOpenStudentReport(student)
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                      >
                        <span>📊 Open Student Report Card &rarr;</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600">
                      Assessment pending ({selectedStudentForTimeline.assessment?.answeredCount || 0}/45 answered). Report card unlocked once candidate submits all questions.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Counselor Note Logger */}
            <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Administrative / Counselor Follow-up Note:
              </label>
              <Input
                name="counselorNote"
                value={counselorNote}
                onChange={(e) => setCounselorNote(e.target.value)}
                placeholder="Log internal notes regarding student status or phone follow-up..."
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStudentForTimeline(null)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    triggerAlert(`Counselor note logged for ${selectedStudentForTimeline.fullName}.`)
                    setCounselorNote('')
                    setSelectedStudentForTimeline(null)
                    setStudents(authService.getAllStudents())
                  }}
                >
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Student Psychometric Assessment Report Card                       */}
      {/* ========================================================================= */}
      {selectedStudentForReport && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm">
                  {selectedStudentForReport.fullName?.slice(0, 2).toUpperCase() || 'ST'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                      ✓ Assessment Report Card
                    </span>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      ID: {selectedStudentForReport.userId || selectedStudentForReport.id}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 truncate mt-0.5">
                    {selectedStudentForReport.fullName}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <span>🖨️</span>
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStudentForReport(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                  aria-label="Close report card modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
              
              {isLoadingStudentReport && !studentReportData ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Loading Student Report...</h3>
                  <p className="text-xs text-slate-500">Retrieving evaluation from MySQL database...</p>
                </div>
              ) : !studentReportData || (!studentReportData.topSkillDomains && !studentReportData.traitScores) ? (
                <div className="p-8 text-center bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-2">
                  <span className="text-3xl">📝</span>
                  <h3 className="font-bold text-base">Assessment In Progress / Report Not Yet Generated</h3>
                  <p className="text-xs text-amber-800 max-w-md mx-auto">
                    This candidate has not yet completed all 45 situational questions. The full psychometric report card will unlock as soon as the test is submitted.
                  </p>
                </div>
              ) : (
                <>
                  {/* Candidate Quick Overview Banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Candidate Mobile</span>
                      <a href={`tel:${selectedStudentForReport.phone || selectedStudentForReport.mobile}`} className="font-bold text-blue-700 hover:underline">
                        +91 {selectedStudentForReport.phone || selectedStudentForReport.mobile || 'N/A'}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Demographics</span>
                      <span className="font-bold text-slate-800">
                        {selectedStudentForReport.age ? `${selectedStudentForReport.age} yrs` : 'N/A'} • {selectedStudentForReport.education || 'Student'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
                      <span className="font-bold text-slate-800 truncate block">
                        {[selectedStudentForReport.city, selectedStudentForReport.state].filter(Boolean).join(', ') || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Evaluated On</span>
                      <span className="font-bold text-emerald-800">
                        {studentReportData.evaluatedAt || studentReportData.createdAt
                          ? new Date(studentReportData.evaluatedAt || studentReportData.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
                          : 'Recent Assessment'}
                      </span>
                    </div>
                  </div>

                  {/* SECTION 1: TOP 3 RECOMMENDED VOCATIONAL SKILL DOMAINS */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                          ReachDisha &amp; CCC Vocational Standard
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          🎯 Top 3 Recommended Vocational Skill Domains
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 hidden sm:inline">
                        Calibrated against 11 industry training sectors
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {studentReportData.topSkillDomains?.map((domain, index) => {
                        const rankBadges = [
                          { title: 'Rank #1 Core Domain', badge: 'bg-amber-100 text-amber-900 border-amber-300', ring: 'border-amber-400 bg-amber-50/40' },
                          { title: 'Rank #2 Primary Domain', badge: 'bg-blue-100 text-blue-900 border-blue-300', ring: 'border-blue-400 bg-blue-50/40' },
                          { title: 'Rank #3 Complementary', badge: 'bg-indigo-100 text-indigo-900 border-indigo-300', ring: 'border-indigo-400 bg-indigo-50/40' },
                        ]
                        const meta = rankBadges[index] || { title: `Rank #${index + 1}`, badge: 'bg-slate-100 text-slate-800 border-slate-300', ring: 'border-slate-300' }

                        return (
                          <div
                            key={domain.id || index}
                            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-xs flex flex-col justify-between ${meta.ring}`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${meta.badge}`}>
                                  {meta.title}
                                </span>
                                <span className="text-xl" aria-hidden="true">{domain.icon || '🎯'}</span>
                              </div>

                              {domain.sector && (
                                <div className="mb-1">
                                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">
                                    {domain.sector}
                                  </span>
                                </div>
                              )}

                              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 leading-snug">
                                {domain.courseName || domain.title}
                              </h4>

                              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                {domain.description}
                              </p>

                              {/* Mapped Job Roles */}
                              {(domain.mappedJobRoles || domain.typicalRoles) && (
                                <div className="mb-3">
                                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <span>💼</span>
                                    <span>Mapped Job Roles:</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {(domain.mappedJobRoles || domain.typicalRoles).map((role, rIdx) => (
                                      <span
                                        key={rIdx}
                                        className="text-[10px] font-medium bg-white text-slate-800 border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs"
                                      >
                                        {role}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-xs font-bold mb-1">
                                <span className="text-slate-700">Domain Affinity</span>
                                <span className="font-mono text-blue-700 text-sm font-black">
                                  {domain.percentage ?? domain.scorePercentage ?? 0}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden mb-2">
                                <div
                                  className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full"
                                  style={{ width: `${Math.min(100, Math.max(10, domain.percentage ?? domain.scorePercentage ?? 0))}%` }}
                                />
                              </div>

                              {domain.topTraits && domain.topTraits.length > 0 && (
                                <div className="pt-2 border-t border-slate-200/60">
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Key Contributing Strengths:
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {domain.topTraits.map((t, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="text-[10px] font-medium bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                                      >
                                        {t.trait}: <strong className="text-blue-700 font-mono">{t.percentage}%</strong>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* SECTION 2: 6 PSYCHOMETRIC DIMENSIONS BREAKDOWN */}
                  {studentReportData.traitScores && Object.keys(studentReportData.traitScores).length > 0 && (
                    <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Competency Matrix
                          </div>
                          <h4 className="text-sm font-black text-slate-900">
                            Evaluated Psychometric Traits (6 Dimensions)
                          </h4>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">
                          {Object.keys(studentReportData.traitScores).length} Dimensions Tested
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {Object.entries(studentReportData.traitScores).map(([trait, score], tIdx) => {
                          const val = typeof score === 'object' ? (score.percentage ?? score.score ?? 0) : score
                          return (
                            <div key={tIdx} className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-800 capitalize truncate pr-1">
                                  {trait.replace(/_/g, ' ')}
                                </span>
                                <span className="font-mono font-bold text-blue-700">{val}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${Math.min(100, Math.max(5, val))}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* SECTION 3: STRENGTHS & DEVELOPMENT AREAS */}
                  {(studentReportData.strengths || studentReportData.skillGaps) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Top Strengths */}
                      <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2">
                        <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                          <span>🌟</span>
                          <span>Candidate Core Strengths</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(studentReportData.strengths) && studentReportData.strengths.length > 0 ? (
                            studentReportData.strengths.map((str, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-xs font-semibold bg-white text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg shadow-2xs"
                              >
                                ✓ {typeof str === 'string' ? str : str.name || str.trait}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500">High problem solving and execution readiness</span>
                          )}
                        </div>
                      </div>

                      {/* Growth Areas */}
                      <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-2">
                        <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                          <span>📈</span>
                          <span>Recommended Focus Areas</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(studentReportData.skillGaps) && studentReportData.skillGaps.length > 0 ? (
                            studentReportData.skillGaps.map((gap, gIdx) => (
                              <span
                                key={gIdx}
                                className="text-xs font-semibold bg-white text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg shadow-2xs"
                              >
                                • {typeof gap === 'string' ? gap : gap.name || gap.trait}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500">Structured practical training in target sector</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 4: COUNSELOR LOG FOR THIS STUDENT */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Counselor / Administrative Consultation Notes:
                    </label>
                    <div className="flex gap-2">
                      <Input
                        name="counselorNoteReport"
                        value={counselorNote}
                        onChange={(e) => setCounselorNote(e.target.value)}
                        placeholder="Add guidance note for this candidate's career counseling session..."
                        className="mb-0 flex-1"
                      />
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          if (counselorNote.trim()) {
                            triggerAlert(`Counselor note saved for ${selectedStudentForReport.fullName}.`)
                            setCounselorNote('')
                          }
                        }}
                      >
                        Save Note
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                ReachDisha Assessment Intelligence &bull; Official Curriculum
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStudentForReport(null)}
                >
                  Close
                </Button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>🖨️</span>
                  <span>Print Report Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: Add New Question to Test Bank                                    */}
      {/* ========================================================================= */}
      {isAddQuestionModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <h2 className="text-xl font-black text-slate-900">
                Add New Question to Test Bank
              </h2>
              <button
                type="button"
                onClick={() => setIsAddQuestionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewQuestion} className="space-y-4">
              <Select
                label="Assessment Section (6 Core Dimensions)"
                name="sectionId"
                value={newQuestionData.sectionId}
                onChange={(e) => {
                  const sId = e.target.value
                  const sectionDefaults = {
                    aptitude: 'Analytical & Problem Solving',
                    personality: 'Behavioral Traits & Dispositions',
                    work_style: 'Teamwork & Workflow Pace',
                    emotional_intelligence: 'Empathy & Conflict Resolution',
                    career_interest: 'Technology & Vocational Passions',
                    skill_and_abilities: 'Practical Execution & Leadership',
                  }
                  setNewQuestionData((prev) => ({
                    ...prev,
                    sectionId: sId,
                    category: sectionDefaults[sId] || prev.category,
                  }))
                }}
                options={[
                  { value: 'aptitude', label: '1. Aptitude (Logic & Analytical)' },
                  { value: 'personality', label: '2. Personality (Behavioral & Traits)' },
                  { value: 'work_style', label: '3. Work Style (Teamwork & Pacing)' },
                  { value: 'emotional_intelligence', label: '4. Emotional Intelligence (EQ)' },
                  { value: 'career_interest', label: '5. Career Interest (Passions)' },
                  { value: 'skill_and_abilities', label: '6. Skill and Abilities (Execution)' },
                ]}
              />

              <Input
                label="Evaluation Sub-category / Specific Trait"
                name="category"
                value={newQuestionData.category}
                onChange={(e) =>
                  setNewQuestionData((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="e.g. Logical Deduction, Pacing, Conflict Management..."
                required
              />

              <Textarea
                label="Question Text / Situational Prompt"
                name="question"
                value={newQuestionData.question}
                onChange={(e) =>
                  setNewQuestionData((prev) => ({ ...prev, question: e.target.value }))
                }
                error={questionErrors.question}
                placeholder="Enter situational question prompt..."
                rows={3}
                required
              />

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Question Options (A, B, C, D)
                </span>

                <Input
                  label="Option A"
                  name="optionA"
                  value={newQuestionData.optionA}
                  onChange={(e) =>
                    setNewQuestionData((prev) => ({ ...prev, optionA: e.target.value }))
                  }
                  error={questionErrors.optionA}
                  placeholder="Option A description..."
                  required
                />

                <Input
                  label="Option B"
                  name="optionB"
                  value={newQuestionData.optionB}
                  onChange={(e) =>
                    setNewQuestionData((prev) => ({ ...prev, optionB: e.target.value }))
                  }
                  error={questionErrors.optionB}
                  placeholder="Option B description..."
                  required
                />

                <Input
                  label="Option C"
                  name="optionC"
                  value={newQuestionData.optionC}
                  onChange={(e) =>
                    setNewQuestionData((prev) => ({ ...prev, optionC: e.target.value }))
                  }
                  error={questionErrors.optionC}
                  placeholder="Option C description..."
                  required
                />

                <Input
                  label="Option D"
                  name="optionD"
                  value={newQuestionData.optionD}
                  onChange={(e) =>
                    setNewQuestionData((prev) => ({ ...prev, optionD: e.target.value }))
                  }
                  error={questionErrors.optionD}
                  placeholder="Option D description..."
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddQuestionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Save Question to Bank
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: Add Success Story                                                */}
      {/* ========================================================================= */}
      {isAddStoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <h2 className="text-xl font-black text-slate-900">
                Add Student Success Story
              </h2>
              <button
                type="button"
                onClick={() => setIsAddStoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewStory} className="space-y-4">
              <Input
                label="Student Full Name"
                name="name"
                value={newStoryData.name}
                onChange={(e) =>
                  setNewStoryData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Vikram Rao"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Hired Job Role"
                  name="role"
                  value={newStoryData.role}
                  onChange={(e) =>
                    setNewStoryData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="e.g. Banking Associate"
                  required
                />
                <Input
                  label="Company Name"
                  name="company"
                  value={newStoryData.company}
                  onChange={(e) =>
                    setNewStoryData((prev) => ({ ...prev, company: e.target.value }))
                  }
                  placeholder="e.g. HDFC Bank"
                  required
                />
              </div>

              <Input
                label="Placement Batch Year"
                name="batch"
                value={newStoryData.batch}
                onChange={(e) =>
                  setNewStoryData((prev) => ({ ...prev, batch: e.target.value }))
                }
                placeholder="e.g. 2025"
              />

              <Textarea
                label="Testimonial Quote / Story"
                name="testimonial"
                value={newStoryData.testimonial}
                onChange={(e) =>
                  setNewStoryData((prev) => ({ ...prev, testimonial: e.target.value }))
                }
                placeholder="Describe how the assessment and guidance assisted the student..."
                rows={3}
                required
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddStoryModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Publish to Homepage
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: Add Placement Partner                                            */}
      {/* ========================================================================= */}
      {isAddPartnerModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <h2 className="text-xl font-black text-slate-900">
                Add Placement Partner Organization
              </h2>
              <button
                type="button"
                onClick={() => setIsAddPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewPartner} className="space-y-4">
              <Input
                label="Organization / Company Name"
                name="name"
                value={newPartnerData.name}
                onChange={(e) =>
                  setNewPartnerData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Wipro Technologies, Tata Motors"
                required
              />

              <Input
                label="Category Badge"
                name="badge"
                value={newPartnerData.badge}
                onChange={(e) =>
                  setNewPartnerData((prev) => ({ ...prev, badge: e.target.value }))
                }
                placeholder="e.g. IT Services, BFSI, Retail, Healthcare"
                required
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddPartnerModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Add Partner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Safe Logout */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isAdmin={true}
      />
    </div>
  )
}

export default AdminDashboard
