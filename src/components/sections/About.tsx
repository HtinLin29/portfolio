import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from '../../lib/countup'
import { downloadCvPdf } from '../../lib/downloadCv'
import { Link } from 'react-scroll'
import { Clock, Download, Folder, Globe, GraduationCap, Layers, MapPin } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { cvData } from '../../data/cv-data'
import profilePhoto from '../../assets/profile.png'

const BIO_STATEMENTS = [
  'Final year ICT student at Rangsit University Bangkok',
  'Building real apps with Flutter, React & Next.js',
  '3 live deployed projects used by real businesses',
  'Seeking software development internship — on-site or remote',
]

const STAT_CARDS = [
  { value: 3, suffix: '+', label: 'Live Projects', icon: Folder },
  { value: 6, suffix: '+', label: 'Tech Stacks', icon: Layers },
  { value: 2, suffix: '+', label: 'Languages', icon: Globe },
  { value: 4, suffix: '+', label: 'Years Coding', icon: Clock },
]

const PRIMARY_INFO_ROWS: {
  label: string
  value: string
  type?: 'text' | 'email' | 'badge'
}[] = [
  { label: 'Name', value: cvData.name },
  { label: 'Email', value: cvData.email, type: 'email' },
  { label: 'Location', value: cvData.location },
  { label: 'University', value: cvData.education.university },
  { label: 'Status', value: 'Open to Internship ✅', type: 'badge' },
]

const SECONDARY_INFO = {
  line: cvData.line,
  languages: cvData.languages.map((l) => l.language).join(' · '),
}

function ProfilePhoto({ alt = cvData.name }: { alt?: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="about-avatar-border mx-auto flex h-[188px] w-[188px] items-center justify-center rounded-full md:h-[288px] md:w-[288px]">
      <div className="relative z-[1] flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-water-blue to-water-cyan shadow-[0_20px_60px_rgba(26,86,219,0.3)] md:h-[280px] md:w-[280px]">
        {!imgError ? (
          <img
            src={profilePhoto}
            alt={alt}
            className="about-profile-img h-full w-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-[40px] font-bold text-white md:text-[64px]">HLA</span>
        )}
      </div>
    </div>
  )
}

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  index,
}: {
  value: number
  suffix: string
  label: string
  icon: typeof Folder
  index: number
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="about-stat-card glass-card flex flex-col items-center justify-center rounded-xl p-4 text-center"
    >
      <Icon size={24} className="mb-2 text-water-blue" />
      <p className="font-heading text-[28px] font-bold text-water-blue">
        {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : `0${suffix}`}
      </p>
      <p className="mt-1 text-[12px] text-theme-muted">{label}</p>
    </motion.div>
  )
}

function BioStatement({ text, index }: { text: string; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="mb-3 flex gap-2 text-[15px] leading-[1.6] text-theme-muted"
    >
      <span className="shrink-0 font-semibold text-water-blue">→</span>
      <span>{text}</span>
    </motion.p>
  )
}

export default function About() {
  const handleDownloadCV = useCallback(() => {
    downloadCvPdf()
  }, [])

  return (
    <section id="about" className="section-padding relative z-[1]">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center">
            <ProfilePhoto />

            <h3 className="font-heading mt-5 text-center text-[20px] font-bold text-theme-primary">
              {cvData.name}
            </h3>
            <p className="mt-1 text-center text-[14px] text-water-cyan">{cvData.title}</p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[13px] text-theme-muted">
              <MapPin size={14} className="shrink-0 text-water-blue" />
              {cvData.location}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-[13px] text-theme-muted">
              <GraduationCap size={14} className="shrink-0 text-water-blue" />
              {cvData.education.university}
            </p>

            <div className="mt-8 grid w-full max-w-[320px] grid-cols-2 gap-3">
              {STAT_CARDS.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle title="About Me" align="left" />

            <div className="mb-6">
              {BIO_STATEMENTS.map((statement, index) => (
                <BioStatement key={statement} text={statement} index={index} />
              ))}
            </div>

            <div className="about-info-grid mb-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {PRIMARY_INFO_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-3 border-b border-theme/40 py-1.5 sm:block"
                >
                  <span className="about-info-label shrink-0 text-[12px] uppercase tracking-wide text-theme-muted">
                    {row.label}
                  </span>
                  {row.type === 'email' ? (
                    <a
                      href={`mailto:${row.value}`}
                      className="truncate text-right text-[13px] font-semibold text-water-blue hover:underline sm:text-left"
                    >
                      {row.value}
                    </a>
                  ) : row.type === 'badge' ? (
                    <span className="mt-0.5 inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                      {row.value}
                    </span>
                  ) : (
                    <span className="truncate text-right text-[13px] font-semibold text-theme-primary sm:text-left">
                      {row.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="mb-6 text-[12px] text-theme-muted">
              <span className="font-medium text-theme-primary">LINE:</span> {SECONDARY_INFO.line}
              <span className="mx-2 text-theme-muted/50">·</span>
              <span className="font-medium text-theme-primary">Languages:</span>{' '}
              {SECONDARY_INFO.languages}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={handleDownloadCV}
                className="hero-btn-primary btn-hover w-full sm:w-auto"
              >
                <Download size={18} />
                Download CV
              </button>
              <Link
                to="projects"
                spy={false}
                smooth
                duration={500}
                offset={-80}
                className="hero-btn-outline btn-hover w-full cursor-pointer sm:w-auto"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
