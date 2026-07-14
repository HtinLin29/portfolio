import { useId } from 'react'
import clsx from 'clsx'

interface BrandLogoProps {
  className?: string
}

/** Inline SVG so Montserrat from the page applies to the HL mark. */
export default function BrandLogo({ className }: BrandLogoProps) {
  const reactId = useId()
  const gradientId = `badge-gradient-${reactId.replace(/:/g, '')}`

  return (
    <svg
      className={clsx('h-7 w-7 shrink-0', className)}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A56DB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="112" height="112" rx="28" fill={`url(#${gradientId})`} />
      <text
        x="60"
        y="79"
        fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="50"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="-1"
      >
        HL
      </text>
    </svg>
  )
}
