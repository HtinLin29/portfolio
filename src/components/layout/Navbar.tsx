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
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-theme md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-theme/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-4">
              <span className="text-lg font-bold text-water-blue">💧 HtinLin</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-theme"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-1 flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    spy={false}
                    smooth
                    duration={500}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'text-2xl font-semibold transition-colors',
                      activeSection === link.to
                        ? 'text-water-blue'
                        : 'text-theme-muted hover:text-theme-primary',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
