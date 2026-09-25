import type { MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg'
  external?: boolean
  className?: string
  children: ReactNode
}

const base =
  'inline-flex cursor-pointer select-none items-center justify-center gap-2.5 font-mono uppercase tracking-[0.16em] [transition-timing-function:var(--ease-swift)]'

const sizes = {
  md: 'px-5 py-3 text-[11px]',
  lg: 'px-7 py-4 text-xs',
}

const variants = {
  primary: 'bg-accent text-black transition-colors duration-300 hover:bg-white',
  ghost:
    'border border-line-strong text-fg transition-colors duration-300 hover:border-accent hover:text-accent',
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  children,
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
