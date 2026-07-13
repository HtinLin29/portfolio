import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, ExternalLink, Github } from 'lucide-react'
import clsx from 'clsx'
import SectionTitle from '../ui/SectionTitle'
import { projects, type Project } from '../../data/projects'

const PROJECT_FEATURES: Record<number, string[]> = {
  1: [
    'Real-time order tracking with Supabase streams',
    'Role-based access (Customer, Driver, Admin)',
    'Live chat with unread message badges',
  ],
  2: [
    'Multi-city data isolation with Row Level Security',
    'Driver distribution tracking with cash reconciliation',
    'Automated 3-month data retention with Vercel cron',
  ],
}

const TECH_TOOLTIPS: Record<string, string> = {
  Flutter: 'Mobile & Web UI',
  Dart: 'App Logic & State',
  Supabase: 'Database & Real-time',
  GoRouter: 'Navigation',
  Provider: 'State Management',
  'Next.js': 'Full-stack Framework',
  TypeScript: 'Type Safety',
  Vercel: 'Deployment',
  TailwindCSS: 'Styling System',
  PostgreSQL: 'Relational Data',
}

function TechBadge({ tech }: { tech: string }) {
  const [hovered, setHovered] = useState(false)
  const tooltip = TECH_TOOLTIPS[tech]

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="project-tech-badge cursor-default">{tech}</span>
      {hovered && tooltip && (
        <span className="tech-tooltip absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1A2035] px-2.5 py-1 text-[11px] text-white shadow-lg">
          {tooltip}
        </span>
      )}
    </span>
  )
}

function LiveBadge() {
  return (
    <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      Live
    </span>
  )
}

const PREVIEW_PARTICLES = {
  royal: [
    { left: '14%', delay: '0s', duration: '9s', color: '#1A56DB' },
    { left: '32%', delay: '2.1s', duration: '11s', color: '#06B6D4' },
    { left: '52%', delay: '0.8s', duration: '10s', color: '#1A56DB' },
    { left: '68%', delay: '3.4s', duration: '12s', color: '#06B6D4' },
    { left: '82%', delay: '1.6s', duration: '9.5s', color: '#1A56DB' },
    { left: '24%', delay: '4.2s', duration: '10.5s', color: '#06B6D4' },
  ],
  factory: [
    { left: '16%', delay: '0.4s', duration: '9s', color: '#0891B2' },
    { left: '36%', delay: '2.3s', duration: '11s', color: '#10B981' },
    { left: '54%', delay: '1.1s', duration: '10s', color: '#06B6D4' },
    { left: '72%', delay: '3.8s', duration: '12s', color: '#0891B2' },
    { left: '86%', delay: '1.9s', duration: '9.5s', color: '#10B981' },
    { left: '28%', delay: '4.5s', duration: '10.5s', color: '#06B6D4' },
  ],
} as const

function ProjectPreview({ project }: { project: Project }) {
  const isRoyalPh7 = project.id === 1
  const particles = isRoyalPh7 ? PREVIEW_PARTICLES.royal : PREVIEW_PARTICLES.factory

  return (
    <div
      className={clsx(
        'project-preview-panel relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden px-10 pb-10 pt-6 lg:w-[45%]',
        isRoyalPh7 ? 'project-preview-royal' : 'project-preview-factory',
      )}
    >
      <div className="project-preview-fine-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="project-preview-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="project-preview-particle"
          style={{
            left: particle.left,
            backgroundColor: particle.color,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
          aria-hidden="true"
        />
      ))}

      <LiveBadge />

      <div className="relative z-[1] flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div
            className={clsx(
              'project-preview-orb',
              isRoyalPh7 ? 'project-preview-orb-royal' : 'project-preview-orb-factory',
            )}
            aria-hidden="true"
          />
          <span
            className={clsx(
              'project-emoji-float relative text-[72px] leading-none',
              isRoyalPh7 ? 'project-preview-emoji-royal' : 'project-preview-emoji-factory',
            )}
            role="img"
            aria-hidden="true"
          >
            {project.icon}
          </span>
        </div>
        <h3 className="font-heading relative mt-3 text-center text-2xl font-bold text-white">
          {project.title}
        </h3>
        <div className="relative mt-4 flex flex-wrap justify-center gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full px-2.5 py-0.5 text-[12px] text-white/70"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureCheck() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-water-blue">
      <Check size={12} className="text-white" strokeWidth={3} />
    </span>
  )
}

function ProjectDetails({ project, index }: { project: Project; index: number }) {
  const features = PROJECT_FEATURES[project.id] ?? []
  const projectNumber = String(index + 1).padStart(2, '0')

  return (
    <div className="relative flex min-h-[400px] flex-col p-8 lg:w-[55%] lg:p-10">
      <span
        className="project-number pointer-events-none absolute right-6 top-4 select-none text-[80px] font-bold leading-none"
        aria-hidden="true"
      >
        {projectNumber}
      </span>

      <p className="text-[14px] font-medium uppercase tracking-[0.2em] text-water-cyan">
        {project.subtitle}
      </p>
      <h3 className="font-heading mt-2 text-[36px] font-bold leading-tight text-theme-primary">
        {project.title}
      </h3>

      <p className="project-description mt-4 text-[15px] leading-[1.8] text-theme-muted">
        {project.description}
      </p>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="project-feature flex items-start gap-3 text-[14px] text-theme-muted"
          >
            <FeatureCheck />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn-live inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-semibold text-white"
        >
          Live Demo
          <ExternalLink size={16} />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn-outline inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border-2 border-water-blue px-5 text-sm font-semibold text-water-blue"
        >
          View Code
          <Github size={16} />
        </a>
      </div>
    </div>
  )
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const reversed = index % 2 === 1

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: reversed ? 80 : -80, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: reversed ? 80 : -80, scale: 0.95 }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        delay: reversed ? 0.1 : 0,
      }}
      className="project-card glass-card group relative min-h-[400px] overflow-hidden rounded-[20px] p-0 shadow-sm"
    >
      <div
        className="project-card-accent absolute bottom-0 left-0 top-0 w-1"
        aria-hidden="true"
      />

      <div
        className={clsx(
          'flex min-h-[400px] flex-col',
          reversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <ProjectPreview project={project} />
        <ProjectDetails project={project} index={index} />
      </div>
    </motion.article>
  )
}

function MoreComingSoon() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="project-coming-wrapper mx-auto mt-12 max-w-[800px]"
    >
      <div className="project-coming-border-rotate rounded-[20px] p-[2px]">
        <div className="project-coming-soon glass-card rounded-[18px] p-12 text-center">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <span className="project-coming-ring absolute inset-0 rounded-full border-2 border-water-blue/30" />
            <span className="project-coming-spin absolute inset-1 rounded-full border-2 border-transparent border-t-water-cyan border-r-water-blue" />
            <span className="project-emoji-float text-[48px] leading-none" role="img" aria-hidden="true">
              🚀
            </span>
          </div>

          <h3 className="text-[20px] font-bold text-theme-primary">
            More Projects Coming Soon
          </h3>
          <p className="mt-2 text-[14px] text-theme-muted">
            Currently building new projects to add here
          </p>

          <div className="mx-auto mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-water-blue/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-water-blue to-water-cyan"
              initial={{ width: '0%' }}
              animate={inView ? { width: ['0%', '70%', '45%', '85%'] } : { width: '0%' }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionTitle
          title="My Projects"
          subtitle="Things I have built and deployed"
        />

        <div className="flex flex-col gap-10">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <MoreComingSoon />
      </div>
    </section>
  )
}
