import { forwardRef, useId, useState } from 'react'

/**
 * Accessible Form Input Component
 * Pure Tailwind CSS implementation meeting WCAG touch target (>=44px), with password toggle and error states.
 * Fully compatible with React Hook Form via forwardRef.
 */
export const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    required = false,
    autoComplete,
    disabled = false,
    className = '',
    ...rest
  },
  ref
) {
  const generatedId = useId()
  const inputId = `input-${generatedId}`
  const errorId = `error-${generatedId}`
  const helperId = `helper-${generatedId}`

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPasswordField = type === 'password'
  const computedType = isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-900 mb-1.5"
        >
          {label} {required && <span className="text-red-700">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={inputId}
          name={name}
          type={computedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [error ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          ref={ref}
          className={`w-full min-h-[44px] text-base text-slate-900 bg-white rounded-lg outline-none transition-all duration-150 ${
            isPasswordField ? 'py-2.5 pl-3.5 pr-11' : 'py-2.5 px-3.5'
          } ${
            error
              ? 'border-2 border-red-600 focus:ring-2 focus:ring-red-200'
              : 'border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
          } ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
          {...rest}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            className="absolute right-1 w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer text-lg text-slate-500 hover:text-slate-700 rounded transition-colors"
          >
            {isPasswordVisible ? '🙈' : '👁️'}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p id={helperId} className="text-sm text-slate-500 mt-1 mb-0">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-700 font-medium mt-1 mb-0">
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
