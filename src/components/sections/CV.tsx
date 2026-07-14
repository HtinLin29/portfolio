import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Link2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { cvData } from '../../data/cv-data'
import { downloadCvPdf } from '../../lib/downloadCv'
import profilePhoto from '../../assets/profile.png'

const SKILLS = [
  'Flutter & Dart',
  'React & Next.js',
  'Supabase & PostgreSQL',
  'TypeScript / JavaScript',
  'Git & Deployment',
]

const STRENGTHS = [
  'Fast independent learner',
  'End-to-end project ownership',
  'Clear technical communication',
  'Problem-solving mindset',
]

const HOBBIES = ['Exploring new frameworks', 'Game design & Unity', 'Tech & startup content']

const SUMMARY =
  'Final-year ICT student with hands-on experience designing, building, and independently deploying full-stack mobile and web applications used by real businesses. Comfortable owning a project end-to-end — database schema, backend logic, UI, and production deployment — using Flutter, React, Next.js, and Supabase. Seeking a software development internship in Bangkok or remote.'

const PROJECTS = [
  {
    title: 'Royal Ph7 — Water Delivery App',
    meta: 'Flutter · Dart · Supabase · GoRouter',
    bullets: [
      'Real-time order tracking with Supabase streams and role-based access for customers, drivers, and admins.',
      'Live chat with unread badges and shift management for delivery operations.',
    ],
  },
  {
    title: 'Water Factory — Business Management System',
    meta: 'Next.js 14 · TypeScript · Supabase · Vercel',
    bullets: [
      'Multi-city data isolation with Row Level Security for separate business units.',
      'Credit sales tracking, stock management, and automated data retention via Vercel cron.',
    ],
  },
]

function ResumeSectionHeader({ children }: { children: string }) {
  return (
    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">
      {children}
    </h3>
  )
}

function SquareBulletItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-700">
      <span className="mt-0.5 h-4 w-4 shrink-0 bg-gray-900" aria-hidden />
      <span>{children}</span>
    </li>
  )
}

function ContactRow({
  icon: Icon,
  children,
  href,
}: {
  icon: typeof MapPin
  children: string
  href?: string
}) {
  const content = (
    <>
      <Icon size={15} className="shrink-0 text-gray-500" strokeWidth={1.75} />
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-2 text-sm text-gray-700 transition-colors hover:text-gray-900"
      >
        {content}
      </a>
    )
  }

  return <div className="flex items-center gap-2 text-sm text-gray-700">{content}</div>
}

function ResumeCard() {
  return (
    <div
      id="cv-content"
      className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm sm:p-8 md:p-10"
    >
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
            Junior Software Developer
          </p>
          <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            HTIN LIN
            <br />
            AUNG
          </h2>
        </div>
        <img
          src={profilePhoto}
          alt={cvData.name}
          className="h-20 w-20 shrink-0 rounded-full border border-gray-200 object-cover md:h-24 md:w-24"
        />
      </header>

      <hr className="my-6 border-gray-200" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:divide-x md:divide-gray-200">
        <aside className="space-y-8 md:pr-8">
          <section>
            <ResumeSectionHeader>Contact</ResumeSectionHeader>
            <div className="space-y-2">
              <ContactRow icon={MapPin}>{cvData.location}</ContactRow>
              <ContactRow icon={Phone} href={`tel:${cvData.phone.replace(/\s/g, '')}`}>
                {cvData.phone}
              </ContactRow>
              <ContactRow icon={MessageCircle}>{`LINE: ${cvData.line}`}</ContactRow>
              <ContactRow icon={Mail} href={`mailto:${cvData.email}`}>
                {cvData.email}
              </ContactRow>
              <ContactRow icon={Link2} href={`https://${cvData.github}`}>
                {cvData.github}
              </ContactRow>
              <ContactRow icon={Link2} href={`https://${cvData.linkedin}`}>
                {cvData.linkedin}
              </ContactRow>
            </div>
          </section>

          <section>
            <ResumeSectionHeader>Skills</ResumeSectionHeader>
            <ul className="space-y-1.5">
              {SKILLS.map((skill) => (
                <SquareBulletItem key={skill}>{skill}</SquareBulletItem>
              ))}
            </ul>
          </section>

          <section>
            <ResumeSectionHeader>Languages</ResumeSectionHeader>
            <ul className="space-y-1.5">
              <SquareBulletItem>English | Professional</SquareBulletItem>
              <SquareBulletItem>Burmese | Native</SquareBulletItem>
            </ul>
          </section>

          <section>
            <ResumeSectionHeader>Strengths</ResumeSectionHeader>
            <ul className="space-y-1.5">
              {STRENGTHS.map((strength) => (
                <SquareBulletItem key={strength}>{strength}</SquareBulletItem>
              ))}
            </ul>
          </section>

          <section>
            <ResumeSectionHeader>Hobbies</ResumeSectionHeader>
            <ul className="space-y-1.5">
              {HOBBIES.map((hobby) => (
                <SquareBulletItem key={hobby}>{hobby}</SquareBulletItem>
              ))}
            </ul>
          </section>

          <section>
            <ResumeSectionHeader>Education</ResumeSectionHeader>
            <p className="font-semibold text-gray-900">{cvData.education.university}</p>
            <p className="mt-1 text-sm text-gray-700">
              B.Sc. Information &amp; Communication Technology
            </p>
            <p className="mt-1 text-xs text-gray-500">Final-Year · Bangkok · Expected 2027</p>
          </section>
        </aside>

        <div className="space-y-8 md:pl-8">
          <section>
            <ResumeSectionHeader>Summary</ResumeSectionHeader>
            <p className="text-sm leading-relaxed text-gray-700">{SUMMARY}</p>
          </section>

          <section>
            <ResumeSectionHeader>Experience</ResumeSectionHeader>
            {cvData.experience.map((exp) => (
              <div key={exp.role}>
                <p className="font-semibold text-gray-900">{exp.role}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {exp.company} · {exp.type} · {exp.period}
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="shrink-0">•</span>
                    <span>
                      Designed and built client websites, including a social welfare organization
                      (brahmaso.org.mm) that is currently live and in active use.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="shrink-0">•</span>
                    <span>
                      Managed full project lifecycle independently — requirements through deployment
                      — for small businesses and non-profits in Myanmar.
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </section>

          <section>
            <ResumeSectionHeader>Projects</ResumeSectionHeader>
            <div className="space-y-6">
              {PROJECTS.map((project) => (
                <div key={project.title}>
                  <p className="font-semibold text-gray-900">{project.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{project.meta}</p>
                  <ul className="mt-3 space-y-2">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
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
  const [showToast, setShowToast] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleDownload = () => {
    downloadCvPdf()
    setShowToast(true)
  }

  return (
    <section id="cv" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionTitle title="My Resume" subtitle="Download or view my full CV" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-5xl"
        >
          <ResumeCard />

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleDownload}
              className="cv-download-btn flex h-[52px] w-full max-w-md items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            >
              <Download size={18} />
              Download CV (PDF)
            </button>
          </div>
        </motion.div>
      </div>

      <SuccessToast show={showToast} onHide={() => setShowToast(false)} />
    </section>
  )
}
