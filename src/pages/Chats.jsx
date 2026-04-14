import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'

const ALL_CHATS = [
  { title: 'Senior React developer — 5 YOE, Bangalore', lastMessageMinutes: 12, preview: 'Shortlisted 8 candidates. Priya Sharma has strong Redux + TypeScript background.' },
  { title: 'Rewrite JD for Staff Backend Engineer', lastMessageMinutes: 47, preview: 'Draft 3 looks good. Removed gendered language, added remote-first clause.' },
  { title: 'Screening questions for Product Designer role', lastMessageMinutes: 2 * 60 + 15, preview: 'Generated 12 behavioral + 4 portfolio review prompts.' },
  { title: 'Compare Rahul K. vs Anjali M. for PM role', lastMessageMinutes: 4 * 60, preview: 'Rahul stronger on analytics, Anjali better stakeholder management.' },
  { title: 'Salary benchmark: DevOps engineer Pune', lastMessageMinutes: 7 * 60, preview: '18-28 LPA median for 4-6 YOE per Levels.fyi and Glassdoor data.' },
  { title: 'Draft offer letter — Kavya Reddy', lastMessageMinutes: 11 * 60, preview: 'Joining date 2026-05-02, base 32 LPA + 4L ESOPs over 4 years.' },
  { title: 'Why is hiring funnel dropping at tech round?', lastMessageMinutes: 22 * 60, preview: '62% drop at round 2. Likely coding test too long — suggest trimming to 45min.' },
  { title: 'Source passive candidates from GitHub', lastMessageMinutes: 1 * 24 * 60 + 3 * 60, preview: 'Found 34 profiles matching Rust + distributed systems in India.' },
  { title: 'Interview feedback summary — Arjun P.', lastMessageMinutes: 2 * 24 * 60, preview: 'Strong system design, weak on SQL. Panel leaning hire for L4.' },
  { title: 'LinkedIn InMail templates that convert', lastMessageMinutes: 2 * 24 * 60 + 8 * 60, preview: 'Template with personalized repo reference got 41% reply rate.' },
  { title: 'Diversity hiring strategy Q2 2026', lastMessageMinutes: 3 * 24 * 60, preview: 'Target 40% women in tech pipeline. Partner with WomenWhoCode Bangalore.' },
  { title: 'Reject email — kind but clear', lastMessageMinutes: 3 * 24 * 60 + 5 * 60, preview: 'Softer wording for final-round rejects, added feedback offer.' },
  { title: 'Notice period negotiation — Vikram S.', lastMessageMinutes: 4 * 24 * 60, preview: 'Current 90 days, asking buyout of 45. Counter with 60-day release.' },
  { title: 'Parse 120 resumes for Data Scientist JD', lastMessageMinutes: 5 * 24 * 60, preview: 'Ranked top 15. Flagged 3 with embellished credentials for verification.' },
  { title: 'Onboarding checklist for remote hires', lastMessageMinutes: 6 * 24 * 60, preview: 'Day 1-30-60-90 plan with laptop shipping, buddy assignment, goals.' },
  { title: 'Competitor hiring activity — Razorpay', lastMessageMinutes: 7 * 24 * 60, preview: 'Opened 47 roles last month. Heavy push on backend + ML infra.' },
  { title: 'Reference check script for senior roles', lastMessageMinutes: 9 * 24 * 60, preview: '8 questions covering leadership, conflict, tech depth. Legally safe phrasing.' },
  { title: 'Glassdoor review response — negative interview feedback', lastMessageMinutes: 11 * 24 * 60, preview: 'Empathetic reply acknowledging delay, inviting DM for specifics.' },
  { title: 'ATS keyword optimization for ML Engineer JD', lastMessageMinutes: 13 * 24 * 60, preview: 'Added PyTorch, MLflow, feature store. Removed vague buzzwords.' },
  { title: 'Campus hiring plan — IIT Hyderabad 2026', lastMessageMinutes: 18 * 24 * 60, preview: 'Slot booked Aug 12. Need PPT, 2 panelists, pre-placement talk content.' },
]

function formatRelative(minutes) {
  if (minutes < 60) return `${minutes} minutes ago`
  if (minutes < 60 * 24) {
    const h = Math.round(minutes / 60)
    return `${h} hour${h === 1 ? '' : 's'} ago`
  }
  const d = Math.round(minutes / (60 * 24))
  return `${d} day${d === 1 ? '' : 's'} ago`
}

export default function Chats() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_CHATS
    return ALL_CHATS.filter(
      (c) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
              Chats
            </h1>
            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0b0b14] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(11,11,20,0.18)] hover:bg-black transition-colors"
            >
              <Plus className="h-4 w-4" />
              New chat
            </Link>
          </div>

          <label className="mt-7 flex items-center gap-2.5 rounded-2xl border border-primary bg-white px-4 py-3 ring-4 ring-primary/10 focus-within:border-primary focus-within:ring-primary/15 transition-all">
            <Search className="h-5 w-5 text-[#5b5b6e]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your chats..."
              className="w-full bg-transparent text-base text-[#0b0b14] outline-none placeholder:text-[#9a9aae]"
            />
          </label>

          <ul className="mt-6 flex flex-col border-t border-[#ececf3]">
            {filtered.map((c) => (
              <li key={c.title} className="border-b border-[#ececf3]">
                <Link
                  to="/dashboard"
                  className="flex flex-col gap-1 py-4 transition-colors hover:bg-black/[0.02]"
                >
                  <span className="text-base font-medium text-[#0b0b14]">{c.title}</span>
                  <span className="line-clamp-1 text-sm text-[#5b5b6e]">{c.preview}</span>
                  <span className="text-xs text-[#9a9aae]">
                    Last message {formatRelative(c.lastMessageMinutes)}
                  </span>
                </Link>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="py-10 text-center text-sm text-[#9a9aae]">No chats match "{query}".</li>
            )}
          </ul>
      </div>
    </div>
  )
}
