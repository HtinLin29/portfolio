import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Download, Eye } from 'lucide-react'
import { SectionHeading } from '../ui/Bento'
import { MovingBorder } from '../fx/effects'
import { cvData } from '../../data/cv-data'
import { downloadCvPdf } from '../../lib/downloadCv'
import { openCvViewer } from '../../lib/cvViewer'

const CV_PREVIEW_URL = `${import.meta.env.BASE_URL}cv-preview.png`

interface Entry {
  year: string
  title: string
  org: string
  tag?: string
  body?: ReactNode
}

const INTERNSHIP = cvData.experience[0]

function Bullets({ points }: { points: string[] }) {
  return (
    <ul className="space-y-2.5">
      {points.map((p) => (
        <li key={p} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
          {p}
        </li>
      ))}
    </ul>
  )
}

const ENTRIES: Entry[] = [
  {
    year: 'Aug–Nov 2026',
    title: INTERNSHIP.role,
    org: `${INTERNSHIP.company} · Bangkok`,
    tag: 'Completed',
    body: (
      <>
        <Bullets points={INTERNSHIP.points} />
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {((INTERNSHIP as { tools?: string[] }).tools ?? []).map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-400">
              {t}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    year: '2026',
    title: 'Built & launched Linn Pharmacy',
    org: 'Independent project · in daily use',
    body: (
      <p>
        Designed, built and deployed a full pharmacy point-of-sale system — 30+ screens, 19 backend services,
        encrypted backups — that a real pharmacy runs on every day.
      </p>
    ),
  },
  {
    year: '2023–Now',
    title: 'Freelance Web Developer',
    org: 'ICT for Development Team · Remote · 2023 — Present',
    body: (
      <>
        <ul className="space-y-2">
          {(cvData.experience.find((e) => e.role === 'Freelance Web Developer')?.points ?? []).map((p) => (
            <li key={p} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
              {p}
            </li>
          ))}
        </ul>
        <a
          href="https://brahmaso.org.mm"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#38BDF8] hover:underline"
        >
          brahmaso.org.mm <ArrowUpRight size={14} />
        </a>
      </>
    ),
  },
  {
    year: '2023–2027',
    title: 'B.Sc. Information & Communication Technology',
    org: `${cvData.education.university} · Bangkok · 2023 — 2027`,
    tag: 'Final year',
  },
]

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const measure = () => setHeight(innerRef.current?.getBoundingClientRect().height ?? 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 15%', 'end 60%'] })
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height])
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div ref={containerRef}>
      <div ref={innerRef} className="relative pb-6">
        {ENTRIES.map((e, i) => (
          <div key={`${e.year}-${e.title}`} className="flex justify-start gap-6 pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-32 z-30 flex max-w-xs shrink-0 flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#070b17] md:left-0">
                <div className="h-4 w-4 rounded-full border border-[#38BDF8]/60 bg-[#1A56DB]/50 shadow-[0_0_14px_rgba(56,189,248,0.7)]" />
              </div>
              <h3 className="font-heading hidden text-[40px] font-bold text-slate-600 md:block md:pl-20 lg:text-[48px]">
                {e.year}
              </h3>
            </div>

            <motion.div
              className="relative w-full pl-16 md:pl-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <h3 className="font-heading mb-3 block text-[28px] font-bold text-slate-600 md:hidden">{e.year}</h3>
              <div className="bento-card p-6 md:p-7">
                {e.tag && (
                  <span className="mb-3 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                    {e.tag}
                  </span>
                )}
                <p className="font-heading text-[22px] font-bold leading-snug text-white">{e.title}</p>
                <p className="mt-1 text-[14px] text-[#38BDF8]">{e.org}</p>
                {e.body && <div className="mt-4 text-[14.5px] leading-relaxed text-slate-300">{e.body}</div>}
              </div>
            </motion.div>
          </div>
        ))}

        <div
          className="absolute left-5 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.12)_10%,rgba(255,255,255,0.12)_90%,transparent_100%)] md:left-5"
          style={{ height }}
          aria-hidden="true"
        >
          <motion.div
            style={{ height: beamHeight, opacity: beamOpacity }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[#818CF8] via-[#38BDF8] to-transparent"
          />
        </div>
      </div>
    </div>
  )
}

function Toast({ show, onHide }: { show: boolean; onHide: () => void }) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onHide, 2500)
    return () => clearTimeout(t)
  }, [show, onHide])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-[#38BDF8]/30 bg-[#0d1528] px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          CV downloaded
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function CV() {
  const [toast, setToast] = useState(false)

  return (
    <section id="cv" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionHeading
          index="04"
          eyebrow="Resume"
          title="My journey so"
          highlight="far."
          subtitle="Work, projects and education — scroll to follow the timeline."
        />

        <Timeline />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bento-card mx-auto mt-16 grid max-w-4xl items-center gap-8 p-6 md:grid-cols-[0.8fr_1fr] md:p-8"
        >
          <button
            type="button"
            onClick={openCvViewer}
            aria-label="View CV"
            className="group relative mx-auto block w-full max-w-[300px] -rotate-2 overflow-hidden rounded-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]"
          >
            <img src={CV_PREVIEW_URL} alt={`${cvData.name} CV preview`} loading="lazy" width={1588} height={2246} className="w-full" />
            <span className="absolute inset-0 flex items-center justify-center bg-[#070b17]/0 opacity-0 transition-all duration-300 group-hover:bg-[#070b17]/45 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#070b17]">
                <Eye size={15} /> Read CV
              </span>
            </span>
          </button>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">One-page CV · PDF</p>
            <p className="font-heading mt-3 text-[30px] font-bold leading-tight text-white">Everything on one page.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
              Experience, all four projects, skills and contact details — ready to share with your team.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  downloadCvPdf()
                  setToast(true)
                }}
              >
                <MovingBorder innerClassName="h-12 gap-2 px-6 text-[15px] font-semibold text-white">
                  <Download size={17} /> Download CV
                </MovingBorder>
              </button>
              <button
                type="button"
                onClick={openCvViewer}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#070b17] transition-transform hover:scale-[1.03]"
              >
                <Eye size={16} /> View CV
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Toast show={toast} onHide={() => setToast(false)} />
    </section>
  )
}
