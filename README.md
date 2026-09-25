# Era/IT — сайт-портфолио

Продающий лендинг для бренда **Era/IT**: сайты, Telegram/WhatsApp боты и автоматизация
для бизнеса в Казахстане.

Стек: **React 18 + TypeScript + Vite + Tailwind CSS v4 + lucide-react**.
Деплой: **GitHub Pages** (GitHub Actions, без платного хостинга).

---

## Запуск локально

```bash
npm install     # один раз
npm run dev     # dev-сервер на http://localhost:5173
```

Продакшен-сборка и предпросмотр:

```bash
npm run build   # собирает в dist/
npm run preview # локальный предпросмотр собранного сайта
```

---

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub (например, `era-it`).
2. Загрузите проект:

   ```bash
   git init
   git add .
   git commit -m "Era/IT site"
   git branch -M main
   git remote add origin https://github.com/ВАШ-ЛОГИН/era-it.git
   git push -u origin main
   ```

3. В репозитории откройте **Settings → Pages → Build and deployment → Source** и выберите
   **GitHub Actions**.
4. Workflow `.github/workflows/deploy.yml` запустится автоматически на каждый push в `main`:
   установит зависимости, соберёт проект и опубликует `dist/` на GitHub Pages.

Сайт будет доступен по адресу `https://ВАШ-ЛОГИН.github.io/era-it/`.

- `base: './'` в `vite.config.ts` уже настроен — относительные пути работают под любым
  именем репозитория и правок не требуют.
- После публикации обновите адрес сайта в `public/robots.txt` и `public/sitemap.xml`
  (там стоят placeholder'ы `USERNAME.github.io/REPO-NAME`).
- Если репозиторий называется `ВАШ-ЛОГИН.github.io`, сайт откроется в корне домена —
  ничего менять тоже не нужно.

---

## ГДЕ ЧТО МЕНЯТЬ — все правки в одном файле

**`src/config/site.ts`** — единственное место, где редактируется контент:

| Что заменить                | Где в `src/config/site.ts`                     |
| --------------------------- | ---------------------------------------------- |
| **WhatsApp-ссылка**         | `contacts.WHATSAPP_URL`                        |
| **Telegram-ссылка**         | `contacts.TELEGRAM_URL`                        |
| Endpoint для backend-формы  | `contacts.FORM_ENDPOINT`                       |
| Название / слоган / город   | блок `brand`                                   |
| Меню в шапке                | `nav`                                          |
| Тексты hero-экрана          | `src/components/Hero.tsx` (H1 и подзаголовок)  |
| Проблемы                    | `problems` + `problemSolution`                 |
| Услуги и списки работ       | `services`                                     |
| Цены пакетов сайтов         | `sitePackages`                                 |
| Цены ботов                  | `botPackages`                                  |
| «Что вы получаете»          | `deliverables`                                 |
| Шаги процесса               | `processSteps`                                 |
| Блок доверия                | `trust`                                        |
| Проекты портфолио           | секция скрыта: `projects` + подключение в `App.tsx` |
| Вопросы FAQ                 | `faq` (JSON-LD обновится автоматически)        |
| Поля/варианты формы         | `leadForm`                                     |

SEO-мета (title, description, Open Graph) — в `index.html`.

---

## Форма заявки

- Пока `contacts.FORM_ENDPOINT` пустой: форма **не отправляет данные на сторонние
  серверы** — она собирает текст заявки и открывает WhatsApp с предзаполненным
  сообщением (плюс кнопки Telegram и «копировать текст»).
- Когда будет backend/API — вставьте URL в `contacts.FORM_ENDPOINT`, и форма начнёт
  отправлять JSON `POST` на него (при ошибке автоматически сработает fallback на WhatsApp).

## Структура проекта

```
├─ .github/workflows/deploy.yml   # CI/CD → GitHub Pages
├─ index.html                     # SEO-мета, шрифты, OG
├─ public/                        # favicon, robots.txt, sitemap.xml, .nojekyll
└─ src/
   ├─ config/site.ts              # ★ ВЕСЬ КОНТЕНТ И КОНТАКТЫ
   ├─ hooks/useReveal.ts          # IntersectionObserver, scrollspy, sticky header
   ├─ components/
   │  ├─ ui/                      # Reveal, Button, SectionHead, Corners, schematics, StructuralGrid
   │  ├─ Header / Hero / Marquee / Problem / Services / Pricing
   │  ├─ Deliverables / Process / Trust / Faq
   │  ├─ LeadForm / FinalCta / Footer
   │  └─ Portfolio.tsx            # секция отключена — включается в App.tsx
   ├─ App.tsx                     # композиция страницы + JSON-LD
   └─ index.css                   # дизайн-система (Tailwind v4 @theme)
```
