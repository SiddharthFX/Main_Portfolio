import Section from './Section'
import { skills } from '../data'
import { useInView } from '../hooks'

function SkillGroup({ group, i }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`skill-row reveal ${inView ? 'in-view' : ''}`}
      style={{ '--delay': `${i * 80}ms` }}
    >
      <div className="skill-row-head">
        <span className="mono skill-index">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="skill-name">{group.group}</h3>
        <span className="mono skill-count">
          {group.items.length} {group.items.length === 1 ? 'tool' : 'tools'}
        </span>
      </div>
      <ul className="skill-items mono">
        {group.items.map((item) => (
          <li key={item}>
            <span className="skill-item">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const total = skills.reduce((n, g) => n + g.items.length, 0)
  return (
    <Section id="stack" index="05" title="Stack" kicker={`${total} tools · 5 domains`}>
      <div className="skills-wrap">
        <aside className="skills-rail">
          <p className="skills-statement">
            The toolkit behind <em className="serif">every</em> release.
          </p>
          <p className="skills-note">
            Five domains, zero filler — from DDP training and NF4 quantization to NLI
            verification and Cloud Run deployments.
          </p>
        </aside>
        <div className="skills-col">
          {skills.map((g, i) => (
            <SkillGroup key={g.group} group={g} i={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
