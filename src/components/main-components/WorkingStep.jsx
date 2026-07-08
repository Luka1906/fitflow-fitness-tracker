import { Link } from "react-router-dom";

export default function WorkingStep({
  icon: Icon,
  title,
  description,
  isActive,
  onMouseEnter,
}) {
  const articleClasses = isActive ? "bg-white/[0.015]" : "hover:bg-white/[0.01]";

  const titleClasses = isActive
    ? "text-text-primary-headings"
    : "text-slate-300";

  const iconClasses = isActive
    ? "border-accent-dark/55 bg-accent-dark/5 text-accent-dark"
    : "border-white/10 bg-white/[0.02] text-slate-400";

  const dividerClasses = isActive
    ? "bg-gradient-to-r from-accent-dark to-cta-dark"
    : "bg-white/10";

  return (
    <Link
      to="/auth?mode=signup"
      onMouseEnter={onMouseEnter}
      className={`relative flex flex-col items-center justify-between border-b border-white/10 px-5 py-8 text-center transition-all duration-300 last:border-b-0 sm:px-6 sm:py-10 lg:border-b-0 lg:border-r last:lg:border-r-0 ${articleClasses}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-300 sm:h-18 sm:w-18 ${iconClasses}`}
      >
        <Icon className="text-3xl sm:text-4xl" />
      </div>

      <h3 className={`mt-5 text-xl font-bold sm:mt-6 sm:text-2xl ${titleClasses}`}>
        {title}
      </h3>

      <p className="mt-2 max-w-xs text-sm leading-6 text-text-primary-paragraph/80 sm:mt-3 sm:text-base sm:leading-7">
        {description}
      </p>

      <div
        className={`mt-6 h-1 w-14 rounded-full transition-colors duration-300 sm:mt-7 sm:w-16 ${dividerClasses}`}
      />
    </Link>
  );
}