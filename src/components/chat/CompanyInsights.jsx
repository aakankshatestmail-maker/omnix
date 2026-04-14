import { Star, Check, X, TrendingUp } from 'lucide-react'

function initials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function gradient(name = '') {
  const g = [
    'bg-slate-200 text-gray-800',
    'bg-stone-200 text-gray-800',
    'bg-zinc-200 text-gray-800',
    'bg-neutral-200 text-gray-800',
  ]
  return g[(name.charCodeAt(0) || 0) % g.length]
}

function barTone(v) {
  if (v >= 4) return 'bg-linear-to-r from-[#16a34a] to-[#22c55e]'
  if (v >= 3.5) return 'bg-linear-to-r from-[#d97706] to-[#f59e0b]'
  return 'bg-linear-to-r from-[#e11d48] to-[#f43f5e]'
}

function Stars({ value, size = 'h-3.5 w-3.5' }) {
  const full = Math.floor(value)
  const half = value - full >= 0.3
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half)
        return (
          <Star
            key={i}
            className={`${size} ${filled ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#f1f1f7] text-[#e5e5ee]'}`}
          />
        )
      })}
    </div>
  )
}

export default function CompanyInsights({ data }) {
  const { company, rating, reviewCount, ratings = {}, pros = [], cons = [] } = data
  const recommended = rating >= 4

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#ececf3] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#dcdce8]">
      <div className="relative bg-gradient-to-br from-[#fafaff] to-white p-4 pb-3.5">
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/6 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          Company Intel
        </span>

        <div className="flex items-start gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${gradient(company)}`}
          >
            {initials(company)}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="truncate pr-24 text-[15px] font-semibold leading-tight text-[#0b0b14]">
              {company}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[22px] font-bold leading-none tabular-nums text-[#0b0b14]">
                {rating.toFixed(1)}
              </span>
              <Stars value={rating} />
              <span className="text-[11px] tabular-nums text-[#8a8a9c]">
                {reviewCount.toLocaleString()} reviews
              </span>
            </div>
            {recommended && (
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#16a34a]/10 px-2 py-0.5 text-[10px] font-semibold text-[#16a34a]">
                <TrendingUp className="h-3 w-3" />
                Recommended
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ececf3] to-transparent" />
      </div>

      <div className="p-4 pt-3.5">
        {Object.keys(ratings).length > 0 && (
          <div className="space-y-2">
            {Object.entries(ratings).map(([label, value]) => (
              <div key={label} className="group/row flex items-center gap-2.5">
                <span className="w-28 shrink-0 truncate text-[11px] font-medium text-[#5b5b6e]">
                  {label}
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#f1f1f7]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${barTone(value)}`}
                    style={{ width: `${(value / 5) * 100}%` }}
                  />
                </div>
                <span className="w-7 text-right text-[11px] font-semibold tabular-nums text-[#0b0b14]">
                  {value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {(pros.length > 0 || cons.length > 0) && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#16a34a]/15 bg-[#16a34a]/4 p-2.5">
              <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#16a34a]">
                <Check className="h-3 w-3" strokeWidth={3} />
                Pros
              </p>
              <ul className="space-y-1">
                {pros.slice(0, 3).map((p) => (
                  <li key={p} className="flex gap-1.5 text-[12px] leading-snug text-[#0b0b14]">
                    <span className="mt-1.25 h-1 w-1 shrink-0 rounded-full bg-[#16a34a]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#e11d48]/15 bg-[#e11d48]/4 p-2.5">
              <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#e11d48]">
                <X className="h-3 w-3" strokeWidth={3} />
                Cons
              </p>
              <ul className="space-y-1">
                {cons.slice(0, 3).map((c) => (
                  <li key={c} className="flex gap-1.5 text-[12px] leading-snug text-[#0b0b14]">
                    <span className="mt-1.25 h-1 w-1 shrink-0 rounded-full bg-[#e11d48]" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
