import { useContext } from 'react'
import { LanguageContext } from '@/contexts/LanguageContext'

/**
 * Custom hook to consume language state and translation helper.
 * Throws helpful developer error if used outside LanguageProvider.
 */
export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}

export default useTranslation
