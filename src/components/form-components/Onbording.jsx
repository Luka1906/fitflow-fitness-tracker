import { Form } from "react-router-dom";
import FitnessGoal from "./FitnessGoal";
import Card from "../../ui/Card";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Button from "../../ui/Button";

export default function Onboarding() {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedButton, setSelectedButton] = useState({
    selectedWaterGoal: "",
    selectedWeightUnit: "",
  });
   const today = new Date().toLocaleDateString()

  const { goalOptions } = useLoaderData();

  const waterGoalPresets = [
    { label: "2.0 L", value: "2000", description: "Balanced" },
    { label: "2.5 L", value: "2500", description: "Standard" },
    { label: "3.0 L", value: "3000", description: "Active" },
    { label: "3.5 L", value: "3500", description: "High intake" },
  ];

  const handleOnGoalChange = (event) => {
    const value = Number(event.target.value);
    const { checked } = event.target;

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // select buttons function handler

  const handleSelectButtons = (event) => {
    const { name, value } = event.currentTarget;

    setSelectedButton((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
            {goalOptions.map((goal) => (
              <FitnessGoal
                key={goal.id}
                goal={goal}
                checked={selectedGoals.includes(goal.id)}
                disabled={
                  selectedGoals.length >= 3 && !selectedGoals.includes(goal.id)
                }
                onChange={handleOnGoalChange}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4 rounded-md border border-text-primary-paragraph/20 p-4 md:p-5">
          <legend className="px-2 text-base font-bold text-accent-dark">
            Daily Water Goal
          </legend>

          <div className="space-y-1">
            <p className="text-sm md:text-base text-text-secondary-dark">
              Set a daily target to track your hydration progress.
            </p>
            <p className="text-xs text-text-primary-paragraph/60">
              You can change this later.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {waterGoalPresets.map((goal) => {
              const isSelected =
                selectedButton.selectedWaterGoal === goal.value;

              return (
                <button
                  key={goal.value}
                  type="button"
                  value={goal.value}
                  name="selectedWaterGoal"
                  onClick={handleSelectButtons}
                  className={`rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
                    isSelected
                      ? "border-accent-dark bg-accent-dark/10 shadow-[0_0_0_1px_rgba(0,0,0,0)]"
                      : "border-white/10 bg-white/5 hover:border-accent-dark/40 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={`text-base font-bold ${
                          isSelected
                            ? "text-accent-dark"
                            : "text-text-primary-headings"
                        }`}
                      >
                        {goal.label}
                      </p>
                      <p className="mt-1 text-sm text-text-primary-paragraph/60">
                        {goal.description}
                      </p>
                    </div>

                    <div
                      className={`mt-1 h-4 w-4 rounded-full border ${
                        isSelected
                          ? "border-accent-dark bg-accent-dark"
                          : "border-white/20"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          <input
            type="hidden"
            name="waterGoal"
            value={selectedButton.selectedWaterGoal}
          />
        </fieldset>

        <fieldset className="border border-text-primary-paragraph/20 rounded-md p-4">
          <legend className="text-accent-dark font-bold  px-2">
            Weight Setup
          </legend>
          <div className="space-y-1">
            <p className="text-sm md:text-base text-accent-dark">
              Add your current weight and goal weight to track progress.
            </p>
            <p className="text-xs text-text-primary-paragraph/60">
              Optional - you can add or change this later{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="current-weight" className="font-semibold font-sm">
                Current weight
              </label>
              <input
                id="current-weight"
                placeholder="e.g. 185"
                name="currentWeight"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none transition focus:border-accent-dark"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="weight-goal" className="font-semibold">
                Weight goal
              </label>
              <input
                id="weight-goal"
                name="weightGoal"
                placeholder="e.g. 170"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none transition focus:border-accent-dark"
                type="number"
              />
            </div>
            {["lb", "kg"].map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={handleSelectButtons}
                value={unit}
                name="selectedWeightUnit"
                className={`flex justify-between items-center border p-4 rounded-xl text-slate-200 font-semibold transition active:scale-[0.98] ${
                  selectedButton.selectedWeightUnit === unit
                    ? "border-accent-dark bg-accent-dark/10 shadow-[0_0_0_1px_rgba(0,0,0,0)]"
                    : "border-white/10 bg-white/5 hover:border-accent-dark/40 hover:bg-white/10"
                }`}
              >
                {unit}

                <div
                  className={`h-4 w-4 rounded-full border ${
                    selectedButton.selectedWeightUnit === unit
                      ? "border-accent-dark bg-accent-dark"
                      : "border-white/20"
                  }`}
                />
              </button>
            ))}
          </div>
          <input
           type="hidden"
            name="weightUnit"
            value={selectedButton.selectedWeightUnit}
          />
            <input hidden name="date" value={today} />
        </fieldset>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button type="submit">Continue</Button>

          <Button variant="outline" type="submit">
            Skip for now
          </Button>
        </div>
      </Form>
    </Card>
  );
}
