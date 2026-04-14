import { useState } from 'react'
import { ArrowUpRight, Building2, MapPin, ThumbsDown, ThumbsUp } from 'lucide-react'

function initials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function logoGradient(name = '') {
  const tones = [
    'bg-slate-200 text-gray-800',
    'bg-stone-200 text-gray-800',
    'bg-zinc-200 text-gray-800',
    'bg-neutral-200 text-gray-800',
    'bg-gray-200 text-gray-800',
  ]
  return tones[(name.charCodeAt(0) || 0) % tones.length]
}

function matchTone(score) {
  if (score >= 85) return 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]'
  if (score >= 70) return 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]'
  return 'bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]'
}

export default function JobCard({ job }) {
  const [feedback, setFeedback] = useState(null)
  const [applied, setApplied] = useState(false)
  const skills = (job.skills ?? []).slice(0, 6)

  return (
    <div className="rounded-2xl border border-[#ececf3] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${logoGradient(job.company)}`}
        >
          {initials(job.company)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold leading-snug text-[#0b0b14]">
            {job.title}
          </h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#5b5b6e]">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {job.company}
            </span>
            {job.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </span>
            )}
          </div>
        </div>

        {typeof job.matchScore === 'number' && (
          <div
            className={`flex shrink-0 flex-col items-center rounded-xl border px-2.5 py-1.5 ${matchTone(job.matchScore)}`}
          >
            <span className="text-sm font-bold leading-none">{job.matchScore}%</span>
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide opacity-80">
              match
            </span>
          </div>
        )}
      </div>

      {(job.experience || job.salary) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.experience && (
            <span className="rounded-full border border-[#ececf3] bg-[#fafafc] px-2.5 py-1 text-[11px] font-medium text-[#5b5b6e]">
              {job.experience}
            </span>
          )}
          {job.salary && (
            <span className="rounded-full border border-[#ececf3] bg-[#fafafc] px-2.5 py-1 text-[11px] font-medium text-[#5b5b6e]">
              {job.salary}
            </span>
          )}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-primary/15 bg-primary/6 px-2.5 py-0.5 text-[11px] font-medium text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-[#ececf3] pt-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
            aria-label="Good match"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
              feedback === 'up'
                ? 'bg-primary/10 text-primary'
                : 'text-[#9a9aae] hover:bg-black/4 hover:text-[#0b0b14]'
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
            aria-label="Not for me"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
              feedback === 'down'
                ? 'bg-[#fff1f2] text-[#e11d48]'
                : 'text-[#9a9aae] hover:bg-black/4 hover:text-[#0b0b14]'
            }`}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setApplied(true)}
          disabled={applied}
          className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary-hover disabled:bg-[#10b981]"
        >
          {applied ? 'Applied' : 'Apply'}
          {!applied && <ArrowUpRight className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}
