import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

/**
 * Custom hook to consume authentication context.
 * Throws an explicit error if accessed outside AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth
