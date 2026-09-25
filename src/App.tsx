import { useEffect, useState } from 'react'
import { faq } from './config/site'
import type { Prefill } from './config/site'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Problem from './components/Problem'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Process from './components/Process'
// import Portfolio from './components/Portfolio'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  const [prefill, setPrefill] = useState<Prefill>(null)

  /** Клик «Обсудить <пакет>» — предзаполнить форму и плавно прокрутить к ней. */
  function selectPackage(next: Prefill) {
    setPrefill(next ? { ...next, stamp: Date.now() } : null)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  /* JSON-LD FAQPage для поисковиков — генерируется из того же конфига, что и секция FAQ */
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])

  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-black"
      >
        Перейти к содержимому
      </a>

      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Services />
        <Pricing onSelect={selectPackage} />
        <Process />
        {/* Секция «Избранные работы» отключена, пока нет реальных проектов.
            Вернуть: раскомментировать импорт и строку <Portfolio />,
            наполнить массив projects в src/config/site.ts. */}
        <Faq />
        <FinalCta prefill={prefill} />
      </main>
      <Footer />
    </>
  )
}
