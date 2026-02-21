import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt=""
          className="max-w-[85vw] max-h-[85vh] object-contain rounded-3xl shadow-2xl border border-white/20"
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xl shadow-xl flex items-center justify-center text-stone-600 font-bold text-sm hover:bg-white hover:scale-110 transition-all duration-200"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

import angeloImg from './images/angelo.jpg'
import appHomeImg from './images/app-home.png'
import playStoreImg from './images/play-store.png'
import medicalInfoImg from './images/medical-info.png'
import sosCountdownImg from './images/sos-countdown.png'
import safetyCheckImg from './images/safety-check.png'
import earthquakeAlertImg from './images/earthquake-alert.png'

// ---------------------------------------------------------------------------
// Data Layer
// ---------------------------------------------------------------------------

type SlideBase = { id: number; title: string }

type TitleSlide = SlideBase & {
  type: 'title'
  subtitle: string
  eyebrow?: string
  isFinal?: boolean
}

type BulletsSlide = SlideBase & {
  type: 'bullets'
  points: string[]
  accent?: string
  icons?: string[]
  image?: string
}

type QuoteSlide = SlideBase & {
  type: 'quote'
  quote: string
  attribution: string
}

type TwoColSlide = SlideBase & {
  type: 'two-col'
  left: { heading: string; points: string[] }
  right: { heading: string; points: string[] }
  image?: string
}

type ProfileSlide = SlideBase & {
  type: 'profile'
  name: string
  role: string
  org: string
  image?: string
  left: { heading: string; points: string[] }
  right: { heading: string; points: string[] }
}

type Slide = TitleSlide | BulletsSlide | QuoteSlide | TwoColSlide | ProfileSlide

const SLIDES: Slide[] = [
  {
    id: 1,
    type: 'title',
    eyebrow: 'JPCS Outreach · Barangay Bangkal, Makati 2026',
    title: 'Google Personal Safety App',
    subtitle: "Your phone's built-in emergency tool — and how to use it.",
  },
  {
    id: 2,
    type: 'profile',
    title: 'About the Speaker',
    name: 'Angelo Laus',
    role: 'Director of External Relations',
    org: 'Junior Philippine Computer Society — Asia Pacific College',
    image: angeloImg,
    left: {
      heading: '🎓 Education & Roles',
      points: [
        'BS Computer Science — Cybersecurity & Forensics (GPA: 3.96)',
        'STEM IT Graduate (GWA: 95–97)',
        'Google Product Expert (since November 2025)',
        'Interim Head — Arduino Day Philippines 2026',
        'VP of External Growth & Expansion — CyberPH',
      ],
    },
    right: {
      heading: '🏆 Achievements & Certifications',
      points: [
        'HackForGov 2025 Philippines — Champion 🥇',
        'Certified Cybersecurity Analyst (C3SA)',
        'Certified Cybersecurity Educator Professional (CCEP)',
        'Certified Red Team Operations Manager (CRTOM)',
        'Certified Phishing Prevention Specialist (CPPS)',
      ],
    },
  },
  {
    id: 3,
    type: 'bullets',
    accent: 'Overview',
    title: 'What Is the Safety App?',
    icons: ['🛡️', '📲', '🚨', '🆓'],
    image: appHomeImg,
    points: [
      'A free emergency toolkit built into Android',
      "Look for it in your app drawer — it's called 'Safety'",
      'Calls for help and sends your GPS automatically',
      'Works on most Android phones — not just Google Pixel',
    ],
  },
  {
    id: 4,
    type: 'bullets',
    accent: 'Our Reality',
    title: 'Why Barangay Bangkal Needs This',
    icons: ['🌀', '🌊', '💊', '⚡'],
    points: [
      'Typhoons and flash floods hit Metro Manila every year',
      "Earthquakes can strike without warning — we're on the Ring of Fire",
      'Medical emergencies happen anywhere, anytime',
      'When seconds count, your phone can save your life',
    ],
  },
  {
    id: 5,
    type: 'two-col',
    title: 'Does Your Phone Support It?',
    left: {
      heading: '✅  Android 12 or Higher',
      points: [
        'Full Emergency SOS',
        'Real-time location sharing',
        'Safety Check timer',
        'Typhoon & earthquake alerts',
        'Most phones bought in 2022 or later',
      ],
    },
    right: {
      heading: '⚠️  Android 11 or Lower',
      points: [
        'App may not install from Play Store',
        'Basic medical info still works via Google Account',
        'No Safety Check or auto-alerts',
        'Check: Settings → About Phone → Android Version',
      ],
    },
  },
  {
    id: 6,
    type: 'bullets',
    accent: 'Step by Step',
    title: 'How to Install',
    icons: ['🔍', '📦', '⬇️', '🔐'],
    image: playStoreImg,
    points: [
      'Open Google Play Store on your Android phone',
      "Search for 'Personal Safety' — find the Google app",
      'Tap Install — it is completely free',
      'Open the app and sign in with your Google Account',
    ],
  },
  {
    id: 7,
    type: 'bullets',
    accent: 'Do This First',
    title: 'Set Up Your Medical Info',
    icons: ['🩸', '⚠️', '👤', '🔓'],
    image: medicalInfoImg,
    points: [
      'Enter your blood type, allergies, and medications',
      'Add chronic conditions — diabetes, hypertension, etc.',
      'Pick at least 2 emergency contacts nearby',
      "Turn ON 'Show on Lock Screen' — first responders need this",
    ],
  },
  {
    id: 8,
    type: 'bullets',
    accent: 'Your Fastest Lifeline',
    title: 'Emergency SOS',
    icons: ['🔴', '⏳', '📞', '📍'],
    image: sosCountdownImg,
    points: [
      'Press the power button 5 times fast — even on a locked screen',
      '5-second countdown — swipe to cancel if it was an accident',
      'Automatically calls your emergency contact',
      'Sends your exact GPS location right away',
    ],
  },
  {
    id: 9,
    type: 'bullets',
    accent: 'Let Someone Watch Over You',
    title: 'Emergency Sharing',
    icons: ['📡', '🗺️', '🔋', '🌙'],
    points: [
      'Share your live location with people you trust',
      'They track your path on Google Maps in real time',
      'Your battery level is shared — they know if you go quiet',
      'Great for late-night commutes or unfamiliar routes',
    ],
  },
  {
    id: 10,
    type: 'bullets',
    accent: 'Set It and Feel Safe',
    title: 'Safety Check Timer',
    icons: ['⏱️', '📝', '🔔', '✅'],
    image: safetyCheckImg,
    points: [
      'Set a timer from 15 minutes up to 24 hours',
      "Write a reason — e.g. 'Walking home from school'",
      "Miss the check-in? Your contacts are alerted automatically",
      "Cancel it when you arrive — that's all there is to it",
    ],
  },
  {
    id: 11,
    type: 'two-col',
    title: 'Earthquake Alerts — Powered by PHIVOLCS',
    image: earthquakeAlertImg,
    left: {
      heading: '🟡  Be Aware Alert',
      points: [
        'Weak to Moderately Strong — PEIS III to IV',
        'Silent notification only',
        'Stay calm, no immediate danger',
        'Post-quake safety tips are included',
      ],
    },
    right: {
      heading: '🔴  Take Action Alert',
      points: [
        'Strong and above — PEIS V or higher',
        'Loud siren — overrides silent mode',
        'Duck, Cover, Hold On — right now',
        "Don't turn off the alarm",
      ],
    },
  },
  {
    id: 12,
    type: 'bullets',
    accent: 'PAGASA Partnership',
    title: 'Typhoon & Flood Alerts',
    icons: ['🌀', '📢', '🗺️', '📋'],
    points: [
      'Connected directly to PAGASA — the official weather bureau',
      'Bypasses Do Not Disturb — you will hear this',
      'Shows storm path, wind speed, and your area risk level',
      'The warning comes to you — no need to check the news',
    ],
  },
  {
    id: 13,
    type: 'two-col',
    title: "Different Phone Brand? You're Covered.",
    left: {
      heading: '📱  Samsung & Xiaomi',
      points: [
        'Both: press power button 5 times fast',
        'Samsung: Settings → Safety and Emergency → Emergency SOS',
        'Xiaomi: Settings → Safety & Emergency → Emergency SOS',
        'Location sharing + auto-call both included',
      ],
    },
    right: {
      heading: '📱  Oppo & Realme',
      points: [
        'Both: press power button 5 times fast',
        'Oppo: has SOS Torch (flashing light) + loud Buzzer',
        'Realme: Settings → Safety & Emergency → Emergency SOS',
        'Same goal across all brands — just different names',
      ],
    },
  },
  {
    id: 14,
    type: 'bullets',
    accent: 'Save These Right Now',
    title: 'Barangay Bangkal Emergency Hotlines',
    icons: ['🆘', '👮', '🚒', '🚑', '🏛️'],
    points: [
      'National Emergency Hotline: 911',
      'Police — PCP 4 Bangkal Sub Station: 8 241 6173  |  0966 293 8945',
      'Fire — BFP Bangkal Sub Station: 8 844 4482  |  0968 690 0753',
      'Rescue: 0916 231 3858',
      'Disaster — Makati C3: 168  |  8 236 5790',
    ],
  },
  {
    id: 15,
    type: 'two-col',
    title: 'Tips for Every Age Group',
    left: {
      heading: '👩‍🎒  Teenagers',
      points: [
        'Use Safety Check every time you commute at night',
        'Emergency Sharing only sends location during an alert — not always',
        'You control when your location is shared',
        'Show your parents how to see your check-ins',
      ],
    },
    right: {
      heading: '👴  Adults & Seniors',
      points: [
        'Top priority: fill in Medical Info on the lock screen',
        'Max out phone volume for earthquake alerts',
        'Ask a family member to help with setup',
        'Works on basic phones too',
      ],
    },
  },
  {
    id: 16,
    type: 'bullets',
    accent: "Don't Forget",
    title: 'Things to Remember',
    icons: ['🔋', '👁️', '❌', '📶'],
    points: [
      'Always leave home with a charged phone',
      'Do not use your phone visibly in unsafe areas',
      'Accidental SOS? Cancel within 5 seconds to avoid false alarms',
      'SMS location still sends even on a weak signal',
    ],
  },
  {
    id: 17,
    type: 'title',
    isFinal: true,
    eyebrow: 'JPCS Outreach · Barangay Bangkal, Makati 2026',
    title: 'Thank You! Any Questions?',
    subtitle:
      "Install the Safety app today and save Barangay Bangkal's emergency numbers. We're all safer together.",
  },
]

// ---------------------------------------------------------------------------
// Decorative SVGs & Components
// ---------------------------------------------------------------------------

function ShieldWatermark() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 5 L90 20 L90 60 C90 85 70 105 50 115 C30 105 10 85 10 60 L10 20 Z"
        fill="#c2410c"
        stroke="#c2410c"
        strokeWidth="1"
      />
      <path
        d="M50 22 L78 33 L78 60 C78 78 65 94 50 102 C35 94 22 78 22 60 L22 33 Z"
        fill="none"
        stroke="#c2410c"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
    </svg>
  )
}

function ThankYouDecor() {
  const stars = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360
    const r = 38 + (i % 3) * 8
    const x = 50 + r * Math.cos((angle * Math.PI) / 180)
    const y = 50 + r * Math.sin((angle * Math.PI) / 180)
    return { x, y, size: i % 2 === 0 ? 2 : 1.2 }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[20, 30, 40].map((r, i) => (
        <circle
          key={i}
          cx="50"
          cy="50"
          r={r}
          stroke="#c2410c"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          style={{
            animation: `radiate ${3 + i * 1.2}s ease-out infinite`,
            animationDelay: `${i * 0.8}s`,
            transformOrigin: '50px 50px',
          }}
        />
      ))}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.size} fill="#c2410c" />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * 360
        const x1 = 50 + 8 * Math.cos((angle * Math.PI) / 180)
        const y1 = 50 + 8 * Math.sin((angle * Math.PI) / 180)
        const x2 = 50 + 18 * Math.cos((angle * Math.PI) / 180)
        const y2 = 50 + 18 * Math.sin((angle * Math.PI) / 180)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c2410c" strokeWidth="1" />
      })}
    </svg>
  )
}

function DotGrid() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#92400e" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  )
}

// Ambient floating particles
type ParticleData = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  xSway: number
}

function Particles() {
  const particles = useMemo<ParticleData[]>(() => {
    const rng = (min: number, max: number) => min + Math.random() * (max - min)
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: rng(2, 98),
      y: rng(10, 95),
      size: rng(8, 22),
      duration: rng(10, 22),
      delay: -rng(0, 20),
      opacity: rng(0.12, 0.30),
      xSway: rng(-60, 60),
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-orange-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--sway': `${p.xSway}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// Google 4-color arc — cover slide only
function GoogleArc() {
  const cx = 60
  const cy = 38
  const r = 30
  const segments = [
    { color: '#4285F4', startDeg: 180, endDeg: 270 },
    { color: '#EA4335', startDeg: 270, endDeg: 360 },
    { color: '#FBBC05', startDeg: 0,   endDeg: 90  },
    { color: '#34A853', startDeg: 90,  endDeg: 180 },
  ]

  function arcPath(startDeg: number, endDeg: number, radius: number) {
    const toRad = (d: number) => (d * Math.PI) / 180
    const x1 = cx + radius * Math.cos(toRad(startDeg))
    const y1 = cy + radius * Math.sin(toRad(startDeg))
    const x2 = cx + radius * Math.cos(toRad(endDeg))
    const y2 = cy + radius * Math.sin(toRad(endDeg))
    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`
  }

  return (
    <svg
      viewBox="0 0 120 76"
      width="160"
      height="52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {segments.map((seg, i) => (
        <path
          key={i}
          d={arcPath(seg.startDeg, seg.endDeg, r)}
          stroke={seg.color}
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
    </svg>
  )
}

// Circular SVG progress ring
function CircularProgress({ current, total }: { current: number; total: number }) {
  const size = 62
  const strokeWidth = 5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = (current + 1) / total
  const offset = circumference * (1 - pct)

  return (
    <div className="absolute top-6 right-8 z-20 flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`Slide ${current + 1} of ${total}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={strokeWidth}
          fill="rgba(255,255,255,0.18)"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        {/* Label */}
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fontWeight="700"
          fill="rgba(68,55,48,0.80)"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0"
        >
          {current + 1}/{total}
        </text>
      </svg>
    </div>
  )
}

// Per-slide-type top color band
function SlideTopBand({ slide }: { slide: Slide }) {
  let gradient = 'from-amber-400 to-orange-400'
  if (slide.type === 'title')   gradient = 'from-rose-400 to-orange-400'
  if (slide.type === 'profile') gradient = 'from-violet-500 to-fuchsia-400'
  if (slide.type === 'two-col') gradient = 'from-sky-400 to-cyan-400'
  if (slide.type === 'quote')   gradient = 'from-teal-400 to-emerald-400'
  return (
    <div className={`absolute top-0 left-0 right-0 h-[7px] bg-gradient-to-r ${gradient} rounded-t-3xl`} />
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PhoneFrame({ src, onExpand }: { src: string; onExpand: (src: string) => void }) {
  return (
    <div className="relative flex items-center justify-center h-full">
      <div
        className="relative cursor-zoom-in group"
        onClick={() => onExpand(src)}
      >
        <div className="absolute inset-0 rounded-3xl bg-orange-300/50 blur-2xl scale-110 pulse-ring" />
        <img
          src={src}
          alt=""
          className="relative max-h-[50vh] w-auto object-contain rounded-2xl shadow-2xl shadow-stone-400/30 border border-white/60 transition-transform duration-200 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            Click to expand
          </span>
        </div>
      </div>
    </div>
  )
}

function SlideCategoryBadge({ slide }: { slide: Slide }) {
  let label = ''
  let colorClass = ''

  if (slide.type === 'title') {
    label = (slide as TitleSlide).isFinal ? 'Wrap-Up' : 'Welcome'
    colorClass = 'bg-rose-100/70 text-rose-700 border-rose-200/60'
  } else if (slide.type === 'profile') {
    label = 'Speaker'
    colorClass = 'bg-violet-100/70 text-violet-700 border-violet-200/60'
  } else if (slide.type === 'two-col') {
    label = 'Comparison'
    colorClass = 'bg-sky-100/70 text-sky-700 border-sky-200/60'
  } else if (slide.type === 'bullets') {
    const accent = (slide as BulletsSlide).accent
    label = accent ?? 'Info'
    colorClass = 'bg-orange-100/70 text-orange-700 border-orange-200/60'
  } else if (slide.type === 'quote') {
    label = 'Quote'
    colorClass = 'bg-teal-100/70 text-teal-700 border-teal-200/60'
  }

  if (!label) return null

  return (
    <span
      className={`absolute top-5 right-6 z-10 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border backdrop-blur-sm shadow-sm ${colorClass}`}
    >
      {label}
    </span>
  )
}

// JPCS branding strip — bottom of every card
function BrandingStrip() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-7 border-t border-white/25 flex items-center justify-center rounded-b-3xl bg-white/10">
      <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400/55 font-semibold select-none">
        JPCS Outreach &nbsp;·&nbsp; Barangay Bangkal, Makati &nbsp;·&nbsp; 2026
      </p>
    </div>
  )
}

// Emergency hotline cards
function HotlineCards({ points, icons }: { points: string[]; icons?: string[] }) {
  const colors = [
    { border: 'border-red-400', bg: 'bg-red-50/60', badge: 'bg-red-500', text: 'text-red-700' },
    { border: 'border-red-400', bg: 'bg-red-50/60', badge: 'bg-red-500', text: 'text-red-700' },
    { border: 'border-orange-400', bg: 'bg-orange-50/60', badge: 'bg-orange-500', text: 'text-orange-700' },
    { border: 'border-amber-400', bg: 'bg-amber-50/60', badge: 'bg-amber-500', text: 'text-amber-700' },
    { border: 'border-amber-400', bg: 'bg-amber-50/60', badge: 'bg-amber-500', text: 'text-amber-700' },
  ]

  return (
    <div className="flex flex-col gap-3 flex-1 justify-center">
      {points.map((point, i) => {
        const c = colors[i] ?? colors[0]
        const [label, ...rest] = point.split(':')
        const number = rest.join(':').trim()
        return (
          <div
            key={i}
            className={`flex items-center gap-4 ${c.bg} border-l-4 ${c.border} rounded-xl px-5 py-3 backdrop-blur-sm shadow-sm bullet-in`}
            style={{ animationDelay: `${i * 0.09 + 0.12}s` }}
          >
            <span className={`flex-shrink-0 w-11 h-11 rounded-xl ${c.badge} flex items-center justify-center text-2xl shadow-md`}>
              {icons?.[i] ?? '📞'}
            </span>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-stone-600 leading-tight">{label}</p>
              <p className={`text-2xl font-bold ${c.text} leading-tight tracking-wide`}>{number}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Slide Content Components
// ---------------------------------------------------------------------------

function TitleSlideContent({ slide }: { slide: TitleSlide }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center gap-5 overflow-hidden pb-7">
      {slide.isFinal ? <ThankYouDecor /> : <ShieldWatermark />}
      <div className="relative z-10 flex flex-col items-center gap-5">
        {slide.eyebrow && (
          <span className="text-base font-semibold tracking-widest uppercase text-orange-700/70 bg-orange-100/60 border border-orange-200/60 px-5 py-2 rounded-full backdrop-blur-sm">
            {slide.eyebrow}
          </span>
        )}
        <h1 className="gradient-title text-8xl font-bold tracking-tight leading-tight">
          {slide.title}
        </h1>
        <p className="text-3xl text-stone-600/80 max-w-3xl leading-relaxed font-light">
          {slide.subtitle}
        </p>
        {/* Google arc — cover only */}
        {!slide.isFinal && <GoogleArc />}
        <div
          className="w-20 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-rose-400"
          style={{
            boxShadow: '0 0 16px 4px rgba(251,146,60,0.4)',
            animation: 'pulseRing 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}

function BulletsSlideContent({ slide, onExpand }: { slide: BulletsSlide; onExpand: (src: string) => void }) {
  const isHotlines = slide.accent === 'Save These Right Now'

  const textContent = (
    <div className="flex flex-col h-full gap-5 pb-7">
      <div>
        {slide.accent && (
          <p className="text-sm font-semibold tracking-widest uppercase text-orange-600/70 mb-2">
            {slide.accent}
          </p>
        )}
        <h2 className="wipe-in text-5xl font-bold text-stone-800">{slide.title}</h2>
        <div className="mt-3 w-14 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
      </div>

      {isHotlines ? (
        <HotlineCards points={slide.points} icons={slide.icons} />
      ) : (
        <ul className="flex flex-col gap-4 flex-1 justify-center">
          {slide.points.map((point, i) => (
            <li
              key={i}
              className="flex items-center gap-5 bullet-in"
              style={{ animationDelay: `${i * 0.08 + 0.15}s` }}
            >
              <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100/90 to-amber-50/70 border border-orange-200/60 shadow-md shadow-orange-200/40 backdrop-blur-sm flex items-center justify-center text-3xl leading-none">
                {slide.icons?.[i] ?? (
                  <span className="text-base font-bold text-orange-600">{i + 1}</span>
                )}
              </span>
              <span className={`${slide.image ? 'text-4xl' : 'text-5xl'} text-stone-700 leading-snug font-medium`}>
                {point}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  if (slide.image) {
    return (
      <div className="grid grid-cols-[3fr_2fr] gap-8 h-full">
        {textContent}
        <PhoneFrame src={slide.image} onExpand={onExpand} />
      </div>
    )
  }

  return textContent
}

function TwoColSlideContent({ slide, onExpand }: { slide: TwoColSlide; onExpand: (src: string) => void }) {
  return (
    <div className="flex flex-col h-full gap-5 pb-7">
      <div>
        <h2 className="wipe-in text-5xl font-bold text-stone-800">{slide.title}</h2>
        <div className="mt-3 w-14 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
      </div>

      <div className={`grid gap-5 flex-1 ${slide.image ? 'grid-cols-[1fr_1fr_auto]' : 'grid-cols-2'}`}>
        {[slide.left, slide.right].map((col, idx) => (
          <div
            key={idx}
            className={`
              bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-lg shadow-orange-100/40 flex flex-col gap-4
              border-l-4
              ${idx === 0 ? 'border-l-green-400' : 'border-l-rose-400'}
            `}
          >
            <h3 className="text-3xl font-semibold text-stone-800 border-b border-white/60 pb-3">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-3">
              {col.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-600">
                  <span
                    className={`mt-3 w-2.5 h-2.5 rounded-full flex-shrink-0 ${idx === 0 ? 'bg-green-400' : 'bg-rose-400'}`}
                  />
                  <span className="text-3xl leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {slide.image && (
          <div
            className="flex items-center justify-center cursor-zoom-in group"
            onClick={() => slide.image && onExpand(slide.image)}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-orange-200/40 blur-2xl scale-110 pulse-ring" />
              <img
                src={slide.image}
                alt=""
                className="relative max-h-[50vh] w-auto object-contain rounded-2xl shadow-2xl shadow-stone-400/30 border border-white/60 transition-transform duration-200 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 rounded-2xl flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  Click to expand
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function QuoteSlideContent({ slide }: { slide: QuoteSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-8 pb-7">
      <h2 className="text-base font-semibold tracking-widest uppercase text-orange-700/60">
        {slide.title}
      </h2>
      <div className="relative">
        <span className="absolute -top-12 -left-8 text-[160px] leading-none text-orange-300/40 font-serif select-none">
          "
        </span>
        <blockquote className="text-4xl text-stone-700 leading-relaxed font-light italic max-w-4xl relative z-10">
          {slide.quote}
        </blockquote>
      </div>
      <p className="text-lg text-stone-500 font-medium tracking-wide">{slide.attribution}</p>
    </div>
  )
}

function ProfileSlideContent({ slide }: { slide: ProfileSlide }) {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-8 h-full pb-7">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative">
          <div
            className="absolute -inset-3 rounded-[2rem] pulse-ring"
            style={{
              background: 'linear-gradient(135deg, rgba(251,146,60,0.45), rgba(244,63,94,0.35))',
              filter: 'blur(6px)',
            }}
          />
          <img
            src={slide.image}
            alt={slide.name}
            className="relative w-96 h-96 object-cover object-top rounded-3xl shadow-2xl shadow-stone-400/30 border-4 border-white/70"
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-orange-200/60 shadow-lg px-3 py-1.5 rounded-full whitespace-nowrap">
            <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
              <circle cx="10" cy="10" r="10" fill="#4285F4" />
              <text x="10" y="14" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">G</text>
            </svg>
            <span className="text-xs font-bold text-stone-700 tracking-wide">Google Product Expert</span>
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-4xl font-bold text-stone-800 leading-tight">{slide.name}</p>
          <p className="text-2xl font-semibold text-orange-600 mt-1">{slide.role}</p>
          <p className="text-xl text-stone-500 mt-1 leading-snug">{slide.org}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-full">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-600/70 mb-1">
            {slide.title}
          </p>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
        </div>
        {[slide.left, slide.right].map((col, idx) => (
          <div
            key={idx}
            className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-4 shadow-lg shadow-orange-100/40 flex flex-col gap-2.5 flex-1"
          >
            <h3 className="text-3xl font-semibold text-stone-800 border-b border-white/60 pb-2">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-700">
                  <span className="mt-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex-shrink-0" />
                  <span className="text-2xl leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideContent({ slide, onExpand }: { slide: Slide; onExpand: (src: string) => void }) {
  switch (slide.type) {
    case 'title':   return <TitleSlideContent slide={slide} />
    case 'bullets': return <BulletsSlideContent slide={slide} onExpand={onExpand} />
    case 'two-col': return <TwoColSlideContent slide={slide} onExpand={onExpand} />
    case 'quote':   return <QuoteSlideContent slide={slide} />
    case 'profile': return <ProfileSlideContent slide={slide} />
  }
}

// ---------------------------------------------------------------------------
// PersonalSafetyDeck
// ---------------------------------------------------------------------------

export default function PersonalSafetyDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideKey, setSlideKey] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(true)
  const directionRef = useRef<'next' | 'prev'>('next')

  // Fade out keyboard hint after 4 s
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const goTo = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, index))
      if (clamped !== currentSlide) {
        const resolvedDir = dir ?? (index > currentSlide ? 'next' : 'prev')
        directionRef.current = resolvedDir
        setDirection(resolvedDir)
        setCurrentSlide(clamped)
        setSlideKey((k) => k + 1)
      }
    },
    [currentSlide],
  )

  const next = useCallback(() => goTo(currentSlide + 1, 'next'), [currentSlide, goTo])
  const prev = useCallback(() => goTo(currentSlide - 1, 'prev'), [currentSlide, goTo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const slide = SLIDES[currentSlide]
  const isFirst = currentSlide === 0
  const isLast  = currentSlide === SLIDES.length - 1
  const progressPct = ((currentSlide + 1) / SLIDES.length) * 100
  const slideEnterClass = direction === 'next' ? 'slide-enter-right' : 'slide-enter-left'

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center select-none">

      {/* ── Top Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-30 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%`, boxShadow: '0 0 12px 3px rgba(251,146,60,0.8)' }}
        />
      </div>

      {/* ── Background ── */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 z-0" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-amber-300/75 blur-3xl"
          style={{ animation: 'floatA 14s ease-in-out infinite' }} />
        <div className="absolute top-[20%] right-[-5%] w-[50vw] h-[50vh] rounded-full bg-rose-300/70 blur-3xl"
          style={{ animation: 'floatB 18s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vh] rounded-full bg-orange-300/65 blur-3xl"
          style={{ animation: 'floatC 16s ease-in-out infinite', animationDelay: '-8s' }} />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vh] rounded-full bg-pink-300/55 blur-3xl"
          style={{ animation: 'floatA 20s ease-in-out infinite', animationDelay: '-6s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vh] rounded-full bg-yellow-300/55 blur-3xl"
          style={{ animation: 'floatB 13s ease-in-out infinite', animationDelay: '-2s' }} />
        <div className="absolute top-[-5%] right-[20%] w-[35vw] h-[35vh] rounded-full bg-amber-300/50 blur-3xl"
          style={{ animation: 'floatC 17s ease-in-out infinite', animationDelay: '-10s' }} />
      </div>

      {/* ── SVG Dot-Grid Texture ── */}
      <DotGrid />

      {/* ── Ambient Particles ── */}
      <Particles />

      {/* ── Back to Dashboard ── */}
      <Link
        to="/"
        className="absolute top-6 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-stone-700 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-orange-200/30 hover:bg-white/60 hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        ← Dashboard
      </Link>

      {/* ── Circular Progress Ring ── */}
      <CircularProgress current={currentSlide} total={SLIDES.length} />

      {/* ── Slide Card ── */}
      <main className="relative z-10 flex items-center justify-center w-full h-full px-8">
        <div
          key={slideKey}
          className={`${slideEnterClass} relative w-[80vw] h-[70vh] bg-white/55 backdrop-blur-2xl rounded-3xl p-12 flex flex-col border border-white/70 shadow-2xl shadow-orange-300/70 overflow-hidden`}
          style={{ WebkitBackdropFilter: 'blur(40px)' }}
        >
          {/* Per-type top color band */}
          <SlideTopBand slide={slide} />

          {/* Glass shimmer sweep */}
          <div
            key={`shimmer-${slideKey}`}
            className="card-shimmer absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
            }}
          />

          <SlideCategoryBadge slide={slide} />
          <SlideContent slide={slide} onExpand={setLightboxSrc} />

          {/* JPCS branding strip */}
          <BrandingStrip />
        </div>
      </main>

      {/* ── Navigation Buttons ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          disabled={isFirst}
          aria-label="Previous slide"
          className={`
            group px-6 py-2.5 rounded-full text-sm font-semibold
            bg-white/40 backdrop-blur-xl border border-white/60
            shadow-lg shadow-orange-200/40
            text-stone-700 transition-all duration-200
            hover:bg-white/60 hover:shadow-xl hover:scale-105
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/40
            flex items-center gap-1.5
          `}
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span> Prev
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-md shadow-orange-100/40">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                rounded-full transition-all duration-300 cursor-pointer
                ${i === currentSlide
                  ? 'w-6 h-2 bg-gradient-to-r from-orange-400 to-rose-400 shadow-sm shadow-orange-300/50'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/65'
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={isLast}
          aria-label="Next slide"
          className={`
            group px-6 py-2.5 rounded-full text-sm font-semibold
            bg-white/40 backdrop-blur-xl border border-white/60
            shadow-lg shadow-orange-200/40
            text-stone-700 transition-all duration-200
            hover:bg-white/60 hover:shadow-xl hover:scale-105
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/40
            flex items-center gap-1.5
          `}
        >
          Next <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* ── Keyboard Hint Toast ── */}
      <div
        className="absolute bottom-[5.5rem] left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-700"
        style={{ opacity: showHint ? 1 : 0 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg shadow-orange-100/30">
          <span className="text-xs font-medium text-stone-500 tracking-wide">
            Use <kbd className="px-1.5 py-0.5 rounded bg-white/70 border border-stone-200/60 text-stone-600 font-mono text-[10px]">←</kbd>
            {' '}<kbd className="px-1.5 py-0.5 rounded bg-white/70 border border-stone-200/60 text-stone-600 font-mono text-[10px]">→</kbd>
            {' '}arrow keys or spacebar to navigate
          </span>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </div>
  )
}
