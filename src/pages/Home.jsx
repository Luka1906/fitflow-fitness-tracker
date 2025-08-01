import Headline from "../components/main-components/Headline";
import Features from "../components/main-components/Features";
import Testimonials from "../components/main-components/Testimonials";
import WorkingSteps from "../components/main-components/WorkingSteps";
import Pricing from "../components/main-components/Pricing";
import Faq from "../components/main-components/FAQ";

export default function HomePage() {
  return (
    <main>
      <Headline />
      <Features />
      <WorkingSteps />
      <Testimonials />
      <Pricing />
      <Faq />
    </main>
  );
}
