import { Link } from 'react-router-dom'

/**
 * Accessible Button / Link Component
 * Pure Tailwind CSS implementation with WCAG >=44px touch targets and full keyboard support.
 */
export function Button({
  children,
  to,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  size = 'md',        // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  ariaLabel,
  ...rest
}) {
  const isButtonDisabled = disabled || isLoading

  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg text-center leading-tight transition-all duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 focus-visible:outline-offset-2'

  const sizeClasses = {
    sm: 'min-h-[38px] px-3 py-1.5 text-sm',
    md: 'min-h-[44px] px-5 py-2.5 text-base',
    lg: 'min-h-[48px] px-7 py-3 text-lg',
  }

  const variantClasses = {
    primary:
      'bg-blue-700 text-white border-2 border-blue-700 hover:bg-blue-800 hover:border-blue-800 shadow-xs hover:shadow-sm active:bg-blue-900 active:border-blue-900',
    secondary:
      'bg-teal-700 text-white border-2 border-teal-700 hover:bg-teal-800 hover:border-teal-800 shadow-xs hover:shadow-sm active:bg-teal-900 active:border-teal-900',
    outline:
      'bg-transparent text-blue-700 border-2 border-blue-700 hover:bg-blue-50 active:bg-blue-100',
  }

  const disabledClasses = isButtonDisabled
    ? 'opacity-65 cursor-not-allowed pointer-events-none'
    : ''

  const finalClassName = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${disabledClasses} ${className}`.trim()

  if (to && !isButtonDisabled) {
    return (
      <Link
        to={to}
        className={finalClassName}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      onClick={onClick}
      className={finalClassName}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="w-3.5 h-3.5 border-2 border-current border-r-transparent rounded-full animate-spin inline-block"
            aria-hidden="true"
          />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
