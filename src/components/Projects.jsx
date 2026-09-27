import Section from './Section'
import { ArrowUpRight } from 'lucide-react'
import { projects, publications } from '../data'
import { useInView, useTilt } from '../hooks'

function Project({ project }) {
  const [ref, inView] = useInView()
  const tiltRef = useTilt(project.flagship ? 2.5 : 4)

  return (
    <a
      ref={(node) => {
        ref.current = node
        tiltRef.current = node
      }}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`project reveal ${project.flagship ? 'project--flagship' : ''} ${
        inView ? 'in-view' : ''
      }`}
    >
      <div className="project-top">
        <span className="mono project-kind">{project.kind}</span>
        <div className="project-top-right">
          {project.flagship && <span className="mono flag-tag">Flagship</span>}
          {project.period && <span className="mono muted">{project.period}</span>}
        </div>
      </div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.desc}</p>
      <ul className="project-points">
        {project.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>
      <ul className="chips mono">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <span className="project-link-row mono">
        {project.linkLabel || 'Visit live site'} <ArrowUpRight size={14} />
      </span>
    </a>
  )
}

function Publication({ pub }) {
  const [ref, inView] = useInView()
  return (
    <a
      ref={ref}
      href={pub.url}
      target="_blank"
      rel="noreferrer"
      className={`pub reveal ${inView ? 'in-view' : ''}`}
    >
      <span className="mono pub-ref accent">{pub.ref}</span>
      <span className="pub-body">
        <span className="pub-title">{pub.title}</span>
        <span className="mono pub-meta">
          {pub.venue} · {pub.year}
        </span>
      </span>
      <ArrowUpRight size={18} className="pub-arrow" />
    </a>
  )
}

export default function Projects() {
  return (
    <Section id="projects" index="04" title="Selected Projects" kicker="Five builds — all shipped">
      <div className="projects-grid">
        {projects.map((p) => (
          <Project key={p.name} project={p} />
        ))}
      </div>

      <div id="writing" className="pubs">
        <h3 className="pubs-title mono">Publications</h3>
        {publications.map((pub) => (
          <Publication key={pub.ref} pub={pub} />
        ))}
      </div>
    </Section>
  )
}
