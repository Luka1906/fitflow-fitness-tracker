import { Form, useLoaderData, Link } from "react-router-dom";
import FitnessGoal from "../form-components/FitnessGoal";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
import { validateLocation, validateName } from "../../utils/validation";

export default function EditForm() {
  const { user, goals } = useLoaderData();

  const userGoals = goals.selected.map((goal) => goal.id);

  const [selectedGoals, setSelectedGoals] = useState(userGoals);

  const [editData, setEditData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    location: user.location,
  });
  const [editErr, setEditErr] = useState({});

  const handleOnGoalChange = (event) => {
    const { checked } = event.target;
    const value = Number(event.target.value);

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

  const handleOnBlurErr = (event) => {
    const { name, value } = event.target;
    let inputErr;
    switch (name) {
      case "first_name":
        inputErr = validateName(value, "First Name");

        break;
      case "last_name":
        inputErr = validateName(value, "Last Name");

        break;

      case "location":
        inputErr = validateLocation(value);

        break;

      default:
        break;
    }
    setEditErr((prev) => ({
      ...prev,
      [name]: inputErr,
    }));
  };

  const handleOnChangeErr = (event) => {
    const { name, value } = event.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setEditErr((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const errorText = "mt-2 text-sm text-red-400 min-h-[20px]";

  return (
    <section className="mx-auto my-16 w-full max-w-2xl px-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-accent-dark">
              Edit Profile
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Update your basic info and adjust your fitness goals.
            </p>
          </div>

          <Link
            to="/profile"
            className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white/90"
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
                className="text-sm font-medium text-slate-300"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={editData.first_name}
                name="first_name"
                className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/35 outline-none transition focus:border-accent-dark/50"
                onBlur={handleOnBlurErr}
                onChange={handleOnChangeErr}
              />
              {editErr.first_name && (
                <p className={errorText}>{editErr.first_name}</p>
              )}
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
                value={editData.last_name}
                className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/35 outline-none transition focus:border-accent-dark/50"
                onBlur={handleOnBlurErr}
                onChange={handleOnChangeErr}
              />
              {editErr.last_name && (
                <p className={errorText}>{editErr.last_name}</p>
              )}
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
              value={editData.location}
              className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/35 outline-none transition focus:border-accent-dark/50"
              onBlur={handleOnBlurErr}
              onChange={handleOnChangeErr}
            />
            {editErr.location && (
              <p className={errorText}>{editErr.location}</p>
            )}
          </div>

          <fieldset className="rounded-2xl border border-white/10 bg-black/10 p-5">
            <legend className="px-2 text-base font-bold text-accent-dark">
              Fitness Goals
            </legend>

            <p className="mb-4 text-sm text-slate-400">
              Choose up to 3 goals that match your current focus.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {goals.options.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-xl border border-white/8 bg-white/3 px-3 py-3 transition hover:bg-white/6"
                >
                  <FitnessGoal
                    goal={goal}
                    checked={selectedGoals.includes(goal.id)}
                    onChange={handleOnGoalChange}
                    disabled={
                      selectedGoals.length >= 3 &&
                      !selectedGoals.includes(goal.id)
                    }
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-accent-dark px-5 py-3 text-sm font-semibold text-white/95  ransition hover:-translate-y-0.5 hover:bg-accent-dark/90"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
}
