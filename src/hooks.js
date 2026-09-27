import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, inView]
}

export function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}

export function useLocalTime(timezone) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
    })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [timezone])
  return time
}

export function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document === 'undefined'
      ? 'light'
      : document.documentElement.getAttribute('data-theme') || 'light'
  )

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'light')
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
  }

  return [theme, toggle]
}

function finePointerMotion() {
  return (
    typeof window !== 'undefined' &&
    !window.matchMedia('(pointer: coarse)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useMagnetic(strength = 0.22) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !finePointerMotion()) return
    let raf = null

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = 'translate(0px, 0px)'
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}

export function useTilt(max = 5) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !finePointerMotion()) return
    let raf = null

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(950px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
          px * max
        ).toFixed(2)}deg) translateY(-4px)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = ''
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])

  return ref
}

let smoothActive = false

export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {}
  if (smoothActive) return () => {}
  if (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return () => {}

  smoothActive = true

  let target = window.scrollY
  let current = target
  let raf = null

  const max = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const clamp = (v) => Math.max(0, Math.min(v, max()))

  const onWheel = (e) => {
    if (e.ctrlKey || e.metaKey) return
    e.preventDefault()
    let dy = e.deltaY
    if (e.deltaMode === 1) dy *= 33
    else if (e.deltaMode === 2) dy *= window.innerHeight
    const step = Math.abs(dy) < 60 ? dy * 2.1 : dy * 1.25
    target = clamp(target + step)
  }

  const loop = () => {
    const gap = target - current
    const ease = Math.min(0.22, 0.09 + Math.abs(gap) / 2600)
    current += gap * ease
    if (Math.abs(target - current) < 0.05) current = target
    window.scrollTo(0, current)
    const actual = window.scrollY
    if (Math.abs(actual - current) > 3) {
      current = actual
      target = actual
    }
    raf = requestAnimationFrame(loop)
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  raf = requestAnimationFrame(loop)

  return () => {
    smoothActive = false
    window.removeEventListener('wheel', onWheel)
    cancelAnimationFrame(raf)
  }
}
