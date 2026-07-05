import { Link } from "react-router-dom";
export default function WorkingStep({
  icon: Icon,
  title,
  description,
  isActive,
  onMouseEnter,
}) {
const articleClasses = isActive
  ? "bg-white/[0.015]"
  : "hover:bg-white/[0.01]";

  
  const titleClasses = isActive? "text-text-primary-headings": "text-slate-300";

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
      className={`relative flex flex-col items-center justify-between px-6 py-10 text-center transition-all duration-300 lg:border-r lg:border-white/10 last:lg:border-r-0 ${articleClasses}`}
    >
      <div
        className={`flex h-18 w-18 items-center justify-center rounded-full border transition-colors duration-300 ${iconClasses}`}
      >
        <Icon className="text-4xl" />
      </div>

      <h3 className={`mt-6 text-2xl font-bold ${titleClasses}`}>
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-base leading-7 text-text-primary-paragraph/80">
        {description}
      </p>

      <div
        className={`mt-7 h-1 w-16 rounded-full transition-colors duration-300 ${dividerClasses}`}
      />
    </Link>
  );
}
