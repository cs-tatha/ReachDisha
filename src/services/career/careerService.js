import { CAREER_CATEGORIES } from '@/data/mock/careerData'

/**
 * Career Domain Service
 * Abstracted API gateway for Career paths and roles.
 */
export const careerService = {
  /**
   * Fetches all career categories
   * @returns {Promise<Array>}
   */
  async getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...CAREER_CATEGORIES])
      }, 50)
    })
  },

  /**
   * Fetches single category by id with its job roles
   * @param {string} categoryId 
   * @returns {Promise<Object|null>}
   */
  async getCategoryById(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = CAREER_CATEGORIES.find((cat) => cat.id === categoryId)
        resolve(found ? { ...found } : null)
      }, 50)
    })
  },
}

export default careerService
