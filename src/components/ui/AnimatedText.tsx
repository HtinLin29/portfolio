import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface AnimatedTextProps {
  strings: string[]
  className?: string
  typeSpeed?: number
  backSpeed?: number
  backDelay?: number
  loop?: boolean
}

export default function AnimatedText({
  strings,
  className = '',
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 2000,
  loop = true,
}: AnimatedTextProps) {
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!elRef.current) return

    const typed = new Typed(elRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
      showCursor: true,
      cursorChar: '|',
    })

    return () => typed.destroy()
  }, [strings, typeSpeed, backSpeed, backDelay, loop])

  return <span ref={elRef} className={className} />
}
