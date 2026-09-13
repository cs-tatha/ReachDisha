/**
 * Authentication Service (Production Connected)
 * Communicates with the Express + MySQL backend API.
 * Manages JWT Access and Refresh Tokens, session state, and automated token refreshes.
 * All fake/dummy mock users have been completely removed in favor of real database persistence.
 */

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (import.meta.env.PROD) {
    return '/api'
  }
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    return `http://${window.location.hostname}:3000/api`
  }
  return 'http://localhost:3000/api'
}

const API_BASE_URL = getApiBaseUrl()
const STORAGE_SESSION_KEY = 'ccc_auth_session'

/**
 * Low-level authenticated HTTP fetch wrapper
 * Automatically injects the JWT Bearer token and attempts token refresh on expiration.
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  // Inject current access token
  const session = authService.getCurrentSession()
  if (session?.accessToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${session.accessToken}`
  }

  let response = await fetch(url, {
    ...options,
    headers,
  })

  // Check if token expired and needs automatic refreshing
  if (response.status === 401 && session?.refreshToken) {
    try {
      const refreshed = await authService.refreshAccessToken()
      if (refreshed?.accessToken) {
        headers.Authorization = `Bearer ${refreshed.accessToken}`
        response = await fetch(url, {
          ...options,
          headers,
        })
      }
    } catch {
      // Refresh failed; force logout
      authService.logout()
    }
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMsg = data.message || data.error || `Request failed with status ${response.status}`
    const error = new Error(errorMsg)
    error.status = response.status
    error.details = data.errors
    throw error
  }

  return data
}

export const authService = {
  /**
   * Retrieves the current authenticated session from local persistence
   * @returns {Object|null}
   */
  getCurrentSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY)
      if (raw) {
        return JSON.parse(raw)
      }
    } catch {
      // Return null on parsing error
    }
    return null
  },

  /**
   * Logs in a student using mobile number or user ID via the backend
   * @param {Object} credentials
   * @returns {Promise<Object>}
   */
  async studentLogin({ identifier, mobile, phone, password }) {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier: identifier || mobile || phone, password }),
    })

    const { user, tokens } = res.data
    const session = {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      token: tokens.accessToken, // Backward compatibility with UI components
    }

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session))

      // Migrate guest assessment progress to this user account
      const guestRaw = localStorage.getItem('ccc_assessment_progress_guest')
      if (guestRaw && !localStorage.getItem(`ccc_assessment_progress_${user.id}`)) {
        localStorage.setItem(`ccc_assessment_progress_${user.id}`, guestRaw)
        localStorage.removeItem('ccc_assessment_progress_guest')
      }
    } catch {
      // Storage fallback
    }

    return session
  },

  /**
   * Registers a new student account in MySQL via the backend API
   * @param {Object} studentData
   * @returns {Promise<Object>}
   */
  async studentRegister(data) {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const { user, tokens } = res.data
    const session = {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      token: tokens.accessToken,
    }

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session))

      // Seamless migration of guest progress
      const guestRaw = localStorage.getItem('ccc_assessment_progress_guest')
      if (guestRaw && !localStorage.getItem(`ccc_assessment_progress_${user.id}`)) {
        localStorage.setItem(`ccc_assessment_progress_${user.id}`, guestRaw)
        localStorage.removeItem('ccc_assessment_progress_guest')
      }
    } catch {
      // Ignore
    }

    return session
  },

  /**
   * Dedicated Admin Login - authenticates admin against MySQL using mobile number or admin ID
   * @param {Object} credentials
   * @returns {Promise<Object>}
   */
  async adminLogin({ identifier, phone, mobile, password }) {
    const res = await apiFetch('/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify({ identifier: identifier || phone || mobile, password }),
    })

    const { user, tokens } = res.data
    const session = {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      token: tokens.accessToken,
    }

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session))
    } catch {
      // Continue
    }

    return session
  },

  /**
   * Refreshes the short-lived access token using the long-lived refresh token
   */
  async refreshAccessToken() {
    const session = this.getCurrentSession()
    if (!session?.refreshToken) {
      throw new Error('No refresh token available in session')
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Token refresh failed')
    }

    const { tokens, user } = data.data
    const updatedSession = {
      ...session,
      user: user || session.user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      token: tokens.accessToken,
    }

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updatedSession))
    } catch {
      // Ignore
    }

    return tokens
  },

  /**
   * Updates an existing user's profile in MySQL and synchronizes session storage
   * @param {Object} updatedData
   * @returns {Promise<Object>}
   */
  async updateUserProfile(updatedData) {
    const res = await apiFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    })

    const updatedUser = res.data
    const session = this.getCurrentSession()
    if (session) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          ...updatedUser,
        },
      }
      try {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updatedSession))
      } catch {
        // Ignore
      }
    }

    return updatedUser
  },

  /**
   * Retrieves paginated students directly from MySQL via the backend API
   * Implements load-balanced pagination (page, limit, search)
   * @param {Object} params
   * @returns {Promise<{ students: Array, pagination: Object }>}
   */
  async getPaginatedStudents({ page = 1, limit = 10, search = '' } = {}) {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search ? { search } : {}),
    })

    const res = await apiFetch(`/admin/students?${queryParams.toString()}`, {
      method: 'GET',
    })

    const rawStudents = res.data || []

    // Enrich with database assessment progress or fallback to localStorage
    const students = rawStudents.map((student) => {
      if (student.assessment && student.assessmentResult) {
        return student
      }

      let assessment = student.assessment || null
      if (!assessment) {
        try {
          const raw = localStorage.getItem(`ccc_assessment_progress_${student.id}`)
          if (raw) {
            assessment = JSON.parse(raw)
          }
        } catch {
          // Ignore
        }
      }

      let recommendation = student.assessmentResult || null
      if (!recommendation) {
        try {
          const recRaw = localStorage.getItem(`ccc_recommendation_${student.id}`)
          if (recRaw) {
            recommendation = JSON.parse(recRaw)
          }
        } catch {
          // Ignore
        }
      }

      const answeredCount = Object.keys(assessment?.answers || {}).length
      const totalQuestions = assessment?.totalQuestions || 45
      const isCompleted = Boolean(
        student.assessment?.isCompleted || recommendation || assessment?.isCompleted || (answeredCount >= totalQuestions && totalQuestions > 0)
      )

      let status = 'Not Started'
      if (isCompleted) {
        status = 'Completed'
      } else if (answeredCount > 0) {
        status = 'In Progress'
      }

      return {
        ...student,
        assessment: {
          answeredCount: isCompleted ? 45 : answeredCount,
          totalQuestions: 45,
          leftCount: Math.max(0, 45 - (isCompleted ? 45 : answeredCount)),
          percentage: isCompleted ? 100 : Math.round((answeredCount / 45) * 100),
          isCompleted,
          status,
          updatedAt: recommendation?.evaluatedAt || assessment?.updatedAt || student.createdAt || null,
        },
        assessmentResult: recommendation || student.assessmentResult || null,
      }
    })

    return {
      students,
      pagination: res.meta || {
        total: students.length,
        page,
        limit,
        totalPages: 1,
        hasMore: false,
      },
    }
  },

  /**
   * Retrieves full assessment evaluation report for a student
   * @param {string} userId
   */
  async getStudentAssessmentReport(userId) {
    const res = await apiFetch(`/admin/students/${userId}/assessment-report`)
    return res.data
  },

  /**
   * Retrieves registered students (first batch) for legacy components
   */
  async getAllStudents() {
    const { students } = await this.getPaginatedStudents({ page: 1, limit: 50 })
    return students
  },

  /**
   * Logs out the current user and clears session storage and backend token
   */
  async logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' })
    } catch {
      // Discard server error on logout
    } finally {
      try {
        localStorage.removeItem(STORAGE_SESSION_KEY)
      } catch {
        // Ignore
      }
    }
  },
}

export default authService
