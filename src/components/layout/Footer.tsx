import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-scroll'
import { cvData } from '../../data/cv-data'
import BrandLogo from '../ui/BrandLogo'

const navLinks = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'cv', label: 'CV' },
  { to: 'contact', label: 'Contact' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: `https://${cvData.github}`,
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: `https://${cvData.linkedin}`,
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: `mailto:${cvData.email}`,
    icon: Mail,
  },
  {
    label: 'LINE',
    href: `https://line.me/ti/p/~${cvData.line}`,
    icon: MessageCircle,
  },
]

export default function Footer() {
  return (
    <footer className="footer-dark relative z-[1] border-t border-[rgba(26,86,219,0.08)] py-10">
      <div className="section-container flex flex-col items-center text-center">
        <Link
          to="home"
          spy={false}
          smooth
          duration={500}
          offset={-80}
          className="group flex cursor-pointer items-center gap-2"
        >
          <BrandLogo className="transition-transform duration-200 group-hover:scale-110" />
          <span className="text-lg font-bold text-water-blue">HtinLin</span>
        </Link>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={false}
              smooth
              duration={500}
              offset={-80}
              className="cursor-pointer text-[13px] text-slate-400 transition-colors duration-200 hover:text-water-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <hr className="my-8 w-full border-[rgba(26,86,219,0.2)]" />

        <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-slate-400">
            © 2026 {cvData.name}. Built with React + Vite
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label === 'Email' ? undefined : '_blank'}
                rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
                aria-label={social.label}
                className="footer-social-btn icon-circle-hover flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all duration-200 hover:border-water-blue hover:text-water-blue"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[11px] italic text-slate-500">
          Designed & Developed by {cvData.name}
        </p>
      </div>
    </footer>
  )
}
