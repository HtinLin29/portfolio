import { useMemo } from 'react'
import Particles from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

/** Twinkling particle band (Aceternity "sparkles"). Requires the app's ParticlesProvider. */
export default function Sparkles({ id, density = 900, className }: { id: string; density?: number; className?: string }) {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        color: { value: ['#ffffff', '#38BDF8', '#93c5fd'] },
        number: { value: density, density: { enable: true, width: 400, height: 400 } },
        move: { enable: true, speed: { min: 0.1, max: 0.6 }, direction: 'none', outModes: { default: 'out' } },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: { enable: true, speed: 3, sync: false, startValue: 'random' },
        },
        size: { value: { min: 0.4, max: 1.3 } },
      },
    }),
    [density],
  )

  return <Particles id={id} options={options} className={className} />
}
