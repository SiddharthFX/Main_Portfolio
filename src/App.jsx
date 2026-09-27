import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Lab from './components/Lab'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorLayer from './components/CursorLayer'
import Boot from './components/Boot'
import { useTheme } from './hooks'

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}

export default function App() {
  const [theme] = useTheme()
  const [booted, setBooted] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const handleBooted = useCallback(() => setBooted(true), [])

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <CursorLayer />
      <ScrollProgress />
      <Nav theme={theme} />
      <main>
        <Hero theme={theme} ready={booted} />
        <Marquee />
        <About />
        <Lab />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      {!booted && <Boot onDone={handleBooted} />}
    </>
  )
}
