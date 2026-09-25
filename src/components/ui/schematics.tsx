import type { CSSProperties } from 'react'
import type { SchematicKind } from '../../config/site'

/* Технические SVG-схемы: рисуются линиями (data-draw + pathLength)
   и служат декоративным «инженерным» слоем секций. */

const LINE = 'rgba(255,255,255,0.14)'
const STRONG = 'rgba(255,255,255,0.3)'
const ACC = '#afddff'
const FAINT = 'rgba(255,255,255,0.4)'

const MONO = '"JetBrains Mono", ui-monospace, monospace'

const dd = (ms: number) => ({ '--dd': `${ms}ms` }) as CSSProperties

function T({
  x,
  y,
  children,
  anchor,
  size = 9,
  fill = FAINT,
}: {
  x: number
  y: number
  children: string
  anchor?: 'middle' | 'end'
  size?: number
  fill?: string
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      letterSpacing={2}
      fontFamily={MONO}
      textAnchor={anchor}
    >
      {children}
    </text>
  )
}

/* ================= HERO — сеть узлов ================= */

export function HeroSchematic({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 640"
      className={`draw-auto ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <rect x="10" y="10" width="540" height="620" stroke={LINE} pathLength={1} data-draw style={dd(0)} />

      {/* плюс-метки */}
      <path d="M22,60 H38 M30,52 V68" stroke={LINE} pathLength={1} data-draw style={dd(200)} />
      <path d="M522,580 H538 M530,572 V588" stroke={LINE} pathLength={1} data-draw style={dd(200)} />

      <g className="drift">
        {/* связи */}
        <path d="M110,120 L330,80" stroke={STRONG} pathLength={1} data-draw style={dd(500)} />
        <path d="M330,80 L470,210" stroke={STRONG} pathLength={1} data-draw style={dd(620)} />
        <path d="M330,80 L200,290" stroke={STRONG} pathLength={1} data-draw style={dd(740)} />
        <path d="M200,290 L410,360" stroke={STRONG} pathLength={1} data-draw style={dd(860)} />
        <path d="M470,210 L410,360" stroke={STRONG} pathLength={1} data-draw style={dd(980)} />
        <path d="M410,360 L340,540" stroke={STRONG} pathLength={1} data-draw style={dd(1100)} />
        <path d="M200,290 L150,470" stroke={STRONG} pathLength={1} data-draw style={dd(1220)} />
        <path d="M150,470 L340,540" stroke={STRONG} pathLength={1} data-draw style={dd(1340)} />

        {/* узлы */}
        <rect x="104" y="114" width="12" height="12" stroke={STRONG} pathLength={1} data-draw style={dd(300)} />
        <rect x="324" y="74" width="12" height="12" fill={ACC} pathLength={1} data-draw style={dd(400)} />
        <circle cx="470" cy="210" r="6" stroke={STRONG} pathLength={1} data-draw style={dd(480)} />
        <rect x="194" y="284" width="12" height="12" fill={ACC} pathLength={1} data-draw style={dd(560)} />
        <rect x="404" y="354" width="12" height="12" stroke={STRONG} pathLength={1} data-draw style={dd(640)} />
        <circle cx="150" cy="470" r="6" stroke={STRONG} pathLength={1} data-draw style={dd(720)} />
        <rect x="334" y="534" width="12" height="12" stroke={STRONG} pathLength={1} data-draw style={dd(800)} />

        {/* орбита вокруг узла D */}
        <g className="fade-late">
          <circle cx="200" cy="290" r="26" stroke={ACC} strokeDasharray="3 6" className="spin-slow" />
        </g>
      </g>

      <T x={96} y={96}>N-01</T>
      <T x={346} y={66}>LINK: STABLE</T>
      <T x={222} y={268}>X:214 / Y:088</T>
      <T x={356} y={562}>SYS.02</T>
      <T x={24} y={622}>43.2389 N</T>
      <T x={452} y={622} anchor="end">76.8897 E</T>
    </svg>
  )
}

/* ================= 01 WEBSITE ================= */

function WebsiteSchematic() {
  return (
    <svg viewBox="0 0 460 300" className="draw h-auto w-full" fill="none" aria-hidden="true">
      <rect x="16" y="16" width="428" height="268" stroke={LINE} pathLength={1} data-draw style={dd(0)} />
      <path d="M16,52 H444" stroke={STRONG} pathLength={1} data-draw style={dd(100)} />
      <rect x="28" y="30" width="8" height="8" stroke={LINE} pathLength={1} data-draw style={dd(150)} />
      <rect x="44" y="30" width="8" height="8" stroke={LINE} pathLength={1} data-draw style={dd(180)} />
      <rect x="60" y="30" width="8" height="8" stroke={LINE} pathLength={1} data-draw style={dd(210)} />
      <rect x="84" y="29" width="160" height="12" stroke={LINE} pathLength={1} data-draw style={dd(240)} />

      <rect x="40" y="76" width="170" height="100" stroke={STRONG} pathLength={1} data-draw style={dd(320)} />
      <path d="M125,76 V176" stroke={ACC} strokeOpacity="0.5" pathLength={1} data-draw style={dd(420)} />
      <path d="M40,126 H210" stroke={ACC} strokeOpacity="0.5" pathLength={1} data-draw style={dd(420)} />

      <rect x="236" y="76" width="188" height="18" stroke={LINE} pathLength={1} data-draw style={dd(360)} />
      <rect x="236" y="106" width="150" height="18" stroke={LINE} pathLength={1} data-draw style={dd(420)} />
      <rect x="236" y="136" width="168" height="18" stroke={LINE} pathLength={1} data-draw style={dd(480)} />

      <rect x="40" y="196" width="110" height="28" stroke={ACC} pathLength={1} data-draw style={dd(540)} />
      <T x={95} y={214} anchor="middle" fill={ACC} size={8}>
        ЗАЯВКА
      </T>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={170 + i * 32}
          y={196}
          width={24}
          height={28}
          stroke={LINE}
          pathLength={1}
          data-draw
          style={dd(580 + i * 40)}
        />
      ))}

      <T x={40} y={266}>UI/UX SYSTEM</T>
      <T x={236} y={66}>STRUCTURE / 12</T>
      <T x={444} y={266} anchor="end">OPTIMIZED</T>
    </svg>
  )
}

/* ================= 02 TELEGRAM ================= */

function TelegramSchematic() {
  return (
    <svg viewBox="0 0 460 300" className="draw h-auto w-full" fill="none" aria-hidden="true">
      {/* входящие */}
      <rect x="30" y="40" width="140" height="32" stroke={LINE} pathLength={1} data-draw style={dd(100)} />
      <T x={42} y={60} size={8}>ВХОД</T>
      <rect x="30" y="92" width="110" height="32" stroke={LINE} pathLength={1} data-draw style={dd(160)} />
      <T x={42} y={112} size={8}>ВОПРОС</T>

      {/* ядро бота */}
      <path d="M100,56 H170 V159 H195" stroke={STRONG} pathLength={1} data-draw style={dd(260)} />
      <path d="M85,108 H170 V140 H195" stroke={STRONG} pathLength={1} data-draw style={dd(320)} />
      <rect x="195" y="124" width="70" height="70" stroke={STRONG} pathLength={1} data-draw style={dd(380)} />
      <rect x="225" y="154" width="10" height="10" fill={ACC} pathLength={1} data-draw style={dd(440)} />
      <g className="fade-late">
        <circle cx="230" cy="159" r="24" stroke={ACC} strokeDasharray="3 6" className="spin-slow" />
      </g>
      <T x={230} y={214} anchor="middle" size={8}>BOT CORE</T>

      {/* ответы */}
      <path d="M265,145 H332 V76 H300" stroke={STRONG} pathLength={1} data-draw style={dd(500)} />
      <path d="M265,160 H332 V128 H300" stroke={STRONG} pathLength={1} data-draw style={dd(560)} />
      <rect x="300" y="60" width="130" height="32" stroke={STRONG} pathLength={1} data-draw style={dd(620)} />
      <T x={312} y={80} size={8}>ОТВЕТ</T>
      <rect x="300" y="112" width="130" height="32" stroke={LINE} pathLength={1} data-draw style={dd(680)} />
      <T x={312} y={132} size={8}>КАТАЛОГ</T>

      {/* заявка менеджеру */}
      <path d="M230,194 V206 H300" stroke={STRONG} pathLength={1} data-draw style={dd(740)} />
      <rect x="300" y="190" width="130" height="32" stroke={ACC} pathLength={1} data-draw style={dd(800)} />
      <T x={312} y={210} size={8} fill={ACC}>ЗАЯВКА</T>

      <T x={30} y={270}>СЦЕНАРИИ</T>
      <T x={444} y={270} anchor="end">МАРШРУТ: МЕНЕДЖЕР</T>
    </svg>
  )
}

/* ================= 03 WHATSAPP ================= */

function WhatsappSchematic() {
  return (
    <svg viewBox="0 0 460 300" className="draw h-auto w-full" fill="none" aria-hidden="true">
      {/* вход */}
      <rect x="30" y="120" width="60" height="60" stroke={LINE} pathLength={1} data-draw style={dd(100)} />
      <T x={60} y={153} anchor="middle" size={8}>IN</T>
      <T x={60} y={200} anchor="middle" size={8}>ЗАЯВКА</T>

      <path d="M90,150 H180" stroke={STRONG} pathLength={1} data-draw style={dd(180)} />
      <g className="fade-late">
        <rect x="130" y="146" width="8" height="8" fill={ACC} />
      </g>

      {/* обработка */}
      <rect x="180" y="110" width="80" height="80" stroke={STRONG} pathLength={1} data-draw style={dd(260)} />
      <circle cx="220" cy="150" r="14" stroke={ACC} pathLength={1} data-draw style={dd(340)} />
      <path d="M220,136 V164 M206,150 H234" stroke={ACC} strokeOpacity="0.5" pathLength={1} data-draw style={dd(400)} />
      <T x={220} y={212} anchor="middle" size={8}>БОТ</T>

      {/* маршруты */}
      <path d="M260,150 H320" stroke={STRONG} pathLength={1} data-draw style={dd(460)} />
      <path d="M320,150 V68 H360" stroke={STRONG} pathLength={1} data-draw style={dd(520)} />
      <path d="M320,150 H360" stroke={STRONG} pathLength={1} data-draw style={dd(580)} />
      <path d="M320,150 V232 H360" stroke={STRONG} pathLength={1} data-draw style={dd(640)} />

      <rect x="360" y="50" width="70" height="36" stroke={LINE} pathLength={1} data-draw style={dd(700)} />
      <T x={395} y={71} anchor="middle" size={8}>CRM/API</T>
      <rect x="360" y="132" width="70" height="36" stroke={STRONG} pathLength={1} data-draw style={dd(760)} />
      <T x={395} y={153} anchor="middle" size={8}>МЕНЕДЖЕР</T>
      <rect x="360" y="214" width="70" height="36" stroke={LINE} pathLength={1} data-draw style={dd(820)} />
      <T x={395} y={235} anchor="middle" size={8}>СЦЕНАРИЙ</T>

      <g className="fade-late">
        <rect x="316" y="64" width="8" height="8" fill={ACC} />
        <rect x="316" y="228" width="8" height="8" fill={ACC} />
      </g>

      <T x={30} y={270}>КВАЛИФИКАЦИЯ</T>
      <T x={444} y={270} anchor="end">МАРШРУТИЗАЦИЯ</T>
    </svg>
  )
}

/* ================= выбор схемы ================= */

export function Schematic({ kind }: { kind: SchematicKind }) {
  if (kind === 'website') return <WebsiteSchematic />
  if (kind === 'telegram') return <TelegramSchematic />
  return <WhatsappSchematic />
}

/* ================= placeholder портфолио ================= */

export function PlaceholderSchematic({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={`h-auto w-full ${className}`} fill="none" aria-hidden="true">
      <rect x="8" y="8" width="384" height="184" stroke={LINE} />
      <path d="M8,8 L392,192 M392,8 L8,192" stroke={LINE} />
      <rect x="176" y="84" width="48" height="32" stroke={STRONG} />
      <circle cx="200" cy="100" r="4" fill={ACC} fillOpacity="0.6" />
    </svg>
  )
}
