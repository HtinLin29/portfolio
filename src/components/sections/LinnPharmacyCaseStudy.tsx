import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Boxes, KeyRound, Layers, Lock, ShieldCheck, ExternalLink } from 'lucide-react'

/**
 * Screenshots live in public/projects/linn/. Add entries here once captured
 * (use demo data only — never real customers, prices or staff names).
 */
const SCREENSHOTS: { src: string; caption: string }[] = []

const STATS = [
  { value: '30+', label: 'App screens' },
  { value: '19', label: 'Backend services' },
  { value: 'Nightly', label: 'Encrypted backups' },
  { value: 'Monthly', label: 'Automated restore test' },
]

const CHALLENGES = [
  {
    icon: Boxes,
    title: 'Selling the oldest stock first, safely',
    body: 'Every sale deducts from medicine batches in first-expiry-first-out order inside a single database transaction, with row-level locks so two tills can never sell the same last box.',
  },
  {
    icon: Layers,
    title: 'Boxes, strips and tablets',
    body: 'Pharmacies sell the same item by the box or by the tablet at different prices. Stock is tracked in base units, with unit conversions and price tiers resolved at checkout.',
  },
  {
    icon: KeyRound,
    title: 'Permissions that match a real shop',
    body: 'Per-staff permissions with presets, hidden cost prices, and blind shift close — cashiers count the drawer without seeing the expected total, so discrepancies surface honestly.',
  },
  {
    icon: ShieldCheck,
    title: 'Running it in production',
    body: 'Self-hosted behind Cloudflare (Full strict TLS, origin only accepts Cloudflare traffic), nginx + PM2, one-command deploy and rollback, AES-256 encrypted off-site backups, and a monthly job that restores the latest backup to prove it works.',
  },
]

const STACK = ['Next.js', 'TypeScript', 'NestJS', 'TypeORM', 'PostgreSQL', 'JWT Auth', 'nginx', 'Cloudflare', 'Backblaze B2']

function ArchitectureDiagram() {
  const box = 'rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 px-4 py-3 text-center'
  const label = 'text-[13px] font-semibold text-theme-primary'
  const sub = 'mt-0.5 text-[11px] text-theme-muted'
  const arrow = 'flex items-center justify-center text-water-cyan text-lg leading-none'

  return (
    <figure className="flex h-full flex-col justify-center gap-2 p-6 sm:p-8" aria-label="Linn Pharmacy system architecture">
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-theme-muted">
        How it fits together
      </p>
      <div className={box}>
        <p className={label}>Staff · POS tills & back office</p>
        <p className={sub}>Next.js app — 30+ screens</p>
      </div>
      <div className={arrow} aria-hidden="true">↓</div>
      <div className={box}>
        <p className={label}>Cloudflare</p>
        <p className={sub}>TLS (Full strict) · origin locked to Cloudflare IPs</p>
      </div>
      <div className={arrow} aria-hidden="true">↓</div>
      <div className={box}>
        <p className={label}>nginx → NestJS API (PM2)</p>
        <p className={sub}>JWT auth · per-staff permissions · 19 services</p>
      </div>
      <div className={arrow} aria-hidden="true">↓</div>
      <div className="grid grid-cols-2 gap-2">
        <div className={box}>
          <p className={label}>PostgreSQL</p>
          <p className={sub}>Transactions + row locks</p>
        </div>
        <div className={box}>
          <p className={label}>Backblaze B2</p>
          <p className={sub}>Encrypted nightly backups</p>
        </div>
      </div>
    </figure>
  )
}

function Screenshots() {
  if (SCREENSHOTS.length === 0) return null
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {SCREENSHOTS.map((shot) => (
        <figure key={shot.src} className="overflow-hidden rounded-xl border border-[var(--border)]">
          <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full" />
          <figcaption className="px-4 py-2 text-[12px] text-theme-muted">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function LinnPharmacyCaseStudy() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="project-card glass-card relative overflow-hidden rounded-[20px] p-0"
      aria-labelledby="linn-title"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-water-cyan to-water-blue" aria-hidden="true" />

      <div className="flex flex-col lg:flex-row">
        <div className="p-8 lg:w-[58%] lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
              Featured case study
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-theme-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              In production
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-theme-muted">
              <Lock size={11} aria-hidden="true" />
              Private codebase
            </span>
          </div>

          <p className="mt-6 text-[14px] font-medium uppercase tracking-[0.2em] text-water-cyan">
            Pharmacy Point-of-Sale & Inventory System
          </p>
          <h3 id="linn-title" className="font-heading mt-2 text-[36px] font-bold leading-tight text-theme-primary md:text-[44px]">
            Linn Pharmacy
          </h3>

          <p className="mt-4 text-[15px] leading-[1.8] text-theme-muted">
            A pharmacy in Myanmar needed to stop selling expired medicine, know what to reorder, and
            close every shift with the cash adding up. I designed, built, deployed and now operate
            the whole system myself — from the database schema to the server it runs on.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[var(--border)] px-3 py-3">
                <dt className="text-[11px] text-theme-muted">{stat.label}</dt>
                <dd className="mt-1 text-[20px] font-bold text-theme-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-[var(--border)] lg:w-[42%] lg:border-l lg:border-t-0">
          <ArchitectureDiagram />
        </div>
      </div>

      <div className="border-t border-[var(--border)] p-8 lg:p-10">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-theme-muted">
          Hard problems I solved
        </h4>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {CHALLENGES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-water-blue/15 text-water-cyan">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <p className="text-[15px] font-semibold text-theme-primary">{title}</p>
              </div>
              <p className="mt-3 text-[14px] leading-[1.7] text-theme-muted">{body}</p>
            </div>
          ))}
        </div>

        <Screenshots />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="project-tech-badge">
                {tech}
              </span>
            ))}
          </div>
          <a
            href="https://linnpharmacy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] text-theme-muted hover:text-water-cyan"
          >
            linnpharmacy.com · staff only
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-3 text-[12px] text-theme-muted">
          Code is private because it runs a live business — happy to walk through it in an interview.
        </p>
      </div>
    </motion.article>
  )
}
