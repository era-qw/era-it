import { useState } from 'react'
import { contacts, faq } from '../config/site'
import { Plus } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead index="08" label="FAQ" title="Частые вопросы" />
            <Reveal delay={150}>
              <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-muted">
                Не нашли ответ? Напишите напрямую — обсудим вашу задачу.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.18em]">
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
            </Reveal>
          </div>

          <div className="border-t border-line">
            {faq.map((item, i) => {
              const isOpen = open === i
              return (
                <Reveal key={item.q} delay={i * 50} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-accent"
                  >
                    <span className="flex items-baseline gap-4 md:gap-6">
                      <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                      <span className="text-base font-medium md:text-lg">{item.q}</span>
                    </span>
                    <Plus
                      size={16}
                      className={`shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-swift)] ${
                        isOpen ? 'rotate-45 text-accent' : 'text-muted'
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`faq-body ${isOpen ? 'open' : ''}`}
                  >
                    <div>
                      <p className="max-w-[62ch] pb-6 pl-8 text-sm leading-relaxed text-muted md:pl-11 md:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
