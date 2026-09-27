import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { useScrollSpy } from '../hooks'
import { profile } from '../data'

const links = [
  { id: 'about', label: 'About' },
  { id: 'lab', label: 'Lab' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ theme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [imgOk, setImgOk] = useState(true)
  const active = useScrollSpy(links.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleToggle = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const apply = () => document.documentElement.setAttribute('data-theme', next)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !document.startViewTransition) {
      apply()
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const root = document.documentElement
    root.classList.add('theme-switching')

    const transition = document.startViewTransition(apply)

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 680,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
      .catch(() => {})

    transition.finished.finally(() => root.classList.remove('theme-switching'))
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="nav-logo" aria-label="Home">
            <span className="nav-mark" aria-hidden="true">
              {imgOk ? (
                <img src="/profile.jpg" alt="" onError={() => setImgOk(false)} />
              ) : (
                <span className="serif nav-mark-fallback">S</span>
              )}
            </span>
            <span className="mono nav-word">
              SNR<span className="accent">/</span>26
            </span>
          </a>
          <nav
            id="site-menu"
            className={`nav-links ${open ? 'is-open' : ''}`}
            aria-label="Primary"
          >
            <div className="menu-links">
              {links.map((l, i) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`nav-link menu-link mono ${active === l.id ? 'is-active' : ''}`}
                  style={{ '--md': `${i * 60}ms` }}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {l.label}
                  <ArrowUpRight size={17} className="menu-arrow" />
                </a>
              ))}
            </div>
            <div className="menu-foot">
              <a href={`mailto:${profile.email}`} className="btn btn--solid menu-mail">
                {profile.email} <ArrowUpRight size={15} />
              </a>
              <div className="mono menu-socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={profile.huggingface} target="_blank" rel="noreferrer">
                  Hugging Face
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </nav>
          <div className="nav-right">
            <span className="mono nav-status">
              <i className="dot" />
              Open to work
            </span>
            <button
              className="theme-toggle"
              onClick={handleToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              className="nav-burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(!open)}
            >
              <span className={`burger-icon ${open ? 'is-open' : ''}`}>
                {open ? <X size={20} /> : <Menu size={20} />}
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-scrim ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />
      <span className="sr-only">{profile.location}</span>
    </>
  )
}
