import { processSteps, trust } from '../config/site'
import { Button } from './ui/Button'
import Ferrofluid from './ui/Ferrofluid'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import { useReveal } from '../hooks/useReveal'

/* палитра феррожидкости: красный — ржавый — пурпурный — белый */
const FERRO_COLORS = ['#ff0000', '#be3e19', '#b221de', '#ffffff']

export default function Process() {
  const lineRef = useReveal<HTMLDivElement>()

  return (
    <section id="process" className="relative overflow-hidden border-t border-line">
      {/* фон блока: WebGL-феррожидкость */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Ferrofluid
          colors={FERRO_COLORS}
          speed={0.25}
          scale={1.6}
          opacity={0.85}
          flowDirection="down"
        />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead index="05" label="PROCESS" title="Как проходит работа" />
            <Reveal delay={150}>
              <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-muted">
                Понятные шаги без сюрпризов: вы всегда знаете, на каком этапе проект и что
                происходит дальше.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Button href="#contact" variant="ghost" className="mt-8">
                Начать с заявки
              </Button>
            </Reveal>
          </div>

          <div ref={lineRef} className="relative">
            {/* базовая линия */}
            <span
              className="absolute bottom-3 left-[7px] top-3 w-px bg-line"
              aria-hidden="true"
            />
            {/* линия прогресса, отрисовывается при появлении */}
            <span
              className="pline absolute bottom-3 left-[7px] top-3 w-px bg-accent/70"
              aria-hidden="true"
            />

            {processSteps.map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 60}
                className="relative flex gap-6 pb-12 pl-10 last:pb-0 md:gap-10 md:pl-14"
              >
                <span
                  className="absolute left-0 top-1 h-[15px] w-[15px] border border-line-strong bg-bg"
                  aria-hidden="true"
                >
                  <span className="node-dot absolute inset-[3px] bg-accent" />
                </span>
                <div>
                  <span className="font-mono text-[11px] tracking-[0.25em] text-accent">
                    {s.id}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 06 — TRUST: почему можно доверять (в одном блоке с процессом) */}
        <div className="mt-28">
          <Reveal className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-accent">[06]</span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-muted">TRUST</span>
            <span className="h-px flex-1 bg-line" />
            <span className="hidden font-mono text-[10px] tracking-[0.25em] text-faint sm:block">
              ERA/IT
            </span>
          </Reveal>

          <div className="mt-12">
            {trust.lines.map((line, i) => (
              <Reveal
                key={line}
                delay={i * 90}
                className="group flex items-baseline gap-6 border-t border-line py-6 last:border-b md:gap-10 md:py-8"
              >
                <span className="font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-accent">
                  0{i + 1}
                </span>
                <span className="font-display text-[clamp(1.55rem,4vw,3.3rem)] font-extrabold leading-[1.05] tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent">
                  {line}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
            <Reveal>
              <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{trust.sub}</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-[46ch] border-l-2 border-accent/60 pl-5 text-sm leading-relaxed text-fg">
                {trust.note}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
