/**
 * Accessible Card Container Component
 * Pure Tailwind CSS implementation with zero custom CSS or inline styles
 */
export function Card({
  children,
  as = 'div',
  className = '',
  padding = 'md', // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  ...rest
}) {
  const Component = as

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-8 sm:p-10',
  }

  const paddingClass = paddingClasses[padding] || paddingClasses.md

  return (
    <Component
      className={`bg-white rounded-2xl border border-slate-200 shadow-xs transition-all duration-150 ${paddingClass} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Card

