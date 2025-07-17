import Feature from "./Feature";
import { IoBarbell } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";

const features = [
  {
    icon: IoBarbell,
    title: "Track Workouts",
    description: "Log your sets, reps, and exercies in real time.",
  },
  {
    icon: GiWaterDrop,
    title: "Hydration Logger",
    description: "Keep track of your daily water intake with reminders.",
  },
  {
    icon: GiMeal,
    title: "AI Meal Suggestions",
    description: "Get smart, personalized meal ideas tailored to your goals.",
  },
];

export default function Features() {
  return (
    <section className="flex flex-col items-center py-10 gap-10 ">
      <h2 className="text-3xl font-bold text-accent-dark font-accent">Track Workouts, Hydration, and Nutrition</h2>
      <p className="w-1/2 text-center text-lg">
        Log your exercise, monitor your daily water intake, and receive
        personalized meal recommendations powered by AI
      </p>
      <article className="flex gap-4">
        {features.map((feature) => (
          <Feature
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className=""
          />
        ))}
      </article>
    </section>
  );
}
