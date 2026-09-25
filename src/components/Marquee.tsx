import { marquee } from '../config/site'

/** Бегущая строка-разделитель с ключевыми словами бренда. */
export default function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="marquee overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span
                key={i}
                className="flex items-center font-mono text-[11px] tracking-[0.3em] text-muted"
              >
                <span className="px-7">{item}</span>
                <span className="h-1 w-1 bg-accent/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
