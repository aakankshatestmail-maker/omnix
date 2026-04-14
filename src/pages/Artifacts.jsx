import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  Briefcase,
  Calendar,
  Code,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  PieChart,
  Plus,
  Presentation,
  Search,
  Sparkles,
  Table,
  Target,
  Users,
} from 'lucide-react'

const TINTS = {
  primary: 'bg-primary/10 text-primary',
  orange: 'bg-[#FFEDD5] text-[#C2410C]',
  green: 'bg-[#DCFCE7] text-[#15803D]',
  amber: 'bg-[#FEF3C7] text-[#A16207]',
  pink: 'bg-[#FCE7F3] text-[#BE185D]',
  indigo: 'bg-[#E0E7FF] text-[#4338CA]',
  sky: 'bg-[#E0F2FE] text-[#0369A1]',
  rose: 'bg-[#FFE4E6] text-[#BE123C]',
  teal: 'bg-[#CCFBF1] text-[#0F766E]',
  violet: 'bg-[#EDE9FE] text-[#6D28D9]',
}

const ARTIFACTS = [
  {
    title: 'Principal Designer Resume — Razorpay',
    kind: 'Resume',
    icon: FileText,
    tint: TINTS.primary,
    subtitle: 'Tailored for Principal Product Designer, Payments. Leads with RBI compliance UX, design ops at CRED, 0→1 merchant dashboards.',
    updatedMinutes: 22,
  },
  {
    title: 'CRED Cover Letter — Design Leadership',
    kind: 'Letter',
    icon: Mail,
    tint: TINTS.orange,
    subtitle: 'For Principal Designer, CRED Mint. Referenced Kunal Shah on first principles. 284 words. Hiring manager: Nitesh Agrawal.',
    updatedMinutes: 3 * 60 + 10,
  },
  {
    title: 'Portfolio Review — Craft & Strategy',
    kind: 'Notes',
    icon: Sparkles,
    tint: TINTS.green,
    subtitle: 'Prep for Zerodha Kite panel. Anchors: vision, systems thinking, mentorship, hiring bar. 6 follow-ups drafted.',
    updatedMinutes: 6 * 60,
  },
  {
    title: 'Swiggy — Company Brief',
    kind: 'Research',
    icon: PieChart,
    tint: TINTS.amber,
    subtitle: 'Post-IPO design org (~120 designers), Design VP Saptarshi Prakash. Loop: portfolio, whiteboard, craft, bar-raiser, VP chat.',
    updatedMinutes: 1 * 24 * 60 + 5 * 60,
  },
  {
    title: 'LinkedIn Headline — 10 Variants',
    kind: 'Copy',
    icon: FileText,
    tint: TINTS.primary,
    subtitle: 'Staff → Principal pivot for India market. Variants lean on scale (100M+ users), fintech depth, team-building.',
    updatedMinutes: 2 * 24 * 60,
  },
  {
    title: 'Portfolio Hero — v4 Mock',
    kind: 'Image',
    icon: ImageIcon,
    tint: TINTS.pink,
    subtitle: 'Above-the-fold for read.cv/folio. Hindi + English toggle, case-study thumbs from PhonePe and Meesho work.',
    updatedMinutes: 3 * 24 * 60 + 4 * 60,
  },
  {
    title: 'Case Study Rewriter Prompt',
    kind: 'Snippet',
    icon: Code,
    tint: TINTS.indigo,
    subtitle: 'System prompt turning raw Figma files + PRDs into STAR-format portfolio narratives. Tuned for Indian fintech context.',
    updatedMinutes: 4 * 24 * 60,
  },
  {
    title: '21-Day Job Search Sprint',
    kind: 'Plan',
    icon: Target,
    tint: TINTS.primary,
    subtitle: 'Daily: 5 applies, 2 warm intros, 1 portfolio polish. Targets Bengaluru-first, remote-India tolerated.',
    updatedMinutes: 6 * 24 * 60,
  },
  {
    title: 'Salary Benchmarks — Principal Designer India',
    kind: 'Spreadsheet',
    icon: FileSpreadsheet,
    tint: TINTS.teal,
    subtitle: 'Uplers + AngelList + 7 recruiter screens. Fixed ₹75L–₹1.4Cr, ESOPs, joining bonus by company size.',
    updatedMinutes: 9 * 60,
  },
  {
    title: 'Referral Outreach — PhonePe',
    kind: 'Email',
    icon: Mail,
    tint: TINTS.orange,
    subtitle: 'Cold note to ex-Flipkart PM now Design Director at PhonePe. 96 words, references shared ADPList session.',
    updatedMinutes: 48,
  },
  {
    title: 'STAR Story Bank',
    kind: 'Notes',
    icon: MessageSquare,
    tint: TINTS.green,
    subtitle: '12 stories mapped to Principal rubric: ambiguity, influence without authority, design-eng conflict, hiring, mentorship.',
    updatedMinutes: 11 * 60,
  },
  {
    title: 'Zomato Take-Home — Dining Out Redesign',
    kind: 'Document',
    icon: FileText,
    tint: TINTS.primary,
    subtitle: 'Reimagine restaurant discovery for tier-2 cities. Problem framing, 3 concepts, metrics, rollout plan. Due Fri.',
    updatedMinutes: 5 * 24 * 60 + 2 * 60,
  },
  {
    title: 'Interview Loop — Razorpay',
    kind: 'Schedule',
    icon: Calendar,
    tint: TINTS.violet,
    subtitle: 'Mon 11am recruiter, Wed 3pm portfolio (Pradeep Elankumaran), Fri whiteboard + leadership panel. Prep doc linked.',
    updatedMinutes: 3 * 60,
  },
  {
    title: 'Application Tracker',
    kind: 'Spreadsheet',
    icon: Table,
    tint: TINTS.teal,
    subtitle: '38 active · 6 rejected · 4 onsites · 1 offer (Freshworks). Sorted by stage, next action, deadline.',
    updatedMinutes: 30,
  },
  {
    title: 'Company Shortlist — India Fintech & SaaS',
    kind: 'Research',
    icon: Briefcase,
    tint: TINTS.amber,
    subtitle: '16 ranked by design maturity, comp, remote policy. Top 5: Razorpay, CRED, Zerodha, PhonePe, Postman.',
    updatedMinutes: 2 * 24 * 60 + 6 * 60,
  },
  {
    title: 'Offer Negotiation Script — India',
    kind: 'Notes',
    icon: MessageSquare,
    tint: TINTS.green,
    subtitle: 'Anchoring in lakhs, ESOP vesting (4yr/1yr cliff), joining bonus, notice-period buyout ask (₹12L at current co).',
    updatedMinutes: 10 * 24 * 60,
  },
  {
    title: 'Comp History — Visualization',
    kind: 'Chart',
    icon: BarChart3,
    tint: TINTS.sky,
    subtitle: 'CTC over 9 years across Myntra → Flipkart → CRED. 3 levels, 2 switches. 42% lift from external moves.',
    updatedMinutes: 14 * 24 * 60,
  },
  {
    title: 'Case Study — CRED Pay Onboarding',
    kind: 'Presentation',
    icon: Presentation,
    tint: TINTS.rose,
    subtitle: '14-slide walkthrough: research, 4 iterations, launched flow. +31% activation, -22% drop-off at KYC.',
    updatedMinutes: 8 * 24 * 60,
  },
  {
    title: 'References — Contact Sheet',
    kind: 'Contacts',
    icon: Users,
    tint: TINTS.violet,
    subtitle: '5 refs: ex-VP Design at Flipkart, 2 PM peers, 1 Sr designer mentee, 1 Eng Director. Availability + WhatsApp.',
    updatedMinutes: 12 * 24 * 60,
  },
  {
    title: 'Whiteboard Drill — Systems & 0→1',
    kind: 'Notes',
    icon: Code,
    tint: TINTS.indigo,
    subtitle: '18 prompts practiced: UPI merchant onboarding, ONDC buyer flow, D2C checkout. Weakness: pricing UX. Cheatsheet below.',
    updatedMinutes: 4 * 60,
  },
]

function formatRelative(minutes) {
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 60 * 24) {
    const h = Math.round(minutes / 60)
    return `${h}h ago`
  }
  const d = Math.round(minutes / (60 * 24))
  return `${d}d ago`
}

export default function Artifacts() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ARTIFACTS
    return ARTIFACTS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.kind.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
              Artifacts
            </h1>
            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0b0b14] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(11,11,20,0.18)] hover:bg-black transition-colors"
            >
              <Plus className="h-4 w-4" />
              New artifact
            </Link>
          </div>

          <p className="mt-2 text-sm text-[#5b5b6e]">
            Documents, notes, and assets Omni has created for you.
          </p>

          <label className="mt-7 flex items-center gap-2.5 rounded-2xl border border-[#ececf3] bg-white px-4 py-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
            <Search className="h-5 w-5 text-[#5b5b6e]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artifacts..."
              className="w-full bg-transparent text-base text-[#0b0b14] outline-none placeholder:text-[#9a9aae]"
            />
          </label>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => {
              const Icon = a.icon
              return (
              <button
                key={a.title}
                type="button"
                className="group flex flex-col items-start gap-3 rounded-2xl border border-[#ececf3] bg-white p-4 text-left transition-all hover:-translate-y-[1px] hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(11,11,20,0.06)]"
              >
                <div className="flex w-full items-start justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tint}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-[#ececf3] bg-[#fafafc] px-2 py-0.5 text-[11px] font-medium text-[#5b5b6e]">
                    {a.kind}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 break-words text-[15px] font-semibold leading-snug text-[#0b0b14]">{a.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5b5b6e]">
                    {a.subtitle}
                  </p>
                </div>
                <span className="mt-auto text-[11px] text-[#9a9aae]">
                  Updated {formatRelative(a.updatedMinutes)}
                </span>
              </button>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-sm text-[#9a9aae]">
              No artifacts match "{query}".
            </p>
          )}
      </div>
    </div>
  )
}
