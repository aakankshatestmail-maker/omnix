export default function Hero() {
  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen h-screen bg-white overflow-hidden
        bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
        bg-[size:48px_48px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,white_80%)]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-6">
        <img src="/bot.png" alt="Omni bot" className="w-80 mb-8 drop-shadow-xl" />
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.05] max-w-5xl">
          Get Hired Faster
          <br />
          with <span className="text-primary">Omni</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed">
          Search jobs, build resumes, prep for interviews, and research companies.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
          >
            Get started free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#sign-in"
            className="inline-flex items-center rounded-full border border-black/15 bg-white px-7 py-3.5 text-base font-medium text-neutral-900 hover:bg-black/5 transition-colors"
          >
            Sign in
          </a>
        </div>
      </div>
    </section>
  )
}
