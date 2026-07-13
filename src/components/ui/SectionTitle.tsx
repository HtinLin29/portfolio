import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionTitleProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={clsx(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className,
      )}
    >
      {subtitle && (
        <div
          className={clsx(
            'mb-3 flex items-center gap-2',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-10 bg-water-blue" />
          <span className="h-1.5 w-1.5 rounded-full bg-water-cyan" />
          <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-water-cyan">
            {subtitle}
          </span>
        </div>
      )}

      <h2 className="section-title font-heading text-[36px] font-bold text-theme-primary">{title}</h2>

      <div
        className={clsx(
          'mt-4 h-[3px] w-[60px] rounded-full bg-water-blue',
          align === 'center' && 'mx-auto',
        )}
      />
    </motion.div>
  )
}
