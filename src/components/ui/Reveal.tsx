import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

type Variant = 'up' | 'fade' | 'left' | 'right' | 'scale'

type RevealProps = {
  variant?: Variant
  /** задержка старта анимации, мс (stagger внутри секции) */
  delay?: number
  className?: string
  children?: ReactNode
}

export function Reveal({ variant = 'up', delay = 0, className = '', children }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()
  const style = { '--rvd': `${delay}ms` } as CSSProperties
  return (
    <div ref={ref} className={`rv rv-${variant} ${className}`} style={style}>
      {children}
    </div>
  )
}
