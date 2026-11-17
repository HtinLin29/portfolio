import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion } from 'framer-motion'

const NAME = 'HTIN LIN AUNG'
const FACES = ['</>', 'TS', 'React', 'Node', 'SQL', 'Dart']
const FACE_TRANSFORMS = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)',
]
const EASE = [0.76, 0, 0.24, 1] as const

function Cube() {
  return (
    <div className="relative h-[130px] w-[130px]" style={{ perspective: '900px' }}>
      <div className="intro-cube absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {FACES.map((label, i) => (
          <div
            key={label}
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-[#38BDF8]/50 bg-[#0b1530]/70 font-mono text-[22px] font-bold text-[#7dd3fc] shadow-[inset_0_0_30px_rgba(56,189,248,0.25)] backdrop-blur-sm"
            style={{ transform: `${FACE_TRANSFORMS[i]} translateZ(65px)` }}
          >
            {label}
          </div>
        ))}
      </div>
      <div
        className="intro-orbit pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/25"
        style={{ transform: 'translate(-50%, -50%) rotateX(72deg)' }}
        aria-hidden="true"
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#38BDF8] shadow-[0_0_16px_#38BDF8]" />
      </div>
    </div>
  )
}

/**
 * Full-screen animated intro. Calls onReveal when the curtain starts opening
 * (so the hero can start its own entrance) and onDone once it's gone.
 */
export default function IntroCover({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const revealed = useRef(false)

  const exit = () => {
    if (revealed.current) return
    revealed.current = true
    setExiting(true)
    onReveal()
    window.setTimeout(onDone, 1100)
  }

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => window.setTimeout(exit, 250),
    })
    const skip = () => exit()
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    return () => {
      controls.stop()
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
    }
    // exit is stable for the lifetime of the cover
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[200]" role="presentation" onClick={exit}>
      {/* Curtain halves */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#050814]"
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050814]"
        animate={exiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      />

      <AnimatePresence>
        {!exiting && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
          >
            <div className="fx-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(26,86,219,0.35),transparent_65%)] blur-2xl"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotateX: 40 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Cube />
            </motion.div>

            <h1 className="font-heading relative mt-16 flex overflow-hidden text-[34px] font-bold tracking-[0.12em] text-white sm:text-[52px]">
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  className={ch === ' ' ? 'w-[0.4em]' : 'inline-block'}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-3 font-mono text-[12px] uppercase tracking-[0.35em] text-[#38BDF8] sm:text-[13px]"
            >
              Full-stack developer · Bangkok
            </motion.p>

            <div className="absolute inset-x-6 bottom-8 flex items-end justify-between sm:inset-x-10 sm:bottom-10">
              <div className="w-1/2 max-w-xs">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Loading portfolio</p>
                <div className="h-px w-full bg-white/10">
                  <div
                    className="h-px bg-gradient-to-r from-[#1A56DB] to-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                    style={{ width: `${count}%` }}
                  />
                </div>
              </div>
              <p className="font-heading text-[56px] font-bold leading-none text-white/90 tabular-nums sm:text-[80px]">
                {String(count).padStart(2, '0')}
                <span className="text-[#38BDF8]">%</span>
              </p>
            </div>

            <button
              type="button"
              onClick={exit}
              className="absolute right-6 top-6 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:border-white/40 hover:text-white sm:right-10 sm:top-8"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
