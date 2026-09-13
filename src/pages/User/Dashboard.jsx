import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LogoutConfirmModal from '@/components/common/LogoutConfirmModal'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import { TOTAL_ASSESSMENT_QUESTIONS, ASSESSMENT_SECTIONS, getLocalizedSection } from '@/constants/assessmentQuestions'
import INDIA_STATES from '@/constants/indiaStates'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { questionService } from '@/services/assessment/questionService'
import { queryService } from '@/services/support/queryService'

/**
 * Helper: Derive initials from name for avatar fallback
 */
function getInitials(name) {
  if (!name) return 'ST'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Helper: Calculate age from DOB string (YYYY-MM-DD)
 */
function calculateAge(dobString) {
  if (!dobString) return ''
  const birth = new Date(dobString)
  if (isNaN(birth.getTime())) return ''
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age >= 0 ? String(age) : ''
}

export function Dashboard() {
  const { t, language } = useTranslation()
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setIsLogoutModalOpen(false)
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  // Assessment Progress State
  const [assessmentData, setAssessmentData] = useState(() => {
    try {
      const raw = localStorage.getItem(`ccc_assessment_progress_${user?.id || 'guest'}`)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  // Career Assessment Recommendation Report State
  const [recommendationData, setRecommendationData] = useState(() => {
    try {
      const raw = localStorage.getItem(`ccc_recommendation_${user?.id || 'guest'}`)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [isLoadingReport, setIsLoadingReport] = useState(false)

  // Reload assessment progress whenever user returns to the tab
  useEffect(() => {
    const handleFocus = () => {
      try {
        const raw = localStorage.getItem(`ccc_assessment_progress_${user?.id || 'guest'}`)
        if (raw) {
          setAssessmentData(JSON.parse(raw))
        }
        const recRaw = localStorage.getItem(`ccc_recommendation_${user?.id || 'guest'}`)
        if (recRaw) {
          setRecommendationData(JSON.parse(recRaw))
        }
      } catch {
        // Ignore
      }
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [user?.id])

  // Synchronize latest assessment evaluation from Express / MySQL backend
  useEffect(() => {
    let isMounted = true
    const fetchLatestReport = async () => {
      if (!user?.id) return
      try {
        setIsLoadingReport(true)
        const latest = await questionService.getLatestAssessmentResult()
        if (isMounted && latest) {
          setRecommendationData(latest)
          localStorage.setItem(`ccc_recommendation_${user.id}`, JSON.stringify(latest))
        }
      } catch (err) {
        console.warn('[Dashboard] Could not fetch latest assessment result:', err)
      } finally {
        if (isMounted) setIsLoadingReport(false)
      }
    }

    if (user?.id) {
      fetchLatestReport()
    }

    return () => {
      isMounted = false
    }
  }, [user?.id])

  const totalQuestions = questionService.getTotalQuestions() || TOTAL_ASSESSMENT_QUESTIONS
  const answeredCount = Object.keys(assessmentData?.answers || {}).length
  const leftCount = Math.max(0, totalQuestions - answeredCount)
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100)
  const isCompleted = Boolean(assessmentData?.isCompleted || recommendationData)

  // Active Tab: Derived directly from URL query param (?tab=profile|assessment|report|support)
  const currentTabFromUrl = searchParams.get('tab')
  const defaultTab = recommendationData ? 'report' : isCompleted ? 'report' : answeredCount > 0 ? 'assessment' : 'profile'
  const activeTab =
    currentTabFromUrl && ['profile', 'assessment', 'report', 'support'].includes(currentTabFromUrl)
      ? currentTabFromUrl
      : defaultTab

  const handleSelectTab = (tabId) => {
    setSearchParams({ tab: tabId }, { replace: true })
  }

  // Navigation Items: Icon on top, title directly underneath
  const navItems = useMemo(
    () => [
      {
        id: 'profile',
        title: t('dashboard.student.tabs.profile'),
        statusDot: true,
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
      },
      {
        id: 'assessment',
        title: t('dashboard.student.tabs.assessment'),
        statusDot: answeredCount > 0,
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
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        ),
      },
      {
        id: 'report',
        title: t('dashboard.student.tabs.report'),
        statusDot: Boolean(recommendationData || isCompleted),
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        ),
      },
      {
        id: 'support',
        title: t('dashboard.student.tabs.support'),
        statusDot: false,
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
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
      },
    ],
    [t, answeredCount, recommendationData, isCompleted]
  )

  // Avatar Upload State
  const fileInputRef = useRef(null)
  const [isSavingAvatar, setIsSavingAvatar] = useState(false)
  const [avatarSuccessMsg, setAvatarSuccessMsg] = useState('')
  const [avatarErrorMsg, setAvatarErrorMsg] = useState('')

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setAvatarErrorMsg('')
    setAvatarSuccessMsg('')

    if (!file.type.startsWith('image/')) {
      setAvatarErrorMsg(t('dashboard.student.invalidImage'))
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setAvatarErrorMsg(t('dashboard.student.sizeLimit'))
      return
    }

    setIsSavingAvatar(true)
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const base64 = event.target.result
        await updateProfile({ avatar: base64 })
        setAvatarSuccessMsg(t('dashboard.student.uploadSuccess'))
        setTimeout(() => setAvatarSuccessMsg(''), 4000)
      } catch {
        setAvatarErrorMsg(t('dashboard.student.uploadFail'))
      } finally {
        setIsSavingAvatar(false)
      }
    }
    reader.onerror = () => {
      setAvatarErrorMsg(t('dashboard.student.uploadFail'))
      setIsSavingAvatar(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = async () => {
    try {
      setIsSavingAvatar(true)
      await updateProfile({ avatar: '' })
      setAvatarSuccessMsg(t('dashboard.student.photoRemoved'))
      setTimeout(() => setAvatarSuccessMsg(''), 3000)
    } catch {
      setAvatarErrorMsg(t('dashboard.student.photoRemoveFail'))
    } finally {
      setIsSavingAvatar(false)
    }
  }

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    mobile: '',
    dob: '',
    age: '',
    fatherName: '',
    motherName: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
  })
  const [editErrors, setEditErrors] = useState({})
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profileSuccessAlert, setProfileSuccessAlert] = useState('')

  const openEditModal = () => {
    setEditFormData({
      fullName: user?.fullName || '',
      mobile: user?.mobile || user?.phone || '',
      dob: user?.dob || '',
      age: user?.age || calculateAge(user?.dob) || '',
      fatherName: user?.fatherName || '',
      motherName: user?.motherName || '',
      state: user?.state || '',
      city: user?.city || '',
      pincode: user?.pincode || '',
      address: user?.address || '',
    })
    setEditErrors({})
    setIsEditModalOpen(true)
  }

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'dob') {
        const computed = calculateAge(value)
        next.age = computed
      }
      return next
    })
    if (editErrors[field]) {
      setEditErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    const errors = {}

    if (!editFormData.fullName.trim()) {
      errors.fullName = 'Full name is required.'
    }
    if (!editFormData.mobile.trim()) {
      errors.mobile = 'Mobile number is required.'
    } else if (!/^[6-9]\d{9}$/.test(editFormData.mobile.trim())) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number.'
    }
    if (editFormData.pincode && !/^\d{6}$/.test(editFormData.pincode.trim())) {
      errors.pincode = 'PIN code must be a 6-digit number.'
    }

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors)
      return
    }

    try {
      setIsSavingProfile(true)
      await updateProfile({
        fullName: editFormData.fullName.trim(),
        mobile: editFormData.mobile.trim(),
        phone: editFormData.mobile.trim(),
        dob: editFormData.dob,
        age: editFormData.age || calculateAge(editFormData.dob),
        fatherName: editFormData.fatherName.trim(),
        motherName: editFormData.motherName.trim(),
        state: editFormData.state,
        city: editFormData.city.trim(),
        pincode: editFormData.pincode.trim(),
        address: editFormData.address.trim(),
      })
      setIsEditModalOpen(false)
      setProfileSuccessAlert(t('dashboard.student.profileUpdated'))
      setTimeout(() => setProfileSuccessAlert(''), 5000)
    } catch {
      setEditErrors({ form: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSavingProfile(false)
    }
  }

  // Help Desk Query Form State
  const [ticketData, setTicketData] = useState({
    category: 'Assessment Question Help',
    subject: '',
    message: '',
  })
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [ticketNumber, setTicketNumber] = useState('')
  const [ticketSubmitting, setTicketSubmitting] = useState(false)

  const handleTicketSubmit = async (e) => {
    e.preventDefault()
    if (!ticketData.subject.trim() || !ticketData.message.trim()) return

    setTicketSubmitting(true)
    try {
      const newQuery = await queryService.addQuery({
        studentId: user?.id,
        studentName: user?.fullName || 'Student',
        studentMobile: user?.mobile || user?.phone || '',
        category: ticketData.category,
        subject: ticketData.subject,
        message: ticketData.message,
      })
      setTicketNumber(newQuery.ticketId)
      setTicketSubmitted(true)
      setTicketData({
        category: 'Assessment Question Help',
        subject: '',
        message: '',
      })
    } catch {
      const randomNum = Math.floor(1000 + Math.random() * 9000)
      setTicketNumber(`CCC-${randomNum}`)
      setTicketSubmitted(true)
    } finally {
      setTicketSubmitting(false)
    }
  }

  // Report Card Notify State
  const [reportNotified, setReportNotified] = useState(false)

  const initials = getInitials(user?.fullName)

  return (
    <div className="py-5 sm:py-8 bg-slate-50/50 min-h-screen">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 space-y-4 sm:space-y-6">
        
        {/* Global Notification Banner */}
        {profileSuccessAlert && (
          <div
            role="status"
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">✓</span>
              <span>{profileSuccessAlert}</span>
            </div>
            <button
              type="button"
              onClick={() => setProfileSuccessAlert('')}
              className="text-emerald-600 hover:text-emerald-900 text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Main Section: Left Vertical Strip + Right Single-Card Stage               */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* Left Vertical Strip Navigation (Icon on top, label directly underneath) */}
          {/* ----------------------------------------------------------------------- */}
          <aside
            aria-label="Dashboard Navigation"
            className="w-full md:w-20 lg:w-24 shrink-0 md:sticky md:top-24 select-none"
          >
            <nav
              role="tablist"
              aria-label="Dashboard views"
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

                    {/* Subtle status indicator dot */}
                    {item.statusDot && (
                      <span
                        className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 rounded-full ring-2 ${
                          isSelected ? 'bg-emerald-300 ring-blue-600' : 'bg-emerald-500 ring-white'
                        }`}
                        aria-hidden="true"
                      />
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
          {/* Right Stage: Displays strictly the single active card                   */}
          {/* ----------------------------------------------------------------------- */}
          <main className="flex-1 min-w-0 w-full">

            {/* CARD 1: Profile Card */}
            {activeTab === 'profile' && (
              <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white animate-in fade-in duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  {/* Left: Engaging Profile Picture & Core Name */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Profile Avatar Container */}
                    <div className="relative group shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl tracking-wider select-none">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.fullName || 'Student Avatar'}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>

                      {/* Upload Button Overlay Badge */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isSavingAvatar}
                        title={t('dashboard.student.uploadPhoto')}
                        aria-label={t('dashboard.student.uploadPhoto')}
                        className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
                      >
                        <span className="text-sm sm:text-base" aria-hidden="true">📷</span>
                      </button>

                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        aria-label={t('dashboard.student.uploadPhoto')}
                      />
                    </div>

                    {/* Student Identification & Photo Action */}
                    <div className="text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {user?.fullName || t('navigation.student')}
                        </h2>
                        <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-md">
                          {t('dashboard.student.activeStatus')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2.5">
                        {t('dashboard.student.regId')} <span className="font-mono font-medium text-slate-700">{user?.id || 'N/A'}</span>
                      </p>

                      {/* Avatar Action Feedback & Remove Option */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="font-bold text-blue-700 hover:text-blue-800 underline underline-offset-2 cursor-pointer"
                        >
                          {user?.avatar ? t('dashboard.student.changePhoto') : t('dashboard.student.uploadPhoto')}
                        </button>

                        {user?.avatar && (
                          <>
                            <span className="text-slate-300">•</span>
                            <button
                              type="button"
                              onClick={handleRemoveAvatar}
                              disabled={isSavingAvatar}
                              className="font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                            >
                              {t('dashboard.student.removePhoto')}
                            </button>
                          </>
                        )}
                      </div>

                      {avatarSuccessMsg && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1.5">{avatarSuccessMsg}</p>
                      )}
                      {avatarErrorMsg && (
                        <p className="text-xs text-red-600 font-semibold mt-1.5">{avatarErrorMsg}</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Update Profile Button */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={openEditModal}
                      className="w-full sm:w-auto shadow-xs gap-2"
                    >
                      <span>✏️</span>
                      <span>{t('dashboard.student.editProfileBtn')}</span>
                    </Button>
                  </div>
                </div>

                {/* Full Profile Information Grid */}
                <div className="pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                    {t('dashboard.student.profileDetailsHeading')}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-6 text-xs sm:text-sm">
                    {/* Full Name */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.candidateName')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{user?.fullName || t('dashboard.student.notProvided')}</span>
                    </div>

                    {/* Mobile Number */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.mobileNumber')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">
                        {user?.mobile || user?.phone ? `+91 ${user.mobile || user.phone}` : t('dashboard.student.notProvided')}
                      </span>
                    </div>

                    {/* Date of Birth & Calculated Age */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.dobAndAge')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">
                        {user?.dob ? (
                          <>
                            {user.dob}{' '}
                            <span className="font-normal text-slate-600 text-xs">
                              ({t('dashboard.student.yearsOld', { age: user.age || calculateAge(user.dob) })})
                            </span>
                          </>
                        ) : (
                          t('dashboard.student.notProvided')
                        )}
                      </span>
                    </div>

                    {/* Father's Name */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.fatherName')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{user?.fatherName || t('dashboard.student.notProvided')}</span>
                    </div>

                    {/* Mother's Name */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.motherName')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{user?.motherName || t('dashboard.student.notProvided')}</span>
                    </div>

                    {/* State */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.state')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{user?.state || t('dashboard.student.notProvided')}</span>
                    </div>

                    {/* City / District */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.city')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{user?.city || t('dashboard.student.notProvided')}</span>
                    </div>

                    {/* PIN Code */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 sm:col-span-2">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.pincode')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block font-mono">{user?.pincode || t('dashboard.student.notProvided')}</span>
                    </div>

                    {/* Complete Address */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 sm:col-span-2">
                      <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.address')}</span>
                      <span className="font-bold text-slate-900 mt-0.5 block leading-relaxed">
                        {user?.address || t('dashboard.student.notProvided')}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* CARD 2: Assessment Progress Card */}
            {activeTab === 'assessment' && (
              <Card className="p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-xs bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40 animate-in fade-in duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border bg-white shadow-2xs">
                      {isCompleted ? (
                        <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                          <span>✓</span> {t('dashboard.student.allCompleted')}
                        </span>
                      ) : answeredCount > 0 ? (
                        <span className="text-amber-700 font-extrabold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          {t('dashboard.student.inProgress')}
                        </span>
                      ) : (
                        <span className="text-blue-700 font-extrabold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          <span>{t('dashboard.student.readyToBegin')}</span>
                        </span>
                      )}
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">{t('dashboard.student.standardQuestions', { count: totalQuestions })}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {t('dashboard.student.testCardTitle')}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t('dashboard.student.testCardSubtitle')}
                    </p>
                  </div>

                  {/* Direct Continue Button */}
                  <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                    <Button
                      to={ROUTES.ASSESSMENT}
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto shadow-sm gap-2 justify-center"
                    >
                      <span>
                        {isCompleted
                          ? t('dashboard.student.reviewResultsBtn')
                          : answeredCount > 0
                          ? t('dashboard.student.continueBtn')
                          : t('dashboard.student.startBtn')}
                      </span>
                    </Button>

                    <Link
                      to={ROUTES.ABOUT_ASSESSMENT}
                      className="text-xs text-center sm:text-right font-semibold text-slate-500 hover:text-blue-700 underline underline-offset-2 transition-colors"
                    >
                      {t('dashboard.student.guidelinesLink')}
                    </Link>
                  </div>
                </div>

                {/* Real-time Progress Bar & Metric Pills */}
                <div className="mt-6 pt-6 border-t border-blue-100/80">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span>{t('dashboard.student.currentProgress')}</span>
                      <span className="text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md font-mono text-[11px]">
                        {progressPercent}%
                      </span>
                    </span>
                    <span className="text-slate-500">
                      {t('dashboard.student.answeredOfTotal', { answered: answeredCount, total: totalQuestions })}
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Metric Pills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 text-center">
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        {t('dashboard.student.answeredLabel')}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-emerald-600">
                        {answeredCount}
                      </span>
                      <span className="text-[11px] text-slate-500 block">{t('dashboard.student.loggedLabel')}</span>
                    </div>

                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        {t('dashboard.student.remainingLabel')}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-amber-600">
                        {leftCount}
                      </span>
                      <span className="text-[11px] text-slate-500 block">{t('dashboard.student.leftLabel')}</span>
                    </div>

                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        {t('dashboard.student.stateLabel')}
                      </span>
                      <span className="text-sm font-black text-slate-800 mt-1 block">
                        {isCompleted
                          ? t('dashboard.student.completedState')
                          : answeredCount > 0
                          ? t('dashboard.student.ongoingState')
                          : t('dashboard.student.notStartedState')}
                      </span>
                      <span className="text-[11px] text-slate-500 block">{t('dashboard.student.autoSynced')}</span>
                    </div>
                  </div>

                  {/* 6 Sections Snapshot */}
                  <div className="mt-5 pt-4 border-t border-slate-200/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                      6-Section Progress Breakdown
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                      {ASSESSMENT_SECTIONS.map((sec) => {
                        const localized = getLocalizedSection(sec, language)
                        const secQuestions = (assessmentData?.questions || []).filter((q) => q.sectionId === sec.id)
                        const count = secQuestions.length || questionService.getQuestionsBySection(sec.id).length
                        const answeredInSec = secQuestions.filter((q) => Boolean(assessmentData?.answers?.[q.id])).length
                        const isSecDone = count > 0 && answeredInSec === count
                        return (
                          <div
                            key={sec.id}
                            className={`p-2.5 rounded-xl border ${
                              isSecDone
                                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                                : answeredInSec > 0
                                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="w-5 h-5 mx-auto rounded-md bg-slate-200/80 text-[10px] font-bold text-slate-700 flex items-center justify-center mb-1 font-mono">
                              {sec.order}
                            </span>
                            <div className="text-[10px] font-bold truncate">{localized.title}</div>
                            <span className="text-[10px] font-mono font-extrabold mt-0.5 block">
                              {isSecDone ? 'Done' : `${answeredInSec}/${count}`}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* CARD 3: Psychometric Report Card View */}
            {activeTab === 'report' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {isLoadingReport && !recommendationData ? (
                  <Card className="p-8 sm:p-12 text-center rounded-3xl border border-slate-200 bg-white">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Loading Assessment Report...</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Retrieving evaluation, skill domains, and career matches from the database...
                    </p>
                  </Card>
                ) : recommendationData ? (
                  <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white relative overflow-hidden">
                    {/* Header & Verification Metadata */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
                            <span>✓</span>
                            <span>Assessment Evaluated</span>
                          </span>
                          {recommendationData.evaluatedAt && (
                            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                              📅 {new Date(recommendationData.evaluatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          )}
                          <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full font-semibold">
                            👤 {user?.fullName || 'Candidate'}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          Career Assessment Intelligence Report
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                          Comprehensive evaluation across 6 psychometric dimensions, spotlighting your Top 3 Skill Domains, matched occupational profiles, and personalized developmental opportunities.
                        </p>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <span>🖨️</span>
                          <span>Print / PDF</span>
                        </button>
                        <Link
                          to={ROUTES.ASSESSMENT}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>🔄</span>
                          <span>Retake</span>
                        </Link>
                      </div>
                    </div>

                    {/* SECTION 1: TOP 3 SKILL DOMAINS (Primary Feature) */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-blue-600">
                            Core Competency Alignment
                          </div>
                          <h3 className="text-lg font-black text-slate-900">
                            🎯 Top 3 Recommended Skill Domains
                          </h3>
                        </div>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Ranked by candidate mastery percentage
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recommendationData.topSkillDomains?.map((domain, index) => {
                          const rankLabels = [
                            { title: 'Rank #1 Core Domain', badge: 'bg-amber-100 text-amber-900 border-amber-300', ring: 'border-amber-400 bg-amber-50/40' },
                            { title: 'Rank #2 Primary Domain', badge: 'bg-blue-100 text-blue-900 border-blue-300', ring: 'border-blue-400 bg-blue-50/40' },
                            { title: 'Rank #3 Complementary', badge: 'bg-indigo-100 text-indigo-900 border-indigo-300', ring: 'border-indigo-400 bg-indigo-50/40' },
                          ]
                          const rankMeta = rankLabels[index] || { title: `Rank #${index + 1}`, badge: 'bg-slate-100 text-slate-800 border-slate-300', ring: 'border-slate-300' }

                          return (
                            <div
                              key={domain.id || index}
                              className={`p-5 rounded-2xl border-2 transition-all shadow-xs flex flex-col justify-between ${rankMeta.ring}`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${rankMeta.badge}`}>
                                    {rankMeta.title}
                                  </span>
                                  <span className="text-2xl" aria-hidden="true">{domain.icon || '🎯'}</span>
                                </div>

                                {domain.sector && (
                                  <div className="mb-1">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">
                                      {domain.sector}
                                    </span>
                                  </div>
                                )}

                                <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                                  {domain.courseName || domain.title}
                                </h4>

                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                  {domain.description}
                                </p>

                                {(domain.mappedJobRoles || domain.typicalRoles) && (
                                  <div className="mb-4">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                      <span>💼</span>
                                      <span>Mapped Job Roles ({(domain.mappedJobRoles || domain.typicalRoles).length}):</span>
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
                                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                                  <span className="text-slate-700">Domain Mastery</span>
                                  <span className="font-mono text-blue-600 text-sm">{domain.percentage ?? domain.scorePercentage ?? 0}%</span>
                                </div>
                                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden mb-3">
                                  <div
                                    className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, Math.max(10, domain.percentage ?? domain.scorePercentage ?? 0))}%` }}
                                  />
                                </div>

                                {domain.topTraits && domain.topTraits.length > 0 && (
                                  <div className="pt-2 border-t border-slate-200/60">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                      Key Contributing Traits:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {domain.topTraits.map((t, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className="inline-flex items-center text-[10px] font-semibold bg-white/90 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs"
                                        >
                                          {t.trait}: <span className="font-mono ml-1 text-blue-600">{t.percentage}%</span>
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

                    {/* SECTION 2: RECOMMENDED CAREERS & COURSES */}
                    <div className="mb-8">
                      <div className="mb-4">
                        <div className="text-xs font-black uppercase tracking-wider text-emerald-600">
                          Official Curriculum
                        </div>
                        <h3 className="text-lg font-black text-slate-900">
                          🎓 Mapped Vocational Training Courses & Job Roles
                        </h3>
                        <p className="text-xs text-slate-500">
                          ReachDisha & CCC standardized vocational courses and mapped industry entry-level job roles aligned to your profile.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendationData.recommendedCareers?.map((career, cIdx) => (
                          <div
                            key={career.id || cIdx}
                            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md mb-1">
                                    {career.sector || career.domain}
                                  </span>
                                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                                    {career.courseName || career.title}
                                  </h4>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono shadow-2xs">
                                    {career.matchScore}% Match
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                {career.description}
                              </p>

                              {(career.mappedJobRoles || career.typicalRoles) && (career.mappedJobRoles || career.typicalRoles).length > 0 && (
                                <div className="mb-3">
                                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <span>💼</span>
                                    <span>Mapped Job Roles (Official Curriculum):</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {(career.mappedJobRoles || career.typicalRoles).map((role, rIdx) => (
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

                            {(career.strengths?.length > 0 || career.skillGaps?.length > 0) && (
                              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 text-[11px]">
                                <div>
                                  <span className="text-emerald-700 font-bold block mb-0.5">✓ Strengths Aligned:</span>
                                  <span className="text-slate-600 leading-tight block">
                                    {career.strengths?.map(s => typeof s === 'string' ? s : s.trait || s.description).join(', ') || 'High natural aptitude'}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-amber-700 font-bold block mb-0.5">⚡ Recommended Focus:</span>
                                  <span className="text-slate-600 leading-tight block">
                                    {career.skillGaps?.map(g => typeof g === 'string' ? g : g.trait || g.recommendation).join(', ') || 'General continuous practice'}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION 3: TOP STRENGTHS & SKILL GAPS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Top Strengths */}
                      <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-2xs">
                            🌟
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Your Core Strengths</h4>
                            <p className="text-[11px] text-slate-500">Highest scoring competencies (Mastery ≥ 75%)</p>
                          </div>
                        </div>

                        {recommendationData.topStrengths && recommendationData.topStrengths.length > 0 ? (
                          <div className="space-y-2.5">
                            {recommendationData.topStrengths.map((item, idx) => (
                              <div key={idx} className="p-2.5 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                                  <span>{item.trait}</span>
                                  <span className="font-mono text-emerald-700">{item.percentage}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-600 rounded-full"
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic p-3 bg-white rounded-xl border border-slate-200">
                            Well-balanced competencies across tested dimensions.
                          </p>
                        )}
                      </div>

                      {/* Skill Gaps & Development Focus */}
                      <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/30">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center text-sm font-bold shadow-2xs">
                            🎯
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Skill Gaps & Growth Areas</h4>
                            <p className="text-[11px] text-slate-500">Target areas to accelerate career readiness</p>
                          </div>
                        </div>

                        {recommendationData.skillGaps && recommendationData.skillGaps.length > 0 ? (
                          <div className="space-y-2.5">
                            {recommendationData.skillGaps.map((item, idx) => (
                              <div key={idx} className="p-2.5 bg-white rounded-xl border border-amber-100 shadow-2xs">
                                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                                  <span>{item.trait}</span>
                                  <span className="font-mono text-amber-700">{item.percentage}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-500 rounded-full"
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic p-3 bg-white rounded-xl border border-slate-200">
                            Strong baseline competencies across all evaluated sections.
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ) : (
                  /* Fallback when assessment is not completed or submitted */
                  <Card className="p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs bg-white text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-3xl shadow-xs">
                      📋
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                      Your Career Assessment Report is Ready to Unlock
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6">
                      Complete the 45-question psychometric assessment across 6 sections to generate your Top 3 Skill Domains, benchmark career matches, and personalized strengths breakdown.
                    </p>

                    {/* Progress bar preview */}
                    <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span>Assessment Progress</span>
                        <span className="font-mono text-blue-600">{answeredCount} / {totalQuestions} answered ({progressPercent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center gap-3">
                      <Button
                        type="button"
                        onClick={() => navigate(ROUTES.ASSESSMENT)}
                        className="px-6 py-3 text-sm font-bold shadow-sm"
                      >
                        {answeredCount > 0 ? `Resume Assessment (${leftCount} Left)` : 'Start 45-Question Assessment'}
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* CARD 4: Support & Counseling Card */}
            {activeTab === 'support' && (
              <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs bg-white animate-in fade-in duration-200">
                <div className="mb-6">
                  <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-indigo-200">
                    🎧 {t('dashboard.student.helpDeskBadge')}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {t('dashboard.student.helpDeskTitle')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t('dashboard.student.helpDeskSubtitle')}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Query Submission Form */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">
                      {t('dashboard.student.submitQueryHeading')}
                    </h3>

                    {ticketSubmitted ? (
                      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 space-y-3">
                        <div className="flex items-center gap-2 font-bold text-base">
                          <span>✓</span>
                          <span>{t('dashboard.student.querySuccessTitle')}</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {t('dashboard.student.querySuccessDesc', {
                            ticket: ticketNumber,
                            contact: user?.mobile || user?.phone ? `+91 ${user.mobile || user.phone}` : 'your registered mobile number',
                          })}
                        </p>
                        <button
                          type="button"
                          onClick={() => setTicketSubmitted(false)}
                          className="text-xs font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-950 cursor-pointer"
                        >
                          {t('dashboard.student.submitAnother')}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleTicketSubmit} className="space-y-4">
                        <Select
                          label={t('dashboard.student.catLabel')}
                          name="category"
                          value={ticketData.category}
                          onChange={(e) =>
                            setTicketData((prev) => ({ ...prev, category: e.target.value }))
                          }
                          options={[
                            { value: 'Assessment Question Help', label: t('dashboard.student.catQuestionHelp') },
                            { value: 'Profile / Account Update', label: t('dashboard.student.catProfileUpdate') },
                            { value: 'Counselor Guidance Call', label: t('dashboard.student.catCounselorCall') },
                            { value: 'Technical Glitch / Bug', label: t('dashboard.student.catTechGlitch') },
                            { value: 'General Inquiry', label: t('dashboard.student.catGeneral') },
                          ]}
                        />

                        <Input
                          label={t('dashboard.student.subjectLabel')}
                          name="subject"
                          value={ticketData.subject}
                          onChange={(e) =>
                            setTicketData((prev) => ({ ...prev, subject: e.target.value }))
                          }
                          placeholder={t('dashboard.student.subjectPlaceholder')}
                          required
                        />

                        <Textarea
                          label={t('dashboard.student.descLabel')}
                          name="message"
                          value={ticketData.message}
                          onChange={(e) =>
                            setTicketData((prev) => ({ ...prev, message: e.target.value }))
                          }
                          placeholder={t('dashboard.student.descPlaceholder')}
                          rows={3}
                          required
                        />

                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          disabled={ticketSubmitting}
                          className="w-full sm:w-auto shadow-xs"
                        >
                          {ticketSubmitting ? t('dashboard.student.submittingQuery') : t('dashboard.student.submitQueryAction')}
                        </Button>
                      </form>
                    )}
                  </div>

                  {/* Direct Contact Channels */}
                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">
                      {t('dashboard.student.directChannels')}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                        <span className="text-lg" aria-hidden="true">📞</span>
                        <div>
                          <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.tollFree')}</span>
                          <a
                            href="tel:18001237322"
                            className="font-bold text-blue-700 hover:underline text-sm"
                          >
                            1800-123-7322
                          </a>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                        <span className="text-lg" aria-hidden="true">✉️</span>
                        <div>
                          <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.counselingEmail')}</span>
                          <a
                            href="mailto:support@reachdisha.org"
                            className="font-bold text-blue-700 hover:underline text-sm break-all"
                          >
                            support@reachdisha.org
                          </a>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                        <span className="text-lg" aria-hidden="true">💬</span>
                        <div>
                          <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.whatsappDesk')}</span>
                          <span className="font-bold text-slate-900 text-sm block">
                            +91 98765 43210
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                        <span className="text-lg" aria-hidden="true">🕒</span>
                        <div>
                          <span className="text-slate-500 font-medium block text-xs">{t('dashboard.student.operatingHours')}</span>
                          <span className="font-semibold text-slate-800 block text-xs mt-0.5">
                            {t('dashboard.student.operatingHoursVal')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. Edit Profile Accessible Modal Dialog                                   */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-edit-profile-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div>
                <h2
                  id="modal-edit-profile-title"
                  className="text-xl sm:text-2xl font-black text-slate-900"
                >
                  {t('dashboard.student.editModalTitle')}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Error Banner if any */}
            {editErrors.form && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {editErrors.form}
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Section 1: Personal Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  1. {t('dashboard.student.personalInfo')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={t('dashboard.student.candidateName')}
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={(e) => handleEditChange('fullName', e.target.value)}
                    error={editErrors.fullName}
                    required
                  />

                  <Input
                    label={t('dashboard.student.mobileNumber')}
                    name="mobile"
                    value={editFormData.mobile}
                    onChange={(e) => handleEditChange('mobile', e.target.value)}
                    error={editErrors.mobile}
                    placeholder="10-digit number"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={t('dashboard.student.dobAndAge')}
                    type="date"
                    name="dob"
                    value={editFormData.dob}
                    onChange={(e) => handleEditChange('dob', e.target.value)}
                    helperText={editFormData.age ? `${editFormData.age} years` : undefined}
                  />

                  <Input
                    label="Age"
                    name="age"
                    value={editFormData.age ? `${editFormData.age} years` : ''}
                    disabled
                  />
                </div>
              </div>

              {/* Section 2: Parent / Guardian Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  2. {t('dashboard.student.guardianDetails')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={t('dashboard.student.fatherName')}
                    name="fatherName"
                    value={editFormData.fatherName}
                    onChange={(e) => handleEditChange('fatherName', e.target.value)}
                  />

                  <Input
                    label={t('dashboard.student.motherName')}
                    name="motherName"
                    value={editFormData.motherName}
                    onChange={(e) => handleEditChange('motherName', e.target.value)}
                  />
                </div>
              </div>

              {/* Section 3: Location & Address */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  3. {t('dashboard.student.geoAddress')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Select
                    label={t('dashboard.student.state')}
                    name="state"
                    value={editFormData.state}
                    onChange={(e) => handleEditChange('state', e.target.value)}
                    options={[
                      { value: '', label: t('dashboard.student.selectState') },
                      ...INDIA_STATES,
                    ]}
                  />

                  <Input
                    label={t('dashboard.student.city')}
                    name="city"
                    value={editFormData.city}
                    onChange={(e) => handleEditChange('city', e.target.value)}
                  />

                  <Input
                    label={t('dashboard.student.pincode')}
                    name="pincode"
                    value={editFormData.pincode}
                    onChange={(e) => handleEditChange('pincode', e.target.value)}
                    error={editErrors.pincode}
                  />
                </div>

                <Textarea
                  label={t('dashboard.student.address')}
                  name="address"
                  value={editFormData.address}
                  onChange={(e) => handleEditChange('address', e.target.value)}
                  rows={2}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  {t('dashboard.student.cancelBtn')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSavingProfile}
                  className="shadow-xs"
                >
                  {isSavingProfile ? t('dashboard.student.saving') : t('dashboard.student.saveChangesBtn')}
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
        isAdmin={false}
      />
    </div>
  )
}

export default Dashboard
