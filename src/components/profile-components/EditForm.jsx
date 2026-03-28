import { Form, useLoaderData, Link } from "react-router-dom";
import { fitnessGoals } from "../utils/fitnessGoals";
import FitnessGoal from "../form-components/FitnessGoal";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";

export default function EditForm() {
  const user = useLoaderData();

  const selectedGoals = user.goals.map((goal) => goal.key);

  const [goals, setGoals] = useState([...selectedGoals]);

  console.log(goals)
  
  const handleOnGoalChange = (event) => {
    const { value, checked } = event.target;

    setGoals((prev) => {
      if (checked) {
        if (prev.length >= 3 || prev.includes(value)) {
          return prev;
        }
        return [...prev, value]
      }

      return prev.filter((goal) => goal !==value)

    });
    console.log(checked);
  };
  ["flexibility, strenght, balance"]

  return (
    <section className="mx-auto my-16 w-full max-w-2xl px-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent-dark/70">
              Profile Settings
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-accent-dark">
              Edit Profile
            </h2>
            <p className="mt-2 text-sm leading-6 text-text-primary-paragraph/65">
              Update your basic info and adjust your fitness goals.
            </p>
          </div>

          <Link
            to="/profile"
            className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text-primary-paragraph/80 transition hover:bg-white/10 hover:text-white"
          >
            <MdArrowBack className="text-base" />
            Back
          </Link>
        </div>

        <Form method="POST" className="flex flex-col gap-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-text-primary-paragraph/85"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="first_name"
                defaultValue={user.first_name}
                className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/35 outline-none transition focus:border-accent-dark/50 focus:ring-2 focus:ring-accent-dark/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-text-primary-paragraph/85"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="last_name"
                defaultValue={user.last_name}
                className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/35 outline-none transition focus:border-accent-dark/50 focus:ring-2 focus:ring-accent-dark/30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-text-primary-paragraph/85"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              defaultValue={user.location}
              className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/35 outline-none transition focus:border-accent-dark/50 focus:ring-2 focus:ring-accent-dark/30"
            />
          </div>

          <fieldset className="rounded-2xl border border-white/10 bg-black/10 p-5">
            <legend className="px-2 text-base font-bold text-accent-dark">
              Fitness Goals
            </legend>

            <p className="mb-4 text-sm text-text-primary-paragraph/60">
              Choose up to 3 goals that match your current focus.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {fitnessGoals.map((goal) => (
                <div
                  key={goal.value}
                  className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 transition hover:bg-white/[0.06]"
                >
                  <FitnessGoal
                    goal={goal}
                    defaultChecked={selectedGoals.includes(goal.value)}
             
                    onChange={handleOnGoalChange}
                    disabled= {goals.length >=3 && !goals.includes(goal.value) }
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-text-primary-paragraph/85 transition hover:bg-white/10"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-accent-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-dark/20 transition hover:-translate-y-0.5 hover:bg-accent-dark/90"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
}
