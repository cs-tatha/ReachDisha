import { forwardRef, useId } from 'react'

/**
 * Accessible Form Textarea Component
 * Pure Tailwind CSS implementation with clear focus rings and error messaging.
 * Fully compatible with React Hook Form via forwardRef.
 */
export const Textarea = forwardRef(function Textarea(
  {
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    required = false,
    disabled = false,
    rows = 3,
    className = '',
    ...rest
  },
  ref
) {
  const generatedId = useId()
  const textareaId = `textarea-${generatedId}`
  const errorId = `error-${generatedId}`
  const helperId = `helper-${generatedId}`

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-slate-900 mb-1.5"
        >
          {label} {required && <span className="text-red-700">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [error ? errorId : null, helperText ? helperId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        className={`w-full text-base text-slate-900 bg-white rounded-lg outline-none transition-all duration-150 py-2.5 px-3.5 resize-y ${
          error
            ? 'border-2 border-red-600 focus:ring-2 focus:ring-red-200'
            : 'border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
        } ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
        {...rest}
      />

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

export default Textarea
