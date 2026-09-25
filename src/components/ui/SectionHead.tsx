import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadProps = {
  index: string
  label: string
  title: ReactNode
  className?: string
}

/** Единая шапка секции: [индекс] — LABEL — линия — Era/IT, затем крупный заголовок. */
export function SectionHead({ index, label, title, className = '' }: SectionHeadProps) {
  return (
    <div className={className}>
      <Reveal className="flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.25em] text-accent">[{index}]</span>
        <span className="font-mono text-[11px] tracking-[0.25em] text-muted">{label}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="hidden font-mono text-[10px] tracking-[0.25em] text-faint sm:block">
          ERA/IT
        </span>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-8 max-w-[24ch] font-display text-[clamp(1.85rem,4.2vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
          {title}
        </h2>
      </Reveal>
    </div>
  )
}
