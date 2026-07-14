import { useMemo, useState } from 'react'
import Particles from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

/**
 * Fixed full-viewport particle field.
 * Mounted once in App — options are frozen at first paint (no resize remount).
 * Counts are ~35% lower than the old Hero-only config for scroll performance.
 */
export default function GlobalParticles() {
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: isMobile ? 45 : 60,
      detectRetina: true,
      pauseOnBlur: true,
      interactivity: {
        events: {
          onHover: { enable: !isMobile, mode: 'grab' },
          onClick: { enable: !isMobile, mode: 'push' },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.6, color: '#06B6D4' },
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
          distance: 130,
          enable: true,
          opacity: 0.12,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: true,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true, area: 900 },
          // Was mobile 30 / desktop 80 → ~35% fewer
          value: isMobile ? 20 : 52,
        },
        opacity: {
          value: { min: 0.15, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.1,
          },
        },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 2.5 } },
      },
    }),
    [isMobile],
  )

  return (
    <div className="global-particles-container" aria-hidden="true">
      <Particles id="global-particles" className="global-particles-canvas" options={options} />
    </div>
  )
}
