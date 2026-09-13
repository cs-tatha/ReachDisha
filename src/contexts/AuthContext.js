import { createContext } from 'react'

/**
 * React Context instance for Authentication.
 * Isolated in pure JS module to comply with React Fast Refresh rules.
 */
export const AuthContext = createContext(null)

export default AuthContext
