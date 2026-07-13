export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
  color: string
  icon: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Royal Ph7',
    subtitle: 'Water Delivery Mobile App',
    description:
      'A full-stack Flutter mobile and web delivery app with real-time order tracking, three user roles (customer, driver, admin), live chat, and driver shift management. Built with Flutter and Supabase.',
    techStack: ['Flutter', 'Dart', 'Supabase', 'GoRouter', 'Provider'],
    liveUrl: 'https://htinlin29.github.io/RoyalPH7_water_order_app/',
    githubUrl: 'https://github.com/HtinLin29/RoyalPH7_water_order_app',
    color: '#1A56DB',
    icon: '💧',
    featured: true,
  },
  {
    id: 2,
    title: 'Water Factory',
    subtitle: 'Business Management System',
    description:
      'A Next.js multi-city business management system with driver distribution tracking, factory sales with credit support, real-time stock management, and automated reporting.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS', 'Vercel'],
    liveUrl: 'https://water-factory-sigma.vercel.app',
    githubUrl: 'https://github.com/HtinLin29/water_factory',
    color: '#06B6D4',
    icon: '🏭',
    featured: true,
  },
  {
    id: 3,
    title: 'Portfolio Website',
    subtitle: 'Developer Portfolio',
    description:
      'A personal developer portfolio built to showcase real, deployed projects with an interactive, animated experience — featuring a particle background, live GitHub contribution graph, and a functional terminal easter egg.',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    liveUrl: 'https://htinlin29.github.io/portfolio/',
    githubUrl: 'https://github.com/HtinLin29/portfolio',
    color: '#6366F1',
    icon: '💻',
    featured: true,
  },
]
