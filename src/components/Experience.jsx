import { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'
import Section from './Section'
import { experience } from '../data'
import { useInView } from '../hooks'

function Job({ job, i, active }) {
  const [ref, inView] = useInView()
  return (
    <article
      ref={ref}
      className={`job reveal ${inView ? 'in-view' : ''} ${active ? 'is-active' : ''}`}
      style={{ '--delay': `${i * 60}ms` }}
    >
      <div className="job-when mono">
        <span>{job.period}</span>
        <span className="muted">{job.location}</span>
      </div>
      <div className="job-main">
        <h3 className="job-company">
          {job.company}
          {job.current && (
            <span className="mono job-badge">
              <i className="dot job-dot" />
              Current
            </span>
          )}
        </h3>
        <p className="job-role">{job.role}</p>
        <ul className="job-points">
          {job.points.map((pt, j) => (
            <li key={j}>{pt}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function IntlStrip() {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`intl-strip reveal ${inView ? 'in-view' : ''}`}>
      <span className="intl-icon" aria-hidden="true">
        <Globe size={17} />
      </span>
      <p className="intl-text">
        International remote experience
        <span className="intl-countries">England, UK · New Zealand</span>
      </p>
      <span className="mono intl-tag">2 countries · all remote</span>
    </div>
  )
}

export default function Experience() {
  const [active, setActive] = useState(-1)
  const jobsRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let lastActive = -1

    const update = () => {
      raf = 0
      const wrap = jobsRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      // gold fill draws down the rail as the section travels through view
      const p = Math.min(Math.max((vh * 0.55 - rect.top) / rect.height, 0), 1)
      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`
      // role nearest above viewport middle stays lit, the rest recede
      const center = vh * 0.45
      let idx = -1
      wrap.querySelectorAll('.job').forEach((el, j) => {
        if (el.getBoundingClientRect().top <= center) idx = j
      })
      if (idx !== lastActive) {
        lastActive = idx
        setActive(idx)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <Section id="experience" index="03" title="Experience" kicker="Where I've shipped">
      <IntlStrip />
      <div ref={jobsRef} className={`jobs${active >= 0 ? ' has-active' : ''}`}>
        <span className="jobs-progress" ref={barRef} aria-hidden="true" />
        {experience.map((job, i) => (
          <Job key={job.company} job={job} i={i} active={i === active} />
        ))}
      </div>
    </Section>
  )
}
