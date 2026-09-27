import Section from './Section'
import { labReleases } from '../data'
import { useInView } from '../hooks'

function Release({ release }) {
  const [ref, inView] = useInView()
  return (
    <article ref={ref} className={`release reveal ${inView ? 'in-view' : ''}`}>
      <div className="release-head">
        <span className="mono release-id accent">{release.id}</span>
        <h3 className="release-name">{release.name}</h3>
        <span className="mono release-tag">{release.tag}</span>
      </div>
      <p className="release-desc">{release.description}</p>
      <dl className="release-metrics mono">
        {release.metrics.map((m) => (
          <div className="metric" key={m.k}>
            <dt>{m.k}</dt>
            <dd>{m.v}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export default function Lab() {
  return (
    <Section id="lab" index="02" title="The Lab" kicker="Pluto AI Labs — open-source releases">
      <div className="releases">
        {labReleases.map((r) => (
          <Release key={r.id} release={r} />
        ))}
      </div>
    </Section>
  )
}
