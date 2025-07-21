export default function WorkingStep({
  step,
  title,
  description,
  isActive,
  setActiveStep,
}) {
  return (
    <article className="w-64  p-6 shadow text-center flex flex-col items-center justify-center gap-2">
      <div className="flex">
        <button
         onClick={() => setActiveStep(step)}
  className={`text-3xl font-bold border w-12 h-12 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-dark ${
    isActive
      ? "border-accent-dark text-accent-dark"
      : "border-transparent text-gray-700"
  }`}
        >
          {step}
        </button>
      </div>

      <h3
        className={`text-xl font-semibold transition-colors duration-300 ${
          isActive ? "text-accent-dark" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm transition-colors duration-300 ${
          isActive ? "text-text-primary-paragraph " : "text-text-primary-paragraph/50"
        }`}
      >
        {description}
      </p>
    </article>
  );
}
