import Section from './Section'
import { GraduationCap, BadgeCheck, Languages } from 'lucide-react'
import { education, certifications, languages } from '../data'
import { useInView } from '../hooks'

export default function Education() {
  const [ref, inView] = useInView()
  const [featured, ...minis] = education

  return (
    <Section id="education" index="06" title="Education" kicker="Foundations">
      <div ref={ref} className={`edu reveal ${inView ? 'in-view' : ''}`}>
        <div className="edu-degree">
          <GraduationCap size={20} className="accent edu-icon" />
          <div className="edu-list">
            <div className="edu-item">
              <div className="edu-row">
                <h3>
                  {featured.school} <span className="muted">· {featured.affiliation}</span>
                </h3>
                <span className="mono muted">{featured.period}</span>
              </div>
              <p className="edu-degree-name">{featured.degree}</p>
              <p className="mono edu-detail">{featured.detail}</p>
              <p className="edu-note">{featured.note}</p>
            </div>

            <p className="mono edu-mini-label">Schooling</p>
            {minis.map((m) => (
              <div className="edu-mini" key={m.degree}>
                <div>
                  <h4>{m.school}</h4>
                  <p>{m.degree}</p>
                  <p className="mono muted edu-mini-detail">{m.detail}</p>
                </div>
                <span className="mono muted">{m.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="edu-side">
          <div className="edu-block">
            <h4 className="mono edu-side-title">
              <BadgeCheck size={14} className="accent" /> Certifications
            </h4>
            <ul className="certs">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="edu-block">
            <h4 className="mono edu-side-title">
              <Languages size={14} className="accent" /> Languages
            </h4>
            <ul className="langs mono">
              {languages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span className="muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
