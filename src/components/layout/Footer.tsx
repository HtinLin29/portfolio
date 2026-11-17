import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-scroll'
import { cvData } from '../../data/cv-data'
import BrandLogo from '../ui/BrandLogo'

const navLinks = [
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'cv', label: 'Resume' },
  { to: 'contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'GitHub', href: `https://${cvData.github}`, icon: Github },
  { label: 'LinkedIn', href: `https://${cvData.linkedin}`, icon: Linkedin },
  { label: 'Email', href: `mailto:${cvData.email}`, icon: Mail },
  { label: 'LINE', href: `https://line.me/ti/p/~${cvData.line}`, icon: MessageCircle },
]

export default function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden border-t border-white/[0.06] pt-14">
      <div className="section-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-9 w-9" />
            <div>
              <p className="font-heading text-[17px] font-bold text-white">{cvData.name}</p>
              <p className="text-[13px] text-slate-400">Full-stack developer · Bangkok</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                spy={false}
                smooth
                duration={500}
                offset={-80}
                className="cursor-pointer text-[14px] text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/50 hover:text-white hover:shadow-[0_8px_24px_rgba(56,189,248,0.25)]"
              >
                <Icon size={17} />
              </a>
            ))}
            <Link
              to="home"
              spy={false}
              smooth
              duration={600}
              offset={-80}
              aria-label="Back to top"
              className="ml-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white text-[#0a0f1e] transition-transform hover:-translate-y-1"
            >
              <ArrowUp size={17} />
            </Link>
          </div>
        </div>
      </div>

      <p
        className="footer-outline font-heading mt-12 select-none whitespace-nowrap text-center text-[15vw] font-bold leading-[0.8] tracking-[-0.05em]"
        aria-hidden="true"
      >
        HTIN LIN AUNG
      </p>
      <div className="section-container flex flex-col items-center justify-between gap-2 py-6 text-[12px] text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {cvData.name}. All rights reserved.</p>
        <p>Built with React, TypeScript, Tailwind &amp; Framer Motion</p>
      </div>
    </footer>
  )
}
