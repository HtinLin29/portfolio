import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  Download,
  Github,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { cvData } from '../../data/cv-data'
import { projects } from '../../data/projects'

const CV_SKILL_CATEGORIES = [
  { label: 'Mobile', skills: ['Flutter', 'Dart', 'React Native', 'Expo'] },
  { label: 'Frontend', skills: ['React', 'Next.js', 'TailwindCSS', 'HTML', 'CSS'] },
  { label: 'Backend', skills: ['Supabase', 'PostgreSQL', 'REST APIs'] },
  {
    label: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#'],
  },
  { label: 'Game Dev', skills: ['Unity', 'C#'] },
  { label: 'Tools', skills: ['Git', 'GitHub', 'Vercel', 'Figma'] },
]

const PROJECT_BULLETS: Record<number, string[]> = {
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

const HOBBY_SHORT = [
  'Reading',
  'Gaming',
  'Movies',
  'Building Projects',
  'Tech Trends',
]

function CvSectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-water-cyan">
      {children}
    </p>
  )
}

function CvPreviewCard({
  onDownload,
  downloading,
}: {
  onDownload: () => void
  downloading: boolean
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -60, scale: 0.95 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="lg:sticky lg:top-24"
    >
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-br from-water-blue to-water-cyan px-8 py-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-white bg-white/20 text-2xl font-bold text-white">
            HLA
          </div>
          <h3 className="mt-3 text-[22px] font-bold text-white">{cvData.name}</h3>
          <p className="mt-1 text-[14px] text-white/70">{cvData.title}</p>
          <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] text-white/70">
            <MapPin size={14} />
            {cvData.location}
          </p>
        </div>

        <div className="cv-preview-body space-y-2 p-4">
          <a
            href={`mailto:${cvData.email}`}
            className="flex items-center gap-2.5 text-[13px] text-water-blue hover:underline"
          >
            <Mail size={16} className="shrink-0 text-theme-muted" />
            {cvData.email}
          </a>
          <p className="flex items-center gap-2.5 text-[13px] text-theme-muted">
            <MessageCircle size={16} className="shrink-0" />
            LINE: {cvData.line}
          </p>
          <a
            href={`https://${cvData.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-[13px] text-water-blue hover:underline"
          >
            <Github size={16} className="shrink-0 text-theme-muted" />
            {cvData.github}
          </a>

          <hr className="border-theme" />

          <div className="flex flex-wrap gap-2">
            {['Flutter', 'React', 'Next.js', 'Supabase'].map((skill) => (
              <span key={skill} className="cv-preview-pill">
                {skill}
              </span>
            ))}
          </div>

          <hr className="border-theme" />

          <p className="text-center text-[12px] text-theme-muted">Last updated: July 2026</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDownload}
        disabled={downloading}
        className="cv-download-btn mt-3 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {downloading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download size={18} />
            Download CV (PDF)
          </>
        )}
      </button>
    </motion.div>
  )
}

function CvDocumentContent() {
  return (
    <div
      id="cv-content"
      className="cv-document rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 leading-[1.4] sm:p-5"
    >
      <header className="border-b border-water-blue/30 pb-2">
        <h2 className="text-[28px] font-bold leading-[1.4] text-slate-900">{cvData.name}</h2>
        <p className="mt-0.5 text-[14px] leading-[1.4] text-water-cyan">
          Junior Software Developer | Mobile & Full Stack
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] leading-[1.4] text-slate-500">
          <span>{cvData.email}</span>
          <span className="text-slate-300">·</span>
          <span>LINE: {cvData.line}</span>
          <span className="text-slate-300">·</span>
          <span>{cvData.github}</span>
          <span className="text-slate-300">·</span>
          <span>{cvData.linkedin}</span>
          <span className="text-slate-300">·</span>
          <span>{cvData.location}</span>
        </p>
      </header>

      <section className="mt-3">
        <CvSectionLabel>SUMMARY</CvSectionLabel>
        <p className="text-[13px] leading-[1.4] text-slate-600">{cvData.summary}</p>
      </section>

      <section className="mt-3">
        <CvSectionLabel>TECHNICAL SKILLS</CvSectionLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {CV_SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <p className="mb-0.5 text-[11px] font-bold leading-[1.4] text-slate-800">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1">
                {cat.skills.map((skill) => (
                  <span key={skill} className="cv-doc-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-3">
        <CvSectionLabel>EXPERIENCE</CvSectionLabel>
        {cvData.experience.map((exp) => (
          <div key={exp.role}>
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-[14px] font-bold leading-[1.4] text-slate-900">{exp.role}</p>
              <p className="text-[14px] font-medium leading-[1.4] text-water-blue">
                {exp.company}
              </p>
            </div>
            <p className="text-[12px] italic leading-[1.4] text-slate-500">
              {exp.period} · {exp.type}
            </p>
            <ul className="mt-1">
              {exp.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-1.5 py-0.5 text-[12px] leading-[1.4] text-slate-600"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-water-blue" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-3">
        <CvSectionLabel>PROJECTS</CvSectionLabel>
        <div className="space-y-2">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <div key={project.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-bold leading-[1.4] text-slate-900">
                    {project.title}
                  </p>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase leading-[1.4] text-emerald-600">
                    Live
                  </span>
                </div>
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="cv-doc-pill">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-block text-[11px] leading-[1.4] text-water-blue hover:underline"
                >
                  {project.liveUrl}
                </a>
                <ul className="mt-0.5">
                  {(PROJECT_BULLETS[project.id] ?? []).map((bullet) => (
                    <li
                      key={bullet}
                      className="py-0.5 text-[12px] leading-[1.4] text-slate-600"
                    >
                      · {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-3">
        <CvSectionLabel>EDUCATION</CvSectionLabel>
        <p className="text-[13px] font-bold leading-[1.4] text-slate-900">
          {cvData.education.degree}
        </p>
        <p className="text-[12px] leading-[1.4] text-water-blue">
          {cvData.education.university}
        </p>
        <p className="text-[12px] italic leading-[1.4] text-slate-500">
          {cvData.education.period} · {cvData.education.location}
        </p>
      </section>

      <section className="mt-3">
        <CvSectionLabel>STRENGTHS</CvSectionLabel>
        <div className="flex flex-col gap-0.5">
          {cvData.strengths.map((strength) => (
            <p
              key={strength}
              className="flex items-start gap-1.5 py-0.5 text-[12px] leading-[1.4] text-slate-600"
            >
              <span className="shrink-0 text-[10px] text-water-blue">→</span>
              {strength}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <CvSectionLabel>LANGUAGES</CvSectionLabel>
          {cvData.languages.map((lang) => (
            <p key={lang.language} className="py-0.5 text-[12px] leading-[1.4] text-slate-600">
              <span className="font-medium text-slate-800">{lang.language}</span>
              {' — '}
              {lang.language === 'English' ? 'Professional' : 'Native'}
            </p>
          ))}
        </div>
        <div>
          <CvSectionLabel>HOBBIES</CvSectionLabel>
          <p className="text-[12px] leading-[1.4] text-slate-600">{HOBBY_SHORT.join(', ')}</p>
        </div>
      </section>

      <footer className="mt-4 border-t border-slate-200 pt-2 text-center text-[11px] italic leading-[1.4] text-slate-500">
        References available upon request
      </footer>
    </div>
  )
}

function SuccessToast({ show, onHide }: { show: boolean; onHide: () => void }) {
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(onHide, 3000)
    return () => clearTimeout(timer)
  }, [show, onHide])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-water-blue/30 bg-theme-card px-5 py-3 text-sm font-medium text-theme-primary shadow-lg"
        >
          CV downloaded successfully!
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function CV() {
  const [downloading, setDownloading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleDownload = async () => {
    const element = document.getElementById('cv-content')
    if (!element || downloading) return

    setDownloading(true)
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save('HtinLin_Aung_CV.pdf')
      setShowToast(true)
    } catch (error) {
      console.error('PDF generation failed:', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section id="cv" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionTitle title="My Resume" subtitle="Download or view my full CV" />

        <div className="grid items-start gap-6 lg:grid-cols-[35%_65%]">
          <CvPreviewCard onDownload={handleDownload} downloading={downloading} />

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={contentInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
          >
            <CvDocumentContent />
          </motion.div>
        </div>
      </div>

      <SuccessToast show={showToast} onHide={() => setShowToast(false)} />
    </section>
  )
}
