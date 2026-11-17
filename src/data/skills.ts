export interface SkillCategory {
  category: string
  icon: string
  blurb: string
  skills: string[]
}

/** Skills used in shipped, production projects. */
export const CORE_SKILLS = new Set([
  'React',
  'Next.js',
  'TypeScript',
  'Flutter',
  'Dart',
  'NestJS',
  'Node.js',
  'React Native',
  'Expo',
  'PostgreSQL',
  'Supabase',
  'TailwindCSS',
])

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: '🌐',
    blurb: 'Fast, responsive interfaces',
    skills: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'HTML & CSS'],
  },
  {
    category: 'Backend & Data',
    icon: '🗄️',
    blurb: 'APIs, auth and databases',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Supabase', 'TypeORM', 'REST APIs', 'Row Level Security', 'Resend'],
  },
  {
    category: 'Mobile',
    icon: '📱',
    blurb: 'Cross-platform apps',
    skills: ['Flutter', 'React Native', 'Expo'],
  },
  {
    category: 'DevOps',
    icon: '☁️',
    blurb: 'Deploy and keep it running',
    skills: ['Linux', 'nginx', 'Cloudflare', 'PM2', 'Vercel', 'GitHub Pages'],
  },
  {
    category: 'Languages',
    icon: '💻',
    blurb: 'What I write in',
    skills: ['TypeScript', 'JavaScript', 'Dart', 'SQL', 'Python', 'Java', 'C#'],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    blurb: 'Everyday toolkit',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'WordPress', 'Unity'],
  },
]
