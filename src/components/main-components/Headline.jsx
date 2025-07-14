import tesimonial1 from "../../assets/testimonials/testimonial1.jpg";
import tesimonial2 from "../../assets/testimonials/testimonial2.jpg";
import tesimonial3 from "../../assets/testimonials/testimonial3.jpg";
import banner from "../../assets/banner.png"

export default function Headline() {
  return (
    <main className="px-6 py-10 grid grid-cols-[2fr_1fr]">
        <div>
 <h1 className="text-7xl w-2xl ">
        Track. Train. Thrive. Your Fitness,{" "}
        <span className="text-cta-dark">All in One Place.</span>
      </h1>

      <div className="flex items-center gap-30  relative">
        <div className=" w-fit  flex flex-col items-center">
          <img
            className="w-18 h-18 relative top-4.5  object-cover rounded-full border-2 border-accent-dark "
            src={tesimonial3}
            alt="First user"
          />
          <div className="flex -space-x-3 ">
            <img
              className="w-18 h-18 object-cover z-30  rounded-full border-2 border-accent-dark"
              src={tesimonial1}
              alt="First user"
            />
            <img
              className="w-18  h-18  object-cover rounded-full border-2 border-accent-dark"
              src={tesimonial2}
              alt="First user"
            />
          </div>
          <h2 className="text-4xl mt-3 text-cta-dark font-bold ">100k+</h2>
          <p>Active Users</p>
        </div>

        <div >
          <h3 className="w-1/2">
            Track workouts, hydration, and meals — with personalized insights to
            help you stay consistent.
          </h3>
          <div className="absolute bottom-0 flex gap-10">
            <button className=" px-10 py-0.5  bg-accent-dark rounded-md">Sign Up</button>
            <button className="px-10 py-0.5 border-2 border-cta-dark rounded-md">Log In</button>
          </div>
        </div>
      </div>
        </div>
        <img className="h-[40rem] w-[29rem] rounded-md" src={banner} alt="" />
    </main>
  );
}
