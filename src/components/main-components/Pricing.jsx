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
    <section id="pricing" className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mx-auto mb-6 w-fit rounded-full border border-accent-dark/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-accent-dark sm:px-6 sm:text-sm sm:tracking-[0.3em]">
          Simple Pricing
        </p>

        <h2 className="font-accent text-3xl font-bold leading-tight tracking-tight text-text-primary-headings sm:text-4xl lg:text-5xl">
          Start Free.{" "}
          <span className="text-accent-dark brightness-105">Upgrade</span> When
          You Need More.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-primary-paragraph sm:text-lg">
          Everything you need to track workouts, hydration, nutrition, and
          progress - in one place.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-5 rounded-2xl border border-slate-700 bg-slate-900/50 p-4 sm:p-6 md:flex-row md:items-center md:justify-center md:gap-6">
        <div className="flex w-full items-center gap-4 md:w-auto">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark sm:h-14 sm:w-14">
            <IoShieldCheckmark className="text-2xl sm:text-3xl" />
          </div>
          <div>
            <p className="font-bold text-text-primary-headings">
              No Commitment
            </p>
            <p className="text-sm font-medium text-emerald-400/90 sm:text-base">
              Cancel anytime. No hidden fees.
            </p>
          </div>
        </div>

        <div className="hidden h-12 w-px bg-slate-700 md:block" />

        <div className="flex w-full items-center gap-4 md:w-auto">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark sm:h-14 sm:w-14">
            <ImGift className="text-xl sm:text-2xl" />
          </div>
          <div>
            <p className="font-bold text-text-primary-headings">
              Start your free month
            </p>
            <p className="text-sm text-text-primary-paragraph sm:text-base">
              No credit card required.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:mt-14 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`relative rounded-2xl border p-6 transition duration-300 hover:-translate-y-2 sm:p-8 ${
              plan.popular
                ? "border-accent-dark shadow-accent-dark/20"
                : "border-slate-700"
            }`}
          >
            {plan.popular && (
              <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-accent-dark/50 bg-accent-dark/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl sm:py-3 sm:text-sm">
                <FaStar strokeWidth={15} className="text-accent-dark" />
                Most Popular
              </div>
            )}

            <div className="text-center">
              <h3 className="text-xl font-extrabold uppercase tracking-[0.2em] text-accent-dark sm:text-2xl">
                {plan.title}
              </h3>

              <p className="mt-5 text-text-primary-headings sm:mt-6">
                <span className="text-4xl font-extrabold sm:text-5xl">
                  ${plan.price}
                </span>
                <span className="text-lg text-text-primary-paragraph sm:text-xl">
                  {" "}
                  /mo
                </span>
              </p>
            </div>

            <div className="my-6 h-px bg-slate-700 sm:my-8" />

            <ul className="space-y-4 sm:space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                const value = plan.features[feature.key];

                return (
                  <li
                    key={feature.key}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="shrink-0 text-lg text-accent-dark sm:text-xl" />
                      <span className="text-sm text-text-primary-paragraph sm:text-base">
                        {feature.label}
                      </span>
                    </div>

                    {typeof value === "boolean" ? (
                      value ? (
                        <GiCheckMark className="shrink-0 text-emerald-400" />
                      ) : (
                        <span className="shrink-0 text-xl text-slate-500">
                          ×
                        </span>
                      )
                    ) : (
                      <span className="shrink-0 text-sm text-text-primary-paragraph sm:text-base">
                        {value}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <Button
              variant={plan.popular ? "primary" : "outline"}
              className="mt-8 w-full cursor-pointer"
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

        <div className="flex justify-center lg:col-span-3">
          <div className="mt-3 rounded-full border border-slate-700 px-4 py-2 text-center text-xs text-slate-400 sm:text-sm">
            Demo Pricing • Plans shown for portfolio demonstration purposes
          </div>
        </div>
      </div>
    </section>
  );
}