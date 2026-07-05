import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiHelpCircle, FiShield, FiMessageCircle } from "react-icons/fi";

const faqs = [
  {
    question: "What is FitFlow?",
    answer:
      "FitFlow is an all-in-one fitness tracking app for workouts, hydration, nutrition, weight progress, and simple analytics.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel anytime. There are no hidden fees or long-term commitments.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes. FitFlow offers a free trial so you can explore the main features before upgrading.",
  },
  {
    question: "Does FitFlow support multiple devices?",
    answer:
      "Yes. FitFlow is designed to work across desktop, tablet, and mobile screens.",
  },
  {
    question: "Is the pricing real?",
    answer:
      "No. Pricing shown on this portfolio project is for demonstration purposes only.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-t border-white/5 px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-6 w-fit rounded-full border border-accent-dark/70 px-6 py-2 text-sm font-bold uppercase tracking-[0.3em] text-accent-dark">
            FAQ
          </p>

          <h2 className="text-4xl font-extrabold leading-tight text-text-primary-heading md:text-5xl">
            Questions? We&apos;ve Got Answers.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-text-primary-paragraph">
            Everything you need to know about FitFlow, subscriptions, tracking,
            and getting started.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark">
                <FiMessageCircle className="text-2xl" />
              </div>

              <div>
                <h3 className="font-bold text-text-primary-heading">
                  Still need help?
                </h3>
                <p className="mt-2 text-text-primary-paragraph">
                  FitFlow is a portfolio project, but this section shows how
                  support and product questions would be handled.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5 transition duration-300 hover:border-accent-dark/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark">
                      <FiHelpCircle size={20} />
                    </div>

                    <span className="text-lg font-bold text-text-primary-heading">
                      {faq.question}
                    </span>
                  </div>

                  <span className="text-accent-dark">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "mt-4 max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="pl-14 leading-7 text-text-primary-paragraph">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}