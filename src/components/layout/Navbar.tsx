import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const navLinks = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'cv', label: 'CV' },
  { to: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy(0.3)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50)
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
      <header
        className={clsx(
          'fixed left-0 right-0 top-0 z-[100] h-[72px] transition-all duration-300',
          scrolled
            ? 'border-b border-theme bg-theme-card/80 shadow-lg backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="section-container flex h-full items-center justify-between">
          <Link
            to="home"
            spy={false}
            smooth
            duration={500}
            offset={-80}
            className="navbar-logo-group group flex cursor-pointer items-center gap-2"
          >
            <span className="navbar-logo-emoji text-2xl transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(26,86,219,0.8)]">
              💧
            </span>
            <span className="text-lg font-bold text-water-blue">HtinLin</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  spy={false}
                  smooth
                  duration={500}
                  offset={-80}
                  className={clsx(
                    'nav-link cursor-pointer',
                    activeSection === link.to && 'active',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => (mobileOpen ? setMobileOpen(false) : setMobileOpen(true))}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-theme md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Close menu"
              className="fixed inset-0 z-[105] bg-[#0a0f1e]/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[72px] z-[110] flex max-h-[calc(100svh-72px)] flex-col overflow-y-auto border-b border-theme bg-[#0a0f1e]/98 shadow-xl backdrop-blur-xl md:hidden"
            >
              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.05 }}
                className="flex flex-col gap-1 px-4 py-6"
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      spy={false}
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        'block rounded-xl px-4 py-3 text-lg font-semibold transition-colors',
                        activeSection === link.to
                          ? 'bg-water-blue/10 text-water-blue'
                          : 'text-theme-muted hover:bg-white/5 hover:text-theme-primary',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
