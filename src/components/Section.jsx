import { useInView } from '../hooks'

export default function Section({ id, index, title, kicker, children }) {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section id={id} className="section">
      <div className="container">
        <header ref={ref} className={`section-head reveal ${inView ? 'in-view' : ''}`}>
          <div className="section-head-row">
            <span className="mono section-index">{index}</span>
            <h2 className="section-title">{title}</h2>
            {kicker && <span className="mono section-kicker">{kicker}</span>}
          </div>
          <div className="rule" />
        </header>
        {children}
      </div>
    </section>
  )
}
