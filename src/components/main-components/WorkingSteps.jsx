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
    <section className="flex flex-col items-center py-20  gap-10">
      <h2 className="text-3xl font-bold text-accent-dark font-accent tracking-wide">
        How It Works
      </h2>
      <p className=" w-1/2  text-center text-lg text-text-primary-headings">
        Clear, actionable steps designed to keep you on track and achieve your
        fitness goals.
      </p>
      <div className="flex justify-center gap-8 w-full">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-4 ">
            <WorkingStep
              step={index + 1}
              title={step.title}
              description={step.description}
              isActive={activeStep === index + 1}
              setActiveStep={setActiveStep}
            />
            {index < steps.length - 1 && (
             <div className={`flex text-2xl space-x-1 ${index + 1 === activeStep ? "text-accent-dark" : "text-gray-700"}`}>
  <RiArrowRightDoubleLine />
  <RiArrowRightDoubleLine />
  <RiArrowRightDoubleLine />
</div>

            )}
          </div>
        ))}
      </div>
    </section>
  );
}


