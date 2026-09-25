import { MessageCircle, Send } from 'lucide-react'
import { contacts, finalCta } from '../config/site'
import type { Prefill } from '../config/site'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import LeadForm from './LeadForm'

export default function FinalCta({ prefill }: { prefill: Prefill }) {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="bg-grid grid-fade absolute inset-0" aria-hidden="true" />
      <div
        className="glow-accent absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Reveal className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-accent">[09]</span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-muted">CONTACT</span>
            <span className="h-px w-24 bg-line" />
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-8 font-display text-[clamp(2.1rem,5vw,4.3rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em]">
              У вас есть идея.
              <br />
              <span className="text-accent">
                Давайте превратим её в digital-продукт.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-muted">
              {finalCta.sub}
            </p>
          </Reveal>

          <Reveal delay={260} className="mt-10 flex flex-wrap gap-4">
            <Button href={contacts.WHATSAPP_URL} external variant="primary" size="lg">
              <MessageCircle size={16} /> Написать в WhatsApp
            </Button>
            <Button href={contacts.TELEGRAM_URL} external variant="ghost" size="lg">
              <Send size={16} /> Написать в Telegram
            </Button>
          </Reveal>

          <Reveal
            delay={320}
            className="mt-12 grid max-w-md grid-cols-2 gap-px border border-line bg-line font-mono text-[10px] tracking-[0.2em]"
          >
            <div className="bg-bg p-4">
              <p className="text-faint">LOCATION</p>
              <p className="mt-1.5 text-muted">KAZAKHSTAN / ONLINE</p>
            </div>
            <div className="bg-bg p-4">
              <p className="text-faint">STATUS</p>
              <p className="mt-1.5 text-accent">PROJECTS: OPEN</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} variant="right" className="relative bg-bg p-6 md:p-9">
          {/* рамка панели со скошенным нижне-левым углом */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 620 700"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon
              points="0.5,0.5 619.5,0.5 619.5,699.5 30,699.5 0.5,669.5"
              fill="none"
              stroke="#afddff"
              strokeOpacity="0.6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mb-7 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-faint">
            <span className="text-muted">// ЗАЯВКА</span>
            <span>ERA/IT — {new Date().getFullYear()}</span>
          </div>
          <LeadForm prefill={prefill} />
        </Reveal>
      </div>
    </section>
  )
}
