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
   <section className="relative overflow-hidden py-16">
  <div className="pointer-events-none absolute left-1/2 top-24 h-[240px] w-[620px] -translate-x-1/2 rounded-full bg-cta-dark/10 blur-[120px]" />

  <div className="relative mx-auto max-w-7xl">
    <div className="grid gap-10 lg:grid-cols-[420px_1fr] justify-center lg:items-center text-center lg:text-left">
      {/* Left side */}
      <div>
        <span className="inline-flex rounded-full border border-cta-dark/35 bg-cta-dark/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-cta-dark brightness-150">
          How it works
        </span>

        <h2 className="mt-6 font-accent text-5xl font-bold tracking-tight text-text-primary-headings">
          Start Building
          <br />
          Better Habits
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-text-primary-paragraph">
          Set up your goals, start logging workouts, and build consistency one
          day at a time.
        </p>
      </div>

      {/* Right side */}
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