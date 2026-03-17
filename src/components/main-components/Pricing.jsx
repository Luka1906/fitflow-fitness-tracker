import { useState } from "react";
import { GiCheckMark, GiWaterDrop, GiMeal } from "react-icons/gi";
import { ImGift } from "react-icons/im";
import { IoBarbell, IoNutritionOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { MdImportantDevices } from "react-icons/md";

import logo from "../../assets/logo.svg";
import Button from "../../ui/Button";
import Card from "../../ui/Card";

const features = [
  {
    key: "workouts",
    label: "Track workouts",
    icon: IoBarbell,
    highlight: false,
  },
  {
    key: "nutrition",
    label: "Nutrition insights",
    icon: IoNutritionOutline,
    highlight: true,
  },
  {
    key: "hydration",
    label: "Hydration tracking",
    icon: GiWaterDrop,
    highlight: false,
  },
  {
    key: "mealPlanner",
    label: "AI meal planner",
    icon: GiMeal,
    highlight: true,
  },
  {
    key: "charts",
    label: "Progress charts",
    icon: FaChartLine,
    highlight: false,
  },
  {
    key: "devices",
    label: "Devices supported",
    icon: MdImportantDevices,
    highlight: false,
  },
];

const plans = [
  {
    title: "Basic",
    price: "5.99",
    features: {
      workouts: true,
      nutrition: false,
      hydration: true,
      mealPlanner: false,
      charts: true,
      devices: 1,
    },
  },
  {
    title: "Standard",
    price: "8.99",
    features: {
      workouts: true,
      nutrition: true,
      hydration: true,
      mealPlanner: false,
      charts: true,
      devices: 3,
    },
  },
  {
    title: "Premium",
    price: "12.99",
    features: {
      workouts: true,
      nutrition: true,
      hydration: true,
      mealPlanner: true,
      charts: true,
      devices: "Unlimited",
    },
  },
];

export default function Pricing() {
  const [hoveredCol, setHoveredCol] = useState(null);

  return (
    <section onMouseLeave={() => setHoveredCol(null)} className="pt-20 px-6">
      <div className="flex items-center justify-between gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-accent-dark">
            Choose the plan that&apos;s right for you
          </h2>

          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <GiCheckMark className="text-accent-dark shrink-0" />
              <p>
                Track your workouts, meals, and progress - all in one place.
              </p>
            </li>

            <li className="flex items-center gap-2">
              <GiCheckMark className="text-accent-dark shrink-0" />
              <p>No ads. Cancel anytime. Start free today.</p>
            </li>
          </ul>
        </div>

        <div className="flex h-16 w-60 items-center justify-center gap-2 rounded-lg bg-slate-700 px-4">
          <ImGift className="text-3xl text-accent-dark" />
          <p className="font-bold">Start your free month</p>
        </div>
      </div>

      <div className="mt-10 w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="pb-4" scope="col">
                <div className="flex items-center gap-2">
                  <img className="h-16 w-auto" src={logo} alt="FitFlow logo" />
                  <span className="bg-gradient-to-r from-cta-dark to-accent-dark bg-clip-text text-xl font-extrabold text-transparent">
                    FitFlow
                  </span>
                </div>
              </th>

              {plans.map((plan, colIndex) => (
                <th
                  key={plan.title}
                  scope="col"
                  className="pb-4 text-center text-lg tracking-wide text-text-primary-paragraph"
                  onMouseEnter={() => setHoveredCol(colIndex)}
                >
                  <div className="flex flex-col items-center">
                    <p>{plan.title}</p>
                    <p className="w-48 border-b border-slate-700 pb-4 text-xl font-bold tracking-wide text-cta-dark">
                      ${plan.price}/mo
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <tr key={feature.key}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Icon className="text-xl text-accent-dark" />

                      <div className="flex items-center gap-1">
                        <p className="text-base text-text-primary-paragraph">
                          {feature.label}
                        </p>

                        {feature.highlight && (
                          <span
                            title="AI-powered feature"
                            className="cursor-help text-sm text-accent-dark"
                          >
                            *
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {plans.map((plan, colIndex) => {
                    const value = plan.features[feature.key];

                    return (
                      <td
                        key={plan.title}
                        className="py-4 text-center"
                        onMouseEnter={() => setHoveredCol(colIndex)}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <GiCheckMark className="inline-block text-xl text-accent-dark" />
                          ) : (
                            <span className="text-xl text-slate-400">✕</span>
                          )
                        ) : (
                          <span
                            className={
                              hoveredCol === colIndex
                                ? "text-accent-dark"
                                : "text-slate-400"
                            }
                          >
                            {value}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            <tr onMouseLeave={() => setHoveredCol(null)}>
              <td></td>

              {plans.map((plan, colIndex) => (
                <td
                  key={plan.title}
                  className="py-6 text-center"
                  onMouseEnter={() => setHoveredCol(colIndex)}
                >
                  <Button
                    variant="primary"
                    className={`transition-opacity duration-200 ${
                      hoveredCol === colIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    Select {plan.title}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
