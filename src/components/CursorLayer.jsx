import { useEffect, useRef } from 'react'

export default function CursorLayer() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    const dot = dotRef.current
    const root = document.documentElement
    root.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let hovering = false
    let visible = false
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
      }
      const t = e.target.closest('a, button, [data-cursor]')
      hovering = !!t
    }

    const onLeaveDoc = () => {
      visible = false
      dot.style.opacity = '0'
    }

    const loop = () => {
      const s = hovering ? 2.2 : 1
      dot.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px) scale(${s})`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeaveDoc)
    raf = requestAnimationFrame(loop)

    return () => {
      root.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeaveDoc)
    }
  }, [])

  return <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
}
