import { ArrowUpRight, Boxes, KeyRound, Layers, Lock, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { BentoCard } from '../ui/Bento'
import { Meteors } from '../fx/effects'

const STATS = [
  { value: '30+', label: 'App screens' },
  { value: '19', label: 'Backend services' },
  { value: 'Nightly', label: 'Encrypted backups' },
  { value: 'Monthly', label: 'Restore tests' },
]

const CHALLENGES = [
  {
    icon: Boxes,
    title: 'Oldest stock first, safely',
    body: 'Sales deduct medicine batches first-expiry-first-out in one transaction, with row locks so two tills never sell the same last box.',
  },
  {
    icon: Layers,
    title: 'Boxes, strips & tablets',
    body: 'One medicine sells by the box or by the tablet at different prices. Stock lives in base units; conversions resolve at checkout.',
  },
  {
    icon: KeyRound,
    title: 'Permissions for a real shop',
    body: 'Per-staff permissions, hidden cost prices and blind shift close — cashiers count the drawer without seeing the expected total.',
  },
  {
    icon: ShieldCheck,
    title: 'Running in production',
    body: 'Self-hosted behind Cloudflare with nginx + PM2, one-command deploy and rollback, and AES-256 encrypted off-site backups.',
  },
]

const ARCH = [
  { name: 'Staff browsers', detail: 'POS tills & back office · Next.js' },
  { name: 'Cloudflare', detail: 'TLS Full (strict) · origin locked' },
  { name: 'nginx → NestJS API', detail: 'PM2 · JWT · per-staff permissions' },
  { name: 'PostgreSQL', detail: 'Transactions + row locks' },
  { name: 'Backblaze B2', detail: 'Encrypted nightly backups' },
]

const STACK = ['Next.js', 'TypeScript', 'NestJS', 'TypeORM', 'PostgreSQL', 'nginx', 'Cloudflare']

export default function LinnPharmacyCaseStudy() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <BentoCard index={0} className="relative p-7 sm:p-10 lg:col-span-12">
        <Meteors count={22} />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22),transparent_65%)] blur-2xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-emerald-400 to-[#38BDF8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#04111f]">
                Featured case study
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> In daily use
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-400">
                <Lock size={11} /> Private code
              </span>
            </div>
            <p className="mt-7 font-mono text-[12px] text-slate-500">01 — Pharmacy POS & inventory · 2026</p>
            <h3 className="font-heading mt-2 text-[48px] font-bold leading-[0.95] tracking-[-0.04em] text-white md:text-[80px]">
              💊 Linn <span className="text-shimmer">Pharmacy</span>
            </h3>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300">
              A pharmacy in Myanmar needed to stop selling expired medicine, know what to reorder, and close every
              shift with the cash adding up. I designed, built and deployed the whole system — and I run it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {STACK.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[12px] text-slate-300">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <p className="font-heading text-shimmer text-[34px] font-bold leading-none">{s.value}</p>
                <p className="mt-2 text-[12px] text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </BentoCard>

      <BentoCard index={1} className="flex flex-col p-7 lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">How it fits together</p>
        <ol className="relative mt-6 flex flex-1 flex-col justify-between gap-4">
          <span className="absolute bottom-4 left-[17px] top-4 w-px overflow-hidden bg-white/10" aria-hidden="true">
            <span className="arch-flow absolute left-0 h-16 w-px bg-gradient-to-b from-transparent via-[#38BDF8] to-transparent" />
          </span>
          {ARCH.map((node, i) => (
            <motion.li
              key={node.name}
              className="relative flex items-center gap-4"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#38BDF8]/40 bg-[#0a0f1e] font-mono text-[12px] text-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.3)]">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-semibold text-white">{node.name}</p>
                <p className="text-[13px] text-slate-400">{node.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </BentoCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
        {CHALLENGES.map(({ icon: Icon, title, body }, i) => (
          <BentoCard key={title} index={i + 2} className="group p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(56,189,248,0.2)] bg-gradient-to-br from-emerald-400/20 to-[#1A56DB]/20 text-emerald-300 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <Icon size={20} />
            </span>
            <p className="mt-5 text-[16px] font-semibold text-white">{title}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{body}</p>
          </BentoCard>
        ))}
      </div>

      <p className="flex flex-wrap items-center gap-x-2 text-[13px] text-slate-500 lg:col-span-12">
        Code is private because it runs a live business — happy to walk through it in an interview.
        <a
          href="https://linnpharmacy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-[#38BDF8] hover:underline"
        >
          linnpharmacy.com <ArrowUpRight size={13} />
        </a>
      </p>
    </div>
  )
}
