import { useMemo, useState } from 'react'
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'

const RECOMMENDED = [
  {
    id: 'r1',
    company: 'Razorpay',
    logoColor: 'bg-[#0C2451]',
    logoInitial: 'R',
    title: 'Senior Frontend Engineer, Payments',
    location: 'Bengaluru · Hybrid (3 days)',
    salary: '₹48L – ₹72L + ESOPs',
    type: 'Full-time',
    experience: '5–8 yrs',
    postedDaysAgo: 2,
    applicants: 142,
    tags: ['React', 'TypeScript', 'Design systems', 'Micro-frontends'],
    match: 94,
    summary:
      'Own the merchant dashboard trusted by 1M+ Indian businesses — from kirana stores to unicorns. Ship payment flows where every millisecond and every rupee matters.',
  },
  {
    id: 'r2',
    company: 'Zerodha',
    logoColor: 'bg-[#387ED1]',
    logoInitial: 'Z',
    title: 'Product Manager, Kite',
    location: 'Bengaluru · On-site',
    salary: '₹55L – ₹85L',
    type: 'Full-time',
    experience: '6–10 yrs',
    postedDaysAgo: 4,
    applicants: 368,
    tags: ['Fintech', 'Trading', 'SEBI', '0→1'],
    match: 89,
    summary:
      "Lead product on Kite, India's largest retail broker serving 1.6Cr+ investors. Bootstrapped, profitable, zero-debt — shape the next decade of Indian retail trading.",
  },
  {
    id: 'r3',
    company: 'Swiggy',
    logoColor: 'bg-[#FC8019]',
    logoInitial: 'S',
    title: 'Staff Software Engineer, Platform',
    location: 'Remote · India',
    salary: '₹62L – ₹98L + RSUs',
    type: 'Full-time',
    experience: '8+ yrs',
    postedDaysAgo: 1,
    applicants: 89,
    tags: ['Go', 'Kafka', 'Kubernetes', 'Distributed systems'],
    match: 87,
    summary:
      'Own core platform services powering Food, Instamart, and Dineout across 650+ Indian cities. 4M+ orders/day, sub-30 min SLAs, hyperlocal scale.',
  },
  {
    id: 'r4',
    company: 'CRED',
    logoColor: 'bg-[#0b0b14]',
    logoInitial: 'C',
    title: 'Senior Design Engineer',
    location: 'Bengaluru · Hybrid',
    salary: '₹42L – ₹68L + ESOPs',
    type: 'Full-time',
    experience: '4–7 yrs',
    postedDaysAgo: 6,
    applicants: 276,
    tags: ['React Native', 'Reanimated', 'Prototyping', 'Motion'],
    match: 83,
    summary:
      'Bridge design and engineering to ship obsessively-crafted features for India\'s most creditworthy. Craft matters here more than velocity.',
  },
  {
    id: 'r5',
    company: 'PhonePe',
    logoColor: 'bg-[#5F259F]',
    logoInitial: 'P',
    title: 'Engineering Manager, Payments',
    location: 'Bengaluru · On-site',
    salary: '₹70L – ₹1.1Cr + RSUs',
    type: 'Full-time',
    experience: '10+ yrs',
    postedDaysAgo: 3,
    applicants: 54,
    tags: ['UPI', 'Java', 'Scale', 'Leadership'],
    match: 81,
    summary:
      'Lead a team building UPI infra that processes 50%+ of India\'s digital payments. 10B+ transactions a month, zero room for downtime.',
  },
  {
    id: 'r6',
    company: 'Groww',
    logoColor: 'bg-[#00D09C]',
    logoInitial: 'G',
    title: 'Frontend Engineer, Growth',
    location: 'Bengaluru · On-site',
    salary: '₹36L – ₹56L + ESOPs',
    type: 'Full-time',
    experience: '3–6 yrs',
    postedDaysAgo: 5,
    applicants: 421,
    tags: ['Next.js', 'React', 'A/B testing', 'Web vitals'],
    match: 96,
    summary:
      'Help 1Cr+ first-time investors discover mutual funds, stocks, and F&O. Ship growth experiments where LCP and conversion rate move together.',
  },
  {
    id: 'r7',
    company: 'Flipkart',
    logoColor: 'bg-[#2874F0]',
    logoInitial: 'F',
    title: 'Principal Engineer, Search & Discovery',
    location: 'Bengaluru · Hybrid',
    salary: '₹90L – ₹1.4Cr + RSUs',
    type: 'Full-time',
    experience: '12+ yrs',
    postedDaysAgo: 7,
    applicants: 112,
    tags: ['Search', 'ML', 'Ranking', 'ElasticSearch'],
    match: 85,
    summary:
      'Own search relevance and discovery for The Big Billion Days — India\'s largest e-commerce event. 40Cr+ users, Bharat-first vernacular queries, peak traffic like no other.',
  },
  {
    id: 'r8',
    company: 'Zepto',
    logoColor: 'bg-[#6B3FE2]',
    logoInitial: 'Z',
    title: 'Senior Backend Engineer, Fulfillment',
    location: 'Mumbai · On-site',
    salary: '₹40L – ₹65L + ESOPs',
    type: 'Full-time',
    experience: '4–7 yrs',
    postedDaysAgo: 1,
    applicants: 187,
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Real-time'],
    match: 88,
    summary:
      'Build the dispatch brain behind 10-minute grocery delivery across 7 metros. Dark stores, rider routing, inventory sync — every second counts.',
  },
]

const APPLIED = [
  {
    id: 'a1',
    company: 'Razorpay',
    logoColor: 'bg-[#0C2451]',
    logoInitial: 'R',
    title: 'Senior Frontend Engineer, Payments',
    location: 'Bengaluru · Hybrid',
    salary: '₹48L – ₹72L',
    status: 'Interviewing',
    statusTint: 'bg-[#DCFCE7] text-[#15803D]',
    stage: 'Round 2 of 4 · System design with Khilan',
    appliedDaysAgo: 5,
  },
  {
    id: 'a2',
    company: 'Swiggy',
    logoColor: 'bg-[#FC8019]',
    logoInitial: 'S',
    title: 'Staff Software Engineer, Platform',
    location: 'Remote · India',
    salary: '₹62L – ₹98L',
    status: 'In review',
    statusTint: 'bg-[#FEF3C7] text-[#A16207]',
    stage: 'Recruiter screen scheduled · Apr 17',
    appliedDaysAgo: 2,
  },
  {
    id: 'a3',
    company: 'Zomato',
    logoColor: 'bg-[#E23744]',
    logoInitial: 'Z',
    title: 'Senior Product Engineer, Hyperpure',
    location: 'Gurugram · On-site',
    salary: '₹52L – ₹78L',
    status: 'Offer',
    statusTint: 'bg-[#E0E7FF] text-[#4338CA]',
    stage: 'Offer extended · Negotiating base + ESOPs',
    appliedDaysAgo: 14,
  },
  {
    id: 'a4',
    company: 'Nykaa',
    logoColor: 'bg-[#E6097A]',
    logoInitial: 'N',
    title: 'Lead Frontend Engineer, Commerce',
    location: 'Mumbai · Hybrid',
    salary: '₹45L – ₹68L',
    status: 'Interviewing',
    statusTint: 'bg-[#DCFCE7] text-[#15803D]',
    stage: 'Round 3 of 4 · Culture round with hiring manager',
    appliedDaysAgo: 9,
  },
  {
    id: 'a5',
    company: 'Meesho',
    logoColor: 'bg-[#F43397]',
    logoInitial: 'M',
    title: 'Frontend Platform Engineer',
    location: 'Remote · India',
    salary: '₹38L – ₹58L',
    status: 'Rejected',
    statusTint: 'bg-[#FEE2E2] text-[#B91C1C]',
    stage: 'Not moving forward after tech screen · Apr 3',
    appliedDaysAgo: 21,
  },
  {
    id: 'a6',
    company: 'Ola',
    logoColor: 'bg-[#C5E84B]',
    logoInitial: 'O',
    title: 'Senior Android Engineer, Krutrim',
    location: 'Bengaluru · On-site',
    salary: '₹50L – ₹75L',
    status: 'Withdrawn',
    statusTint: 'bg-[#F3F4F6] text-[#4B5563]',
    stage: 'You withdrew · better fit at Zomato',
    appliedDaysAgo: 12,
  },
]

const TABS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'applied', label: 'Applied' },
]

function CompanyLogo({ color, initial }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-semibold text-white ${color}`}
    >
      {initial}
    </span>
  )
}

function RecommendedCard({ job }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-[#ececf3] bg-white p-5 transition-all hover:-translate-y-[1px] hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(11,11,20,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <CompanyLogo color={job.logoColor} initial={job.logoInitial} />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-[#9a9aae]">
              {job.company}
            </p>
            <h3 className="truncate text-base font-semibold text-[#0b0b14]">{job.title}</h3>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          <Sparkles className="h-3 w-3" />
          {job.match}% match
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-[#5b5b6e]">{job.summary}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5b5b6e]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Wallet className="h-3.5 w-3.5" />
          {job.salary}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          {job.experience}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {job.postedDaysAgo}d ago
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {job.applicants} applicants
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[#ececf3] bg-[#fafafc] px-2.5 py-1 text-[11px] font-medium text-[#5b5b6e]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#ececf3] bg-white px-4 py-2 text-sm font-semibold text-[#0b0b14] transition-colors group-hover:border-transparent group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(74,79,253,0.2)]"
        >
          Apply with Omni
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  )
}

function AppliedRow({ job }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[#ececf3] bg-white p-5 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <CompanyLogo color={job.logoColor} initial={job.logoInitial} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-[#0b0b14]">{job.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${job.statusTint}`}>
              {job.status}
            </span>
          </div>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-[#5b5b6e]">
            <Building2 className="h-3.5 w-3.5" />
            {job.company}
            <span className="text-[#dcdce3]">·</span>
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
            <span className="text-[#dcdce3]">·</span>
            <Wallet className="h-3.5 w-3.5" />
            {job.salary}
          </p>
          <p className="mt-1.5 text-xs text-[#5b5b6e]">
            <CheckCircle2 className="mr-1 inline h-3 w-3 text-primary" />
            {job.stage}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 sm:items-end">
        <span className="text-[11px] text-[#9a9aae]">Applied {job.appliedDaysAgo}d ago</span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#ececf3] px-3 py-1.5 text-xs font-medium text-[#0b0b14] hover:border-primary/40 hover:text-primary transition-colors"
        >
          View
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </article>
  )
}

export default function Jobs() {
  const [tab, setTab] = useState('recommended')

  const counts = useMemo(
    () => ({ recommended: RECOMMENDED.length, applied: APPLIED.length }),
    [],
  )

  return (
    <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
                Jobs
              </h1>
              <p className="mt-2 text-sm text-[#5b5b6e]">
                Curated matches and everything you've applied to, in one place.
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-1 rounded-full border border-[#ececf3] bg-[#fafafc] p-1 w-fit">
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? 'bg-white text-[#0b0b14] shadow-[0_1px_2px_rgba(11,11,20,0.06)]'
                      : 'text-[#5b5b6e] hover:text-[#0b0b14]'
                  }`}
                >
                  {t.label}
                  <span
                    className={`rounded-full px-1.5 text-[11px] font-semibold ${
                      active ? 'bg-primary/10 text-primary' : 'bg-[#ececf3] text-[#5b5b6e]'
                    }`}
                  >
                    {counts[t.id]}
                  </span>
                </button>
              )
            })}
          </div>

          {tab === 'recommended' && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {RECOMMENDED.map((job) => (
                <RecommendedCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {tab === 'applied' && (
            <div className="mt-6 flex flex-col gap-3">
              {APPLIED.map((job) => (
                <AppliedRow key={job.id} job={job} />
              ))}
            </div>
          )}
      </div>
    </div>
  )
}
