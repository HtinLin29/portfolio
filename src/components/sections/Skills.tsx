import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'
import SectionTitle from '../ui/SectionTitle'
import { skillCategories } from '../../data/skills'

const INTRO_TEXT = '20+ technologies across 6 categories'

const MAIN_SKILLS = new Set([
  'Flutter',
  'Dart',
  'React',
  'Next.js',
  'Supabase',
  'TypeScript',
  'JavaScript',
])

const ALL_SKILLS = [...new Set(skillCategories.flatMap((cat) => cat.skills))]

function SkillsIntro() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return

    let index = 0
    const interval = setInterval(() => {
      index += 1
      setDisplayed(INTRO_TEXT.slice(0, index))
      if (index >= INTRO_TEXT.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <p
      ref={ref}
      className="mb-6 text-center text-[13px] font-medium uppercase tracking-[0.2em] text-water-cyan"
    >
      {displayed}
      {!done && inView && (
        <span className="ml-0.5 inline-block animate-pulse text-water-cyan">|</span>
      )}
    </p>
  )
}

function SkillPill({
  skill,
  index,
  inView,
  size = 'default',
  floatDelay = 0,
}: {
  skill: string
  index: number
  inView: boolean
  size?: 'default' | 'large'
  floatDelay?: number
}) {
  const isMain = MAIN_SKILLS.has(skill)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.03 }}
      className={clsx(
        'skill-badge skill-cloud-pill',
        isMain && 'skill-badge-featured',
        size === 'large' && 'px-4 py-2 text-[14px]',
        size === 'default' && 'px-3 py-1.5 text-[12px]',
      )}
      style={{ animationDelay: `${floatDelay}s` }}
    >
      {isMain && <span aria-hidden="true">⭐</span>}
      {skill}
    </motion.span>
  )
}

function MobileSkillCloud() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-2 md:hidden">
      {ALL_SKILLS.map((skill, index) => (
        <SkillPill
          key={skill}
          skill={skill}
          index={index}
          inView={inView}
          size={MAIN_SKILLS.has(skill) ? 'large' : 'default'}
          floatDelay={(index % 7) * 0.35}
        />
      ))}
    </div>
  )
}

function CategoryCard({
  category,
  icon,
  skills,
  index,
}: {
  category: string
  icon: string
  skills: string[]
  index: number
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="skills-category-card glass-card relative flex min-h-[200px] h-full flex-col overflow-hidden rounded-2xl p-6">
        <span
          className="skills-bg-emoji pointer-events-none absolute -bottom-3 -right-3 select-none text-[120px] leading-none opacity-[0.08] transition-all duration-300 group-hover:scale-110 group-hover:opacity-[0.15]"
          aria-hidden="true"
        >
          {icon}
        </span>

        <div className="relative z-10 mb-4 flex shrink-0 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-hidden="true">
              {icon}
            </span>
            <h3 className="font-heading text-[16px] font-bold text-theme-primary">{category}</h3>
          </div>
          <span className="rounded-full bg-water-blue/10 px-2.5 py-0.5 text-[11px] font-semibold text-water-blue">
            {skills.length}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-wrap content-start gap-2">
          {skills.map((skill, skillIndex) => (
            <SkillPill key={skill} skill={skill} index={skillIndex} inView={inView} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative z-[1]">
      <div className="section-container relative z-10">
        <SkillsIntro />
        <SectionTitle
          title="Technical Skills"
          subtitle="Technologies I work with"
        />

        <MobileSkillCloud />

        <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, index) => (
            <CategoryCard
              key={cat.category}
              category={cat.category}
              icon={cat.icon}
              skills={cat.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
