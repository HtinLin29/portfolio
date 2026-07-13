import { useEffect, useState } from 'react'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'cv', 'contact']

export function useScrollSpy(threshold = 0.3) {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold,
        rootMargin: '-80px 0px -40% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [threshold])

  return activeSection
}

export { SECTION_IDS }
