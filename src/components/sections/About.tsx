import { Code2, Globe, GraduationCap, MapPin, Rocket, Search, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { BentoCard, SectionHeading } from '../ui/Bento'
import { MovingBorder, TextGenerate } from '../fx/effects'
import TerminalWidget from '../ui/TerminalWidget'
import { cvData } from '../../data/cv-data'

const FACTS = [
  { icon: MapPin, value: cvData.location },
  { icon: GraduationCap, value: 'B.Sc. ICT · Rangsit University' },
  { icon: Rocket, value: 'Graduating 2027' },
  { icon: Globe, value: 'English · Burmese' },
]

const PRINCIPLES = [
  {
    icon: Code2,
    title: 'Own it end to end',
    body: 'Schema, API, UI, deployment and backups — I like understanding the whole system.',
  },
  {
    icon: Users,
    title: 'Build for real users',
    body: 'My users are cashiers, drivers and factory staff. If it confuses them, it isn’t done.',
  },
  {
    icon: Search,
    title: 'Ship it, keep it running',
    body: 'Transactions, permissions, restore tests — the work that keeps a business online.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionHeading index="01" eyebrow="About me" title="A developer who ships to" highlight="real users." />

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <TextGenerate
              className="font-heading text-[24px] font-semibold leading-snug text-white md:text-[28px]"
              text="Software only matters if people actually use it — so I build things businesses run on, and I keep them running."
            />
            <div className="mt-7 space-y-4 text-[16px] leading-[1.85] text-slate-400">
              <p>
                I started building websites for small businesses and non-profits in Myanmar in 2023. Since then
                I&apos;ve shipped a delivery app, a multi-city factory system, an AI study app and a full pharmacy
                point-of-sale system that a real business uses every day.
              </p>
              <p>
                I recently completed a software developer internship at <span className="text-slate-200">DiscoverToday International Marketing</span>, shipping features across three of their products.
                I work mostly in <span className="text-[#38BDF8]">TypeScript</span> (Next.js, NestJS) and{' '}
                <span className="text-[#38BDF8]">Flutter</span> with PostgreSQL underneath — and I&apos;m looking for my next role.
              </p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {FACTS.map(({ icon: Icon, value }, i) => (
                <motion.li
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-slate-300"
                >
                  <Icon size={14} className="text-[#38BDF8]" /> {value}
                </motion.li>
              ))}
              <li className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[13px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Open to work
              </li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <p className="mb-3 flex items-center gap-2 font-mono text-[12px] text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#38BDF8]" />
              Try my terminal — type a command or tap one
            </p>
            <MovingBorder rounded="rounded-2xl" className="w-full" innerClassName="block p-1.5">
              <TerminalWidget showChips outputClassName="min-h-[220px] md:max-h-[260px]" className="w-full" />
            </MovingBorder>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
            <BentoCard key={title} index={i} className="group p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38BDF8]/25 bg-gradient-to-br from-[#1A56DB]/35 to-transparent text-[#38BDF8] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Icon size={21} />
                </span>
                <span className="font-heading text-[40px] font-bold leading-none text-white/[0.06]">0{i + 1}</span>
              </div>
              <p className="font-heading mt-6 text-[19px] font-bold text-white">{title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-400">{body}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
