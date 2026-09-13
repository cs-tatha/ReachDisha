import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getTranslation } from '@/i18n'
import { LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'ccc_preferred_language'

/**
 * Provider component for Language state.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && SUPPORTED_LANGUAGES.some(lang => lang.code === saved)) {
        return saved
      }
    } catch {
      // Ignore localStorage access errors (e.g. strict private browsing)
    }
    return DEFAULT_LANGUAGE
  })

  // Synchronize document lang attribute for screen-reader & accessibility tools
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((newLang) => {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === newLang)) {
      setLanguageState(newLang)
      try {
        localStorage.setItem(STORAGE_KEY, newLang)
      } catch {
        // Silently fallback if localStorage is quota exceeded or disabled
      }
    }
  }, [])

  const t = useCallback((key, params) => {
    return getTranslation(language, key, params)
  }, [language])

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES,
  }), [language, setLanguage, t])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
