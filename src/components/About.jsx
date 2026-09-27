import Section from './Section'
import Words from './Words'
import { about } from '../data'
import { useInView } from '../hooks'

const HEADING = [
  { t: 'Small' },
  { t: 'models.' },
  { t: 'Disproportionate', s: true, c: 'accent' },
  { t: 'results.' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <Section id="about" index="01" title="About" kicker="Who's behind the models">
      <div ref={ref} className={`about ${inView ? 'in-view' : ''} reveal`}>
        <div>
          <p className="mono about-chips">
            <span>EST. JAN 2026</span>
            <span>PLUTO AI LABS</span>
            <span>TAMIL NADU · IN</span>
          </p>
          <h3 className="about-heading">
            <Words
              as="span"
              segments={HEADING}
              inView={inView}
            />
          </h3>
        </div>
        <div className="about-body">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  )
}
