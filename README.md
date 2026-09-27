<div align="center">

# SIDDHARTH N R — Portfolio

**AI / MLOps Engineer · Founder — Pluto AI Labs**

A dark-first, performance-obsessed personal portfolio with a live neural-network
visualization, a sunset-gradient identity system, and an LLM-style boot sequence.

`React 19` `Vite 6` `Zero UI Libraries` `100/100 Lighthouse-ready`

</div>

---

## ✨ Highlights

- **Live Neural Field** — a hand-coded canvas simulation of a 4-layer feed-forward network
  (4 → 6 → 6 → 3). Weighted synapses, forward-pass activations with eased propagation,
  ignition rings, and organic firing rhythms. No animation libraries.
- **First-class boot sequence** — an LLM-style loader (`loading weights → quantizing →
  sharding tensors → warming kv cache`) that never blocks interaction.
- **Sunset identity system** — `#FDC830 → #F37335` gradient running through buttons,
  stat numerals, energy pulses, selection, scroll progress, and favicon.
- **Light / dark themes** with the View Transitions API driving a circular reveal
  from the theme toggle (graceful fallback elsewhere).
- **Floating capsule navbar** with scrollspy, plus a frosted-glass mobile sheet menu.
- **Editorial content sections** — Lab releases index, flagship project grid, spec-sheet
  skill matrix, timeline experience, publications, and schooling history.
- **Accessible & respectful** — reduced-motion users skip all choreography; safe-area
  insets for notched devices; semantic landmarks throughout.

## 🧠 Tech Stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | React 19 + Vite 6                         |
| Language   | JavaScript (JSX)                          |
| Styling    | Hand-written CSS, custom design tokens    |
| Typography | Sora · JetBrains Mono · Instrument Serif  |
| Icons      | lucide-react                              |
| Canvas     | Raw 2D context neural-network simulation  |

## 🚀 Getting Started

```bash
# clone
git clone https://github.com/SiddharthFX/portfolio.git
cd portfolio

# install
npm install

# develop
npm run dev        # http://localhost:5173

# production build & preview
npm run build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── index.html                  # fonts, meta, theme bootstrap
├── src/
│   ├── main.jsx                # entry
│   ├── App.jsx                 # shell: nav, sections, boot gate
│   ├── data.js                 # ← single source of truth for all content
│   ├── hooks.js                # useInView, useCountUp, useTilt, useTheme…
│   ├── styles.css              # full design system
│   └── components/
│       ├── Boot.jsx            # loading screen
│       ├── CursorLayer.jsx     # accent dot cursor
│       ├── Nav.jsx             # capsule navbar + mobile sheet
│       ├── Hero.jsx            # identity block + stats band
│       ├── NeuralField.jsx     # canvas neural network
│       ├── Marquee.jsx         # tech ticker
│       ├── About / Lab / Experience / Projects
│       ├── Skills / Education / Contact / Footer
│       └── Section / Words     # layout + staggered-text primitives
└── dist/                       # production build output
```

> All résumé content lives in `src/data.js` — edit one file to make it yours.

## ☁️ Deployment

**Vercel / Netlify** — import the repo, framework preset *Vite*, done.

```bash
npm run build     # outputs to dist/
```

For GitHub Pages, set `base` in `vite.config.js` to your repo name and publish `dist/`.

## 🤝 Connect

| Channel      | Link                                        |
| ------------ | ------------------------------------------- |
| Email        | siddhufx7@gmail.com                         |
| GitHub       | [@SiddharthFX](https://github.com/SiddharthFX) |
| Hugging Face | [Pluto-AI-Labs](https://huggingface.co/Pluto-AI-Labs) |
| LinkedIn     | [siddharth-n-r](https://linkedin.com/in/siddharth-n-r-842529356) |

---

<div align="center">
<sub>Built from scratch with React + Vite — no templates, no UI kits.</sub>
</div>
