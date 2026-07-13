import clsx from 'clsx'

interface WaveDividerProps {
  flip?: boolean
  flipped?: boolean
  color?: string
}

export default function WaveDivider({
  flip = false,
  flipped = false,
  color = 'var(--card)',
}: WaveDividerProps) {
  const isFlipped = flip || flipped

  return (
    <div
      className={clsx('pointer-events-none w-full opacity-40', isFlipped && 'scale-y-[-1]')}
      style={{ height: '60px', color }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="currentColor"
      >
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </div>
  )
}
