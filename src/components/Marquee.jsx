import { marqueeItems } from '../data'

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="mono marquee-item" key={i}>
            {item} <span className="accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
