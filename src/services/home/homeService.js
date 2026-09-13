import { PLACEMENT_PARTNERS } from '@/data/mock/placementPartners'
import { STUDENT_STORIES } from '@/data/mock/students'

const STORAGE_PARTNERS_KEY = 'ccc_placement_partners'
const STORAGE_STORIES_KEY = 'ccc_student_stories'

function getStoredPartners() {
  try {
    const raw = localStorage.getItem(STORAGE_PARTNERS_KEY)
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
    localStorage.setItem(STORAGE_PARTNERS_KEY, JSON.stringify(PLACEMENT_PARTNERS))
  } catch {
    // Ignore
  }
  return [...PLACEMENT_PARTNERS]
}

function saveStoredPartners(partners) {
  try {
    localStorage.setItem(STORAGE_PARTNERS_KEY, JSON.stringify(partners))
  } catch {
    // Ignore
  }
}

function getStoredStories() {
  try {
    const raw = localStorage.getItem(STORAGE_STORIES_KEY)
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
    localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(STUDENT_STORIES))
  } catch {
    // Ignore
  }
  return [...STUDENT_STORIES]
}

function saveStoredStories(stories) {
  try {
    localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(stories))
  } catch {
    // Ignore
  }
}

/**
 * Home Domain Service
 * Abstracted API gateway for Homepage dynamic data (partners & testimonials).
 * Backed by localStorage with sync across student homepage and admin dashboard.
 */
export const homeService = {
  /**
   * Fetches placement partner organizations
   * @returns {Promise<Array>}
   */
  async getPlacementPartners() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredPartners())
      }, 50)
    })
  },

  /**
   * Adds a new placement partner organization
   * @param {Object} partnerData
   * @returns {Promise<Object>}
   */
  async addPlacementPartner({ name, sector, badge, roles, packageInfo, location }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStoredPartners()
        const newPartner = {
          id: `p-${Date.now()}`,
          name: name.trim(),
          sector: sector.trim(),
          badge: badge ? badge.trim() : 'Corporate Partner',
          roles: roles ? roles.trim() : 'Multiple Positions',
          packageInfo: packageInfo ? packageInfo.trim() : 'Competitive Market Standard',
          location: location ? location.trim() : 'Pan India',
          createdAt: new Date().toISOString(),
        }
        partners.push(newPartner)
        saveStoredPartners(partners)
        resolve(newPartner)
      }, 50)
    })
  },

  /**
   * Deletes a placement partner by ID
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async deletePlacementPartner(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStoredPartners()
        const filtered = partners.filter((p) => p.id !== id)
        saveStoredPartners(filtered)
        resolve(true)
      }, 50)
    })
  },

  /**
   * Fetches verified student success testimonials
   * @returns {Promise<Array>}
   */
  async getStudentStories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredStories())
      }, 50)
    })
  },

  /**
   * Adds a new student success story
   * @param {Object} storyData
   * @returns {Promise<Object>}
   */
  async addStudentStory({ name, role, company, batch, testimonial, color, bgClass }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stories = getStoredStories()
        const initials = name
          .trim()
          .split(/\s+/)
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()

        const newStory = {
          id: `s-${Date.now()}`,
          name: name.trim(),
          role: role.trim(),
          company: company.trim(),
          batch: batch ? String(batch).trim() : '2025',
          testimonial: testimonial.trim(),
          initials: initials || 'ST',
          color: color || '#1e40af',
          bgClass: bgClass || 'bg-blue-800',
          createdAt: new Date().toISOString(),
        }
        stories.push(newStory)
        saveStoredStories(stories)
        resolve(newStory)
      }, 50)
    })
  },

  /**
   * Deletes a student success story by ID
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async deleteStudentStory(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stories = getStoredStories()
        const filtered = stories.filter((s) => s.id !== id)
        saveStoredStories(filtered)
        resolve(true)
      }, 50)
    })
  },
}

export default homeService
