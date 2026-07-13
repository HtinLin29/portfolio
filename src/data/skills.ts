export interface SkillCategory {
  category: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Mobile',
    icon: '📱',
    skills: ['Flutter', 'Dart', 'React Native', 'Expo'],
  },
  {
    category: 'Frontend',
    icon: '🌐',
    skills: ['React', 'Next.js', 'TailwindCSS', 'HTML', 'CSS', 'Framer Motion'],
  },
  {
    category: 'Backend & Database',
    icon: '🗄️',
    skills: ['Supabase', 'PostgreSQL', 'REST APIs', 'Row Level Security'],
  },
  {
    category: 'Languages',
    icon: '💻',
    skills: ['Dart', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#'],
  },
  {
    category: 'Game Dev',
    icon: '🎮',
    skills: ['Unity', 'C#'],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'Vercel', 'GitHub Pages', 'Figma', 'VS Code'],
  },
]
