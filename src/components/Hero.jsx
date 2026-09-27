import { useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile, heroStats } from '../data'
import { useInView, useCountUp, useMagnetic, useTilt } from '../hooks'

function Stat({ value, prefix = '', suffix = '', label, start, i }) {
  const n = useCountUp(value, start)
  return (
    <div className="stat" style={{ '--delay': `${i * 90}ms` }}>
      <span className="stat-value">
        {prefix}
        {n.toLocaleString('en-US')}
        <span className="accent">{suffix}</span>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

const TAGLINE = [
  { t: 'I' },
  { t: 'train' },
  { t: 'small', s: true },
  { t: 'models', s: true },
  { t: 'that' },
  { t: 'punch' },
  { t: 'above' },
  { t: 'their' },
  { t: 'weight.' },
]

function Portrait() {
  const [imgOk, setImgOk] = useState(true)
  const tiltRef = useTilt(6)

  return (
    <div
      ref={tiltRef}
      className="portrait-stage"
      data-cursor="portrait"
      aria-label="Portrait of Siddharth N R"
    >
      <div className="portrait-halo" aria-hidden="true" />
      <div className="portrait-ring" aria-hidden="true" />
      <div className="portrait-ring portrait-ring--outer" aria-hidden="true" />
      <div className="portrait-ring--tick" aria-hidden="true">
        <i />
      </div>

      <div className="portrait-frame">
        {imgOk ? (
          <img
            src="/profile.jpg"
            alt="Siddharth N R — AI / MLOps Engineer"
            onError={() => setImgOk(false)}
            loading="eager"
          />
        ) : (
          <div className="portrait-fallback" aria-hidden="true">
            <span className="portrait-fallback-mark">S</span>
            <span className="mono portrait-fallback-sub">SNR / 26</span>
          </div>
        )}
        <div className="portrait-shade" aria-hidden="true" />
        <div className="portrait-shine" aria-hidden="true" />
      </div>

      <span className="portrait-chip portrait-chip--tl">
        <i className="cdot" /> <b>7,000+</b>&nbsp;HF downloads
      </span>
      <span className="portrait-chip portrait-chip--br">
        <b>#4</b>&nbsp;sub-1B globally
      </span>
      <span className="portrait-chip portrait-chip--bl mono">Apple MLX · contributor</span>
    </div>
  )
}

export default function Hero({ ready = true }) {
  const [ref, inView] = useInView({ threshold: 0.08 })
  const show = inView && ready
  const ctaA = useMagnetic(0.18)
  const ctaB = useMagnetic(0.18)

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-grid-bg" aria-hidden="true" />
      <span className="mono hero-side-label" aria-hidden="true">
        PLUTO — EDGE INTELLIGENCE · 2026
      </span>

      <div className="container hero-inner">
        <div className="hero-top">
          <p className={`mono hero-eyebrow reveal ${show ? 'in-view' : ''}`}>
            <span className="accent">///</span> {profile.role} — {profile.org}
          </p>
          <a href="#lab" className={`mono hero-scroll reveal d2 ${show ? 'in-view' : ''}`}>
            Scroll
            <span className="hero-scroll-track">
              <span />
            </span>
          </a>
        </div>

        <div className="hero-core">
          <div className="hero-id">
            <h1 className="hero-title">
              <span className={`reveal line-1 ${show ? 'in-view' : ''}`}>SIDDHARTH</span>
              <span className={`reveal line-2 ${show ? 'in-view' : ''}`}>
                N R<span className="serif accent">.</span>
              </span>
            </h1>

            <div className={`reveal d1 ${show ? 'in-view' : ''} hero-tagline`}>
              <p className="hero-lede">
                <span className={`words ${show ? 'words-in' : ''}`}>
                  {TAGLINE.map((seg, i) => (
                    <span
                      key={i}
                      className={`wmask${seg.s ? ' serif' : ''}`}
                      style={{ '--wd': `${i * 42}ms` }}
                    >
                      <span className="word">{seg.t}</span>
                    </span>
                  ))}
                </span>
              </p>
              <p className="hero-sub">
                Founder of Pluto AI Labs and contributor to Apple&apos;s MLX — shipping
                open-source edge models benchmarked against far larger systems.
              </p>
              <div className="hero-cta">
                <span ref={ctaA} style={{ display: 'inline-flex' }}>
                  <a href="#lab" className="btn btn--solid">
                    Explore the lab <ArrowDown size={15} />
                  </a>
                </span>
                <span ref={ctaB} style={{ display: 'inline-flex' }}>
                  <a href="#contact" className="btn btn--ghost">
                    Get in touch <ArrowUpRight size={15} />
                  </a>
                </span>
              </div>
              <p className="mono hero-meta">
                <span>{profile.location}</span>
                <span className="hero-meta-dot" aria-hidden="true" />
                <span className="muted">Open to AI / MLOps roles</span>
              </p>
            </div>
          </div>

          <div aria-hidden={false} className={`reveal d2 ${show ? 'in-view' : ''} hero-viz`}>
            <Portrait />
            <span className="mono viz-cap">Fig. 01 — Edge intelligence, at human scale</span>
          </div>
        </div>

        <div className={`reveal d3 ${show ? 'in-view' : ''} hero-stats`}>
          {heroStats.map((s, i) => (
            <Stat key={s.label} {...s} start={show} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
