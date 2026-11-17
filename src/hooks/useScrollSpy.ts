import { useEffect, useState } from 'react'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'cv', 'contact']

/**
 * Returns the id of the section crossing the middle of the viewport.
 * Works for sections of any height (a ratio threshold fails for very tall ones).
 */
export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActiveSection(hit.target.id)
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return activeSection
}

export { SECTION_IDS }
