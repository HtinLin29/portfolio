import { useEffect, useMemo, useRef, useState } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import CV from './components/sections/CV'
import Contact from './components/sections/Contact'
import { useTheme } from './hooks/useTheme'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

function GlobalParticles() {
  const isMobile = useIsMobile()

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: {
            distance: 180,
            links: { opacity: 0.8, color: '#06B6D4' },
          },
          push: { quantity: 4 },
        },
      },
      particles: {
        color: {
          value: ['#1A56DB', '#06B6D4', '#38BDF8'],
        },
        links: {
          color: '#1A56DB',
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: isMobile ? 30 : 80,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
          },
        },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [isMobile],
  )

  return (
    <div className="global-particles-container" aria-hidden="true">
      <Particles id="global-particles" className="global-particles-canvas" options={options} />
    </div>
  )
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${progressRef.current}%`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      className="scroll-progress-track pointer-events-none fixed left-0 right-0 top-0 z-[99] h-[3px]"
      aria-hidden="true"
    >
      <div ref={barRef} className="scroll-progress-bar h-full" style={{ width: '0%' }} />
    </div>
  )
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!glowRef.current || window.innerWidth <= 1024) return
      glowRef.current.style.left = `${event.clientX}px`
      glowRef.current.style.top = `${event.clientY}px`
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}

function SectionDivider() {
  return <hr className="section-divider" aria-hidden="true" />
}

function AppContent() {
  return (
    <div className="relative min-h-screen">
      <GlobalParticles />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <CV />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Defer particle mount until after first client paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only gate
    setReady(true)
  }, [])

  if (!ready) {
    return <div className="min-h-screen" />
  }

  return (
    <ParticlesProvider init={loadSlim}>
      <AppContent />
    </ParticlesProvider>
  )
}

export default App
