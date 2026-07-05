import { GiCheckMark, GiWaterDrop, GiMeal } from "react-icons/gi";
import { ImGift } from "react-icons/im";
import {
  IoBarbell,
  IoNutritionOutline,
  IoShieldCheckmark,
} from "react-icons/io5";
import { FaChartLine, FaStar } from "react-icons/fa";
import { MdImportantDevices } from "react-icons/md";
import Button from "../../ui/Button";

const features = [
  { key: "workouts", label: "Track workouts", icon: IoBarbell },
  { key: "nutrition", label: "Nutrition insights", icon: IoNutritionOutline },
  { key: "hydration", label: "Hydration tracking", icon: GiWaterDrop },
  { key: "mealPlanner", label: "AI meal planner", icon: GiMeal },
  { key: "charts", label: "Progress charts", icon: FaChartLine },
  { key: "devices", label: "Devices supported", icon: MdImportantDevices },
];

const plans = [
  {
    title: "Basic",
    price: "5.99",
    button: "Select Basic",
    popular: false,
    features: {
      workouts: true,
      nutrition: false,
      hydration: true,
      mealPlanner: false,
      charts: true,
      devices: "1 device",
    },
  },
  {
    title: "Standard",
    price: "8.99",
    button: "Start Free Trial",
    popular: true,
    note: "7 days free. Cancel anytime.",
    features: {
      workouts: true,
      nutrition: true,
      hydration: true,
      mealPlanner: false,
      charts: true,
      devices: "3 devices",
    },
  },
  {
    title: "Premium",
    price: "12.99",
    button: "Go Premium",
    popular: false,
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
  return (
    <section className="px-6 py-20 ">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mx-auto mb-6 w-fit rounded-full border border-accent-dark/70 px-6 py-2 text-sm font-bold uppercase tracking-[0.3em] text-accent-dark">
          Simple Pricing
        </p>

        <h2 className="text-4xl font-extrabold leading-tight text-text-primary-heading md:text-5xl">
          Start Free.{" "}
          <span className="text-accent-dark brightness-105">Upgrade</span> When
          You Need More.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-text-primary-paragraph">
          Everything you need to track workouts, hydration, nutrition, and
          progress - in one place.
        </p>
      </div>

      <div className="mx-auto  max-w-5xl  mt-10 flex  flex-col items-center justify-center gap-6 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 md:flex-row">
        <div className="flex w-full items-center gap-4 md:w-auto">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark">
            <IoShieldCheckmark className="text-3xl" />
          </div>
          <div>
            <p className="font-bold text-text-primary-heading">No Commitment</p>
            <p className=" font-medium text-emerald-400/90">
              Cancel anytime. No hidden fees.
            </p>
          </div>
        </div>

        <div className="hidden h-12 w-px bg-slate-700 md:block" />

        <div className="flex w-full items-center gap-4 md:w-auto">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark">
            <ImGift className="text-2xl" />
          </div>
          <div>
            <p className="font-bold text-text-primary-heading">
              Start your free month
            </p>
            <p className="text-text-primary-paragraph">
              No credit card required.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`relative rounded-2xl border p-8 transition duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-accent-dark shadow-accent-dark/20"
                  : "border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-accent-dark/50 bg-accent-dark/15 backdrop-blur-xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-white">
                  <FaStar strokeWidth={15} className="text-accent-dark" />
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-extrabold uppercase tracking-[0.2em] text-accent-dark">
                  {plan.title}
                </h3>

                <p className="mt-6 text-text-primary-heading">
                  <span className="text-5xl font-extrabold">${plan.price}</span>
                  <span className="text-xl text-text-primary-paragraph">
                    {" "}
                    /mo
                  </span>
                </p>
              </div>

              <div className="my-8 h-px bg-slate-700" />

              <ul className="space-y-5">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  const value = plan.features[feature.key];

                  return (
                    <li
                      key={feature.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex gap-3">
                        <Icon className="text-xl text-accent-dark" />
                        <span className="text-text-primary-paragraph">
                          {feature.label}
                        </span>
                      </div>

                      {typeof value === "boolean" ? (
                        value ? (
                          <GiCheckMark className="text-emerald-400" />
                        ) : (
                          <span className="text-xl text-slate-500">×</span>
                        )
                      ) : (
                        <span className="text-text-primary-paragraph">
                          {value}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Button
                variant={plan.popular ? "primary" : "outline"}
                className="w-full mt-8 cursor-pointer"
              >
                {plan.button}
              </Button>

              {plan.note && (
                <p className="mt-4 text-center text-sm text-slate-400">
                  {plan.note}
                </p>
              )}
            </article>
          ))}
          <div className="flex lg:col-span-3 ">
            <div className="mt-3 w-fit  rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400">
              Demo Pricing • Plans shown for portfolio demonstration purposes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
