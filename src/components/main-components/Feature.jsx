export default function Feature({
  icon: Icon,
  title,
  label,
  description,
  className = "",
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/3 p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-dark/25 hover:bg-white/5 ${className}`}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-cta/10 blur-3xl sm:h-32 sm:w-32" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:gap-10">
        <div>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-dark/25 bg-accent-dark/10 text-accent-dark sm:mb-7 sm:h-16 sm:w-16">
            <Icon className="text-2xl sm:text-3xl" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent-dark/70 sm:mb-3 sm:text-sm sm:tracking-[0.18em]">
            {label}
          </p>

          <h3 className="text-xl font-bold text-text-primary-headings sm:text-2xl">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-primary-paragraph sm:mt-3 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-accent-dark/50 via-cta-dark/20 to-transparent" />
      </div>
    </div>
  );
}