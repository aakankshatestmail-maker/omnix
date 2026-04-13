import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

function Toggle({ enabled, onChange, label, description }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-2">
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-[#0b0b14]">{label}</span>
        {description && (
          <span className="mt-0.5 block text-[11px] text-[#9a9aae]">{description}</span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-[#ececf3]'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(11,11,20,0.15)] transition-transform ${
            enabled ? 'translate-x-4.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}

export default function SettingsModal({ open, onClose }) {
  const [notif, setNotif] = useState({
    whatsapp: false,
    email: true,
    pullWhatsapp: false,
    pullEmail: true,
    digestJobs: true,
    digestCompany: false,
    digestSalary: true,
  })

  const setPref = (key) => (v) => setNotif((p) => ({ ...p, [key]: v }))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close settings"
        onClick={onClose}
        className="absolute inset-0 bg-[#0b0b14]/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#ececf3] bg-white shadow-[0_24px_64px_rgba(11,11,20,0.18)]"
      >
        <header className="flex items-center justify-between border-b border-[#ececf3] px-5 py-3.5">
          <h2 className="text-sm font-semibold text-[#0b0b14]">Notification preferences</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9a9aae]">
              Channels
            </p>
            <Toggle
              enabled={notif.whatsapp}
              onChange={setPref('whatsapp')}
              label="WhatsApp"
              description="Get match alerts and interview prep nudges on WhatsApp."
            />
            <Toggle
              enabled={notif.email}
              onChange={setPref('email')}
              label="Email"
              description="Daily digest and recruiter replies land in your inbox."
            />
          </div>

          <div className="mt-3 border-t border-[#ececf3] pt-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9a9aae]">
              Re-engagement
            </p>
            <Toggle
              enabled={notif.pullWhatsapp}
              onChange={setPref('pullWhatsapp')}
              label="WhatsApp re-engagement"
              description="Nudge me if I haven't opened Omni in a few days."
            />
            <Toggle
              enabled={notif.pullEmail}
              onChange={setPref('pullEmail')}
              label="Email re-engagement"
            />
          </div>

          <div className="mt-3 border-t border-[#ececf3] pt-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9a9aae]">
              Daily digest content
            </p>
            <Toggle
              enabled={notif.digestJobs}
              onChange={setPref('digestJobs')}
              label="Job recommendations"
            />
            <Toggle
              enabled={notif.digestCompany}
              onChange={setPref('digestCompany')}
              label="Company reviews"
            />
            <Toggle
              enabled={notif.digestSalary}
              onChange={setPref('digestSalary')}
              label="Salary insights"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
