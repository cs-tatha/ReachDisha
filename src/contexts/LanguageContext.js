import { createContext } from 'react'

/**
 * React Context instance for Language state.
 * Separated into pure JS file to satisfy React Fast Refresh.
 */
export const LanguageContext = createContext(null)

export default LanguageContext
