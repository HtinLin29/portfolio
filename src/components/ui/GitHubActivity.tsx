import { useEffect, useMemo, useState } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubContributionsResponse {
  total?: Record<string, number>
  contributions?: ContributionDay[]
}

function getCellColor(count: number): string {
  if (count <= 0) return '#1A2035'
  if (count <= 2) return 'rgba(26, 86, 219, 0.4)'
  if (count <= 5) return 'rgba(26, 86, 219, 0.7)'
  return '#06B6D4'
}

const CELL_SIZE = 11
const CELL_GAP = 3

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalYear, setTotalYear] = useState(0)

  useEffect(() => {
    let cancelled = false

    const fetchContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/HtinLin29')
        if (!response.ok) return

        const data = (await response.json()) as GitHubContributionsResponse
        if (cancelled) return

        const days = data.contributions ?? []
        setContributions(days.slice(-84))

        const year = new Date().getFullYear().toString()
        const yearTotal = data.total?.[year]
        if (typeof yearTotal === 'number') {
          setTotalYear(yearTotal)
        } else {
          setTotalYear(days.reduce((sum, day) => sum + day.count, 0))
        }
      } catch {
        // Graceful empty state
      }
    }

    void fetchContributions()
    return () => {
      cancelled = true
    }
  }, [])

  const weeks = useMemo(() => {
    const result: ContributionDay[][] = []
    for (let i = 0; i < contributions.length; i += 7) {
      result.push(contributions.slice(i, i + 7))
    }
    return result
  }, [contributions])

  const weekCount = weeks.length || 12
  const graphMinWidth = weekCount * (CELL_SIZE + CELL_GAP)

  const renderWeek = (week: ContributionDay[], weekIndex: number) => (
    <div key={weekIndex} className="flex shrink-0 flex-col" style={{ gap: CELL_GAP }}>
      {week.map((day) => (
        <span
          key={day.date}
          title={`${day.date}: ${day.count} contributions`}
          className="shrink-0 rounded-[2px] transition-transform duration-150 hover:scale-125"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: getCellColor(day.count),
          }}
        />
      ))}
    </div>
  )

  const renderSkeleton = () =>
    Array.from({ length: 12 }).map((_, weekIndex) => (
      <div key={weekIndex} className="flex shrink-0 flex-col" style={{ gap: CELL_GAP }}>
        {Array.from({ length: 7 }).map((__, dayIndex) => (
          <span
            key={dayIndex}
            className="shrink-0 rounded-[2px]"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: '#1A2035',
            }}
          />
        ))}
      </div>
    ))

  return (
    <div className="w-full">
      <div className="glass-card rounded-xl border border-theme p-4">
        <div
          className="github-contrib-scroll overflow-x-auto pb-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div
            className="flex"
            style={{ gap: CELL_GAP, minWidth: graphMinWidth }}
            role="img"
            aria-label={
              totalYear > 0
                ? `${totalYear} GitHub contributions in the last year`
                : 'GitHub contribution activity graph'
            }
          >
            {weeks.length === 0
              ? renderSkeleton()
              : weeks.map((week, weekIndex) => renderWeek(week, weekIndex))}
          </div>
        </div>
        <p className="mt-3 text-center text-[12px] text-theme-muted">
          {totalYear > 0 ? `${totalYear} contributions in the last year` : 'Contribution activity'}
        </p>
        <p className="mt-1 text-center text-[11px] text-theme-muted/70 md:hidden">
          Swipe to explore →
        </p>
      </div>
    </div>
  )
}
