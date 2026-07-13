import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="card-surface group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        boxShadow: `0 0 0 1px var(--border), 0 4px 24px ${project.color}15`,
      }}
    >
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
        style={{ backgroundColor: project.color }}
      />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
            style={{ backgroundColor: `${project.color}20` }}
            aria-hidden="true"
          >
            {project.icon}
          </div>
          {project.featured && (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${project.color}20`,
                color: project.color,
              }}
            >
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-theme-primary">{project.title}</h3>
        <p className="mt-1 text-sm font-medium" style={{ color: project.color }}>
          {project.subtitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-theme-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-theme px-2.5 py-1 text-xs font-medium text-theme-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-xs sm:text-sm"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1 text-xs sm:text-sm"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}
