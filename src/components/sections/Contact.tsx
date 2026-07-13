import { useEffect, useRef, useState } from 'react'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Check,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react'
import clsx from 'clsx'
import SectionTitle from '../ui/SectionTitle'
import { cvData } from '../../data/cv-data'

const INTRO_TEXT =
  "Have a project in mind or an internship opening? I'd love to hear from you — drop a message and I'll get back to you as soon as I can."

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
}

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function isEmailJsConfigured() {
  return (
    emailJsConfig.serviceId &&
    emailJsConfig.templateId &&
    emailJsConfig.publicKey &&
    !emailJsConfig.serviceId.includes('your_')
  )
}

function buildTemplateParams(form: FormState) {
  const name = form.name.trim()
  const email = form.email.trim()
  const subject = form.subject.trim()
  const message = form.message.trim()

  return {
    from_name: name,
    from_email: email,
    subject,
    message,
    reply_to: email,
  }
}

function getEmailJsErrorMessage(error: unknown) {
  if (error instanceof EmailJSResponseStatus) {
    return error.text || `Request failed (${error.status})`
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong. Please try again or email me directly.'
}

interface ContactCardConfig {
  id: string
  label: string
  value: string
  hoverHint: string
  hoverColorClass: string
  icon: typeof Mail
  iconGradient: string
  glowClass: string
  type: 'email' | 'line' | 'github' | 'linkedin'
}

const CONTACT_CARDS: ContactCardConfig[] = [
  {
    id: 'email',
    label: 'Email',
    value: cvData.email,
    hoverHint: 'Click to send email',
    hoverColorClass: 'group-hover:text-water-blue',
    icon: Mail,
    iconGradient: 'from-water-blue to-water-cyan',
    glowClass: 'group-hover:shadow-[0_0_20px_rgba(26,86,219,0.5)]',
    type: 'email',
  },
  {
    id: 'line',
    label: 'LINE',
    value: cvData.line,
    hoverHint: 'Click to copy ID',
    hoverColorClass: 'group-hover:text-emerald-400',
    icon: MessageCircle,
    iconGradient: 'from-[#10B981] to-[#059669]',
    glowClass: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    type: 'line',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: cvData.github,
    hoverHint: 'View my projects',
    hoverColorClass: 'group-hover:text-violet-400',
    icon: Github,
    iconGradient: 'from-[#7C3AED] to-[#6D28D9]',
    glowClass: 'group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]',
    type: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: cvData.linkedin,
    hoverHint: 'Connect with me',
    hoverColorClass: 'group-hover:text-sky-400',
    icon: Linkedin,
    iconGradient: 'from-[#0EA5E9] to-[#0284C7]',
    glowClass: 'group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]',
    type: 'linkedin',
  },
]

function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-emerald-500/30 bg-theme-card px-5 py-3 text-sm font-medium text-emerald-400 shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ContactCard({
  card,
  index,
  inView,
  onLineCopy,
}: {
  card: ContactCardConfig
  index: number
  inView: boolean
  onLineCopy: () => void
}) {
  const Icon = card.icon

  const handleClick = () => {
    if (card.type === 'email') {
      window.location.href = `mailto:${cvData.email}`
    } else if (card.type === 'line') {
      void navigator.clipboard.writeText(cvData.line)
      onLineCopy()
    } else if (card.type === 'github') {
      window.open(`https://${cvData.github}`, '_blank', 'noopener,noreferrer')
    } else if (card.type === 'linkedin') {
      window.open(`https://${cvData.linkedin}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onClick={handleClick}
      className="contact-card glass-card group flex w-full appearance-none items-center gap-4 rounded-[16px] p-5 text-left"
    >
      <div
        className={clsx(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white transition-shadow duration-200',
          card.iconGradient,
          card.glowClass,
        )}
      >
        {card.type === 'github' ? <Github size={22} /> : <Icon size={22} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold text-theme-primary">{card.label}</p>
        <p className="mt-0.5 truncate text-[13px] text-theme-muted group-hover:hidden">
          {card.value}
        </p>
        <p
          className={clsx(
            'mt-0.5 hidden truncate text-[13px] group-hover:block',
            card.hoverColorClass,
          )}
        >
          {card.hoverHint}
        </p>
      </div>
    </motion.button>
  )
}

function ContactForm() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (isEmailJsConfigured()) {
      emailjs.init({ publicKey: emailJsConfig.publicKey })
    }
  }, [])

  const validate = () => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) {
      next.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = 'Enter a valid email address'
    }
    if (!form.subject.trim()) next.subject = 'Subject is required'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return

    if (!isEmailJsConfigured()) {
      setSubmitError(
        'Email service is not configured yet. Add your EmailJS keys to the .env file.',
      )
      return
    }

    setLoading(true)

    try {
      const sendOptions = { publicKey: emailJsConfig.publicKey }

      if (formRef.current) {
        await emailjs.sendForm(
          emailJsConfig.serviceId,
          emailJsConfig.templateId,
          formRef.current,
          sendOptions,
        )
      } else {
        await emailjs.send(
          emailJsConfig.serviceId,
          emailJsConfig.templateId,
          buildTemplateParams(form),
          sendOptions,
        )
      }

      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      setSuccess(true)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitError(getEmailJsErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setSuccess(false)
  }

  const inputClass = (field: keyof FormErrors) =>
    clsx(
      'contact-input w-full rounded-[10px] border px-4 py-3 text-[14px] text-theme-primary outline-none transition-all duration-200',
      errors[field]
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
        : 'border-[rgba(26,86,219,0.2)] focus:border-water-blue focus:shadow-[0_0_0_3px_rgba(26,86,219,0.15)]',
    )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="contact-form-container glass-card rounded-[20px] p-8"
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15"
            >
              <Check size={32} className="text-emerald-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-theme-primary">Message Sent!</h3>
            <p className="mt-2 text-sm text-theme-muted">
              Thank you! I&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-6 text-sm font-medium text-water-blue hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <h3 className="mb-6 text-[20px] font-bold text-theme-primary">Send a Message</h3>

            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-[13px] text-theme-muted">
                Your Name
              </label>
              <input
                id="contact-name"
                name="from_name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="John Doe"
                className={inputClass('name')}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-[13px] text-theme-muted">
                Your Email
              </label>
              <input
                id="contact-email"
                name="from_email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="john@example.com"
                className={inputClass('email')}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-[13px] text-theme-muted">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                placeholder="Internship Opportunity"
                className={inputClass('subject')}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-[13px] text-theme-muted">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Hello! I'd like to discuss..."
                rows={5}
                className={clsx(inputClass('message'), 'min-h-[120px] resize-y')}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            {submitError && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="contact-send-btn mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contact() {
  const { ref: cardsRef, inView: cardsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [lineToast, setLineToast] = useState(false)

  useEffect(() => {
    if (!lineToast) return
    const timer = setTimeout(() => setLineToast(false), 3000)
    return () => clearTimeout(timer)
  }, [lineToast])

  return (
    <section id="contact" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionTitle title="Get In Touch" subtitle="Let's work together or just say hello" />

        <p className="mx-auto mb-12 max-w-[600px] text-center text-[15px] leading-[1.8] text-theme-muted">
          {INTRO_TEXT}
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
          <div ref={cardsRef}>
            <div className="flex flex-col gap-4">
              {CONTACT_CARDS.map((card, index) => (
                <ContactCard
                  key={card.id}
                  card={card}
                  index={index}
                  inView={cardsInView}
                  onLineCopy={() => setLineToast(true)}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="flex items-center justify-center gap-2 text-[14px] font-medium text-emerald-400">
                <span className="availability-dot relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </span>
                Responding within 24 hours — happy to chat about roles or projects
              </p>
              <p className="mt-2 text-[13px] text-theme-muted">
                Based in Bangkok, Thailand 🇹🇭 · Open to remote
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      <Toast message="LINE ID copied!" show={lineToast} />
    </section>
  )
}
