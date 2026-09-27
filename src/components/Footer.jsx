import { ArrowUp } from 'lucide-react'
import { profile, marqueeItems } from '../data'
import { useLocalTime } from '../hooks'

export default function Footer() {
  const time = useLocalTime(profile.timezone)
  return (
    <footer className="footer">
      <div className="footer-mark" aria-hidden="true">
        SIDDHARTH
      </div>
      <div className="container footer-inner">
        <div className="footer-left mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="muted">{profile.location} · {time} IST</span>
        </div>
        <div className="footer-links mono">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.huggingface} target="_blank" rel="noreferrer">Hugging Face</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <a href="#top" className="mono footer-top" aria-label="Back to top">
          Top <ArrowUp size={14} />
        </a>
      </div>
      <div className="container footer-note mono muted">
        Designed & engineered by Siddharth N R · React + Vite
      </div>
    </footer>
  )
}
