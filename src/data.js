export const profile = {
  name: 'Siddharth N R',
  firstName: 'Siddharth',
  lastName: 'N R',
  role: 'AI / MLOps Engineer',
  org: 'Founder — Pluto AI Labs',
  email: 'siddhufx7@gmail.com',
  phone: '+91 99946 13811',
  location: 'Tamil Nadu, India',
  timezone: 'Asia/Kolkata',
  github: 'https://github.com/SiddharthFX',
  huggingface: 'https://huggingface.co/Pluto-AI-Labs',
  linkedin: 'https://linkedin.com/in/siddharth-n-r-842529356',
}

export const heroStats = [
  { value: 7000, suffix: '+', label: 'Cumulative Hugging Face downloads' },
  { value: 4, prefix: '#', label: 'Global rank, sub-1B models' },
  { value: 8, suffix: '+', label: 'Open-source AI orgs contributed' },
  { value: 250, suffix: 'K', label: 'Vision-language rows open-sourced' },
]

export const marqueeItems = [
  'Apple MLX',
  'Hugging Face',
  'PyTorch',
  'QLoRA',
  'DDP Training',
  'GGUF / llama.cpp',
  'Knowledge Distillation',
  '4-bit NF4 Quantization',
  'Docker',
  'GitHub Actions',
]

export const about = {
  heading: 'Small models. Disproportionate results.',
  paragraphs: [
    "I'm Siddharth — an AI engineer and the founder of Pluto AI Labs, an independent research lab built around one question: how much capability can you squeeze into a model that runs at the edge?",
    'Since January 2026, I have shipped open-source models with 7,000+ cumulative Hugging Face downloads — including Apollo-VL-Edge-3B, a 3B vision-language model trained on 2x T4s that matches Qwen2.5-VL-3B-Instruct on ChartQA (78.6%) and AI2D (78.0%), and Pluto-Genesis-0.6B, which reached 2,000+ downloads in 48 hours and ranked #4 globally among sub-1B models.',
    "I contribute to 8+ open-source AI organizations including Apple's MLX — where released work includes quantized MLX-format models — engineer fault-tolerant training with cross-session checkpoint recovery on constrained hardware, and curate high-signal corpora such as Athena-VL-250K.",
    'Currently an AI/ML Research Contributor at Crebiliti Limited (evidence positioning for LLM systems, 78% → 98% verification accuracy), and open to AI/MLOps engineering roles to build scalable, local-first AI infrastructure.',
  ],
}

export const labReleases = [
  {
    id: 'PL-01',
    name: 'Pluto-Genesis-0.6B',
    tag: 'Language Model',
    description:
      'QLoRA fine-tune to a 44.02% benchmark average — #4 globally among sub-1B models with 2,000+ downloads in 48 hours. Solved a Hugging Face Trainer failure mode with a 3-layer cross-session checkpoint recovery system.',
    metrics: [
      { k: 'Benchmark avg.', v: '44.02%' },
      { k: 'Global rank (sub-1B)', v: '#4' },
      { k: 'Downloads / 48h', v: '2,000+' },
      { k: 'Published', v: 'Zenodo · CERN' },
    ],
  },
  {
    id: 'PL-02',
    name: 'Apollo-VL-Edge-3B',
    tag: 'Vision-Language Model',
    description:
      '68-hour 2x T4 DDP QLoRA pipeline for a 3B vision-language model matching Qwen2.5-VL-3B-Instruct on ChartQA (78.6%) and AI2D (78.0%) while outperforming larger 4B+ models — 300+ downloads in 48 hours.',
    metrics: [
      { k: 'ChartQA', v: '78.6%' },
      { k: 'AI2D', v: '78.0%' },
      { k: 'Training run', v: '68h · 2x T4 DDP' },
      { k: 'Downloads / 48h', v: '300+' },
    ],
  },
  {
    id: 'PL-03',
    name: 'Atlas-Coder-2-0.5B',
    tag: 'Coding Model',
    description:
      'Fine-tuned past Qwen2.5-Coder-0.5B and DeepSeek-Coder-1.3B on strict EvalPlus benchmarks (36.6% HumanEval+). Packaged as a 400MB GGUF running at 75 tokens/sec on 8GB MacBooks.',
    metrics: [
      { k: 'HumanEval+', v: '36.6%' },
      { k: 'Inference', v: '75 tok/s' },
      { k: 'Footprint', v: '400MB GGUF' },
      { k: 'Hardware', v: '8GB MacBooks' },
    ],
  },
  {
    id: 'PL-04',
    name: 'Athena-VL-250K',
    tag: 'Data Engineering',
    description:
      'Curated and released Athena-VL-250K, a 250,000-row vision-language corpus powering Athena 1.0-4B — engineered to deliver 9B-class document and chart intelligence on consumer hardware.',
    metrics: [
      { k: 'Corpus', v: '250,000 rows' },
      { k: 'Powers', v: 'Athena 1.0-4B' },
      { k: 'Target', v: '9B-class intelligence' },
    ],
  },
]

export const experience = [
  {
    company: 'Crebiliti Limited',
    role: 'AI/ML Research Contributor',
    period: 'Sep 2026 — Present',
    location: 'England, UK (Remote)',
    points: [
      'Conduct AI/ML research on evidence positioning for LLM systems, combining deterministic attribute engines with model-based inference to raise verification accuracy from 78% to 98% on controlled benchmarks.',
      'Design and execute controlled experiments across claim-evidence relation categories (NLI, embeddings, LLM judges), producing an attribute-level failure matrix that guides the research roadmap.',
      'Build a validated synthetic-data pipeline for AFU classifier training, combining local LLM generation, dual-NLI validation, and leakage-tested dataset splits with full provenance.',
    ],
    current: true,
  },
  {
    company: 'Pluto AI Labs',
    role: 'Founder & Lead AI Engineer',
    period: 'Jan 2026 — Present',
    location: 'Remote, India',
    points: [
      'Founded an independent AI research lab; shipped open-source edge models generating 7,000+ cumulative Hugging Face downloads and became an active contributor to 8+ open-source AI organizations, including Apple’s MLX, where released work includes quantized MLX-format models.',
      'Architected a 68-hour 2x T4 DDP QLoRA pipeline for Apollo-VL-Edge-3B, a 3B vision-language model matching Qwen2.5-VL-3B-Instruct on ChartQA (78.6%) and AI2D (78.0%) while outperforming larger 4B+ models — 300+ downloads in 48 hours.',
      'Curated and released Athena-VL-250K, a 250,000-row vision-language corpus powering Athena 1.0-4B, engineered to deliver 9B-class document and chart intelligence on consumer hardware.',
      'Fine-tuned Pluto-Genesis-0.6B via QLoRA to a 44.02% benchmark average (#4 globally among sub-1B models, 2,000+ downloads in 48 hours), solving a Hugging Face Trainer failure mode with a 3-layer cross-session checkpoint recovery system.',
      'Fine-tuned Atlas-Coder-2-0.5B past Qwen2.5-Coder-0.5B and DeepSeek-Coder-1.3B on strict EvalPlus benchmarks (36.6% HumanEval+); packaged as a 400MB GGUF running at 75 tokens/sec on 8GB MacBooks.',
    ],
    current: true,
  },
  {
    company: 'Codec Technologies',
    role: 'Blockchain Developer (Intern)',
    period: 'Jan 2026 — Mar 2026',
    location: 'Remote, India',
    points: [
      'Designed and implemented ERC-1155 multi-token smart contracts on Ethereum with a distributed New Zealand and India team, applying secure infrastructure design that directly informed the peer-reviewed Sentient Audit research.',
      'Developed Solidity smart contracts for Ethereum applications, building deep familiarity with code-level vulnerability patterns.',
    ],
  },
  {
    company: 'MegaBliss Worldwide',
    role: 'AI-Based Blockchain Developer (Intern)',
    period: 'Aug 2025 — Nov 2025',
    location: 'Remote, New Zealand',
    points: [
      'Built real-estate NFT infrastructure on Ethereum with AI-assisted contract logic and automated compliance for an international client, delivering ERC-1155 multi-token smart contracts with a distributed New Zealand and India team.',
    ],
  },
  {
    company: 'Igress Solutions LLP',
    role: 'Machine Learning Engineer (Intern)',
    period: 'Jun 2024',
    location: 'Remote, Bangalore, India',
    points: [
      'Developed LLM-integrated machine learning pipelines for data analysis and automated insight generation, and built Power BI dashboards for client-facing reporting.',
    ],
  },
]

export const projects = [
  {
    flagship: true,
    name: 'llm-diff',
    kind: 'PyPI CLI — “git diff for LLM behavior”',
    period: 'Jun 2026 — Jul 2026',
    desc: 'Behavioral regression testing for LLMs: backend-agnostic client (Ollama, OpenAI, Groq), regex-based scorers across behavioral dimensions, and CI/CD-ready exit codes for GitHub Actions and Jenkins.',
    points: [
      'Backend-agnostic client: Ollama, OpenAI, Groq',
      'Regex-based scorers across behavioral dimensions',
      'CI/CD-ready exit codes for GitHub Actions and Jenkins',
    ],
    stack: ['Python', 'Ollama', 'OpenAI', 'Groq', 'GitHub Actions', 'Jenkins'],
    url: 'https://pluto-llm-diff.vercel.app/',
  },
  {
    name: 'AuditLink AI',
    kind: 'Smart Contract Audit Platform',
    period: 'Apr 2025 — May 2025',
    desc: 'Real-time, on-chain audits of verified Solidity contracts: Chainlink Functions fetch source from Etherscan, Gemini scores vulnerabilities, and verified results are minted as NFT badges for transparency.',
    points: [
      'Chainlink Functions fetch source from Etherscan',
      'Gemini scores vulnerabilities',
      'Verified results minted as NFT badges',
    ],
    stack: ['Solidity', 'Chainlink Functions', 'Etherscan', 'Gemini', 'NFT'],
    url: 'https://auditlinkai.vercel.app/',
  },
  {
    name: 'AnvilX',
    kind: 'Blockchain Desktop App + Web Platform',
    period: null,
    desc: 'End-to-end macOS and web platform built solo: authentication flows, on-chain functionality, and production-ready deployment pipelines across the full stack.',
    points: [
      'Authentication flows and on-chain functionality',
      'Production-ready deployment pipelines across the full stack',
    ],
    stack: ['macOS', 'Web Platform', 'Auth', 'On-chain'],
    url: 'https://anvilx.vercel.app/',
  },
  {
    name: 'Crypfolio',
    kind: 'Privacy-First Crypto Tracker',
    period: 'Jun 2025 — Jul 2025',
    desc: 'Browser-only crypto portfolio tracker with live CoinGecko market data and P&L analytics; zero-account, local-only persistence that auto-expires after 48 hours.',
    points: [
      'Live CoinGecko market data with P&L analytics',
      'Zero-account, local-only persistence auto-expiring after 48 hours',
    ],
    stack: ['JavaScript', 'CoinGecko API', 'Browser-only'],
    url: 'https://crypfolio-pro.vercel.app/',
  },
  {
    name: 'MedASK AI',
    kind: 'Healthcare AI Platform',
    period: null,
    desc: 'OCR-to-insight pipeline that reads prescriptions via Google Cloud Vision and uses Gemini to return plain-language clinical guidance, deployed end-to-end on Google Cloud Run.',
    points: [
      'Prescriptions read via Google Cloud Vision',
      'Gemini returns plain-language clinical guidance',
      'Deployed end-to-end on Google Cloud Run',
    ],
    stack: ['Google Cloud Vision', 'Gemini', 'Google Cloud Run'],
    url: 'https://github.com/SiddharthFX/medask-AI',
    linkLabel: 'View on GitHub',
  },
]

export const publications = [
  {
    ref: '[01]',
    title:
      'Pluto-Genesis: Reliable QLoRA Fine-Tuning on Ephemeral Compute with Cross-Session Checkpoint Recovery for Sub-1B Language Models',
    venue: 'Zenodo (CERN)',
    year: 'Jul 2026',
    url: 'https://zenodo.org/records/21368749',
  },
  {
    ref: '[02]',
    title:
      'Sentient Audit: An AI-Driven Multi-Pass Security Analysis Platform for Smart Contract Vulnerability Detection and NFT Certification',
    venue: 'IRJMETS',
    year: '2026',
    url: 'https://www.irjmets.com',
  },
]

export const skills = [
  {
    group: 'MLOps & Training',
    items: ['Distributed Data Parallel (DDP)', 'QLoRA', 'Cross-Session Checkpoint Recovery', 'Hugging Face Hub API', 'Weights & Biases', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    group: 'Frameworks',
    items: ['PyTorch', 'Hugging Face Transformers', 'PEFT', 'TRL', 'bitsandbytes', 'scikit-learn', 'lmms-eval'],
  },
  {
    group: 'Model Optimization',
    items: ['Knowledge Distillation', '4-bit NF4 Quantization', 'Apple MLX Conversion & Quantization', 'GGUF / llama.cpp', 'MinHash Deduplication'],
  },
  {
    group: 'Verification Research',
    items: ['NLI Modeling', 'Embedding-Based Relation Scoring', 'LLM-as-Judge Evaluation', 'Synthetic Data Validation'],
  },
  {
    group: 'Web & Cloud',
    items: ['Python', 'FastAPI', 'React', 'Node.js', 'Google Cloud Run', 'Supabase', 'MongoDB Atlas'],
  },
]

export const education = [
  {
    featured: true,
    school: 'Ramco Institute of Technology',
    affiliation: 'Anna University',
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    period: '2022 — 2026',
    detail: 'CGPA 7.3 / 10 · Tamil Nadu, India',
    note: 'Machine Learning · Deep Learning · NLP · Computer Vision · Neural Networks · Data Structures and Algorithms',
  },
  {
    school: 'P.A.C.M Higher Secondary School',
    degree: 'Higher Secondary (Class XII) — Computer Science',
    period: '2022',
    detail: 'Tamil Nadu, India — 78.5%',
  },
  {
    school: 'P.A.C.M Higher Secondary School',
    degree: 'Secondary (Class X)',
    period: '2020',
    detail: 'Tamil Nadu, India — 78.2%',
  },
]

export const certifications = [
  'AI Capabilities and Limitations — Anthropic',
  'Claude 101 — Anthropic',
  'Machine Learning Specialization — DeepLearning.AI / Coursera (Andrew Ng)',
  'Full Stack AI Development — Google Antigravity and Cursor AI',
]

export const languages = [
  { name: 'Tamil', level: 'Native' },
  { name: 'Telugu', level: 'Mother Tongue' },
  { name: 'English', level: 'B1 · Professional' },
  { name: 'German', level: 'A1 · In Progress' },
]
