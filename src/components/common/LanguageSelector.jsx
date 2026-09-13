import { useTranslation } from '@/hooks/useTranslation'

/**
 * Accessible, Minimalist Language Selector Component
 * Pure Tailwind CSS implementation with SVG globe icon and high-contrast focus rings.
 */
export function LanguageSelector({ id = 'language-select', className = '' }) {
  const { language, setLanguage, supportedLanguages, t } = useTranslation()

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <label htmlFor={id} className="sr-only">
        {t('navigation.language')}
      </label>

      <div className="relative inline-flex items-center">
        {/* Sleek SVG Globe Icon */}
        <span
          className="pointer-events-none absolute left-3 text-slate-600 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </span>

        {/* Minimalist Pill Select with High Readability */}
        <select
          id={id}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label={t('navigation.language')}
          className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-950 border border-slate-300 hover:border-slate-400 rounded-full pl-9 pr-8 py-2 min-h-[40px] text-sm font-bold cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent transition-all duration-150 shadow-2xs"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-slate-900 bg-white font-medium py-1">
              {lang.nativeLabel}
            </option>
          ))}
        </select>

        {/* Sleek Minimalist Chevron */}
        <span
          className="pointer-events-none absolute right-3 text-slate-600 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default LanguageSelector
