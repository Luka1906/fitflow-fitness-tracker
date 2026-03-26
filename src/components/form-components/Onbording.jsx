import { Form } from "react-router-dom";
import FitnessGoal from "./FitnessGoal";
import Card from "../../ui/Card";
import { useState, useEffect } from "react";
import Button from "../../ui/Button";


export default function Onboarding() {
  const fitnessGoals = [
    { value: "lose-weight", label: "Lose Weight" },
    { value: "build-muscle", label: "Build Muscle" },
    { value: "improve-endurance", label: "Improve Endurance" },
    { value: "increase-flexibility", label: "Increase Flexibility" },
    { value: "boost-strength", label: "Boost Strength" },
    { value: "overall-health", label: "Improve Overall Health" },
    { value: "balance-mobility", label: "Improve Balance & Mobility" },
    { value: "rehabilition-recovery", label: "Rehabilitation & Recovery" },
    { value: "competition", label: "Prepare for a Competition" },
  ];

  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleOnGoalChange = (event) => {
    const { value, checked } = event.target;

    setSelectedGoals((prev) => {
      if (checked) {
        if (prev.length >= 3 || prev.includes(value)) {
          return prev;
        }
        return [...prev, value];
      }

      return prev.filter((goal) => goal !== value);
    });
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"})
  },[])
  
  return (
    <Card classes="w-full max-w-2xl mx-auto my-10 p-6 sm:p-8 md:p-10">
      <Form method="POST" className="flex flex-col gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-accent-dark">
            Welcome to FitFlow
          </h1>
          <p className="text-sm md:text-base text-text-secondary-dark">
            Choose up to three fitness goals to personalize your experience.
          </p>
        </div>

        <fieldset className="flex flex-col gap-3 rounded-md border border-text-primary-paragraph/20 p-4 md:p-5">
          <legend className="px-2 text-base font-bold text-accent-dark">
            Fitness Goals
          </legend>

          <div className="flex flex-col gap-3">
            {fitnessGoals.map((goal) => (
              <FitnessGoal
                key={goal.value}
                goal={goal}
                checked={selectedGoals.includes(goal.value)}
                disabled={
                  selectedGoals.length >= 3 &&
                  !selectedGoals.includes(goal.value)
                }
                onChange={handleOnGoalChange}
              />
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button type="submit">Continue</Button>

          <Button
            variant="outline"
            type="submit"
            name="intent"
            value="skip"
           
          >
            Skip for now
          </Button>
        </div>
      </Form>
    </Card>
  );
}
