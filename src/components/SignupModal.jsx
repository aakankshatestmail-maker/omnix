import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

export default function SignupModal({ onDismiss }) {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-4 pb-6 sm:pb-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b0b14]/50 backdrop-blur-sm"
        onClick={onDismiss}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-[0_40px_100px_rgba(11,11,20,0.28)] overflow-hidden"
        style={{ animation: 'popIn .22s cubic-bezier(.16,1,.3,1) both' }}
      >
        {/* Gradient header strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4141fc] via-[#7c6ef7] to-[#c084fc]" />

        <div className="px-8 pt-7 pb-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Omni" className="h-9 w-9 object-contain" />
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9aae]">
                Free account
              </p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#9a9aae] hover:bg-black/[0.05] hover:text-[#0b0b14] transition-colors shrink-0 -mt-0.5 -mr-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h2 className="text-[22px] font-semibold tracking-tight text-[#0b0b14] leading-snug mb-1.5">
            Your AI job search copilot
          </h2>
          <p className="text-sm text-[#5b5b6e] mb-6 leading-relaxed">
            Free account. No credit card. Start applying smarter in minutes.
          </p>

          {/* Features pill row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Auto-apply to jobs', 'Company & salary insights', 'Resume & interview prep'].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#4141fc]/20 bg-[#4141fc]/[0.06] px-3 py-1 text-xs font-medium text-[#4141fc]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#4141fc]" />
                {f}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b0b14] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[#1e1e2e] transition-colors shadow-[0_8px_24px_rgba(11,11,20,0.18)]"
          >
            Create free account
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="mt-3 w-full text-center text-xs text-[#9a9aae] hover:text-[#5b5b6e] transition-colors py-1"
          >
            Continue without signing up
          </button>
        </div>
      </div>
    </div>
  )
}
