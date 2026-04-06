import { useState } from "react";
import user1 from "../../assets/testimonials/testimonial4.jpg";
import user2 from "../../assets/testimonials/testimonial5.jpg";
import user3 from "../../assets/testimonials/testimonial6.jpg";
import mainUser1 from "../../assets/testimonials/testimonial8.jpg";
import Card from "../../ui/Card";
import Testimonial from "./Testimonial";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Taylor Scott",
      role: "Software Engineer",
      avatar: user1,
      text: "I’ve tried many tools before, but this one stands out for its reliability and speed. Support is also top-notch.",
    },
    {
      id: 2,
      name: "Samantha Jacobs",
      role: "UX Designer",
      avatar: user2,
      text: "Design-wise, it’s gorgeous and user-friendly. Makes my workflow much smoother and more enjoyable.",
    },
    {
      id: 3,
      name: "David Newton",
      role: "Product Manager",
      avatar: user3,
      text: "This app completely transformed how our team collaborates. The interface is clean and super intuitive. Highly recommend!",
    },
  ];

  const [index, setIndex] = useState(0);
  const { avatar, role, text, name } = testimonials[index];

  return (
    <section className="font-bold grid-cols-[2fr_3fr] font-accent bg-slate-800 p-6 grid ">
      {/* Left image + heading */}
      <div className="relative">
        <img
          className="h-[45rem] w-[35rem] rounded-xl "
          src={mainUser1}
          alt="Man riding cardio bike"
        />
        <div className="absolute inset-0 bg-black/30 rounded-xl"  />
<h3 className="absolute top-1/2   -translate-y-1/2 px-2 text-4xl uppercase z-10 text-center tracking-wide leading-tight bg-gradient-to-r from-cta-dark to-accent-dark bg-clip-text text-transparent">
          The People who felt the impact.
        </h3>
      </div>

      {/* Right side: slider */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm uppercase tracking-wider text-slate-400 mb-4">
          What they’re saying
        </p>

        <Testimonial key={index} name={name} avatar={avatar} role={role} text={text} />

        {/* Dots below */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full border cursor-pointer border-white  ${
                index === i ? "bg-white" : "bg-transparent hover:bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
