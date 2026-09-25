type CornersProps = {
  className?: string
  /** цвет уголков в tailwind-нотации, по умолчанию accent/50 */
  color?: string
}

/** Четыре уголка-метки по краям рамки — технический акцент блока. */
export function Corners({ className = '', color = 'border-accent/50' }: CornersProps) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`absolute left-0 top-0 h-3 w-3 border-l border-t ${color}`} />
      <span className={`absolute right-0 top-0 h-3 w-3 border-r border-t ${color}`} />
      <span className={`absolute bottom-0 left-0 h-3 w-3 border-b border-l ${color}`} />
      <span className={`absolute bottom-0 right-0 h-3 w-3 border-b border-r ${color}`} />
    </span>
  )
}
