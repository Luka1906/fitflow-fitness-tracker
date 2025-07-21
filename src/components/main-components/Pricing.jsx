import { GiCheckMark } from "react-icons/gi";
import { ImGift } from "react-icons/im";
import logo from "../../assets/logo.svg";
import { useState } from "react";

// Feature Icons

import { IoBarbell } from "react-icons/io5";
import { IoNutritionOutline } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import { MdImportantDevices } from "react-icons/md";
import Button from "../../ui/Button";

const features = [
  {
    label: "Track workouts",
    icon: IoBarbell,
    highlight: false,
  },
  {
    label: "Nutrition insights",
    icon: IoNutritionOutline,
    highlight: true,
  },
  {
    label: "Hydration tracking",
    icon: GiWaterDrop,
    highlight: false,
  },
  {
    label: "AI meal planner",
    icon: GiMeal,
    highlight: true,
  },
  {
    label: "Progress charts",
    icon: FaChartLine,
    highlight: false,
  },
  {
    label: "Devices supported",
    icon: MdImportantDevices,
    highlight: false,
  },
];

const plans = [
  {
    title: "Basic",
    price: "5.99",
    featureStates: [true, false, true, false, true, 1],
  },
  {
    title: "Standard",
    price: "8.99",
    featureStates: [true, true, true, false, true, 3],
  },
  {
    title: "Premium",
    price: "12.99",
    featureStates: [true, true, true, true, true, "unlimited"],
  },
];

export default function Pricing() {
  const [hoveredCol, setHoveredCol] = useState(null);
  return (
    <section className="pt-20 px-6 ">
      <div
        onMouseEnter={() => setHoveredCol(null)}
        className="flex justify-between items-center"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-accent-dark text-3xl font-bold">
            Choose the plan that's right for you
          </h2>
          <ul className="flex flex-col gap-1">
            <li className="flex items-center gap-2">
              <GiCheckMark className="text-accent-dark" />
              <p>Track your workouts, meals, and progress - all in one place</p>
            </li>
            <li className="flex items-center  gap-2">
              <GiCheckMark className="text-accent-dark" />
              <p>No ads. Cancel anytime. Start free today.</p>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2 bg-slate-700 h-18 w-60 justify-center rounded-lg">
          <ImGift
            strokeWidth={0.4}
            className="text-4xl text-accent-dark font-bold"
          />
          <p className="font-bold ">Start your free month</p>
        </div>
      </div>
      <div className="mt-10 w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse  ">
          <thead>
            <tr className="">
              <th className="text-left text-lg pb-4 flex items-center gap-2">
                <img className="h-30" src={logo} alt="" />{" "}
                <span className="text-xl font-extrabold bg-gradient-to-r from-cta-dark to-accent-dark bg-clip-text text-transparent">
                  FitFlow
                </span>
              </th>
              {plans.map((plan, colIndex) => (
                <th
                  key={plan.title}
                  className="text-center  text-lg pb-4 text-text-primary-paragraph tracking-wide "
                  onMouseEnter={() => setHoveredCol(colIndex)}
                >
                  {plan.title} <br />
                  <span className="text-xl tracking-wide font-bold text-cta-dark border-b border-slate-700 inline-block w-48 pb-4 ">
                    ${plan.price}/mo
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={feature.label}>
                <td className="py-4 flex items-center gap-3">
                  <feature.icon className="text-accent-dark text-xl" />
                  <p
                    className={
                      feature.highlight
                        ? "underline underline-offset-4 decoration-accent-dark font-semibold"
                        : ""
                    }
                  >
                    {feature.label}
                  </p>
                </td>
                {plans.map((plan, colIndex) => {
                  const value = plan.featureStates[i];
                  return (
                    <td
                      key={plan.title}
                      className="text-center"
                      onMouseEnter={() => setHoveredCol(colIndex)}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <GiCheckMark className="text-accent-dark text-xl inline-block" />
                        ) : (
                          <span className="text-slate-400 text-xl">✕</span>
                        )
                      ) : (
                        <span className={`${hoveredCol === colIndex ? "text-accent-dark" : "text-slate-400"}`}>{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr onMouseLeave={() => setHoveredCol(null)}>
              <td></td> {/* Empty cell for feature label column */}
              {plans.map((plan, colIndex) => (
                <td
                  key={plan.title}
                  className="text-center py-6"
                  onMouseEnter={() => setHoveredCol(colIndex)}
                >
                  {hoveredCol === colIndex && (
                    <Button variant="primary">Select {plan.title}</Button>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
