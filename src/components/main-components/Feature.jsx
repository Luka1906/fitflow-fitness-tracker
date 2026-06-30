export default function Feature({
  icon: Icon,
  title,
  label,
  description,
  className = "",
  accent = "blue",
}) {

  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/3 p-7  transition-all duration-300 hover:-translate-y-1 hover:border-accent-dark/25 hover:bg-white/5 ${className}`}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cta/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div
            className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-dark/25 bg-accent-dark/10 text-accent-dark "
          >
            <Icon className="text-3xl" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-dark/70">
            {label}
          </p>

          <h3 className="text-2xl font-bold text-text-primary-headings">
            {title}
          </h3>

          <p className="mt-3 leading-7 text-text-primary-paragraph">
            {description}
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-accent-dark/50 via-cta-dark/20 to-transparent" />
      </div>
    </div>
  );
}
