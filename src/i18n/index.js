// English bundles
import enAboutAssessment from './locales/en/aboutAssessment.json'
import enAboutUs from './locales/en/aboutUs.json'
import enAssessment from './locales/en/assessment.json'
import enAuth from './locales/en/auth.json'
import enCareer from './locales/en/career.json'
import enCommon from './locales/en/common.json'
import enDashboard from './locales/en/dashboard.json'
import enHome from './locales/en/home.json'
import enNavigation from './locales/en/navigation.json'

// Hindi bundles
import hiAboutAssessment from './locales/hi/aboutAssessment.json'
import hiAboutUs from './locales/hi/aboutUs.json'
import hiAssessment from './locales/hi/assessment.json'
import hiAuth from './locales/hi/auth.json'
import hiCareer from './locales/hi/career.json'
import hiCommon from './locales/hi/common.json'
import hiDashboard from './locales/hi/dashboard.json'
import hiHome from './locales/hi/home.json'
import hiNavigation from './locales/hi/navigation.json'

// Bengali bundles
import bnAboutAssessment from './locales/bn/aboutAssessment.json'
import bnAboutUs from './locales/bn/aboutUs.json'
import bnAssessment from './locales/bn/assessment.json'
import bnAuth from './locales/bn/auth.json'
import bnCareer from './locales/bn/career.json'
import bnCommon from './locales/bn/common.json'
import bnDashboard from './locales/bn/dashboard.json'
import bnHome from './locales/bn/home.json'
import bnNavigation from './locales/bn/navigation.json'

export const SUPPORTED_LANGUAGES = Object.freeze([
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
])

export const DEFAULT_LANGUAGE = 'en'

const translations = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    home: enHome,
    aboutAssessment: enAboutAssessment,
    career: enCareer,
    aboutUs: enAboutUs,
    auth: enAuth,
    assessment: enAssessment,
    dashboard: enDashboard,
  },
  hi: {
    common: hiCommon,
    navigation: hiNavigation,
    home: hiHome,
    aboutAssessment: hiAboutAssessment,
    career: hiCareer,
    aboutUs: hiAboutUs,
    auth: hiAuth,
    assessment: hiAssessment,
    dashboard: hiDashboard,
  },
  bn: {
    common: bnCommon,
    navigation: bnNavigation,
    home: bnHome,
    aboutAssessment: bnAboutAssessment,
    career: bnCareer,
    aboutUs: bnAboutUs,
    auth: bnAuth,
    assessment: bnAssessment,
    dashboard: bnDashboard,
  },
}


/**
 * Resolves a dot-notation key (e.g., 'home.hero.title') for a given language.
 * Falls back to English if the key is missing in the target language.
 * Interpolates {{param}} tokens if params object is provided.
 */
export function getTranslation(language, key, params = {}) {
  const currentLang = translations[language] ? language : DEFAULT_LANGUAGE
  
  const resolve = (langCode) => {
    const parts = key.split('.')
    let current = translations[langCode]
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part]
      } else {
        return null
      }
    }
    return typeof current === 'string' ? current : null
  }

  let text = resolve(currentLang)
  if (text === null && currentLang !== DEFAULT_LANGUAGE) {
    text = resolve(DEFAULT_LANGUAGE)
  }
  if (text === null) {
    return key
  }

  // Parameter interpolation: replace {{var}} with params.var
  if (params && typeof params === 'object') {
    return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
      return acc.replaceAll(`{{${paramKey}}}`, String(paramValue))
    }, text)
  }

  return text
}
