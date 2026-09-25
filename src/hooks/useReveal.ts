import { useEffect, useRef, useState } from 'react'

/**
 * Вешает класс .in на элемент, когда тот появляется во вьюпорте.
 * Используется Reveal-обёрткой и для точечных эффектов (таймлайн, схемы).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

/** true, когда страница прокручена больше чем на threshold пикселей. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Возвращает id секции, которая сейчас пересекает центр вьюпорта. */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState('')
  const key = ids.join(',')

  useEffect(() => {
    const list = key.split(',')
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    for (const id of list) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [key])

  return active
}
