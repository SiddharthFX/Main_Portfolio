import { useEffect, useRef } from 'react'

const LAYERS = [4, 6, 6, 3]
const LABELS = ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT']
const ENERGY = '210, 176, 122'

export default function NeuralField({ theme }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = 0
    let H = 0
    let compact = false
    let nodes = []
    let edges = []
    let rings = []
    let signals = []
    let layerXs = []
    let spanYCur = 0
    let cyCur = 0
    let raf = null
    let running = true
    let lastSpawn = 0
    let nextDelay = 650
    const start = performance.now()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const structRgb = () => (themeRef.current === 'light' ? '26,27,29' : '238,238,235')

    const pick = (arr) => arr[(Math.random() * arr.length) | 0]

    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

    function build() {
      nodes = []
      edges = []
      rings = []
      signals = []
      layerXs = []
      compact = W < 620

      const cx = W * 0.5
      const cy = H * 0.46
      cyCur = cy
      const spanX = Math.min(W * 0.96, 600)
      spanYCur = Math.min(H * 0.74, compact ? 182 : 385)

      const layerNodes = []
      let id = 0
      const maxCount = Math.max(...LAYERS)
      LAYERS.forEach((count, li) => {
        const arr = []
        const layerH = spanYCur * ((count - 1) / (maxCount - 1))
        const gapY = count > 1 ? layerH / (count - 1) : 0
        const lx = cx - spanX / 2 + (spanX * li) / (LAYERS.length - 1)
        layerXs.push(lx)
        for (let i = 0; i < count; i++) {
          const n = {
            id: id++,
            li,
            ax: lx,
            ay: cy - layerH / 2 + gapY * i,
            phase: Math.random() * Math.PI * 2,
            speed: 0.25 + Math.random() * 0.35,
            amp: compact ? 1.9 : 3,
            r: (compact ? 2.6 : 3.2) + (li === 0 || li === LAYERS.length - 1 ? 0.35 : 0),
            x: 0,
            y: 0,
            fire: 0,
            glow: 0,
            out: [],
          }
          arr.push(n)
          nodes.push(n)
        }
        layerNodes.push(arr)
      })

      for (let li = 0; li < layerNodes.length - 1; li++) {
        for (const a of layerNodes[li]) {
          for (const b of layerNodes[li + 1]) {
            if (Math.random() < 0.16) continue
            const e = {
              a,
              b,
              w: 0.35 + Math.random() * 0.65,
              glow: 0,
            }
            edges.push(e)
            a.out.push(e)
          }
        }
      }
    }

    function pointAt(e, rawT) {
      const t = easeInOut(Math.min(Math.max(rawT, 0), 1))
      return {
        x: e.a.x + (e.b.x - e.a.x) * t,
        y: e.a.y + (e.b.y - e.a.y) * t,
      }
    }

    function ignite(node, depth) {
      if (!node.out.length) return
      const e = pick(node.out)
      e.glow = Math.max(e.glow, 0.25)
      signals.push({
        e,
        t: 0,
        sp: 0.006 + Math.random() * 0.003,
        depth,
      })
    }

    function spawnForward(now) {
      if (signals.length >= 6) return
      const inputs = nodes.filter((n) => n.li === 0)
      const n = pick(inputs)
      n.fire = 1
      ignite(n, 1)
      lastSpawn = now
      nextDelay = 550 + Math.random() * 720
    }

    function drawFrame(now) {
      const col = structRgb()
      const t = reduced ? 0 : (now - start) / 1000
      ctx.clearRect(0, 0, W, H)

      for (const n of nodes) {
        n.x = n.ax + Math.sin(t * n.speed + n.phase) * n.amp
        n.y = n.ay + Math.cos(t * n.speed * 0.85 + n.phase * 1.3) * n.amp
        n.fire *= 0.95
        n.glow *= 0.9
      }

      for (const e of edges) e.glow *= 0.97

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i]
        s.t += s.sp
        s.e.glow = Math.min(s.e.glow + 0.05, 1)
        if (s.t >= 1) {
          const b = s.e.b
          b.fire = 1
          rings.push({ x: b.x, y: b.y, r: b.r * 1.3, a: 0.5 })
          signals.splice(i, 1)
          if (!reduced && s.depth < 3 && b.out.length && Math.random() < 0.85) {
            ignite(b, s.depth + 1)
          }
        }
      }

      ctx.save()

      for (const e of edges) {
        const g = e.glow
        const base = 0.07 + e.w * 0.09 + g * 0.28 + (e.a.glow + e.b.glow) * 0.08
        ctx.strokeStyle = `rgba(${col},${Math.min(base, 0.55).toFixed(3)})`
        ctx.lineWidth = 0.8 + e.w * 0.8
        ctx.beginPath()
        ctx.moveTo(e.a.x, e.a.y)
        ctx.lineTo(e.b.x, e.b.y)
        ctx.stroke()

        if (g > 0.03) {
          ctx.strokeStyle = `rgba(${ENERGY},${Math.min(g * 0.6, 0.65).toFixed(3)})`
          ctx.lineWidth = (1 + e.w * 0.7) * (g > 0.4 ? 1.25 : 1)
          ctx.beginPath()
          ctx.moveTo(e.a.x, e.a.y)
          ctx.lineTo(e.b.x, e.b.y)
          ctx.stroke()
        }
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i]
        r.r += 0.8
        r.a *= 0.92
        if (r.a < 0.02) {
          rings.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(${ENERGY},${r.a.toFixed(3)})`
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (const n of nodes) {
        const energy = Math.min(n.fire + n.glow, 1)
        const R = n.r * (1 + n.fire * 0.85 + n.glow * 0.18)

        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, R * 4.2)
        halo.addColorStop(0, `rgba(${col},${(0.12 + energy * 0.26).toFixed(3)})`)
        halo.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(n.x, n.y, R * 4.2, 0, Math.PI * 2)
        ctx.fill()

        if (n.fire > 0.04) {
          const fh = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, R * 3.4)
          fh.addColorStop(0, `rgba(${ENERGY},${(n.fire * 0.42).toFixed(3)})`)
          fh.addColorStop(1, `rgba(${ENERGY},0)`)
          ctx.fillStyle = fh
          ctx.beginPath()
          ctx.arc(n.x, n.y, R * 3.4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(${col},${(0.62 + energy * 0.38).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, R, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,255,255,${(0.2 + energy * 0.25).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x - R * 0.3, n.y - R * 0.32, Math.max(R * 0.3, 0.7), 0, Math.PI * 2)
        ctx.fill()

        if (n.fire > 0.04) {
          ctx.fillStyle = `rgba(${ENERGY},${(n.fire * 0.85).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, R, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = `rgba(${ENERGY},${(n.fire * 0.8).toFixed(3)})`
          ctx.lineWidth = 1.1
          ctx.beginPath()
          ctx.arc(n.x, n.y, R + 3 + (1 - n.fire) * 7, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      for (const s of signals) {
        const head = pointAt(s.e, s.t)
        const tail = pointAt(s.e, Math.max(s.t - 0.14, 0))
        const mid = pointAt(s.e, Math.max(s.t - 0.07, 0))

        ctx.strokeStyle = `rgba(${ENERGY},0.28)`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(tail.x, tail.y)
        ctx.lineTo(head.x, head.y)
        ctx.stroke()

        ctx.strokeStyle = `rgba(${ENERGY},0.75)`
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(mid.x, mid.y)
        ctx.lineTo(head.x, head.y)
        ctx.stroke()

        ctx.fillStyle = `rgba(${ENERGY},0.95)`
        ctx.beginPath()
        ctx.arc(head.x, head.y, 2.1, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.font = `${compact ? 8 : 9}px 'JetBrains Mono', monospace`
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(${col},0.45)`
      const labelY = cyCur + spanYCur / 2 + (compact ? 17 : 28)
      layerXs.forEach((lx, li) => {
        ctx.fillText(LABELS[li], lx, labelY)
      })

      ctx.restore()
    }

    function tick(now) {
      if (!running) return

      if (!reduced && now - lastSpawn > nextDelay && !document.hidden) spawnForward(now)

      drawFrame(now)
      raf = requestAnimationFrame(tick)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      if (!W || !H) return
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      drawFrame(performance.now())
    }

    const onVis = () => {
      running = !document.hidden
      if (running) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)

    resize()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas className="neural-field" ref={canvasRef} aria-hidden="true" />
}
