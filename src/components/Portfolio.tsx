import { projects } from '../config/site'
import { ArrowUpRight } from 'lucide-react'
import { Corners } from './ui/Corners'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import { PlaceholderSchematic } from './ui/schematics'

export default function Portfolio() {
  return (
    <section id="work" className="relative border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead index="07" label="SELECTED WORK" title="Избранные работы" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => {
            const inner = (
              <>
                <Corners color="border-accent/0 transition-colors duration-500 group-hover:border-accent/50" />
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-faint">
                  <span className="text-muted">{p.id}</span>
                  {p.placeholder ? (
                    <span className="border border-line px-2 py-1 text-[9px] tracking-[0.2em]">
                      PLACEHOLDER
                    </span>
                  ) : (
                    <ArrowUpRight size={14} className="text-accent" />
                  )}
                </div>

                <div className="my-6 opacity-50 transition-opacity duration-500 group-hover:opacity-90">
                  <PlaceholderSchematic />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )

            const cls =
              'group relative flex min-h-[320px] flex-col justify-between border border-line bg-panel p-6 transition-colors duration-500 hover:border-accent/40'

            return (
              <Reveal key={p.id} delay={i * 80}>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cls} block h-full`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={`${cls} h-full`}>{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-faint">
            // Плейсхолдеры не являются клиентскими работами. Реальные кейсы добавляются в
            src/config/site.ts.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
