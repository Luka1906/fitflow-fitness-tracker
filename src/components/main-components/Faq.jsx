import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiHelpCircle, FiMessageCircle } from "react-icons/fi";

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
    <section id="faq" className="border-t border-white/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <p className="mb-5 w-fit rounded-full border border-accent-dark/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-accent-dark sm:mb-6 sm:px-6 sm:text-sm sm:tracking-[0.3em]">
            FAQ
          </p>

          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-text-primary-heading sm:text-4xl md:text-5xl">
            Questions? We&apos;ve Got Answers.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-text-primary-paragraph sm:mt-5 sm:text-lg sm:leading-8">
            Everything you need to know about FitFlow, subscriptions, tracking,
            and getting started.
          </p>

          <div className="mt-7 rounded-2xl border border-slate-700 bg-slate-900/50 p-5 sm:mt-8 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark">
                <FiMessageCircle className="text-2xl" />
              </div>

              <div>
                <h3 className="font-bold text-text-primary-heading">
                  Still need help?
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-primary-paragraph sm:text-base">
                  FitFlow is a portfolio project, but this section shows how
                  support and product questions would be handled.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4 transition duration-300 hover:border-accent-dark/50 sm:p-5"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark sm:h-10 sm:w-10">
                      <FiHelpCircle size={20} />
                    </div>

                    <span className="text-base font-bold leading-snug text-text-primary-heading sm:text-lg">
                      {faq.question}
                    </span>
                  </div>

                  <span className="shrink-0 text-accent-dark">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pl-12 text-sm leading-7 text-text-primary-paragraph sm:pl-14 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}