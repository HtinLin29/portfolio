import { Check, ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/Bento'
import { Card3D, Card3DItem } from '../fx/effects'
import LinnPharmacyCaseStudy from './LinnPharmacyCaseStudy'
import { projects, type Project } from '../../data/projects'

const PROJECT_FEATURES: Record<number, string[]> = {
  1: ['Real-time order tracking with Supabase streams', 'Customer, driver and admin roles', 'Live chat with unread badges'],
  2: ['Multi-city data isolation with RLS', 'Driver cash reconciliation', 'Automated data retention via cron'],
  3: ['AI chat grounded in your own notes', 'Auto-generated quizzes', 'Per-user data isolation with RLS'],
  4: ['Interactive terminal with commands', 'Animated intro and 3D hero card', 'Fully responsive and animated'],
}

function Preview({ project, number }: { project: Project; number: string }) {
  return (
    <div
      className="relative flex h-[220px] items-center justify-center overflow-hidden sm:h-[240px]"
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${project.color}55, transparent 55%), radial-gradient(90% 90% at 100% 100%, ${project.color}33, transparent 60%), #0b1122`,
      }}
    >
      <div className="project-preview-fine-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <span className="absolute left-5 top-4 font-heading text-[44px] font-bold leading-none text-white/[0.08]">{number}</span>
      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
      </span>

      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="relative z-[1] max-h-[78%] max-w-[86%] rounded-lg border border-white/10 object-contain shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="relative z-[1] flex flex-col items-center">
          <div
            className="absolute top-1/2 h-36 w-36 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: `${project.color}66` }}
            aria-hidden="true"
          />
          <motion.span
            className="relative text-[76px] leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            {project.icon}
          </motion.span>
          <p className="font-heading relative mt-3 text-[22px] font-bold text-white">{project.title}</p>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 2).padStart(2, '0')
  const features = PROJECT_FEATURES[project.id] ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card3D className="h-full">
        <div className="group relative flex h-full flex-col rounded-3xl border border-white/[0.08] bg-[#070b17]/90 p-4 transition-shadow duration-300 hover:shadow-[0_30px_80px_-25px_rgba(26,86,219,0.6)] sm:p-5">
          <Card3DItem z={80} className="overflow-hidden rounded-2xl">
            <Preview project={project} number={number} />
          </Card3DItem>

          <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
            <Card3DItem z={40}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#38BDF8]">{project.subtitle}</p>
              <h3 className="font-heading mt-2 text-[28px] font-bold leading-tight text-white">{project.title}</h3>
            </Card3DItem>
            <Card3DItem z={25}>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">{project.description}</p>
            </Card3DItem>

            <ul className="mt-5 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A56DB]/30 text-[#38BDF8]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-400">
                  {t}
                </li>
              ))}
            </ul>

            <Card3DItem z={50} className="mt-auto flex gap-3 pt-7">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-[14px] font-semibold text-[#070b17] transition-transform hover:scale-[1.03] sm:flex-none sm:px-5"
              >
                Live demo <ExternalLink size={15} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 text-[14px] font-semibold text-white transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8] sm:flex-none sm:px-5"
              >
                Code <Github size={15} />
              </a>
            </Card3DItem>
          </div>
        </div>
      </Card3D>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Things I've built and"
          highlight="shipped."
          subtitle="Real products used by real businesses — starting with the one I'm proudest of."
        />

        <LinnPharmacyCaseStudy />

        <p className="mb-6 mt-16 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-slate-400">
          <span className="h-px w-10 bg-gradient-to-r from-[#38BDF8] to-transparent" />
          More shipped projects
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
