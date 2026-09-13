import { useCallback, useSyncExternalStore } from 'react'

export const getAssessmentStorageKey = (userId) => `ccc_assessment_progress_${userId || 'guest'}`

/**
 * Reads any active (started but not completed) assessment from localStorage
 * @param {string} [userId]
 * @returns {Object|null}
 */
export function getActiveAssessment(userId) {
  try {
    if (userId) {
      const userRaw = localStorage.getItem(getAssessmentStorageKey(userId))
      if (userRaw) {
        const parsed = JSON.parse(userRaw)
        if (parsed?.isStarted && !parsed?.isCompleted) {
          return parsed
        }
      }
    }
    // Also check guest session
    const guestRaw = localStorage.getItem('ccc_assessment_progress_guest')
    if (guestRaw) {
      const parsed = JSON.parse(guestRaw)
      if (parsed?.isStarted && !parsed?.isCompleted) {
        return parsed
      }
    }
  } catch {
    // Ignore JSON parse errors or restricted localStorage
  }
  return null
}

/**
 * Triggers a cross-component notification that assessment state has changed
 */
export function notifyAssessmentUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ccc_assessment_updated'))
  }
}

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('focus', callback)
  window.addEventListener('ccc_assessment_updated', callback)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('focus', callback)
    window.removeEventListener('ccc_assessment_updated', callback)
  }
}

let lastKey = ''
let lastSnapshot = null

/**
 * Custom React Hook that returns real-time in-progress assessment metrics
 * @param {string} [userId]
 * @returns {{
 *   hasActiveAssessment: boolean,
 *   progress: Object|null,
 *   currentIndex: number,
 *   answeredCount: number,
 *   totalQuestions: number
 * }}
 */
export function useAssessmentProgress(userId) {
  const getSnapshot = useCallback(() => {
    const active = getActiveAssessment(userId)
    const key = `${userId || 'guest'}_${JSON.stringify(active)}`
    if (key !== lastKey) {
      lastKey = key
      lastSnapshot = active
    }
    return lastSnapshot
  }, [userId])

  const progress = useSyncExternalStore(subscribe, getSnapshot, () => null)

  const answers = progress?.answers || {}
  const answeredCount = Object.keys(answers).length
  const totalQuestions = progress?.totalQuestions || 26
  const currentIndex = progress?.currentIndex ?? 0
  const hasActiveAssessment = Boolean(progress?.isStarted && !progress?.isCompleted)

  return {
    hasActiveAssessment,
    progress,
    currentIndex,
    answeredCount,
    totalQuestions,
  }
}

export default useAssessmentProgress
