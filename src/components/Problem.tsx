import { problems } from '../config/site'
import EchoText from './ui/EchoText'
import ShinyText from './ui/ShinyText'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'

export default function Problem() {
  return (
    <section id="problem" className="relative border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              index="01"
              label="PROBLEM"
              title={
                <EchoText
                  text="Ваш бизнес может терять клиентов ещё до первого разговора."
                  echoes={10}
                  offset={30}
                  duration={1100}
                  mode="both"
                  direction="right"
                  tint="#afddff"
                  fontSize="inherit"
                  fontWeight="inherit"
                  color="#ffffff"
                />
              }
            />
            <Reveal delay={160}>
              <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-muted">
                Причина редко в продукте. Чаще — в отсутствии понятной цифровой инфраструктуры
                между вами и клиентом.
              </p>
            </Reveal>
          </div>

          <div>
            {problems.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 70}
                className="group border-t border-line py-6 transition-colors duration-300 last:border-b hover:bg-panel"
              >
                <div className="flex items-start gap-5 px-2 md:gap-8 md:px-4">
                  <span className="mt-1.5 font-mono text-[11px] tracking-[0.2em] text-accent">
                    P-0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium leading-snug md:text-xl">
                      <ShinyText
                        text={p.title}
                        speed={3.2}
                        color="rgba(255, 255, 255, 0.45)"
                        shineColor="#afddff"
                      />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
