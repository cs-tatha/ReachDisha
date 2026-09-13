/**
 * BrandLogo & BrandIcon Component
 * 
 * "Reach Disha" Brand Identity:
 * - Rich gradient squircle background (Blue to Indigo)
 * - Full-height perspective vertical road in crisp white
 * - True-perspective dashed lane markings leading straight forward
 * - Clean vector graphic with zero round/circular frames, embodying a clear, focused path forward
 */

export function BrandIcon({ className = 'w-9 h-9 sm:w-10 sm:h-10' }) {
  return (
    <div
      className={`${className} rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-[1.03] transition-transform duration-150 border border-blue-400/20`}
      aria-hidden="true"
    >
      <svg
        className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left Road Boundary (Perspective Highway Curb) */}
        <path d="M5 23L9.8 1.5" strokeWidth="2.2" />

        {/* Right Road Boundary (Perspective Highway Curb) */}
        <path d="M19 23L14.2 1.5" strokeWidth="2.2" />

        {/* Center Dashed Lane Markings (Receding into the Horizon) */}
        <path d="M12 22.5v-4" strokeWidth="2" />
        <path d="M12 15.2v-3.2" strokeWidth="1.9" />
        <path d="M12 8.8v-2.4" strokeWidth="1.7" />
        <path d="M12 3.8v-1.5" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export function BrandLogo({ showTagline = true, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <BrandIcon />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className="font-black text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 leading-tight">
            Reach <span className="text-blue-700">Disha</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[9.5px] sm:text-[11px] text-slate-500 font-medium tracking-tight leading-none mt-0.5 whitespace-nowrap">
            powered by <strong className="text-slate-700 font-semibold">Reach India Pvt. Ltd.</strong>
          </span>
        )}
      </div>
    </div>
  )
}

export default BrandLogo
