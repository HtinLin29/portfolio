import { useEffect, useRef, useState } from 'react'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import clsx from 'clsx'
import { BentoCard, SectionHeading } from '../ui/Bento'
import { BackgroundBeams, MovingBorder } from '../fx/effects'
import { cvData } from '../../data/cv-data'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
}

const emailJsReady = Boolean(
  emailJsConfig.serviceId &&
    emailJsConfig.templateId &&
    emailJsConfig.publicKey &&
    !emailJsConfig.serviceId.includes('your_'),
)

type Field = 'from_name' | 'from_email' | 'subject' | 'message'
type FormState = Record<Field, string>
const EMPTY: FormState = { from_name: '', from_email: '', subject: '', message: '' }

const CHANNELS = [
  { label: 'Email', value: 'Gmail', href: `mailto:${cvData.email}`, icon: Mail },
  { label: 'LinkedIn', value: '/in/hlaung29', href: `https://${cvData.linkedin}`, icon: Linkedin },
  { label: 'GitHub', value: '/HtinLin29', href: `https://${cvData.github}`, icon: Github },
  { label: 'LINE', value: cvData.line, href: `https://line.me/ti/p/~${cvData.line}`, icon: MessageCircle },
]

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(cvData.email)
          setCopied(true)
        } catch {
          window.location.href = `mailto:${cvData.email}`
        }
      }}
      className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-5 text-[14px] font-semibold text-white transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
    >
      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  const validate = () => {
    const next: Partial<Record<Field, string>> = {}
    if (!form.from_name.trim()) next.from_name = 'Please add your name'
    if (!EMAIL_REGEX.test(form.from_email.trim())) next.from_email = 'Please add a valid email'
    if (!form.message.trim()) next.message = 'Please write a message'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (!emailJsReady) {
      // No email service configured — open the visitor's mail app with the message filled in.
      const subject = form.subject.trim() || `Hello from ${form.from_name.trim()}`
      const body = `${form.message.trim()}\n\n— ${form.from_name.trim()} (${form.from_email.trim()})`
      window.location.href = `mailto:${cvData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, formRef.current!, {
        publicKey: emailJsConfig.publicKey,
      })
      setForm(EMPTY)
      setStatus('sent')
    } catch (error) {
      setErrorText(
        error instanceof EmailJSResponseStatus
          ? error.text || `Request failed (${error.status})`
          : 'Something went wrong — please email me directly.',
      )
      setStatus('error')
    }
  }

  const field = (name: Field) => ({
    id: name,
    name,
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value })),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: clsx(
      'w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[15px] text-white outline-none transition-all placeholder:text-slate-500 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]',
      errors[name] ? 'border-red-400/70' : 'border-white/10 focus:border-[#38BDF8]/60',
    ),
  })

  const error = (name: Field) =>
    errors[name] && (
      <p id={`${name}-error`} className="mt-1.5 text-[13px] text-red-400">
        {errors[name]}
      </p>
    )

  const label = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400'

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[380px] flex-col items-center justify-center text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Check size={26} />
          </span>
          <p className="font-heading mt-5 text-[26px] font-bold text-white">Message sent — thank you!</p>
          <p className="mt-2 text-[15px] text-slate-400">I usually reply within 24 hours.</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 h-11 rounded-xl border border-white/15 px-5 text-[14px] font-semibold text-white hover:border-[#38BDF8]"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="from_name" className={label}>
                Name
              </label>
              <input type="text" autoComplete="name" placeholder="Jane Smith" {...field('from_name')} />
              {error('from_name')}
            </div>
            <div>
              <label htmlFor="from_email" className={label}>
                Email
              </label>
              <input type="email" autoComplete="email" placeholder="jane@company.com" {...field('from_email')} />
              {error('from_email')}
            </div>
          </div>
          <div>
            <label htmlFor="subject" className={label}>
              Subject <span className="normal-case tracking-normal text-slate-500">(optional)</span>
            </label>
            <input type="text" placeholder="Software developer role" {...field('subject')} />
          </div>
          <div>
            <label htmlFor="message" className={label}>
              Message
            </label>
            <textarea rows={5} placeholder="Tell me about the role or project…" {...field('message')} />
            {error('message')}
          </div>
          {status === 'error' && (
            <p role="alert" className="text-[14px] text-red-400">
              {errorText}
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#0891b2] text-[15px] font-semibold text-white transition-shadow hover:shadow-[0_10px_30px_rgba(26,86,219,0.45)] disabled:opacity-70"
          >
            {status === 'sending' ? (
              <>
                Sending <Loader2 size={17} className="animate-spin" />
              </>
            ) : (
              <>
                Send message <Send size={16} />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative z-[1] overflow-hidden">
      <BackgroundBeams className="opacity-80" />
      <div className="section-container relative">
        <SectionHeading index="05" eyebrow="Contact" title="Let's build something" highlight="together." />

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <BentoCard index={0} className="relative p-7 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(26,86,219,0.35),transparent_65%)] blur-2xl"
                aria-hidden="true"
              />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[12px] font-medium text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Open to work · replies within 24h
              </span>
              <p className="font-heading relative mt-6 text-[28px] font-bold leading-tight text-white sm:text-[32px]">
                Have a role or a project in mind?
              </p>
              <p className="relative mt-3 text-[15px] leading-relaxed text-slate-400">
                I&apos;m looking for my next software development role — on-site in Bangkok or remote. Drop me a line.
              </p>
              <div className="relative mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${cvData.email}`}>
                  <MovingBorder innerClassName="h-12 gap-2 px-5 text-[14px] font-semibold text-white">
                    Email me <ArrowUpRight size={16} />
                  </MovingBorder>
                </a>
                <CopyEmail />
              </div>
            </BentoCard>

            <div className="grid grid-cols-2 gap-4">
              {CHANNELS.map(({ label, value, href, icon: Icon }, i) => (
                <BentoCard key={label} index={i + 1} className="group p-0">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex h-full flex-col gap-5 p-5"
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(56,189,248,0.2)] bg-[#1A56DB]/20 text-[#38BDF8] transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#38BDF8]"
                      />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{label}</span>
                      <span className="mt-1 block break-all text-[14px] font-medium text-white">{value}</span>
                    </span>
                  </a>
                </BentoCard>
              ))}
            </div>
          </div>

          <BentoCard index={2} className="p-6 sm:p-8 lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Send a message</p>
            <p className="font-heading mt-2 text-[24px] font-bold text-white">Drop me a note</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
