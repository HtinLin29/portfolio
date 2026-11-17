/**
 * Aceternity-style effects, implemented with Framer Motion + Tailwind:
 * Spotlight, FlipWords, TextGenerate, MovingBorder, 3D card, HoverGrid,
 * Meteors, BackgroundBeams, InfiniteMarquee.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

/* ------------------------------------------------------------------ Spotlight */

export function Spotlight({ className, fill = '#38BDF8' }: { className?: string; fill?: string }) {
  return (
    <svg
      className={clsx('fx-spotlight pointer-events-none absolute z-0 h-[169%] w-[138%] opacity-0 lg:w-[84%]', className)}
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#fx-spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="fx-spotlight-blur"
          x="0.86"
          y="0.84"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
          <feGaussianBlur stdDeviation="151" />
        </filter>
      </defs>
    </svg>
  )
}

/* ------------------------------------------------------------------ FlipWords */

export function FlipWords({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])

  const word = words[i]
  return (
    <span className="relative inline-block">
      {/* The word is animated as one piece: per-letter blur on children breaks
          gradient (background-clip: text) rendering and left the word invisible. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 inline-block whitespace-nowrap"
        >
          <span className={className}>{word}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* -------------------------------------------------------------- TextGenerate */

export function TextGenerate({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : undefined}
          transition={{ duration: 0.5, delay: delay + i * 0.035 }}
          className="inline"
        >
          {w}{' '}
        </motion.span>
      ))}
    </p>
  )
}

/* -------------------------------------------------------------- MovingBorder */

/** Wraps content in a rounded frame with a light continuously travelling around its border. */
export function MovingBorder({
  children,
  className,
  innerClassName,
  rounded = 'rounded-xl',
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
  rounded?: string
}) {
  return (
    <span className={clsx('relative inline-flex overflow-hidden p-[1.5px]', rounded, className)}>
      <span
        className="fx-spin absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#0a0f1e_0%,#38BDF8_25%,#1A56DB_50%,#0a0f1e_75%,#38BDF8_100%)]"
        aria-hidden="true"
      />
      <span className={clsx('relative inline-flex w-full items-center justify-center bg-[#070b17]', rounded, innerClassName)}>
        {children}
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------- 3D card */

const Card3DContext = createContext(false)

export function Card3D({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / 22
    const y = (e.clientY - r.top - r.height / 2) / 22
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }
  const onLeave = () => {
    setHovered(false)
    if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <Card3DContext.Provider value={hovered}>
      <div className={clsx('flex items-stretch justify-center', className)} style={{ perspective: '1000px' }}>
        <div
          ref={ref}
          onPointerEnter={() => setHovered(true)}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative h-full w-full transition-transform duration-200 ease-linear"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </Card3DContext.Provider>
  )
}

export function Card3DItem({
  children,
  className,
  z = 0,
  rotateZ = 0,
}: {
  children: ReactNode
  className?: string
  z?: number
  rotateZ?: number
}) {
  const hovered = useContext(Card3DContext)
  return (
    <div
      className={clsx('transition-transform duration-300 ease-out', className)}
      style={{
        transform: hovered ? `translateZ(${z}px) rotateZ(${rotateZ}deg)` : 'translateZ(0) rotateZ(0deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ HoverGrid */

/** Grid where a glowing highlight slides to whichever card is hovered. */
export function HoverGrid<T>({
  items,
  getKey,
  render,
  className,
}: {
  items: T[]
  getKey: (item: T) => string
  render: (item: T, index: number) => ReactNode
  className?: string
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div className={clsx('grid', className)}>
      {items.map((item, i) => (
        <div
          key={getKey(item)}
          className="group relative block h-full w-full p-2"
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-gradient-to-br from-[#1A56DB]/40 to-[#06B6D4]/25"
                layoutId="hover-grid-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          {render(item, i)}
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------- Meteors */

export function Meteors({ count = 18 }: { count?: number }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${Math.floor(((i * 37) % 100) - 10)}%`,
        delay: `${((i * 0.53) % 4).toFixed(2)}s`,
        duration: `${4 + ((i * 1.7) % 6)}s`,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="fx-meteor absolute top-0 h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-300 shadow-[0_0_0_1px_#ffffff10]"
          style={{ left: m.left, animationDelay: m.delay, animationDuration: m.duration }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------ BackgroundBeams */

const BEAM_PATHS = Array.from({ length: 14 }, (_, i) => {
  const o = i * 22
  return `M${-380 + o} ${-189 - o * 1.4}C${-380 + o} ${-189 - o * 1.4} ${-312 + o} ${216 - o * 1.4} ${152 + o} ${343 - o * 1.4}C${616 + o} ${470 - o * 1.4} ${684 + o} ${875 - o * 1.4} ${684 + o} ${875 - o * 1.4}`
})

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <svg className="absolute h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {BEAM_PATHS.map((d, i) => (
          <path key={`base-${i}`} d={d} stroke="url(#fx-beam-base)" strokeOpacity="0.08" strokeWidth="0.5" />
        ))}
        {BEAM_PATHS.map((d, i) => (
          <motion.path
            key={`beam-${i}`}
            d={d}
            stroke={`url(#fx-beam-${i % 3})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0.14, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 7 + (i % 5) * 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.45 }}
          />
        ))}
        <defs>
          <radialGradient id="fx-beam-base" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(352 34) rotate(90) scale(555 1560)">
            <stop offset="0.07" stopColor="#d4d4d4" />
            <stop offset="0.24" stopColor="#d4d4d4" />
            <stop offset="0.43" stopColor="#d4d4d4" stopOpacity="0" />
          </radialGradient>
          {['#38BDF8', '#818CF8', '#1A56DB'].map((c, i) => (
            <linearGradient key={c} id={`fx-beam-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor={c} stopOpacity="0" />
              <stop offset="0.5" stopColor={c} />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------ InfiniteMarquee */

export function InfiniteMarquee({
  items,
  reverse,
  speed = 34,
}: {
  items: ReactNode[]
  reverse?: boolean
  speed?: number
}) {
  const row = <div className="flex shrink-0 items-center gap-4 pr-4">{items}</div>
  return (
    <div className="fx-marquee-mask relative overflow-hidden">
      <div
        className={clsx('flex w-max hover:[animation-play-state:paused]', reverse ? 'fx-marquee-rev' : 'fx-marquee')}
        style={{ animationDuration: `${speed}s` }}
      >
        {row}
        <div aria-hidden="true" className="flex">
          {row}
        </div>
      </div>
    </div>
  )
}
