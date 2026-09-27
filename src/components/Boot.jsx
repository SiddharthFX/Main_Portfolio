import { useEffect, useRef, useState } from 'react'

const STEPS = [
  'loading weights',
  'quantizing · nf4',
  'sharding tensors',
  'warming kv cache',
  'forward pass ready',
]

export default function Boot({ onDone }) {
  const [pct, setPct] = useState(0)
  const [closing, setClosing] = useState(false)
  const rafRef = useRef(null)
  const doneRef = useRef(false)
  const finishRef = useRef(null)

  useEffect(() => {
    const DURATION = 2100
    let timeout
    const t0 = performance.now()

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      setPct(100)
      setClosing(true)
      timeout = setTimeout(onDone, 480)
    }
    finishRef.current = finish

    const tick = (now) => {
      if (doneRef.current) return
      const p = Math.min((now - t0) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else finish()
    }

    rafRef.current = requestAnimationFrame(tick)

    const skip = () => finishRef.current && finishRef.current()
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchstart', skip, { passive: true })
    window.addEventListener('keydown', skip)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(timeout)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchstart', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [onDone])

  const step = STEPS[Math.min(Math.floor((pct / 100) * STEPS.length), STEPS.length - 1)]

  return (
    <div
      className={`boot ${closing ? 'is-done' : ''}`}
      role="status"
      aria-label="Loading portfolio"
      onClick={() => finishRef.current && finishRef.current()}
    >
      <div className="boot-rail mono">
        <span>Pluto AI Labs</span>
        <span className="muted">siddharth.nr — folio v2.6</span>
      </div>

      <div className="boot-center">
        <p className="mono boot-kicker">Initializing local model</p>
        <div className="boot-num" aria-hidden="true">
          <span className="boot-pct">{pct}</span>
          <span className="boot-sign">%</span>
        </div>
        <div className="boot-track">
          <div className="boot-fill" style={{ width: `${pct}%` }} />
          <div className="boot-head" style={{ left: `${pct}%` }} />
        </div>
      </div>

      <div className="boot-rail mono">
        <span>
          {step}
          <i className="boot-caret">▊</i>
        </span>
        <span className="muted">{String(pct).padStart(3, '0')} / 100</span>
      </div>
    </div>
  )
}
