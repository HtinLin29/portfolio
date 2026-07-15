import { useCallback, useEffect, useMemo, useState } from 'react'
import Particles, { type IParticlesProps } from '@tsparticles/react'
import type { Container, ISourceOptions } from '@tsparticles/engine'

/**
 * Fixed full-viewport particle field.
 * On mobile viewports, connector links are disabled so diagonal lines
 * cannot cross buttons/text.
 */
export default function GlobalParticles() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Force tsparticles to remeasure after mount / orientation / mobile toggle
  const refreshCanvasSize = useCallback(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(refreshCanvasSize)
    const onOrientation = () => refreshCanvasSize()
    window.addEventListener('orientationchange', onOrientation)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('orientationchange', onOrientation)
    }
  }, [isMobile, refreshCanvasSize])

  const particlesLoaded = useCallback<NonNullable<IParticlesProps['particlesLoaded']>>(
    async (container?: Container) => {
      container?.refresh?.()
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'))
      })
    },
    [],
  )

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: isMobile ? 40 : 60,
      detectRetina: true,
      pauseOnBlur: true,
      interactivity: {
        events: {
          onHover: { enable: !isMobile, mode: 'grab' },
          onClick: { enable: !isMobile, mode: 'push' },
          resize: { enable: true, delay: 0 },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.5, color: '#06B6D4' },
          },
          push: { quantity: 2 },
        },
      },
      particles: {
        color: {
          value: ['#1A56DB', '#06B6D4', '#38BDF8'],
        },
        links: {
          color: '#1A56DB',
          distance: 120,
          // No spider-web lines on mobile — dots only
          enable: !isMobile,
          opacity: 0.12,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'out' },
          random: true,
          speed: isMobile ? 0.35 : 0.6,
          straight: false,
        },
        number: {
          density: { enable: true, area: isMobile ? 1100 : 900 },
          value: isMobile ? 14 : 52,
        },
        opacity: {
          value: { min: 0.12, max: isMobile ? 0.3 : 0.5 },
          animation: {
            enable: true,
            speed: 0.6,
            minimumValue: 0.08,
          },
        },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: isMobile ? 2 : 2.5 } },
      },
    }),
    [isMobile],
  )

  return (
    <div className="global-particles-container" aria-hidden="true">
      <Particles
        key={isMobile ? 'particles-mobile' : 'particles-desktop'}
        id="global-particles"
        className="global-particles-canvas"
        options={options}
        particlesLoaded={particlesLoaded}
      />
    </div>
  )
}
