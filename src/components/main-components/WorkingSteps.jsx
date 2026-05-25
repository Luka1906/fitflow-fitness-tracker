import WorkingStep from "./WorkingStep";

import { useState } from "react";
import { RiArrowRightDoubleLine } from "react-icons/ri";

export default function WorkingSteps() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    {
      title: "Create Your Acount",
      description: "Sign up in seconds and set your fitness preferences.",
    },
    {
      title: "Track Everything",
      description:
        "Log workouts, hydration, meals, and more - all in on one place.",
    },
    {
      title: "Thrive with AI",
      description:
        "Get personalized insights and smart meal suggestions powered by AI.",
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-accent text-3xl font-bold tracking-wide text-accent-dark sm:text-4xl">
          How It Works
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-primary-paragraph sm:text-lg">
          Clear, actionable steps designed to keep you on track and achieve your
          fitness goals.
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-6 lg:flex-row lg:justify-center">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row"
          >
            <WorkingStep
              step={index + 1}
              title={step.title}
              description={step.description}
              isActive={activeStep === index + 1}
              setActiveStep={setActiveStep}
            />

            {index < steps.length - 1 && (
              <RiArrowRightDoubleLine
                className={`hidden text-4xl ${index + 1 === activeStep ? "text-accent-dark" : "text-white/20"}  lg:block`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
