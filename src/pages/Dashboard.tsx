import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// Deck Data
// ---------------------------------------------------------------------------

type Deck = {
  id: number
  title: string
  lastEdited: string
  slideCount: number
  href?: string
}

const DECKS: Deck[] = [
  {
    id: 1,
    title: 'Template Presentation',
    lastEdited: 'Edited 2 hours ago',
    slideCount: 4,
    href: '/template',
  },
  {
    id: 2,
    title: 'JPCS Google Personal Safety Presentation',
    lastEdited: 'Edited Feb 20, 2026',
    slideCount: 17,
    href: '/jpcs-personal-safety',
  },
]

// ---------------------------------------------------------------------------
// DeckCard
// ---------------------------------------------------------------------------

function DeckThumbnail({ slideCount }: { slideCount: number }) {
  return (
    <div className="w-full aspect-video rounded-2xl bg-white/50 border border-white/70 shadow-inner relative overflow-hidden flex items-center justify-center">
      {/* Decorative mini slide lines */}
      <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-30">
        <div className="h-2 w-3/4 rounded-full bg-stone-400" />
        <div className="h-1.5 w-1/2 rounded-full bg-stone-400" />
        <div className="mt-2 h-1 w-full rounded-full bg-stone-300" />
        <div className="h-1 w-5/6 rounded-full bg-stone-300" />
        <div className="h-1 w-4/6 rounded-full bg-stone-300" />
      </div>
      <span className="relative z-10 text-stone-400/70 text-xs font-semibold tracking-widest uppercase">
        {slideCount} slides
      </span>
    </div>
  )
}

function DeckCard({ deck }: { deck: Deck }) {
  const card = (
    <article className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-6 flex flex-col gap-4 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-white/50 transition-all duration-300 h-full">
      <DeckThumbnail slideCount={deck.slideCount} />
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-stone-800 text-lg leading-tight">{deck.title}</h3>
        <p className="text-sm text-stone-500">{deck.lastEdited}</p>
      </div>
      {deck.href && (
        <div className="mt-auto pt-2 border-t border-white/40">
          <span className="text-xs font-semibold text-orange-600/80 tracking-wide">Open →</span>
        </div>
      )}
    </article>
  )

  if (deck.href) {
    return (
      <Link to={deck.href} className="block h-full outline-none">
        {card}
      </Link>
    )
  }

  return card
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export default function Dashboard() {
  return (
    <div className="relative min-h-screen w-full">

      {/* ── Warm Matte Acrylic Mesh Background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-amber-300/80 blur-3xl" />
        <div className="absolute top-[20%] right-[-5%] w-[50vw] h-[50vh] rounded-full bg-rose-300/75 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vh] rounded-full bg-orange-300/70 blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vh] rounded-full bg-pink-300/70 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vh] rounded-full bg-yellow-200/60 blur-3xl" />
      </div>

      {/* ── Floating Glass Navbar ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-20 w-[90vw] max-w-5xl flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white/60 shadow-xl shadow-orange-200/30 rounded-full px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 shadow-md shadow-orange-300/50" />
          <span className="font-semibold text-stone-800 tracking-tight text-sm">
            Presented by Gelo
          </span>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-8 pt-32 pb-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-700/60 mb-2">
            Workspace
          </p>
          <h1 className="text-4xl font-bold text-stone-800 tracking-tight">My Presentations</h1>
          <p className="text-stone-500 mt-2 text-sm">
            {DECKS.length} deck{DECKS.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DECKS.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center pb-8">
        <p className="text-xs text-stone-500/60 font-medium tracking-wide">
          Presented by Gelo · 2026
        </p>
      </footer>
    </div>
  )
}
