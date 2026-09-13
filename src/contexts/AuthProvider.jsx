import { useCallback, useMemo, useState } from 'react'
import { authService } from '@/services/auth/authService'
import { AuthContext } from './AuthContext'

/**
 * Authentication Provider
 * Manages global user state, role authorization, and session lifecycle.
 */
export function AuthProvider({ children }) {
  // Synchronously initialize session from storage to eliminate cascading renders
  const [user, setUser] = useState(() => {
    const session = authService.getCurrentSession()
    return session?.user || null
  })
  const [isLoading] = useState(false)


  const studentLogin = useCallback(async (credentials) => {
    const session = await authService.studentLogin(credentials)
    setUser(session.user)
    return session.user
  }, [])

  const studentRegister = useCallback(async (studentData) => {
    const session = await authService.studentRegister(studentData)
    setUser(session.user)
    return session.user
  }, [])

  const adminLogin = useCallback(async (credentials) => {
    const session = await authService.adminLogin(credentials)
    setUser(session.user)
    return session.user
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (updatedData) => {
    const updatedUser = await authService.updateUserProfile(updatedData)
    setUser(updatedUser)
    return updatedUser
  }, [])

  const value = useMemo(
    () => ({
      user,
      role: user?.role || null,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isStudent: user?.role === 'student',
      isLoading,
      studentLogin,
      studentRegister,
      adminLogin,
      logout,
      updateProfile,
    }),
    [user, isLoading, studentLogin, studentRegister, adminLogin, logout, updateProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
