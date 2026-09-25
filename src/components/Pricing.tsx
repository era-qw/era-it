import { botNote, botPackages, deliverables, deliverablesTitle, pricingNote, sitePackages } from '../config/site'
import type { Prefill } from '../config/site'
import { ArrowUpRight } from 'lucide-react'
import { Button } from './ui/Button'
import Particles from './ui/Particles'
import ShinyText from './ui/ShinyText'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'

type PricingProps = {
  onSelect: (prefill: Prefill) => void
}

export default function Pricing({ onSelect }: PricingProps) {
  return (
    <section id="pricing" className="relative border-t border-line">
      {/* фон блока: WebGL-частицы */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Particles particleColors={['#ffffff', '#ff0000', '#b221de', '#be3e19']} />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          index="03"
          label="PRICING"
          title={
            <ShinyText
              text="Сайт на любой вкус, а цену всегда можно договориться"
              color="#acabab"
              shineColor="#000000"
              speed={6}
            />
          }
        />

        {/* пакеты сайтов */}
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {sitePackages.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 90}
              variant="scale"
              className={`relative flex flex-col bg-bg p-7 transition-colors duration-500 hover:bg-panel md:p-9 ${
                p.popular ? 'shadow-[inset_0_1px_0_rgba(175,221,255,0.45)]' : ''
              }`}
            >
              {p.popular && (
                <>
                  <span className="absolute inset-x-0 top-0 h-px bg-accent" aria-hidden="true" />
                  <span className="absolute right-6 top-0 -translate-y-1/2 rounded-[3px] bg-accent px-2 py-1 font-mono text-[9px] tracking-[0.2em] text-black">
                    POPULAR
                  </span>
                </>
              )}

              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-faint">
                <span className={p.popular ? 'text-accent' : ''}>{p.id}</span>
                <span>0{i + 1} / WEBSITE</span>
              </div>

              <p className="mt-7 font-display text-[1.75rem] font-extrabold tracking-tight tabular-nums">
                {p.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.audience}</p>

              <ul className="mt-7 flex-1 border-t border-line">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 border-b border-line py-2.5 text-sm text-muted"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onSelect(p.prefill)}
                variant={p.popular ? 'primary' : 'ghost'}
                className="mt-8 w-full"
              >
                {p.cta}
              </Button>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-faint">
            // {pricingNote}
          </p>
        </Reveal>

        {/* пакеты чат-ботов */}
        <Reveal className="mt-24">
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] text-muted">
            <span className="text-accent">//</span>
            <span>ЧАТ-БОТЫ И АВТОМАТИЗАЦИЯ</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="mt-8 border-t border-line">
            {botPackages.map((b) => (
              <div
                key={b.id}
                className="group grid items-center gap-3 border-b border-line py-6 md:grid-cols-[1fr_1.4fr_auto_auto] md:gap-8"
              >
                <span className="font-display text-xl font-bold tracking-tight">{b.id}</span>
                <p className="text-sm leading-relaxed text-muted">{b.text}</p>
                <span className="font-display text-xl font-extrabold tracking-tight text-accent tabular-nums">
                  {b.price}
                </span>
                <button
                  type="button"
                  onClick={() => onSelect(b.prefill)}
                  className="inline-flex cursor-pointer items-center gap-2 justify-self-start font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-accent md:justify-self-end"
                >
                  Обсудить <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-faint">
            // {botNote}
          </p>
        </Reveal>

        {/* 04 — DELIVERABLES: что вы получаете (в одном блоке с ценами) */}
        <div className="mt-24">
          <Reveal className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-accent">[04]</span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-muted">
              DELIVERABLES
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="hidden font-mono text-[10px] tracking-[0.25em] text-faint sm:block">
              ERA/IT
            </span>
          </Reveal>
          <Reveal delay={90} className="mt-8">
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-[1.12] tracking-[-0.02em]">
              <ShinyText
                text={`${deliverablesTitle.line1} ${deliverablesTitle.line2}`}
                color="#acabab"
                shineColor="#000000"
                speed={6}
              />
            </h3>
          </Reveal>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <Reveal
                key={d.id}
                delay={i * 60}
                className="group relative bg-bg p-7 transition-colors duration-500 hover:bg-panel md:p-8"
              >
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em]">
                  <span className="text-accent">{d.id}</span>
                  <span className="text-faint transition-colors duration-300 group-hover:text-accent">
                    — {d.label}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">{d.text}</p>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 [transition-timing-function:var(--ease-swift)] group-hover:w-full"
                  aria-hidden="true"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
