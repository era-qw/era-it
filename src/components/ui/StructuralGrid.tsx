/* Структурная сетка hero: редкие полные линии + яркие кресты
   на пересечениях (декоративный слой, появляется каскадом). */

const VERTICALS = ['12.6%', '37.5%', '61.9%', '86.2%']
const HORIZONTALS = ['32.7%', '71.4%']

export function StructuralGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {VERTICALS.map((left, i) => (
        <span
          key={`v-${i}`}
          className="anim-grid-v absolute top-0 h-full w-px bg-white/[0.04]"
          style={{ left, animationDelay: `${600 + i * 100}ms` }}
        />
      ))}
      {HORIZONTALS.map((top, i) => (
        <span
          key={`h-${i}`}
          className="anim-grid-h absolute left-0 h-px w-full bg-white/[0.04]"
          style={{ top, animationDelay: `${800 + i * 150}ms` }}
        />
      ))}
      {HORIZONTALS.map((top, hi) =>
        VERTICALS.map((left, vi) => (
          <span
            key={`p-${hi}-${vi}`}
            className="anim-pop absolute hidden md:block"
            style={{ top, left, animationDelay: `${1000 + (hi * 4 + vi) * 80}ms` }}
          >
            <span className="absolute h-px w-[10px] -translate-x-1/2 -translate-y-1/2 bg-white/70" />
            <span className="absolute h-[10px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/70" />
          </span>
        )),
      )}
    </div>
  )
}
