import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import INDIA_STATES from '@/constants/indiaStates'
import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'

// Helper: Real-time calculate age from YYYY-MM-DD
function calculateAge(dobString) {
  if (!dobString) return null
  const birth = new Date(dobString)
  if (isNaN(birth.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age >= 0 ? age : null
}

const registrationSchema = z
  .object({
    firstName: z.string().trim().min(2, 'First name is required (min 2 characters)'),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(2, 'Last name is required (min 2 characters)'),
    dob: z
      .string()
      .nonempty('Please enter your date of birth')
      .refine((val) => {
        const age = calculateAge(val)
        return age !== null && age >= 10 && age <= 100
      }, 'Age must be between 10 and 100 years'),
    mobile: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    fatherFirstName: z.string().trim().min(2, "Father's first name is required"),
    fatherMiddleName: z.string().trim().optional(),
    fatherLastName: z.string().trim().min(2, "Father's last name is required"),
    motherFirstName: z.string().trim().min(2, "Mother's first name is required"),
    motherMiddleName: z.string().trim().optional(),
    motherLastName: z.string().trim().min(2, "Mother's last name is required"),
    state: z.string().nonempty('Please select your state or union territory'),
    city: z.string().trim().min(2, 'City / District is required'),
    pincode: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit Indian PIN code'),
    address: z.string().trim().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const STEP_FIELDS = {
  1: ['firstName', 'middleName', 'lastName', 'dob', 'mobile'],
  2: [
    'fatherFirstName',
    'fatherMiddleName',
    'fatherLastName',
    'motherFirstName',
    'motherMiddleName',
    'motherLastName',
  ],
  3: ['state', 'city', 'pincode', 'address'],
  4: ['password', 'confirmPassword'],
}

export function Register() {
  const { t } = useTranslation()
  const { studentRegister } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || ROUTES.USER_DASHBOARD

  const [currentStep, setCurrentStep] = useState(1)
  const [generalError, setGeneralError] = useState('')

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      mobile: '',
      fatherFirstName: '',
      fatherMiddleName: '',
      fatherLastName: '',
      motherFirstName: '',
      motherMiddleName: '',
      motherLastName: '',
      state: '',
      city: '',
      pincode: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  })

  // Live Watched Values for auto-calculation and review cards
  const watchedDob = useWatch({ control, name: 'dob' })
  const watchedFirstName = useWatch({ control, name: 'firstName' })
  const watchedLastName = useWatch({ control, name: 'lastName' })
  const watchedMobile = useWatch({ control, name: 'mobile' })
  const watchedCity = useWatch({ control, name: 'city' })
  const watchedState = useWatch({ control, name: 'state' })

  // Real-time Age Calculation
  const calculatedAge = useMemo(() => calculateAge(watchedDob), [watchedDob])

  const handleNextStep = async () => {
    setGeneralError('')
    const fieldsToValidate = STEP_FIELDS[currentStep]
    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    setGeneralError('')
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  const onSubmit = async (data) => {
    setGeneralError('')
    try {
      const computedAge = calculateAge(data.dob)
      await studentRegister({
        ...data,
        age: computedAge ? String(computedAge) : '',
        fullName: [data.firstName, data.middleName, data.lastName].filter(Boolean).join(' '),
      })
      navigate(from, { replace: true })
    } catch (err) {
      setGeneralError(err.message || t('common.errorGeneric'))
    }
  }

  const stepTitles = [
    { num: 1, title: t('auth.step1Tab') },
    { num: 2, title: t('auth.step2Tab') },
    { num: 3, title: t('auth.step3Tab') },
    { num: 4, title: t('auth.step4Tab') },
  ]

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 border border-blue-100">
            <span>📝</span>
            <span>{t('auth.studentBadge')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('auth.registerTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t('auth.stepOf', { current: currentStep, total: 4 })}: {stepTitles[currentStep - 1].title}
          </p>
        </div>

        {/* Psychological Stepper Progress Bar */}
        <div className="mb-8" aria-label="Registration Progress">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {stepTitles.map((step) => {
              const isCompleted = currentStep > step.num
              const isCurrent = currentStep === step.num
              return (
                <div
                  key={step.num}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-blue-700'
                      : isCurrent
                        ? 'bg-blue-600'
                        : 'bg-slate-200'
                  }`}
                  title={step.title}
                />
              )
            })}
          </div>

          {/* Stepper Label Tabs */}
          <div className="hidden sm:grid grid-cols-4 gap-2 text-center text-xs">
            {stepTitles.map((step) => {
              const isCompleted = currentStep > step.num
              const isCurrent = currentStep === step.num
              return (
                <span
                  key={step.num}
                  className={`font-semibold transition-colors truncate ${
                    isCurrent
                      ? 'text-blue-700'
                      : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓ ' : ''}
                  {step.title}
                </span>
              )
            })}
          </div>
        </div>

        {/* Form Card Container */}
        <Card className="p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 bg-white">
          {generalError && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-xs sm:text-sm mb-6 font-medium"
            >
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* STEP 1: Student Identity & Contact */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h2 className="text-lg font-bold text-slate-900">{t('auth.step1Tab')}</h2>
                </div>

                {/* 3-Column Student Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label={t('auth.firstNameLabel')}
                    placeholder={t('auth.firstNamePlaceholder')}
                    error={errors.firstName?.message}
                    required
                    {...register('firstName')}
                  />
                  <Input
                    label={t('auth.middleNameLabel')}
                    placeholder={t('auth.middleNamePlaceholder')}
                    error={errors.middleName?.message}
                    {...register('middleName')}
                  />
                  <Input
                    label={t('auth.lastNameLabel')}
                    placeholder={t('auth.lastNamePlaceholder')}
                    error={errors.lastName?.message}
                    required
                    {...register('lastName')}
                  />
                </div>

                {/* Date of Birth & Live Calculated Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                  <div>
                    <Input
                      label={t('auth.dobLabel')}
                      type="date"
                      error={errors.dob?.message}
                      required
                      {...register('dob')}
                    />
                  </div>

                  <div className="pt-1 sm:pt-6">
                    <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[44px]">
                      <span className="text-base">🎂</span>
                      <div className="text-xs text-slate-600">
                        {calculatedAge !== null ? (
                          <span className="font-bold text-blue-700">
                            {t('auth.autoAgeBadge', { age: calculatedAge })}
                            <span className="ml-1.5 text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-semibold">
                              {t('auth.autoAgeLabel')}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">
                            Select DOB to calculate age
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Number Only */}
                <div>
                  <Input
                    label={t('auth.mobileLabel')}
                    type="tel"
                    maxLength={10}
                    placeholder={t('auth.mobilePlaceholder')}
                    helper={t('auth.mobileHint')}
                    error={errors.mobile?.message}
                    required
                    {...register('mobile')}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Parent / Guardian Details */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h2 className="text-lg font-bold text-slate-900">{t('auth.step2Tab')}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('auth.parentsHelperNote')}
                  </p>
                </div>

                {/* Father's Name Container */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800 mb-1">
                    <span>👨</span>
                    <span>{t('auth.fatherDetailsTitle')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label={t('auth.firstNameLabel')}
                      placeholder="e.g. Rajesh"
                      error={errors.fatherFirstName?.message}
                      required
                      {...register('fatherFirstName')}
                    />
                    <Input
                      label={t('auth.middleNameLabel')}
                      placeholder="e.g. Prasad"
                      error={errors.fatherMiddleName?.message}
                      {...register('fatherMiddleName')}
                    />
                    <Input
                      label={t('auth.lastNameLabel')}
                      placeholder="e.g. Sharma"
                      error={errors.fatherLastName?.message}
                      required
                      {...register('fatherLastName')}
                    />
                  </div>
                </div>

                {/* Mother's Name Container */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800 mb-1">
                    <span>👩</span>
                    <span>{t('auth.motherDetailsTitle')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label={t('auth.firstNameLabel')}
                      placeholder="e.g. Sunita"
                      error={errors.motherFirstName?.message}
                      required
                      {...register('motherFirstName')}
                    />
                    <Input
                      label={t('auth.middleNameLabel')}
                      placeholder="e.g. Devi"
                      error={errors.motherMiddleName?.message}
                      {...register('motherMiddleName')}
                    />
                    <Input
                      label={t('auth.lastNameLabel')}
                      placeholder="e.g. Sharma"
                      error={errors.motherLastName?.message}
                      required
                      {...register('motherLastName')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Location & Address */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h2 className="text-lg font-bold text-slate-900">{t('auth.step3Tab')}</h2>
                </div>

                {/* State / UT Dropdown */}
                <Select
                  label={t('auth.stateLabel')}
                  placeholder={t('auth.statePlaceholder')}
                  options={INDIA_STATES}
                  error={errors.state?.message}
                  required
                  {...register('state')}
                />

                {/* City & PIN Code Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={t('auth.cityLabel')}
                    placeholder={t('auth.cityPlaceholder')}
                    error={errors.city?.message}
                    required
                    {...register('city')}
                  />
                  <Input
                    label={t('auth.pincodeLabel')}
                    maxLength={6}
                    placeholder={t('auth.pincodePlaceholder')}
                    error={errors.pincode?.message}
                    required
                    {...register('pincode')}
                  />
                </div>

                {/* Full Address */}
                <Textarea
                  label={t('auth.addressLabel')}
                  placeholder={t('auth.addressPlaceholder')}
                  rows={2}
                  error={errors.address?.message}
                  {...register('address')}
                />
              </div>
            )}

            {/* STEP 4: Security Credentials & Profile Review */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h2 className="text-lg font-bold text-slate-900">{t('auth.step4Tab')}</h2>
                </div>

                {/* Profile Summary Card */}
                <div className="p-4 bg-blue-50/50 border border-blue-200/80 rounded-xl space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-1.5">
                    <span>📋</span>
                    <span>{t('auth.summaryTitle')}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="font-semibold text-slate-500">{t('auth.summaryStudentName')}</span>{' '}
                      <span className="font-bold text-slate-900">
                        {[watchedFirstName, watchedLastName].filter(Boolean).join(' ') || '—'}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">{t('auth.summaryAge')}</span>{' '}
                      <span className="font-bold text-slate-900">
                        {calculatedAge !== null ? t('auth.autoAgeBadge', { age: calculatedAge }) : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">{t('auth.summaryMobile')}</span>{' '}
                      <span className="font-bold text-slate-900 font-mono">
                        {watchedMobile ? `+91 ${watchedMobile}` : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">{t('auth.summaryLocation')}</span>{' '}
                      <span className="font-bold text-slate-900">
                        {[watchedCity, watchedState].filter(Boolean).join(', ') || '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={t('auth.passwordLabel')}
                    type="password"
                    placeholder={t('auth.passwordPlaceholder')}
                    error={errors.password?.message}
                    required
                    {...register('password')}
                  />
                  <Input
                    label={t('auth.confirmPasswordLabel')}
                    type="password"
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    error={errors.confirmPassword?.message}
                    required
                    {...register('confirmPassword')}
                  />
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-3 mt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('auth.prevStepBtn')}
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {t('auth.nextStepBtn', { step: currentStep + 1 })}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-sm font-extrabold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? t('auth.submittingRegister') : t('auth.submitRegisterBtn')}
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* Existing Account Prompt */}
        <div className="text-center mt-6 text-xs sm:text-sm text-slate-600">
          <span>{t('auth.alreadyHaveAccount')} </span>
          <Link
            to={ROUTES.LOGIN}
            state={{ from: location.state?.from }}
            className="font-bold text-blue-700 hover:text-blue-800 hover:underline ml-1"
          >
            {t('auth.signInHere')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
