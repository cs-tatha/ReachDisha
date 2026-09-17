import { ASSESSMENT_QUESTIONS, ASSESSMENT_SECTIONS } from '@/constants/assessmentQuestions'
import { authService } from '@/services/auth/authService'

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (import.meta.env.PROD) {
    return 'https://reachdisha-production.up.railway.app/api'
  }
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    return `http://${window.location.hostname}:3000/api`
  }
  return 'http://localhost:3000/api'
}

const API_BASE_URL = getApiBaseUrl()

// In-memory cache synchronized with the database
let cachedQuestions = [...ASSESSMENT_QUESTIONS]

export const questionService = {
  /**
   * Returns the master list of 6 assessment sections
   * @returns {Array}
   */
  getSectionMetadata() {
    return ASSESSMENT_SECTIONS
  },

  /**
   * Returns the cached questions dataset ordered by section
   * @returns {Array}
   */
  getAllQuestions() {
    const sectionOrderMap = ASSESSMENT_SECTIONS.reduce((acc, sec, idx) => {
      acc[sec.id] = idx
      return acc
    }, {})

    return cachedQuestions.sort((a, b) => {
      const orderA = sectionOrderMap[a.sectionId] ?? 99
      const orderB = sectionOrderMap[b.sectionId] ?? 99
      if (orderA !== orderB) return orderA - orderB
      return (a.id || 0) - (b.id || 0)
    })
  },

  /**
   * Returns dynamic section objects with live question counts and questions
   */
  getSections() {
    const allQuestions = this.getAllQuestions()

    return ASSESSMENT_SECTIONS.map((sec) => {
      const sectionQuestions = allQuestions.filter((q) => q.sectionId === sec.id)
      return {
        ...sec,
        questionCount: sectionQuestions.length,
        questions: sectionQuestions,
      }
    })
  },

  /**
   * Returns questions belonging to a specific section (e.g. 'aptitude')
   * @param {string} sectionId
   * @returns {Array}
   */
  getQuestionsBySection(sectionId) {
    const allQuestions = this.getAllQuestions()
    if (!sectionId || sectionId === 'all') return allQuestions
    return allQuestions.filter((q) => q.sectionId === sectionId)
  },

  /**
   * Directly fetches questions from MySQL via Express API.
   * If a sectionId (e.g., 'aptitude') is provided, ONLY that section's questions are fetched from the database.
   * @param {string} [sectionId]
   * @returns {Promise<Array>}
   */
  async fetchAssessmentQuestions(sectionId = '') {
    try {
      const query = sectionId ? `?section=${encodeURIComponent(sectionId)}` : ''
      const response = await fetch(`${API_BASE_URL}/questions${query}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch questions from database (HTTP ${response.status})`)
      }

      const res = await response.json()
      const fetched = res.data || []

      if (fetched.length > 0) {
        if (!sectionId || sectionId === 'all') {
          cachedQuestions = fetched
        } else {
          // Update cached questions for this section
          cachedQuestions = [
            ...cachedQuestions.filter((q) => q.sectionId !== sectionId),
            ...fetched,
          ]
        }
        return fetched
      }
    } catch (err) {
      console.warn('[QuestionService] Database fetch fallback to local constants:', err.message)
    }

    // Fallback if network/offline
    if (sectionId && sectionId !== 'all') {
      return this.getQuestionsBySection(sectionId)
    }
    return this.getAllQuestions()
  },

  /**
   * Returns total active questions count
   * @returns {number}
   */
  getTotalQuestions() {
    return this.getAllQuestions().length
  },

  /**
   * Adds a new question into MySQL via Express API
   * @param {Object} param0
   */
  async addQuestion({ sectionId = 'aptitude', category, question, options }) {
    const session = authService.getCurrentSession()
    const token = session?.accessToken || session?.token

    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ sectionId, category, question, options }),
    })

    const res = await response.json()
    if (!response.ok) {
      throw new Error(res.message || 'Failed to add question to database')
    }

    const created = res.data
    cachedQuestions.push(created)
    return created
  },

  /**
   * Deletes a question from MySQL
   * @param {number|string} id
   */
  async deleteQuestion(id) {
    const session = authService.getCurrentSession()
    const token = session?.accessToken || session?.token

    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (!response.ok) {
      const res = await response.json().catch(() => ({}))
      throw new Error(res.message || 'Failed to delete question from database')
    }

    cachedQuestions = cachedQuestions.filter((q) => String(q.id) !== String(id))
    return true
  },

  /**
   * Submits candidate answers to the Backend Career Recommendation Engine
   * Evaluates Top 3 Skill Domains, Strengths, Skill Gaps, and Career Recommendations
   * @param {Record<string, string>} answers
   */
  async submitAssessment(answers) {
    const session = authService.getCurrentSession()
    const token = session?.accessToken || session?.token

    const response = await fetch(`${API_BASE_URL}/assessment/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ answers }),
    })

    const res = await response.json()
    if (!response.ok) {
      throw new Error(res.message || 'Failed to submit assessment for evaluation')
    }

    return res.data
  },

  /**
   * Retrieves the latest assessment result for the authenticated user
   */
  async getLatestAssessmentResult() {
    const session = authService.getCurrentSession()
    const token = session?.accessToken || session?.token

    if (!token) return null

    const response = await fetch(`${API_BASE_URL}/assessment/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const res = await response.json()
    if (!response.ok) return null
    return res.data
  },
}

export default questionService
