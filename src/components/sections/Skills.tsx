import clsx from 'clsx'
import { SectionHeading } from '../ui/Bento'
import { HoverGrid } from '../fx/effects'
import { CORE_SKILLS, skillCategories, type SkillCategory } from '../../data/skills'

function SkillCard(cat: SkillCategory) {
  return (
    <div className="relative z-10 h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b17] p-6 transition-colors group-hover:border-[#38BDF8]/40">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38BDF8]/20 bg-gradient-to-br from-[#1A56DB]/30 to-transparent text-[22px] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          {cat.icon}
        </span>
        <div>
          <h3 className="font-heading text-[19px] font-bold text-white">{cat.category}</h3>
          <p className="text-[13px] text-slate-400">{cat.blurb}</p>
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {cat.skills.map((skill) => {
          const core = CORE_SKILLS.has(skill)
          return (
            <li
              key={skill}
              className={clsx(
                'rounded-full border px-3 py-1.5 text-[13px]',
                core
                  ? 'border-[#38BDF8]/45 bg-[#1A56DB]/20 font-medium text-white'
                  : 'border-white/10 bg-white/[0.03] text-slate-300',
              )}
            >
              {core && <span className="mr-1.5 text-[#38BDF8]">●</span>}
              {skill}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative z-[1]">
      <div className="section-container">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The stack I ship"
          highlight="with."
          subtitle="Highlighted skills are ones I've used in production projects that real businesses run on."
        />

        <HoverGrid
          className="-m-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          items={skillCategories}
          getKey={(c) => c.category}
          render={(c) => <SkillCard {...c} />}
        />
      </div>
    </section>
  )
}
