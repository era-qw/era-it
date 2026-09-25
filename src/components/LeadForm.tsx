import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check, ChevronDown, Copy } from 'lucide-react'
import { contacts, leadForm, whatsappLink } from '../config/site'
import type { Prefill } from '../config/site'

type Fields = {
  name: string
  business: string
  service: string
  budget: string
}

type Status = 'idle' | 'sending' | 'sent'

const initial: Fields = {
  name: '',
  business: '',
  service: '',
  budget: leadForm.budgets[leadForm.budgets.length - 1],
}

function buildMessage(f: Fields): string {
  return [
    'Заявка с сайта Era/IT',
    `Имя: ${f.name}`,
    f.business.trim() ? `Бизнес: ${f.business}` : '',
    `Что нужно создать: ${f.service}`,
    `Бюджет: ${f.budget}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function Label({ children }: { children: string }) {
  return (
    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
      {children}
    </span>
  )
}

export default function LeadForm({ prefill }: { prefill: Prefill }) {
  const [form, setForm] = useState<Fields>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  /* предзаполнение при клике «Обсудить <пакет>» из блока цен */
  useEffect(() => {
    if (!prefill) return
    setForm((f) => ({
      ...f,
      service: prefill.service ?? f.service,
      budget: prefill.budget ?? f.budget,
    }))
  }, [prefill])

  const set =
    (key: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = buildMessage(form)
    setMessage(text)

    /* 1. Если задан FORM_ENDPOINT — отправляем JSON на backend. */
    if (contacts.FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(contacts.FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, source: 'era-it website' }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setStatus('sent')
        return
      } catch {
        /* 2. Fallback: открываем WhatsApp с готовым текстом. */
      }
    }
    window.open(whatsappLink(text), '_blank', 'noopener')
    setStatus('sent')
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* буфер обмена недоступен — текст остаётся выделен в блоке ниже */
    }
  }

  if (status === 'sent') {
    return (
      <div aria-live="polite">
        <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-accent">
          <Check size={14} /> ЗАЯВКА ПОДГОТОВЛЕНА
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {contacts.FORM_ENDPOINT
            ? 'Заявка отправлена. Свяжусь с вами по указанному контакту.'
            : 'Мы открыли WhatsApp с вашей заявкой — просто нажмите «отправить»:'}
        </p>
        {!contacts.FORM_ENDPOINT && (
          <>
            <pre className="mt-4 max-h-44 overflow-auto whitespace-pre-wrap border border-line bg-black p-4 font-mono text-[11px] leading-relaxed text-faint">
              {message}
            </pre>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="border border-line-strong px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Открыть WhatsApp
              </a>
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex cursor-pointer items-center gap-2 border border-line-strong px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Скопировано' : 'Копировать текст'}
              </button>
            </div>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            setForm(initial)
            setStatus('idle')
          }}
          className="mt-6 cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-faint transition-colors duration-300 hover:text-accent"
        >
          ← Новая заявка
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <Label>Имя *</Label>
          <input
            className="field"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={form.name}
            onChange={set('name')}
          />
        </label>
        <label>
          <Label>Название бизнеса</Label>
          <input
            className="field"
            type="text"
            name="business"
            autoComplete="organization"
            placeholder="Например: кофейня Astana"
            value={form.business}
            onChange={set('business')}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <Label>Что нужно создать? *</Label>
        <div className="relative">
          <select className="field pr-10" name="service" required value={form.service} onChange={set('service')}>
            <option value="" disabled>
              Выберите направление
            </option>
            {leadForm.services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </label>

      <label className="mt-5 block">
        <Label>Бюджет</Label>
        <div className="relative">
          <select className="field pr-10" name="budget" value={form.budget} onChange={set('budget')}>
            {leadForm.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2.5 bg-accent px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-black transition-colors duration-300 [transition-timing-function:var(--ease-swift)] hover:bg-white disabled:opacity-60"
      >
        <span aria-hidden="true" className="text-sm leading-none">
          ✦
        </span>
        {status === 'sending' ? 'Отправка…' : 'Отправить запрос'}
      </button>

      <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.08em] text-faint">
        {contacts.FORM_ENDPOINT
          ? '// Данные отправляются на защищённый endpoint, указанный в src/config/site.ts.'
          : '// Заявка не отправляется на сторонние серверы: откроется WhatsApp с готовым текстом — просто нажмите «отправить».'}
      </p>
    </form>
  )
}
