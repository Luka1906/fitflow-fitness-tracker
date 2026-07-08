import { useState } from "react";
import { FiTarget, FiTrendingUp, FiUserPlus } from "react-icons/fi";
import WorkingStep from "./WorkingStep";

const steps = [
  {
    icon: FiUserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds and set your fitness preferences.",
  },
  {
    icon: FiTarget,
    title: "Set Your Goals",
    description: "Choose your workout, hydration, and weight targets.",
  },
  {
    icon: FiTrendingUp,
    title: "Start Tracking",
    description: "Log your progress and build consistency every day.",
  },
];

export default function WorkingSteps() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-[240px] w-[620px] -translate-x-1/2 rounded-full bg-cta-dark/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid justify-center gap-10 text-center lg:grid-cols-[420px_1fr] lg:items-center lg:text-left">
          <div>
            <span className="inline-flex rounded-full border border-cta-dark/35 bg-cta-dark/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta-dark brightness-150 sm:text-sm">
              How it works
            </span>

            <h2 className="mt-6 font-accent text-3xl font-bold leading-tight tracking-tight text-text-primary-headings sm:text-4xl lg:text-5xl">
              Start Building
              <br />
              Better Habits
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-primary-paragraph sm:text-lg lg:mx-0">
              Set up your goals, start logging workouts, and build consistency
              one day at a time.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <div
              className="absolute top-0 hidden h-px w-1/3 bg-gradient-to-r from-transparent via-accent-dark to-transparent transition-transform duration-500 ease-out lg:block"
              style={{
                transform: `translateX(${(activeStep - 1) * 100}%)`,
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {steps.map((step, index) => (
                <WorkingStep
                  key={step.title}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  isActive={activeStep === index + 1}
                  onMouseEnter={() => setActiveStep(index + 1)}
                />
              ))}
            </div>

            <div
              className="absolute bottom-0 hidden h-px w-1/3 bg-gradient-to-r from-transparent via-accent-dark to-transparent transition-transform duration-500 ease-out lg:block"
              style={{
                transform: `translateX(${(activeStep - 1) * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}