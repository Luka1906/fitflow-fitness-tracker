import user1 from "../../assets/testimonials/testimonial4.jpg"
import user2 from "../../assets/testimonials/testimonial5.jpg"
import user3 from "../../assets/testimonials/testimonial6.jpg"
import Testimonial from "./Testimonial";

export default function Testimonials () {
    const testimonials = [
      {
        id:1,
        name: "David Kim",
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
    return (
        <section className="text-3xl font-bold text-accent-dark font-accent text-center">
            <h2>People Actually Love Using This</h2>
            {testimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} avatar={testimonial.avatar} role={testimonial.role} text={testimonial.text}/>
            ))}
        </section>
    )
}