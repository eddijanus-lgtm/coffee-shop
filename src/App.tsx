import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Menu,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import './App.css'

type ReservationData = {
  name: string
  email: string
  date: string
  time: string
  guests: number
}

const primaryMenu = [
  {
    title: 'Morning favourites',
    subtitle: 'BUTTERY · BRIGHT · SIMPLE',
    image: './images/brunch-closeup.webp',
    items: [
      ['Butter croissant', '4'],
      ['Soft eggs & brioche', '13'],
    ],
  },
  {
    title: 'Coffee bar',
    subtitle: 'HOUSE ROAST · OAT FRIENDLY',
    image: './images/barista-interior.webp',
    items: [
      ['Flat white', '5'],
      ['Maison mocha', '6'],
    ],
  },
  {
    title: 'Seasonal plates',
    subtitle: 'FRESH · LIGHT · GENEROUS',
    image: './images/terrace.webp',
    items: [
      ['Peach tartine', '14'],
      ['Garden salad', '15'],
    ],
  },
]

const extendedMenu = [
  ['Croissant Benedict', '18'],
  ['Brioche perdu, berries & cream', '16'],
  ['Heritage tomato tartine', '15'],
  ['Pistachio rose cake', '8'],
]

const maisonMoments = [
  {
    image: './images/barista-interior.webp',
    alt: 'Barista hinter der Espressobar im warm beleuchteten Maison Fleur & Café',
    label: 'Behind the bar',
    className: 'moment-card--wide',
  },
  {
    image: './images/brunch-closeup.webp',
    alt: 'Croissant mit cremigem Ei, Salat, Cappuccino und Blumen auf einem gedeckten Tisch',
    label: 'Brunch, slowly',
    className: 'moment-card--tall',
  },
  {
    image: './images/terrace.webp',
    alt: 'Blumengeschmückte Terrasse vor dem Maison Fleur & Café in Paris',
    label: 'A table outside',
    className: 'moment-card--wide',
  },
  {
    image: './images/window-seat.webp',
    alt: 'Sonniger Fensterplatz mit Kaffee, Croissant und kleinem Blumenstrauß',
    label: 'The quiet corner',
    className: 'moment-card--tall',
  },
]

function FlowerMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="92"
      height="58"
      viewBox="0 0 92 58"
      fill="none"
      aria-hidden="true"
    >
      <path d="M45.8 26.2C43.4 35.3 43.2 43.3 40 52" stroke="#8FA085" strokeWidth="3" strokeLinecap="round" />
      <path d="M43.4 38.2C33.3 34.3 27.8 35.3 23.4 39.7C31.3 44 38.4 43.8 43.4 38.2Z" fill="#A8B79F" />
      <path d="M45.7 42C54.7 38.2 62.3 40.2 67 45.4C58.2 49.1 50.6 47.8 45.7 42Z" fill="#A8B79F" />
      <ellipse cx="28.2" cy="20.1" rx="15.8" ry="10.5" transform="rotate(-17 28.2 20.1)" fill="#EFC9CE" />
      <ellipse cx="51.8" cy="13.2" rx="16.8" ry="11.5" transform="rotate(16 51.8 13.2)" fill="#CDBDE5" />
      <ellipse cx="47.2" cy="27.6" rx="14.4" ry="10.2" fill="#E9D59D" />
      <circle cx="43.8" cy="22.8" r="5.7" fill="#8A5F49" />
    </svg>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? 'brand--compact' : ''}`} href="#top" aria-label="Maison Fleur & Café – Startseite">
      <span>Maison Fleur</span>
      <span>& Café</span>
    </a>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>
}

function Button({
  children,
  variant = 'dark',
  onClick,
  href,
  type = 'button',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'dark' | 'blush' | 'light' | 'outline'
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  className?: string
}) {
  const content = (
    <>
      <span>{children}</span>
      {variant === 'outline' ? <ArrowRight aria-hidden="true" size={16} /> : null}
    </>
  )

  if (href) {
    return (
      <a className={`button button--${variant} ${className}`} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button className={`button button--${variant} ${className}`} type={type} onClick={onClick}>
      {content}
    </button>
  )
}

function Header({ onReserve }: { onReserve: () => void }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#menu">Menu</a>
          <a href="#story">Story</a>
          <a href="#visit">Visit</a>
          <button type="button" onClick={onReserve}>Reserve</button>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-hidden={!open}>
        <a href="#menu" onClick={close}>Menu</a>
        <a href="#story" onClick={close}>Story</a>
        <a href="#visit" onClick={close}>Visit</a>
        <button type="button" onClick={() => { close(); onReserve() }}>Book a table</button>
      </div>
    </header>
  )
}

function Hero({ onReserve }: { onReserve: () => void }) {
  const openState = useMemo(() => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      hour12: false,
    }).formatToParts(new Date())
    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
    return hour >= 8 && hour < 18
  }, [])

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-location">PARIS · LE MARAIS</p>
            <h1 id="hero-title">Coffee, flowers<br />& slow mornings.</h1>
            <p className="hero-intro">
              A warm café where refined Parisian minimalism meets soft florals, excellent coffee and the comfort of a modern lodge.
            </p>
            <div className="hero-actions">
              <Button href="#menu">Explore the menu</Button>
              <Button variant="blush" onClick={onReserve}>Book a table</Button>
            </div>
          </div>
          <figure className="hero-photo">
            <img src="./images/terrace.webp" alt="Die blumengeschmückte Terrasse des Maison Fleur & Café in Paris" fetchPriority="high" />
            <figcaption className="open-pill">
              <span className={`status-dot ${openState ? '' : 'status-dot--closed'}`} />
              {openState ? 'OPEN TODAY · 08:00—18:00' : 'OPENS AT 08:00'}
            </figcaption>
            <FlowerMark className="hero-flower" />
          </figure>
        </div>
      </section>

      <section className="daily-wrap" aria-label="Heutiges Angebot">
        <div className="daily-card">
          <SectionLabel>TODAY AT MAISON FLEUR</SectionLabel>
          <div className="daily-row">
            <div>
              <strong>BREAKFAST</strong>
              <span>Croissants, eggs & seasonal plates</span>
            </div>
            <b>08—14</b>
          </div>
          <div className="daily-row">
            <div>
              <strong>CAFÉ & FLOWERS</strong>
              <span>Coffee, cake and small bouquets</span>
            </div>
            <b>ALL DAY</b>
          </div>
        </div>
      </section>
    </main>
  )
}

function MenuSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="menu-section section" id="menu" aria-labelledby="menu-title">
      <div className="section-heading menu-heading">
        <div>
          <SectionLabel>01 · THE MENU</SectionLabel>
          <h2 id="menu-title">Small plates,<br />excellent coffee.</h2>
        </div>
        <p>A concise menu built around slow mornings, generous pastries and seasonal ingredients.</p>
      </div>

      <div className="menu-layout">
        <figure className="feature-dish">
          <img src="./images/brunch-closeup.webp" alt="Croissant Benedict mit cremigem Ei, Salat und Cappuccino" />
          <figcaption>
            <span>Maison favourite</span>
            <strong>Croissant Benedict</strong>
          </figcaption>
        </figure>

        <div className="menu-list">
          {primaryMenu.map((group, index) => (
            <article className="menu-card" key={group.title}>
              <img src={group.image} alt="" aria-hidden="true" style={{ objectPosition: index === 1 ? '50% 54%' : undefined }} />
              <div className="menu-card-copy">
                <h3>{group.title}</h3>
                <p>{group.subtitle}</p>
                <ul>
                  {group.items.map(([name, price]) => (
                    <li key={name}><span>{name}</span><b>{price}</b></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={`extended-menu ${expanded ? 'extended-menu--open' : ''}`}>
        {extendedMenu.map(([name, price]) => (
          <div className="extended-menu-row" key={name}>
            <span>{name}</span>
            <b>{price}</b>
          </div>
        ))}
      </div>

      <Button className="full-menu-button" onClick={() => setExpanded((value) => !value)}>
        {expanded ? 'Close the full menu' : 'View the full menu'}
      </Button>
    </section>
  )
}

function MomentsSection() {
  return (
    <section className="moments-section section" aria-labelledby="moments-title">
      <div className="section-heading moments-heading">
        <div>
          <SectionLabel>A MORNING AT MAISON</SectionLabel>
          <h2 id="moments-title">From first espresso<br />to last crumbs.</h2>
        </div>
        <p>Sun-warmed tables, flowers in every corner and brunch plates made for staying a little longer.</p>
      </div>

      <div className="moments-grid">
        {maisonMoments.map((moment) => (
          <figure className={`moment-card ${moment.className}`} key={moment.image}>
            <img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" />
            <figcaption>{moment.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="story-section section" id="story" aria-labelledby="story-title">
      <div className="story-grid">
        <div className="story-copy">
          <SectionLabel>02 · OUR STORY</SectionLabel>
          <h2 id="story-title">A little Paris apartment,<br />with better coffee.</h2>
          <p>
            We imagined Maison Fleur as the kind of place you discover by accident and keep returning to: intimate, warm, beautifully made and never too formal.
          </p>
          <blockquote>
            “A place that feels dressed up, but never formal.”
            <cite>— THE MAISON FLEUR IDEA</cite>
          </blockquote>
        </div>
        <figure className="story-photo">
          <img src="./images/window-seat.webp" alt="Sonniger Fensterplatz im Maison Fleur & Café mit Kaffee, Croissant und Blumen" />
          <FlowerMark className="story-flower" />
        </figure>
      </div>
    </section>
  )
}

function VisitSection() {
  return (
    <section className="visit-section section" id="visit" aria-labelledby="visit-title">
      <div className="section-heading visit-heading">
        <div>
          <SectionLabel>03 · VISIT</SectionLabel>
          <h2 id="visit-title">Stay for one more cup.</h2>
        </div>
        <p>Find us on a quiet corner in Le Marais, close enough to wander in and slow enough to stay.</p>
      </div>

      <div className="visit-grid">
        <figure className="visit-photo">
          <img src="./images/terrace.webp" alt="Terrasse und Eingang des Maison Fleur & Café in einer Pariser Straße" />
          <span className="address-chip"><MapPin size={17} aria-hidden="true" /> Paris 4e</span>
        </figure>
        <div className="visit-panel">
          <div className="visit-row">
            <span>ADDRESS</span>
            <p>18 rue des Rosiers<br />Paris 4e</p>
          </div>
          <div className="visit-row">
            <span>HOURS</span>
            <p>Mon—Sun<br />08:00—18:00</p>
          </div>
          <div className="visit-row">
            <span>CONTACT</span>
            <p>bonjour@maisonfleur.cafe<br />+33 1 84 80 20 26</p>
          </div>
          <Button
            variant="outline"
            href="https://www.google.com/maps/search/?api=1&query=18+rue+des+Rosiers+Paris"
          >
            Open in maps
          </Button>
        </div>
      </div>
    </section>
  )
}

function ReservationSection({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="reservation-section" aria-labelledby="reserve-title">
      <div className="reservation-inner">
        <div className="reservation-copy">
          <SectionLabel>RESERVATIONS</SectionLabel>
          <h2 id="reserve-title">A table by<br />the flowers.</h2>
          <p>Book breakfast, lunch or a slow afternoon coffee. Walk-ins are always welcome when space allows.</p>
          <Button variant="blush" onClick={onReserve}>Book a table</Button>
          <FlowerMark />
        </div>
        <figure className="reservation-photo">
          <img src="./images/barista-interior.webp" alt="Barista und warme Café-Atmosphäre im Maison Fleur & Café" />
        </figure>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Brand compact />
          <p>COFFEE · FLOWERS · SLOW MORNINGS</p>
        </div>
        <nav aria-label="Fußnavigation">
          <a href="#menu">Menu</a>
          <a href="#story">Story</a>
          <a href="#visit">Visit</a>
          <a href="https://www.instagram.com/" aria-label="Instagram"><span className="instagram-mark" aria-hidden="true">◎</span></a>
        </nav>
        <small>© 2026 Maison Fleur & Café · Paris</small>
      </div>
    </footer>
  )
}

function ReservationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const today = new Date().toISOString().slice(0, 10)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<ReservationData>({
    name: '',
    email: '',
    date: today,
    time: '10:00',
    guests: 2,
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setSubmitted(false)
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Reservierung schließen">
          <X size={19} aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="reservation-success">
            <span className="success-icon"><Check size={28} aria-hidden="true" /></span>
            <SectionLabel>MERCI, {data.name || 'MON AMI'}</SectionLabel>
            <h2 id="modal-title">Your table is waiting.</h2>
            <p>
              We have noted your request for {data.guests} {data.guests === 1 ? 'guest' : 'guests'} on {new Date(`${data.date}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} at {data.time}.
            </p>
            <Button onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <SectionLabel>RESERVATIONS</SectionLabel>
            <h2 id="modal-title">Book a table.</h2>
            <p className="modal-intro">Choose a date and time. We will confirm your table by email.</p>

            <label>
              Your name
              <input required value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} placeholder="Camille" />
            </label>
            <label>
              Email
              <input required type="email" value={data.email} onChange={(event) => setData({ ...data, email: event.target.value })} placeholder="camille@example.com" />
            </label>
            <div className="form-row">
              <label>
                <span><CalendarDays size={15} aria-hidden="true" /> Date</span>
                <input required type="date" min={today} value={data.date} onChange={(event) => setData({ ...data, date: event.target.value })} />
              </label>
              <label>
                <span><Clock3 size={15} aria-hidden="true" /> Time</span>
                <select value={data.time} onChange={(event) => setData({ ...data, time: event.target.value })}>
                  {['08:30', '09:00', '10:00', '11:30', '12:30', '14:00', '15:30', '17:00'].map((time) => <option key={time}>{time}</option>)}
                </select>
              </label>
            </div>
            <div className="guest-field">
              <span>Guests</span>
              <div>
                <button type="button" aria-label="Eine Person weniger" onClick={() => setData({ ...data, guests: Math.max(1, data.guests - 1) })}><Minus size={15} /></button>
                <strong>{data.guests}</strong>
                <button type="button" aria-label="Eine Person mehr" onClick={() => setData({ ...data, guests: Math.min(8, data.guests + 1) })}><Plus size={15} /></button>
              </div>
            </div>
            <Button type="submit">Request this table</Button>
          </form>
        )}
      </section>
    </div>
  )
}

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false)

  return (
    <>
      <Header onReserve={() => setReservationOpen(true)} />
      <Hero onReserve={() => setReservationOpen(true)} />
      <MenuSection />
      <MomentsSection />
      <StorySection />
      <VisitSection />
      <ReservationSection onReserve={() => setReservationOpen(true)} />
      <Footer />
      <ReservationModal open={reservationOpen} onClose={() => setReservationOpen(false)} />
    </>
  )
}
