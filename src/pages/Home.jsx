import Headline from "../components/main-components/Headline";
import Features from "../components/main-components/Features";
import Consistency from "../components/main-components/Consistency";

import WorkingSteps from "../components/main-components/WorkingSteps";
import Pricing from "../components/main-components/Pricing";
import Faq from "../components/main-components/FAQ";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main>
      <Headline />
      <Features />
      <Consistency />
      <WorkingSteps />
      <Pricing />
      <Faq />
      <Footer/>
    </main>
  );
}
