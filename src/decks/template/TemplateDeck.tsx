import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// Data Layer
// ---------------------------------------------------------------------------

type SlideBase = { id: number; title: string }

type TitleSlide = SlideBase & {
  type: 'title'
  subtitle: string
  eyebrow?: string
}

type BulletsSlide = SlideBase & {
  type: 'bullets'
  points: string[]
  accent?: string
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
}

type Slide = TitleSlide | BulletsSlide | QuoteSlide | TwoColSlide

const SLIDES: Slide[] = [
  {
    id: 1,
    type: 'title',
    eyebrow: 'Annual Tech Summit · 2026',
    title: 'City Archive Library',
    subtitle: 'A Hybrid Database Approach for Modern Urban Records Management',
  },
  {
    id: 2,
    type: 'bullets',
    title: 'System Architecture',
    accent: 'Infrastructure Overview',
    points: [
      'MySQL — relational core for transactional borrowing records & patron data',
      'MongoDB — document store for rich media metadata, annotations & search indexes',
      'Redis — in-memory cache layer for real-time seat reservations & session tokens',
      'REST + GraphQL API gateway unifying both databases behind a single interface',
    ],
  },
  {
    id: 3,
    type: 'two-col',
    title: 'SQL vs. NoSQL — The Right Tool',
    left: {
      heading: 'MySQL (Relational)',
      points: [
        'ACID transactions',
        'Patron & loan records',
        'Fine management',
        'Staff permissions',
        'Structured reporting',
      ],
    },
    right: {
      heading: 'MongoDB (Document)',
      points: [
        'Flexible book metadata',
        'Multi-language catalogs',
        'Full-text search indexes',
        'User reading history',
        'Event & media records',
      ],
    },
  },
  {
    id: 4,
    type: 'quote',
    title: 'Our Philosophy',
    quote:
      'A great library is not built from a single blueprint — it is woven from countless decisions, each choosing the right material for the right purpose.',
    attribution: '— City Archive Design Principles, 2026',
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TitleSlideContent({ slide }: { slide: TitleSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6">
      {slide.eyebrow && (
        <span className="text-sm font-semibold tracking-widest uppercase text-orange-700/70 bg-orange-100/60 border border-orange-200/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
          {slide.eyebrow}
        </span>
      )}
      <h1 className="text-6xl font-bold tracking-tight text-stone-800 leading-tight">
        {slide.title}
      </h1>
      <p className="text-xl text-stone-600/80 max-w-2xl leading-relaxed font-light">
        {slide.subtitle}
      </p>
      <div className="mt-4 w-16 h-1 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 opacity-70" />
    </div>
  )
}

function BulletsSlideContent({ slide }: { slide: BulletsSlide }) {
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        {slide.accent && (
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-600/70 mb-2">
            {slide.accent}
          </p>
        )}
        <h2 className="text-4xl font-bold text-stone-800">{slide.title}</h2>
        <div className="mt-3 w-12 h-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
      </div>
      <ul className="flex flex-col gap-4 flex-1 justify-center">
        {slide.points.map((point, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-white/60 border border-white/80 shadow-sm shadow-orange-200/40 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-orange-600">
              {i + 1}
            </span>
            <span className="text-lg text-stone-700 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TwoColSlideContent({ slide }: { slide: TwoColSlide }) {
  return (
    <div className="flex flex-col h-full gap-6">
      <div>
        <h2 className="text-4xl font-bold text-stone-800">{slide.title}</h2>
        <div className="mt-3 w-12 h-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
      </div>
      <div className="grid grid-cols-2 gap-6 flex-1">
        {[slide.left, slide.right].map((col, idx) => (
          <div
            key={idx}
            className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-lg shadow-orange-100/40 flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold text-stone-800 border-b border-white/60 pb-3">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.points.map((pt, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuoteSlideContent({ slide }: { slide: QuoteSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-8">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-orange-700/60">
        {slide.title}
      </h2>
      <div className="relative">
        <span className="absolute -top-10 -left-8 text-[120px] leading-none text-orange-300/40 font-serif select-none">
          "
        </span>
        <blockquote className="text-2xl text-stone-700 leading-relaxed font-light italic max-w-3xl relative z-10">
          {slide.quote}
        </blockquote>
      </div>
      <p className="text-sm text-stone-500 font-medium tracking-wide">{slide.attribution}</p>
    </div>
  )
}

function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case 'title':
      return <TitleSlideContent slide={slide} />
    case 'bullets':
      return <BulletsSlideContent slide={slide} />
    case 'two-col':
      return <TwoColSlideContent slide={slide} />
    case 'quote':
      return <QuoteSlideContent slide={slide} />
  }
}

// ---------------------------------------------------------------------------
// TemplateDeck
// ---------------------------------------------------------------------------

export default function TemplateDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideKey, setSlideKey] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, index))
      if (clamped !== currentSlide) {
        setCurrentSlide(clamped)
        setSlideKey((k) => k + 1)
      }
    },
    [currentSlide],
  )

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo])
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo])

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
  const isLast = currentSlide === SLIDES.length - 1

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center select-none">

      {/* ── Warm Matte Acrylic Mesh Background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-amber-300/80 blur-3xl" />
        <div className="absolute top-[20%] right-[-5%] w-[50vw] h-[50vh] rounded-full bg-rose-300/75 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vh] rounded-full bg-orange-300/70 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vh] rounded-full bg-pink-300/70 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vh] rounded-full bg-yellow-200/60 blur-3xl" />
      </div>

      {/* ── Back to Dashboard ── */}
      <Link
        to="/"
        className="absolute top-6 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-stone-700 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-orange-200/30 hover:bg-white/60 hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        ← Dashboard
      </Link>

      {/* ── Slide Card ── */}
      <main className="relative z-10 flex items-center justify-center w-full h-full px-8">
        <div
          key={slideKey}
          className="slide-enter w-[80vw] h-[70vh] bg-white/50 backdrop-blur-2xl rounded-3xl p-12 flex flex-col border border-white/60 shadow-2xl shadow-orange-200/60"
          style={{ WebkitBackdropFilter: 'blur(40px)' }}
        >
          <SlideContent slide={slide} />
        </div>
      </main>

      {/* ── Navigation Buttons ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          disabled={isFirst}
          aria-label="Previous slide"
          className={`
            px-6 py-2.5 rounded-full text-sm font-semibold
            bg-white/40 backdrop-blur-xl border border-white/60
            shadow-lg shadow-orange-200/40
            text-stone-700 transition-all duration-200
            hover:bg-white/60 hover:shadow-xl hover:scale-105
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/40
          `}
        >
          ← Prev
        </button>

        {/* ── Progress Dots ── */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-md shadow-orange-100/40">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                rounded-full transition-all duration-300 cursor-pointer
                ${i === currentSlide
                  ? 'w-6 h-2 bg-white/90 shadow-sm'
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
            px-6 py-2.5 rounded-full text-sm font-semibold
            bg-white/40 backdrop-blur-xl border border-white/60
            shadow-lg shadow-orange-200/40
            text-stone-700 transition-all duration-200
            hover:bg-white/60 hover:shadow-xl hover:scale-105
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/40
          `}
        >
          Next →
        </button>
      </div>

      {/* ── Slide Counter (top-right) ── */}
      <div className="absolute top-6 right-8 z-20 text-xs font-semibold tracking-widest text-stone-600/60 bg-white/30 backdrop-blur-xl border border-white/50 px-3 py-1.5 rounded-full">
        {currentSlide + 1} / {SLIDES.length}
      </div>
    </div>
  )
}
