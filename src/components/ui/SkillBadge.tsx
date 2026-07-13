import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SkillBadgeProps {
  skill: string
  index?: number
  variant?: 'default' | 'compact'
}

export default function SkillBadge({
  skill,
  index = 0,
  variant = 'default',
}: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={clsx(
        'inline-block rounded-lg border border-theme font-medium text-theme-primary transition-colors hover:border-water-blue hover:text-water-blue',
        variant === 'default' ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs',
      )}
    >
      {skill}
    </motion.span>
  )
}
