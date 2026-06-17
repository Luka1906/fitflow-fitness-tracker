import Feature from "./Feature";
import { IoBarbell } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";


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
  {
    icon: FaChartLine,
    title: "Progress charts",
    description:
      "Track weight, hydration, and workout trends with interactive analytics.",
  },
];

export default function Features() {
  return (
    <section className="flex flex-col items-center pt-20  gap-10 ">
      <div className="mx-auto text-center max-w-3xl">
<h2 className="text-3xl sm:text-4xl font-bold text-accent-dark font-accent tracking-wide">
        Everything you need to stay consistent
      </h2>
      
      <p className="mt-4 text-lg text-text-primary-paragraph leading-relaxed">
        Log your exercise, monitor your daily water intake, and receive
        personalized meal recommendations powered by AI
      </p>
<article className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <Feature
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
      
          />
        ))}
      </article>
      </div>
    
 
    </section>
  );
}
