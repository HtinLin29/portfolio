import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import Typed from 'typed.js'
import { ChevronDown, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import clsx from 'clsx'
import { cvData } from '../../data/cv-data'
import { projects } from '../../data/projects'
import { downloadCvPdf } from '../../lib/downloadCv'
import profilePhoto from '../../assets/profile.png'
import TerminalWidget from '../ui/TerminalWidget'

const TYPEWRITER_STRINGS = [
  'Full-Stack Developer',
  'Mobile App Developer',
  'Flutter & React Developer',
  'Junior Software Developer',
]

const STATS = [
  { value: '2+', label: 'Live Projects' },
  { value: '3+', label: 'Tech Stacks' },
  { value: '🚀', label: 'Open to Internship' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

type HoverLine = 'skills' | 'projects' | 'status' | 'funFact'

interface CodeSegment {
  text: string
  className: string
}

interface CodeLineData {
  hoverKey?: HoverLine
  segments: CodeSegment[]
}

const CODE_LINES: CodeLineData[] = [
  {
    segments: [
      { text: 'const', className: 'text-[#C084FC]' },
      { text: ' ', className: 'text-white/80' },
      { text: 'developer', className: 'text-[#60A5FA]' },
      { text: ' = {', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '  name', className: 'text-[#67E8F9]' },
      { text: ': ', className: 'text-white/60' },
      { text: '"Htin Lin Aung"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '  location', className: 'text-[#67E8F9]' },
      { text: ': ', className: 'text-white/60' },
      { text: '"Bangkok 🇹🇭"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '  university', className: 'text-[#67E8F9]' },
      { text: ': ', className: 'text-white/60' },
      { text: '"Rangsit University"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    hoverKey: 'skills',
    segments: [
      { text: '  skills', className: 'text-[#67E8F9]' },
      { text: ': [', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '    "Flutter"', className: 'text-[#86EFAC]' },
      { text: ', ', className: 'text-white/60' },
      { text: '"React"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '    "Next.js"', className: 'text-[#86EFAC]' },
      { text: ', ', className: 'text-white/60' },
      { text: '"Supabase"', className: 'text-[#86EFAC]' },
      { text: '', className: 'text-white/60' },
    ],
  },
  {
    segments: [{ text: '  ],', className: 'text-white/60' }],
  },
  {
    hoverKey: 'projects',
    segments: [
      { text: '  projects', className: 'text-[#67E8F9]' },
      { text: ': [', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '    "Royal Ph7 💧"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '    "Water Factory 🏭"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    segments: [
      { text: '    "Portfolio Website 💻"', className: 'text-[#86EFAC]' },
      { text: '', className: 'text-white/60' },
    ],
  },
  {
    segments: [{ text: '  ],', className: 'text-white/60' }],
  },
  {
    hoverKey: 'status',
    segments: [
      { text: '  status', className: 'text-[#67E8F9]' },
      { text: ': ', className: 'text-white/60' },
      { text: '"Open to internship 🚀"', className: 'text-[#86EFAC]' },
      { text: ',', className: 'text-white/60' },
    ],
  },
  {
    hoverKey: 'funFact',
    segments: [
      { text: '  funFact', className: 'text-[#67E8F9]' },
      { text: ': ', className: 'text-white/60' },
      { text: '"I turn ideas into apps people use"', className: 'text-[#86EFAC]' },
    ],
  },
  {
    segments: [{ text: '}', className: 'text-white/60' }],
  },
]

function flattenCodeLines(lines: CodeLineData[]) {
  const chars: { char: string; className: string; lineIndex: number }[] = []
  lines.forEach((line, lineIndex) => {
    line.segments.forEach((segment) => {
      ;[...segment.text].forEach((char) => {
        chars.push({ char, className: segment.className, lineIndex })
      })
    })
    chars.push({ char: '\n', className: '', lineIndex })
  })
  return chars
}

const FLAT_CODE_CHARS = flattenCodeLines(CODE_LINES)

function TypewriterLine() {
  const elRef = useRef<HTMLSpanElement>(null)
  const typedRef = useRef<Typed | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el || mountedRef.current) return

    mountedRef.current = true
    el.textContent = ''

    typedRef.current = new Typed(el, {
      strings: TYPEWRITER_STRINGS,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: false,
    })

    return () => {
      typedRef.current?.destroy()
      typedRef.current = null
      mountedRef.current = false
    }
  }, [])

  return (
    <span
      ref={elRef}
      className="hero-typewriter font-heading block min-h-[1.4em] w-full overflow-visible whitespace-nowrap font-semibold text-[18px] sm:text-[22px] md:text-[28px]"
      aria-live="polite"
      aria-label="Current role"
    />
  )
}

function HeroProfilePhoto() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="animate-float h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.4)] md:h-20 md:w-20">
      {!imgError ? (
        <img
          src={profilePhoto}
          alt={cvData.name}
          className="h-full w-full object-cover object-top"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-water-blue to-water-cyan text-xs font-bold text-white md:text-sm">
          HLA
        </div>
      )}
    </div>
  )
}

function CodeLineTooltip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'code-line-tooltip absolute bottom-full left-4 z-20 mb-2 whitespace-nowrap rounded-lg border border-[rgba(26,86,219,0.3)] bg-[#1A2035] px-3 py-2 text-[11px] text-white shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}

function CodeWindow() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [cardHovered, setCardHovered] = useState(false)
  const [typingDone, setTypingDone] = useState(false)
  const [hoveredLine, setHoveredLine] = useState<HoverLine | null>(null)

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const typeNext = (index: number) => {
      if (cancelled || index > FLAT_CODE_CHARS.length) return

      setVisibleCount(index)

      if (index === FLAT_CODE_CHARS.length) {
        setTypingDone(true)
        return
      }

      timeoutId = setTimeout(() => typeNext(index + 1), 28)
    }

    timeoutId = setTimeout(() => typeNext(1), 800)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  const visibleChars = FLAT_CODE_CHARS.slice(0, visibleCount)

  const visibleByLine = useMemo(() => {
    const map = new Map<number, typeof visibleChars>()
    visibleChars.forEach((item) => {
      if (item.char === '\n') return
      const list = map.get(item.lineIndex) ?? []
      list.push(item)
      map.set(item.lineIndex, list)
    })
    return map
  }, [visibleChars])

  const renderLineContent = (line: CodeLineData, lineIndex: number) => {
    const chars = visibleByLine.get(lineIndex)
    if (!chars?.length) return null

    if (line.hoverKey === 'status' && hoveredLine === 'status') {
      return (
        <>
          <span className="text-[#67E8F9]"> status</span>
          <span className="text-white/60">: </span>
          <span className="code-hire-bounce text-[#86EFAC]">&quot;✅ Hire me!&quot;</span>
          <span className="text-white/60">,</span>
        </>
      )
    }

    if (line.hoverKey === 'funFact' && hoveredLine === 'funFact') {
      return (
        <>
          <span className="text-[#67E8F9]"> funFact</span>
          <span className="text-white/60">: </span>
          <span className="code-line-glow text-[#86EFAC]">&quot;...and I prove it 🚀&quot;</span>
        </>
      )
    }

    return chars.map((item, i) => (
      <span key={i} className={item.className}>
        {item.char}
      </span>
    ))
  }

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotate: -2 }}
      animate={{ opacity: 1, x: 0, rotate: cardHovered ? 0 : -2 }}
      transition={{
        opacity: { duration: 0.6, delay: 0.8, ease: 'easeOut' },
        x: { duration: 0.6, delay: 0.8, ease: 'easeOut' },
        rotate: { duration: 0.3, ease: 'easeOut' },
      }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => {
        setCardHovered(false)
        setHoveredLine(null)
      }}
      className="code-card-glow glass-card w-full max-w-md origin-center rounded-2xl lg:max-w-lg"
    >
      <div className="relative flex items-center border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
          <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
          <span className="h-3 w-3 rounded-full bg-[#10B981]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-slate-400">
          developer.ts
        </span>
      </div>

      <pre
        className="overflow-hidden p-6 font-mono text-sm leading-[1.8]"
        style={{ fontSize: '14px' }}
      >
        <code>
          {CODE_LINES.map((line, lineIndex) => {
            const content = renderLineContent(line, lineIndex)
            if (!content) return null

            return (
              <div
                key={lineIndex}
                className="relative"
                onMouseEnter={() => line.hoverKey && setHoveredLine(line.hoverKey)}
                onMouseLeave={() => line.hoverKey && setHoveredLine(null)}
              >
                {hoveredLine === 'skills' && line.hoverKey === 'skills' && (
                  <CodeLineTooltip>
                    <span className="text-base tracking-widest">📱 🌐 🗄️ 💻 🎮 🛠️</span>
                  </CodeLineTooltip>
                )}
                {hoveredLine === 'projects' && line.hoverKey === 'projects' && (
                  <CodeLineTooltip className="whitespace-normal">
                    <div className="flex flex-col gap-1">
                      {featuredProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-water-cyan hover:underline"
                        >
                          {project.title} →
                        </a>
                      ))}
                    </div>
                  </CodeLineTooltip>
                )}
                <div>{content}</div>
              </div>
            )
          })}
          <span
            className={clsx(
              'text-[#06B6D4]',
              !typingDone && 'code-cursor-blink',
              typingDone && 'opacity-0',
            )}
          >
            |
          </span>
        </code>
      </pre>
    </motion.div>
  )
}

function SocialLink({
  href,
  label,
  icon: Icon,
  tooltip,
}: {
  href?: string
  label: string
  icon: typeof Github
  tooltip?: string
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  const content = <Icon size={18} />

  return (
    <div className="relative">
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          aria-label={label}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="hero-social-btn icon-circle-hover"
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          aria-label={label}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="hero-social-btn icon-circle-hover"
        >
          {content}
        </button>
      )}
      <AnimatePresence>
        {showTooltip && tooltip && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-theme bg-theme-card px-2.5 py-1 text-[11px] text-theme-muted shadow-lg"
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
        >
          <span className="text-xs text-slate-300" style={{ fontSize: '12px' }}>
            Scroll to explore
          </span>
          <ChevronDown size={18} className="animate-bounce-slow text-theme-muted" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function HeroContent() {
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY <= 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleDownloadCV = useCallback(() => {
    downloadCvPdf()
  }, [])

  return (
    <section
      id="home"
      className="relative z-[1] flex min-h-[100svh] flex-col overflow-hidden bg-transparent pt-0 md:min-h-[100vh] md:pt-[72px]"
    >
      <div
        className="hero-orb hero-orb-primary pointer-events-none absolute z-0"
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb-secondary pointer-events-none absolute z-0"
        aria-hidden="true"
      />
      <div className="hero-glow pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="section-container relative z-[1] flex flex-1 items-center py-8 md:py-14">
        <div className="grid w-full items-center gap-10 md:grid-cols-5 md:items-start md:gap-12">
          <motion.div
            className="flex flex-col gap-4 md:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <HeroProfilePhoto />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.25em] text-[#06B6D4]"
            >
              Hello, I&apos;m
              <span className="wave" role="img" aria-label="waving hand">
                👋
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="hero-accent-line" />

            <motion.h1
              variants={itemVariants}
              className="font-heading text-[40px] font-extrabold leading-[1.05] text-white md:text-[80px]"
              style={{ letterSpacing: '-2px' }}
            >
              HTIN LIN <span className="hero-name-gradient-dark">AUNG</span>
            </motion.h1>

            <motion.div variants={itemVariants}>
              <TypewriterLine />
            </motion.div>

            <motion.p
              variants={itemVariants}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              className="text-[18px] italic"
              style={{ color: 'var(--hero-tagline)' }}
            >
              I turn ideas into apps people actually use.
            </motion.p>

            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              className="grid grid-cols-3 gap-2 md:flex md:items-stretch md:gap-0"
            >
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={clsx(
                    'flex flex-col items-center justify-center px-0 text-center md:items-start md:px-6 md:text-left',
                    index < STATS.length - 1 && 'md:border-r md:border-theme',
                  )}
                >
                  <span className="text-[20px] font-bold leading-none text-[#1A56DB] md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[11px] leading-tight text-theme-muted md:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col gap-3 md:flex-row md:gap-4"
            >
              <Link
                to="projects"
                spy={false}
                smooth
                duration={500}
                offset={-80}
                className="hero-btn-primary btn-hover w-full cursor-pointer md:w-auto"
              >
                View My Work
                <ChevronDown size={18} />
              </Link>
              <button
                type="button"
                onClick={handleDownloadCV}
                className="hero-btn-outline btn-hover w-full md:w-auto"
              >
                Download CV
                <Download size={18} />
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <SocialLink label="GitHub" href="https://github.com/HtinLin29" icon={Github} />
              <SocialLink
                label="LinkedIn"
                href="https://linkedin.com/in/htinlin29"
                icon={Linkedin}
              />
              <SocialLink label="Email" href="mailto:htinlin.a66@rsu.ac.th" icon={Mail} />
              <SocialLink label="LINE" icon={MessageCircle} tooltip={`LINE: ${cvData.line}`} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="hero-availability-pill">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Open to internships · Bangkok 🇹🇭
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-2 md:hidden">
              <TerminalWidget />
            </motion.div>
          </motion.div>

          <div className="hidden w-full max-w-md flex-col gap-4 md:col-span-2 md:flex lg:max-w-lg">
            <CodeWindow />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
              className="w-full"
            >
              <p className="mb-2 font-mono text-[11px] text-slate-400">
                Interactive terminal — try <span className="text-water-cyan">help</span> or{' '}
                <span className="text-water-cyan">hire</span>
              </p>
              <TerminalWidget />
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollIndicator visible={showScrollHint} />
    </section>
  )
}

export default function Hero() {
  return <HeroContent />
}
