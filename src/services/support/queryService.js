/**
 * Student Query & Help Desk Support Service
 * Manages queries submitted by students from their dashboard and enables administrative resolution.
 * Backed by localStorage with seamless future REST API swap.
 */

const STORAGE_QUERIES_KEY = 'ccc_student_queries'

const SEED_QUERIES = [
  {
    id: 'qry-101',
    ticketId: 'CCC-7842',
    studentId: 'u-student-1',
    studentName: 'Pooja Verma',
    studentEmail: 'student@ccc.org',
    studentMobile: '9123456780',
    category: 'Assessment Question Help',
    subject: 'Clarification regarding question #6 technical choices',
    message: 'I wanted to ask whether choosing option B in question 6 affects the IT or BFSI recommendation weightage.',
    status: 'In Review', // 'Pending' | 'In Review' | 'Resolved'
    resolutionNotes: 'Senior counselor assigned. Reviewing response weighting algorithm.',
    createdAt: '2026-09-11T14:32:00.000Z',
  },
  {
    id: 'qry-102',
    ticketId: 'CCC-6519',
    studentId: 'u-student-2',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.s@example.com',
    studentMobile: '9876543211',
    category: 'Profile / Account Update',
    subject: 'Request to update permanent address and PIN code',
    message: 'I recently relocated to Pune for college and would like my student record updated with my new residential address.',
    status: 'Pending',
    resolutionNotes: '',
    createdAt: '2026-09-12T07:15:00.000Z',
  },
  {
    id: 'qry-103',
    ticketId: 'CCC-5421',
    studentId: 'u-student-3',
    studentName: 'Anjali Gupta',
    studentEmail: 'anjali.g@example.com',
    studentMobile: '9812345678',
    category: 'Counselor Guidance Call',
    subject: 'Booking 1-on-1 counseling appointment for career streams',
    message: 'I have finished 18 questions and would appreciate a 15-minute phone guidance session with an industry mentor.',
    status: 'Resolved',
    resolutionNotes: 'Mentor connected via phone on 11 Sep. Guided through banking & IT options.',
    createdAt: '2026-09-10T11:20:00.000Z',
  },
]

function getStoredQueries() {
  try {
    const raw = localStorage.getItem(STORAGE_QUERIES_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // Ignore error
  }
  try {
    localStorage.setItem(STORAGE_QUERIES_KEY, JSON.stringify(SEED_QUERIES))
  } catch {
    // Ignore
  }
  return [...SEED_QUERIES]
}

function saveStoredQueries(queries) {
  try {
    localStorage.setItem(STORAGE_QUERIES_KEY, JSON.stringify(queries))
  } catch {
    // Ignore
  }
}

export const queryService = {
  /**
   * Fetches all student queries
   * @returns {Array}
   */
  getQueries() {
    return getStoredQueries()
  },

  /**
   * Submits a new student query from Dashboard
   * @param {Object} queryData
   * @returns {Promise<Object>}
   */
  async addQuery({ studentId, studentName, studentEmail, studentMobile, category, subject, message }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const queries = getStoredQueries()
        const randomNum = Math.floor(1000 + Math.random() * 9000)
        const newTicket = {
          id: `qry-${Date.now()}`,
          ticketId: `CCC-${randomNum}`,
          studentId: studentId || 'guest',
          studentName: studentName || 'Student',
          studentEmail: studentEmail || 'N/A',
          studentMobile: studentMobile || 'N/A',
          category: category || 'General Inquiry',
          subject: subject.trim(),
          message: message.trim(),
          status: 'Pending',
          resolutionNotes: '',
          createdAt: new Date().toISOString(),
        }

        queries.unshift(newTicket)
        saveStoredQueries(queries)
        resolve(newTicket)
      }, 50)
    })
  },

  /**
   * Updates the status and resolution notes of an inquiry
   * @param {string} id
   * @param {string} status ('Pending' | 'In Review' | 'Resolved')
   * @param {string} resolutionNotes
   * @returns {Promise<Object>}
   */
  async updateQueryStatus(id, status, resolutionNotes = '') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const queries = getStoredQueries()
        const index = queries.findIndex((q) => q.id === id)
        if (index === -1) {
          return reject(new Error('Query ticket not found'))
        }

        queries[index] = {
          ...queries[index],
          status,
          resolutionNotes: resolutionNotes !== undefined ? resolutionNotes : queries[index].resolutionNotes,
          updatedAt: new Date().toISOString(),
        }

        saveStoredQueries(queries)
        resolve(queries[index])
      }, 50)
    })
  },

  /**
   * Deletes a query ticket
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async deleteQuery(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const queries = getStoredQueries()
        const filtered = queries.filter((q) => q.id !== id)
        saveStoredQueries(filtered)
        resolve(true)
      }, 50)
    })
  },
}

export default queryService
