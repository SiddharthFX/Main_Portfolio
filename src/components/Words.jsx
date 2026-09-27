export default function Words({ segments, className = '', as: Tag = 'span', inView = true }) {
  const full = segments.map((s) => s.t).join(' ')
  return (
    <Tag className={className} aria-label={full}>
      <span aria-hidden="true" className={`words ${inView ? 'words-in' : ''}`}>
        {segments.map((seg, i) => (
          <span
            key={i}
            className={`wmask${seg.s ? ' serif' : ''}${seg.c ? ` ${seg.c}` : ''}`}
            style={{ '--wd': `${i * 42}ms` }}
          >
            <span className="word">{seg.t}</span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
