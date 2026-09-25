import { brand, contacts, nav } from '../config/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
              Era<span className="text-accent">/</span>IT
            </a>
            <p className="mt-4 max-w-[38ch] font-mono text-[10px] leading-[1.8] tracking-[0.18em] text-faint">
              {brand.slogan}
              <br />
              {brand.positioning}
            </p>
          </div>

          <nav aria-label="Навигация в подвале" className="grid grid-cols-2 gap-x-12 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] tracking-[0.18em] text-muted transition-colors duration-300 hover:text-accent"
              >
                <span className="text-faint">{item.id}.</span> {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-mono text-[11px] tracking-[0.18em] text-muted transition-colors duration-300 hover:text-accent"
            >
              <span className="text-faint">→</span> ЗАЯВКА
            </a>
          </nav>

          <div className="flex flex-col gap-3 font-mono text-[11px] tracking-[0.18em]">
            <a
              href={contacts.WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors duration-300 hover:text-accent"
            >
              WHATSAPP ↗
            </a>
            <a
              href={contacts.TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors duration-300 hover:text-accent"
            >
              TELEGRAM ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[9px] tracking-[0.2em] text-faint md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} ERA/IT</span>
          <span>
            {brand.coords[0]} / {brand.coords[1]} — KAZAKHSTAN
          </span>
          <span>DIGITAL PRODUCTS FOR BUSINESS</span>
        </div>
      </div>
    </footer>
  )
}
