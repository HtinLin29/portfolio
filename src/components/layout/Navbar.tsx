import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { FileText, Menu, X } from 'lucide-react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import clsx from 'clsx'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { openCvViewer } from '../../lib/cvViewer'
import BrandLogo from '../ui/BrandLogo'

const navLinks = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'cv', label: 'Resume' },
  { to: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const activeSection = useScrollSpy()
  const { scrollY } = useScroll()

  // Floating nav: hide while scrolling down, reappear when scrolling up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 160 && y > prev + 4)
    if (y < prev - 4) setHidden(false)
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 30)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: hidden && !mobileOpen ? -110 : 0, opacity: hidden && !mobileOpen ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={clsx(
            'mx-auto flex h-[60px] max-w-6xl items-center justify-between rounded-2xl border px-3 pl-4 transition-all duration-300',
            scrolled || mobileOpen
              ? 'border-[rgba(56,189,248,0.15)] bg-[#0a0f1e]/75 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
          aria-label="Main"
        >
          <Link
            to="home"
            spy={false}
            smooth
            duration={500}
            offset={-80}
            className="group flex cursor-pointer items-center gap-2.5"
          >
            <BrandLogo className="transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
            <span className="font-heading text-[17px] font-bold text-white">
              Htin<span className="text-[#38BDF8]">Lin</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1 md:flex">
            {navLinks.map((link) => {
              const active = activeSection === link.to
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    spy={false}
                    smooth
                    duration={500}
                    offset={-80}
                    className={clsx(
                      'relative block cursor-pointer rounded-lg px-3.5 py-1.5 text-[14px] font-medium transition-colors',
                      active ? 'text-white' : 'text-slate-400 hover:text-white',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#1A56DB] to-[#0891b2] shadow-[0_0_20px_rgba(26,86,219,0.45)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCvViewer}
              className="hidden h-10 items-center gap-2 rounded-xl bg-white px-4 text-[13px] font-semibold text-[#0a0f1e] transition-transform duration-200 hover:scale-105 sm:inline-flex"
            >
              <FileText size={15} /> Resume
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close menu"
              className="fixed inset-0 z-[105] bg-[#0a0f1e]/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-x-3 top-[80px] z-[110] rounded-2xl border border-[rgba(56,189,248,0.15)] bg-[#0a0f1e]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      to={link.to}
                      spy={false}
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        'flex items-center justify-between rounded-xl px-4 py-3 text-[17px] font-semibold transition-colors',
                        activeSection === link.to
                          ? 'bg-[#1A56DB]/20 text-white'
                          : 'text-slate-300 hover:bg-white/5',
                      )}
                    >
                      {link.label}
                      <span className="font-mono text-[11px] text-slate-500">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  openCvViewer()
                }}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-[14px] font-semibold text-[#0a0f1e]"
              >
                <FileText size={16} /> View resume
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
