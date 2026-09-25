import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { brand, contacts, nav } from '../config/site'
import { useScrolled, useScrollSpy } from '../hooks/useReveal'

export default function Header() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(nav.map((n) => n.href.slice(1)))

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          scrolled || open
            ? 'border-line bg-black/85 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Era<span className="text-accent">/</span>IT
          </span>
          <span className="hidden font-mono text-[9px] tracking-[0.3em] text-faint md:inline">
            {brand.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                  isActive ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                <span className={isActive ? 'text-accent' : 'text-faint'}>{item.id}.</span>{' '}
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden border border-line-strong px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg [transition-timing-function:var(--ease-swift)] transition-colors duration-300 hover:border-accent hover:text-accent md:inline-flex"
          >
            Обсудить проект
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            className="cursor-pointer p-2 text-fg lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      </header>

      {/* мобильное меню — снаружи header, иначе backdrop-blur превращается
          в containing block для fixed и схлопывает оверлей */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 border-t border-line bg-black transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav
          className="flex h-full flex-col overflow-y-auto px-6 py-8"
          aria-label="Мобильная навигация"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`border-b border-line py-5 font-display text-3xl font-extrabold tracking-tight text-fg transition-all duration-500 ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
            >
              <span className="mr-4 font-mono text-xs text-accent">{item.id}</span>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`mt-8 bg-accent px-6 py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-black transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '420ms' : '0ms' }}
          >
            Обсудить проект
          </a>
          <div
            className={`mt-8 flex gap-8 font-mono text-[11px] tracking-[0.18em] text-muted transition-opacity duration-500 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: open ? '500ms' : '0ms' }}
          >
            <a href={contacts.WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
              WHATSAPP ↗
            </a>
            <a href={contacts.TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
              TELEGRAM ↗
            </a>
          </div>
          <p className="mt-auto pt-8 font-mono text-[9px] tracking-[0.3em] text-faint">
            {brand.location} — {brand.coords[0]} / {brand.coords[1]}
          </p>
        </nav>
      </div>
    </>
  )
}
