import { ArrowUpRight, Github, Linkedin, Phone, MapPin } from 'lucide-react'
import { profile } from '../data'
import Words from './Words'
import { useInView } from '../hooks'

const TITLE = [
  { t: "Let's" },
  { t: 'build' },
  { t: 'the' },
  { t: 'future' },
  { t: 'of' },
  { t: 'local-first', s: true, c: 'accent' },
  { t: 'AI.' },
]

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div ref={ref} className={`contact-inner reveal ${inView ? 'in-view' : ''}`}>
          <p className="mono contact-kicker">
            <span className="accent">///</span> 07 — Contact
          </p>
          <h2 className="contact-title">
            <Words as="span" segments={TITLE} inView={inView} />
          </h2>
          <p className="contact-sub">
            Open to AI/MLOps engineering roles and interesting collaborations. My inbox is the
            fastest way to reach me.
          </p>

          <a href={`mailto:${profile.email}`} className="contact-mail">
            {profile.email}
            <ArrowUpRight className="contact-mail-arrow" size={40} />
          </a>

          <div className="contact-grid mono">
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-cell">
              <Github size={16} /> GitHub
              <span className="muted">@SiddharthFX</span>
              <ArrowUpRight size={14} />
            </a>
            <a href={profile.huggingface} target="_blank" rel="noreferrer" className="contact-cell">
              <span className="hf">🤗</span> Hugging Face
              <span className="muted">Pluto-AI-Labs</span>
              <ArrowUpRight size={14} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-cell">
              <Linkedin size={16} /> LinkedIn
              <span className="muted">siddharth-n-r</span>
              <ArrowUpRight size={14} />
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-cell">
              <Phone size={16} /> {profile.phone}
            </a>
            <span className="contact-cell">
              <MapPin size={16} /> {profile.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
