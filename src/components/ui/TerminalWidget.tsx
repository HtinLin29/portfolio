import { useCallback, useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { scroller } from 'react-scroll'
import clsx from 'clsx'
import { cvData } from '../../data/cv-data'
import { projects } from '../../data/projects'
import { skillCategories } from '../../data/skills'

type LineType = 'command' | 'output' | 'error'

interface TerminalLine {
  type: LineType
  text: string
}

const WELCOME_LINES = [
  "Welcome to Htin Lin Aung's dev terminal.",
  'Type `help` to see available commands.',
]

const FEATURED_PROJECTS = projects.filter((p) => p.featured)

function runCommand(input: string): TerminalLine[] {
  const command = input.trim().toLowerCase()

  switch (command) {
    case 'help':
      return [
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  help      — list commands' },
        { type: 'output', text: '  whoami    — name and role' },
        { type: 'output', text: '  skills    — tech stack' },
        { type: 'output', text: '  projects  — featured work' },
        { type: 'output', text: '  contact   — email & LinkedIn' },
        { type: 'output', text: '  clear     — clear terminal' },
        { type: 'output', text: '  hire      — surprise + scroll to contact' },
      ]

    case 'whoami':
      return [
        { type: 'output', text: cvData.name },
        { type: 'output', text: cvData.title },
        { type: 'output', text: cvData.location },
      ]

    case 'skills':
      return skillCategories.flatMap((category) => [
        { type: 'output', text: `${category.icon} ${category.category}` },
        { type: 'output', text: `   ${category.skills.join(', ')}` },
      ])

    case 'projects':
      return FEATURED_PROJECTS.flatMap((project) => [
        { type: 'output', text: `${project.icon} ${project.title} — ${project.subtitle}` },
        { type: 'output', text: `   ${project.liveUrl}` },
      ])

    case 'contact':
      return [
        { type: 'output', text: `Email: ${cvData.email}` },
        { type: 'output', text: `LinkedIn: https://${cvData.linkedin}` },
        { type: 'output', text: `GitHub: https://${cvData.github}` },
      ]

    case 'clear':
      return []

    case 'hire':
      return [
        { type: 'output', text: '🎉 Thanks for considering me!' },
        { type: 'output', text: 'Scrolling to the contact section...' },
      ]

    case '':
      return []

    default:
      return [
        {
          type: 'error',
          text: `Command not found: ${input.trim()}. Type \`help\` for options.`,
        },
      ]
  }
}

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.65 },
    colors: ['#1A56DB', '#06B6D4', '#38BDF8', '#86EFAC'],
  })
}

interface TerminalWidgetProps {
  className?: string
  outputClassName?: string
}

export default function TerminalWidget({
  className = '',
  outputClassName = '',
}: TerminalWidgetProps) {
  const [lines, setLines] = useState<TerminalLine[]>(
    WELCOME_LINES.map((text) => ({ type: 'output', text })),
  )
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const submitCommand = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const commandLine: TerminalLine = { type: 'command', text: `$ ${trimmed}` }
    const output = runCommand(trimmed)

    if (trimmed.toLowerCase() === 'clear') {
      setLines(WELCOME_LINES.map((text) => ({ type: 'output', text })))
    } else {
      setLines((prev) => [...prev, commandLine, ...output])
    }

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
    setInput('')

    if (trimmed.toLowerCase() === 'hire') {
      fireConfetti()
      window.setTimeout(() => {
        scroller.scrollTo('contact', {
          smooth: true,
          duration: 600,
          offset: -80,
        })
      }, 400)
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitCommand(input)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex < 0) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex] ?? '')
      }
    }
  }

  return (
    <div className={clsx('terminal-widget w-full', className)}>
      <div className="terminal-window overflow-hidden rounded-xl border border-[rgba(26,86,219,0.25)] bg-[#0d1117] shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
          <span className="ml-2 font-mono text-[11px] text-slate-400">htinlin — bash</span>
        </div>

        <div
          ref={outputRef}
          className={clsx(
            'terminal-output max-h-[220px] overflow-y-auto px-3 py-3 font-mono text-[12px] leading-relaxed md:max-h-[200px] md:text-[13px]',
            outputClassName,
          )}
          onClick={() => inputRef.current?.focus()}
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {lines.map((line, index) => (
            <div
              key={`${line.type}-${index}`}
              className={
                line.type === 'command'
                  ? 'text-[#86EFAC]'
                  : line.type === 'error'
                    ? 'text-[#F87171]'
                    : 'text-slate-300'
              }
            >
              {line.text}
            </div>
          ))}

          <div
            className="terminal-prompt mt-1 inline-flex max-w-full cursor-text items-center font-mono text-[12px] md:text-[13px]"
            onClick={() => inputRef.current?.focus()}
          >
            <span className="shrink-0 text-[#06B6D4]">$&nbsp;</span>
            <span className="relative inline-flex min-h-[1.25em] min-w-[1ch] items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
                className="terminal-input absolute inset-0 z-[1] h-full w-full bg-transparent font-mono text-[12px] text-transparent caret-transparent outline-none md:text-[13px]"
              />
              <span className="whitespace-pre text-slate-100" aria-hidden="true">
                {input}
              </span>
              <span className="terminal-cursor shrink-0 text-[#06B6D4]" aria-hidden="true">
                |
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
