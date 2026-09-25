import { services } from '../config/site'
import type { SchematicKind } from '../config/site'
import { ArrowRight } from 'lucide-react'
import { Corners } from './ui/Corners'
import GradientText from './ui/GradientText'
import ParticleText from './ui/ParticleText'
import { Reveal } from './ui/Reveal'
import { Schematic } from './ui/schematics'

const FIG: Record<SchematicKind, string> = {
  website: 'WEBSITE SCHEMATIC',
  telegram: 'BOT SCHEMATIC',
  whatsapp: 'FLOW SCHEMATIC',
}

/* палитра градиентного текста: красный — ржавый — пурпурный — чёрный */
const SERVICE_GRADIENT = ['#ff0000', '#be3e19', '#b221de', '#000000']

export default function Services() {
  return (
    <section id="services" className="relative border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        {/* шапка секции: тот же паттерн, что в SectionHead, но заголовок — из частиц */}
        <div>
          <Reveal className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-accent">[02]</span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-muted">WHAT I BUILD</span>
            <span className="h-px flex-1 bg-line" />
            <span className="hidden font-mono text-[10px] tracking-[0.25em] text-faint sm:block">
              ERA/IT
            </span>
          </Reveal>
          <Reveal delay={90} className="mt-8">
            <h2 className="sr-only">Что я создаю</h2>
            <ParticleText
              text="Что я создаю"
              fontSize="clamp(2.6rem, 6vw, 5rem)"
              fontWeight={800}
              fontFamily="'Manrope', sans-serif"
              color="#ffffff"
              highlightColor="#afddff"
              particleSize={2}
              density={4}
              align="left"
              className="h-[clamp(5rem,_9.3vw,_7.8rem)]"
            />
          </Reveal>
        </div>

        <div className="mt-14 border-t border-line">
          {services.map((s, i) => (
            <Reveal
              key={s.id}
              className="grid items-center gap-10 border-b border-line py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.25em]">
                  <GradientText colors={SERVICE_GRADIENT} animationSpeed={8}>
                    {s.id} / {s.code}
                  </GradientText>
                </div>
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                  <GradientText colors={SERVICE_GRADIENT} animationSpeed={8}>
                    {s.title}
                  </GradientText>
                </h3>
                <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-muted md:text-base">
                  {s.description}
                </p>
                <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted">
                      <span className="h-1 w-1 shrink-0 bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#pricing"
                  className="mt-9 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
                >
                  <GradientText colors={SERVICE_GRADIENT} animationSpeed={6}>
                    Смотреть цены
                  </GradientText>
                  <ArrowRight size={14} className="text-fg" />
                </a>
              </div>

              <div
                className={`bg-grid-fine relative border border-line bg-panel p-6 transition-colors duration-500 hover:border-line-strong md:p-8 ${
                  i % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <Corners />
                <Schematic kind={s.schematic} />
                <div className="mt-4 flex justify-between font-mono text-[9px] tracking-[0.2em] text-faint">
                  <span>FIG.0{i + 1}</span>
                  <span>{FIG[s.schematic]}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
