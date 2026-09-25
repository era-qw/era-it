import { useEffect, useState } from 'react'
import { brand, hero } from '../config/site'
import { Button } from './ui/Button'
import FuzzyText from './ui/FuzzyText'
import { Reveal } from './ui/Reveal'
import { StructuralGrid } from './ui/StructuralGrid'
import TechText from './ui/TechText'
import { HeroSchematic } from './ui/schematics'

/* минимальный размер подобран так, чтобы строки помещались без переноса
   (canvas не переносит текст): на десктопе 3 длинные строки,
   на экранах <sm — 5 коротких строк покрупнее */
const HERO_FONT_SIZE = 'clamp(2.1rem, 7.2vw, 6.6rem)'
const HERO_FONT = "'Manrope', sans-serif"
/* каждая строка рисуется на canvas с внутренним полем fuzzRange + 20 = 50px слева */
const HERO_LINE_OFFSET = '-ml-[50px]'
const HERO_LINE_OVERLAP = 'sm:-mt-[clamp(0.2rem,0.7vw,0.85rem)]'
const HERO_LINES_DESKTOP = ['Сайты и автоматизация,', 'которые работают', 'на ваш бизнес.']
const HERO_LINES_MOBILE = ['Сайты и', 'автоматизация,', 'которые', 'работают', 'на ваш бизнес.']
const HERO_GRADIENT = ['#ffffff', '#afddff']

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 639px)')
  /* при изменении ширины окна canvas пересоздаётся с новым размером шрифта */
  const [fontKey, setFontKey] = useState(0)

  useEffect(() => {
    let timer: number | undefined
    const onResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setFontKey((k) => k + 1), 250)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(timer)
    }
  }, [])

  const lines = isMobile ? HERO_LINES_MOBILE : HERO_LINES_DESKTOP

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* фон: сетка + структурные линии + свечение + схема */}
      <div className="bg-grid grid-fade absolute inset-0" aria-hidden="true" />
      <StructuralGrid />
      <div
        className="glow-accent drift-slow absolute -right-40 top-1/4 h-[560px] w-[560px]"
        aria-hidden="true"
      />
      <div
        className="glow-accent absolute -left-52 bottom-0 h-[420px] w-[420px] opacity-70"
        aria-hidden="true"
      />
      <HeroSchematic className="absolute right-6 top-1/2 hidden w-[clamp(380px,34vw,560px)] -translate-y-1/2 opacity-90 lg:block xl:right-16" />

      {/* боковые рельсы */}
      <div
        className="pointer-events-none absolute inset-y-0 left-4 hidden w-6 items-center xl:flex"
        aria-hidden="true"
      >
        <span className="origin-left -rotate-90 whitespace-nowrap font-mono text-[9px] tracking-[0.35em] text-faint">
          {brand.coords[0]} — {brand.coords[1]}
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-4 hidden w-6 items-center justify-end xl:flex"
        aria-hidden="true"
      >
        <span className="origin-right rotate-90 whitespace-nowrap font-mono text-[9px] tracking-[0.35em] text-faint">
          KAZAKHSTAN / DIGITAL DEVELOPMENT
        </span>
      </div>

      {/* контент */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-14 pt-28 md:px-10 md:pb-20">
        <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.3em] text-muted">
          <span className="flex items-center gap-2 text-accent">
            <span className="pulse-dot inline-block h-1.5 w-1.5 bg-accent" />
            ERA/IT
          </span>
          <span className="text-faint">/</span>
          <span>{brand.tagline}</span>
          <span className="hidden text-faint sm:inline">/</span>
          <span className="hidden sm:inline">{brand.location}</span>
        </Reveal>

        <Reveal delay={100}>
          {/* canvas-версия заголовка не индексируется — семантика в sr-only h1 */}
          <h1 className="sr-only">Сайты и автоматизация, которые работают на ваш бизнес.</h1>
          {reducedMotion ? (
            <div
              aria-hidden="true"
              className="mt-8 font-display text-[clamp(2.55rem,7.2vw,6.6rem)] font-extrabold leading-[0.99] tracking-[-0.03em]"
            >
              Сайты и автоматизация,
              <br className="hidden sm:block" /> которые работают
              <br className="hidden sm:block" />{' '}
              <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                на ваш бизнес.
              </span>
            </div>
          ) : (
            <div key={fontKey} aria-hidden="true" className="mt-8 flex flex-col items-start">
              {lines.map((line, i) => {
                const isLast = i === lines.length - 1
                return (
                  <FuzzyText
                    key={`${fontKey}-${line}`}
                    fontSize={HERO_FONT_SIZE}
                    fontWeight={800}
                    fontFamily={HERO_FONT}
                    color={isLast ? undefined : '#ffffff'}
                    gradient={isLast ? HERO_GRADIENT : undefined}
                    letterSpacing={-3}
                    fps={45}
                    className={i === 0 ? HERO_LINE_OFFSET : `${HERO_LINE_OFFSET} ${HERO_LINE_OVERLAP}`}
                  >
                    {line}
                  </FuzzyText>
                )
              })}
            </div>
          )}
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
            Создаю современные сайты и чат-ботов для бизнеса в Казахстане — от идеи и структуры
            до запуска готового продукта.
          </p>
        </Reveal>

        <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#contact" variant="primary" size="lg">
            <span aria-hidden="true" className="text-base leading-none">
              ✦
            </span>
            <TechText
              text="ЗАКАЗАТЬ ПРОЕКТ"
              fontSize={12}
              fontWeight={500}
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing={0.14}
              color="#000000"
              accentColor="#000000"
              draggable={false}
              className="shrink-0"
              style={{ width: 148, height: 18 }}
            />
          </Button>
          <Button href="#services" variant="ghost" size="lg">
            <TechText
              text="ПОСМОТРЕТЬ УСЛУГИ"
              fontSize={12}
              fontWeight={500}
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing={0.14}
              color="#ffffff"
              accentColor="#afddff"
              draggable={false}
              className="shrink-0"
              style={{ width: 170, height: 18 }}
            />
          </Button>
        </Reveal>

        <Reveal delay={420} className="mt-14 md:mt-20">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-line pt-5 font-mono text-[10px] tracking-[0.25em] text-muted">
            {hero.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
            <span className="ml-auto hidden items-center gap-2 text-faint md:flex">
              <span className="pulse-dot inline-block h-1 w-1 bg-accent" />
              {hero.statusLabel}
              <span className="rounded-[3px] bg-accent px-[5px] py-[2px] text-[10px] tracking-[0.15em] text-black">
                {hero.statusChip}
              </span>
            </span>
          </div>
        </Reveal>
      </div>

      {/* индикатор скролла */}
      <div
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-faint">SCROLL</span>
        <span className="scroll-line block h-8 w-px bg-accent/70" />
      </div>
    </section>
  )
}
