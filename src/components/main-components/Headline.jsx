import tesimonial1 from "../../assets/testimonials/testimonial1.jpg";
import tesimonial2 from "../../assets/testimonials/testimonial2.jpg";
import tesimonial3 from "../../assets/testimonials/testimonial3.jpg";
import banner from "../../assets/banner.png";
import Button from "../../ui/Button";

export default function Headline() {
  return (
    <section className="px-6 mt-2 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
      <div>
        <h1 className="text-5xl text-text-primary-headings sm:text-6xl lg:text-7xl font-bold max-w-2xl leading-tight font-accent">
          Track. Train. Thrive. Your Fitness,{" "}
          <span className="text-cta-dark">All in One Place.</span>
        </h1>

        <div className="flex items-center gap-10 mt-8">
          {/* Testimonial images */}
          <div className="w-fit flex flex-col items-center">
            <img
              className="md:w-[4.5rem] w-[5rem] md:h-[4.5rem] h-[5rem] object-cover rounded-full border-2 border-accent-dark relative top-[1.1rem]"
              src={tesimonial3}
              alt="User testimonial"
            />
            <div className="flex -space-x-3  w-[9rem]">
              <img
                className="md:w-[4.5rem] w-[5rem] md:h-[4.5rem] h-[5rem]  object-cover z-30 rounded-full border-2 border-accent-dark"
                src={tesimonial1}
                alt="User testimonial"
              />
              <img
                className="md:w-[4.5rem] w-[5rem] md:h-[4.5rem] h-[5rem]  object-cover z-20 rounded-full border-2 border-accent-dark"
                src={tesimonial2}
                alt="User testimonial"
              />
            </div>
            <h2 className="text-4xl mt-3 text-cta-dark font-bold">100k+</h2>
            <p className="text-text-secondary-dark">Active Users</p>
          </div>

          {/* Description & CTA */}
          <div>
            <h3 className="w-[20rem] text-lg text-text-secondary-dark leading-snug">
              Track workouts, hydration, and meals – with personalized insights
              to help you stay consistent.
            </h3>
            <div className="mt-6 flex gap-6 font-accent">
              <Button variant="primary">Sign Up</Button>
                  <Button variant="outline">Log In</Button>
              
            </div>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden w-fit shadow-2xl shadow-black/30 group">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent z-10" />

        {/* The banner image */}
        <img
          src={banner}
          alt="App preview banner"
          className="h-[45rem] w-[40rem] object-cover rounded-xl transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        <div className="absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-xl p-4 rounded-lg border border-white/30 text-white shadow-lg shadow-white/10">
          <p className="text-xs uppercase tracking-widest text-white/80">New</p>
          <h3 className="text-xl font-semibold">AI Meal Planner</h3>
        </div>
      </div>
    </section>
  );
}
