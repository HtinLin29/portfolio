import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const EASE = [0.22, 1, 0.36, 1] as const

interface BentoCardProps {
  index?: number
  className?: string
  children: ReactNode
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean
  id?: string
}

/** Glass card whose border and surface light up where the cursor is. */
export function BentoCard({ index = 0, className, children, immediate, id }: BentoCardProps) {
  const hidden = { opacity: 0, y: 30, scale: 0.97, filter: 'blur(8px)' }
  const shown = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
  const transition = { duration: 0.7, delay: (immediate ? 0.1 : 0) + index * 0.07, ease: EASE }

  return (
    <motion.div
      id={id}
      initial={hidden}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: '0px 0px -60px 0px' } })}
      transition={transition}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className={clsx('bento-card', className)}
    >
      {children}
    </motion.div>
  )
}

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  /** Trailing words of the title painted with the animated gradient. */
  highlight?: string
  subtitle?: string
}

export function SectionHeading({ index, eyebrow, title, highlight, subtitle }: SectionHeadingProps) {
  return (
    <motion.header
      className="mb-10 md:mb-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#38BDF8]">
        <span className="text-slate-500">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-[#38BDF8] to-transparent" />
        {eyebrow}
      </p>
      <h2 className="font-heading mt-4 max-w-3xl text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-[52px]">
        {title} {highlight && <span className="text-shimmer">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-400">{subtitle}</p>}
    </motion.header>
  )
}
