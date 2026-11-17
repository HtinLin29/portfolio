import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import profilePhoto from '../../assets/profile.png'
import { cvData } from '../../data/cv-data'
import { downloadCvPdf } from '../../lib/downloadCv'
import { Card3D, Card3DItem, FlipWords, MovingBorder, Spotlight, TextGenerate } from '../fx/effects'
import Sparkles from '../fx/Sparkles'

const FLIP = ['real-world', 'full-stack', 'scalable', 'reliable']

const STATS = [
  { to: 4, suffix: '+', label: 'Live projects' },
  { to: 3, suffix: '+', label: 'Years shipping' },
  { to: 30, suffix: '+', label: 'POS screens' },
]

const SOCIALS = [
  { label: 'GitHub', href: `https://${cvData.github}`, icon: Github },
  { label: 'LinkedIn', href: `https://${cvData.linkedin}`, icon: Linkedin },
  { label: 'Email', href: `mailto:${cvData.email}`, icon: Mail },
  { label: 'LINE', href: `https://line.me/ti/p/~${cvData.line}`, icon: MessageCircle },
]

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: EASE },
})

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const c = animate(0, to, { duration: 1.8, delay: 1.2, ease: EASE, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [to])
  return (
    <>
      {v}
      {suffix}
    </>
  )
}

function ProfileCard() {
  return (
    <Card3D className="w-full">
      <div className="group/card relative w-full max-w-[420px] rounded-3xl border border-white/[0.1] bg-[#070b17]/80 p-5 shadow-[0_30px_80px_-20px_rgba(26,86,219,0.45)] backdrop-blur-md sm:p-6 lg:ml-auto">
        <Card3DItem z={50} className="flex items-center justify-between">
          <div>
            <p className="font-heading text-[22px] font-bold text-white">{cvData.name}</p>
            <p className="text-[13px] text-[#38BDF8]">{cvData.title}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Available
          </span>
        </Card3DItem>

        <Card3DItem z={100} className="mt-5">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={profilePhoto}
              alt={cvData.name}
              className="aspect-[4/4.2] w-full object-cover object-[50%_20%] transition-transform duration-500 group-hover/card:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b17]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {['React', 'Node.js', 'Flutter'].map((t) => (
                <span key={t} className="rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 font-mono text-[11px] text-white backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Card3DItem>

        <div className="mt-5 flex items-center justify-between">
          <Card3DItem z={30}>
            <p className="flex items-center gap-1.5 text-[13px] text-slate-400">
              <MapPin size={14} className="text-[#38BDF8]" /> {cvData.location}
            </p>
          </Card3DItem>
          <Card3DItem z={60}>
            <Link
              to="contact"
              spy={false}
              smooth
              duration={600}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[13px] font-semibold text-[#070b17] transition-transform hover:scale-105"
            >
              Say hi <ArrowRight size={14} />
            </Link>
          </Card3DItem>
        </div>
      </div>
    </Card3D>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative z-[1] flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 md:pt-32">
      <div className="fx-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#38BDF8" />
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(26,86,219,0.22),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="section-container relative z-[2] grid items-center gap-14 md:grid-cols-[1.25fr_0.75fr] md:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <motion.div {...rise(0.1)}>
            <MovingBorder rounded="rounded-full" innerClassName="gap-2 px-4 py-1.5 text-[12.5px] font-medium text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to work · searching for my next role
            </MovingBorder>
          </motion.div>

          <motion.p {...rise(0.2)} className="mt-8 text-[16px] font-medium text-slate-400">
            Hi, I&apos;m <span className="text-white">{cvData.name}</span> <span className="wave inline-block">👋</span>
          </motion.p>

          <motion.h1
            {...rise(0.3)}
            className="font-heading mt-3 text-[42px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[54px] md:text-[46px] lg:text-[58px] xl:text-[68px]"
          >
            <span className="fx-text-silver">I build</span>{' '}
            <FlipWords words={FLIP} className="text-shimmer" />
            <br />
            <span className="fx-text-silver">apps that businesses run on.</span>
          </motion.h1>

          <div className="relative mt-2 h-16 w-full max-w-xl">
            <div className="absolute left-0 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent blur-sm" />
            <div className="absolute left-0 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent" />
            <div className="absolute left-[15%] top-0 h-[4px] w-1/3 bg-gradient-to-r from-transparent via-[#818CF8] to-transparent blur-sm" />
            <Sparkles id="hero-sparkles" density={700} className="absolute inset-0 h-full w-full [mask-image:radial-gradient(260px_60px_at_top,white,transparent)]" />
          </div>

          <TextGenerate
            delay={0.6}
            className="max-w-xl text-[16.5px] leading-relaxed text-slate-400"
            text="Final-year ICT student in Bangkok. I design, build and deploy full-stack web and mobile apps — including a pharmacy point-of-sale system that runs a real business every day."
          />

          <motion.div {...rise(0.9)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="projects" spy={false} smooth duration={600} offset={-80} className="cursor-pointer">
              <MovingBorder innerClassName="h-12 gap-2 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#0d1530]">
                View my work <ArrowRight size={17} />
              </MovingBorder>
            </Link>
            <button
              type="button"
              onClick={downloadCvPdf}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-[#070b17] transition-transform hover:scale-[1.03]"
            >
              Download CV <Download size={17} />
            </button>
          </motion.div>

          <motion.div {...rise(1.05)} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            <dl className="flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-heading text-[30px] font-bold leading-none text-white">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-[12px] text-slate-500">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/60 hover:text-white hover:shadow-[0_8px_24px_rgba(56,189,248,0.3)]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          className="mx-auto w-full max-w-[420px] md:max-w-none"
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  )
}
