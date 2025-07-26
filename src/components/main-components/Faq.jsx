import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import faq1 from "../../assets/faq1.svg";

export default function Faq() {
  const faqs = [
    {
      question: "What is FitFlow?",
      answer:
        "FitFlow is your all-in-one fitness tracking app to monitor workouts, nutrition, hydration, and progress charts—all tailored for you.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes! You can cancel your subscription anytime without penalties. There are no hidden fees.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Absolutely! We offer a 30-day free trial so you can explore all features risk-free.",
    },
    {
      question: "Does FitFlow support multiple devices?",
      answer:
        "Yes, you can use FitFlow on smartphones, tablets, and desktops seamlessly.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Just go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to reset it.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-20 border-t border-slate-700">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-accent-dark mb-4">FAQs</h2>
          <p className="text-text-primary-headings leading-relaxed">
            Have a question? Here you'll find the answers most valued by our
            community, along with step-by-step instructions and support.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img src={faq1} alt="FAQ illustration" className="w-80 h-auto" />
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto mt-16 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-5 transition duration-300 shadow-md hover:shadow-lg"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left "
              >
                <span className="text-lg font-medium text-text-primary-headings">
                  {faq.question}
                </span>
                <span className="text-accent-dark cursor-pointer">
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <div
                className={`transition-all overflow-hidden duration-300 ${
                  isOpen ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-text-primary-headings leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
