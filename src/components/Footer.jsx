import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import logo from "../assets/logo.svg";

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const developerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Luka1906",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lukamatovic/",
    icon: FaLinkedinIn,
  },
  {
    label: "Portfolio",
    href: "https://lukamatovic.netlify.app/",
    icon: HiOutlineExternalLink,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-700/60 bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.7fr_0.7fr] md:gap-12">
          {/* Brand */}
          <div>
            <a
              href="#top"
              aria-label="Go to the top of the page"
              className="inline-flex items-center gap-3 "
            >
              <div className="h-10 w-10 inline-flex items-center">
  <img
                src={logo}
                alt="FitFlow logo"
                aria-hidden="true"
            
              />
              </div>
            

              <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-2xl font-extrabold text-transparent">
                FitFlow
              </span>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Track workouts, hydration, weight progress, and healthy habits in
              one place.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-200">
              Navigate
            </h2>

            <ul className="mt-4 flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Developer links */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-200">
              Developer
            </h2>

            <div className="mt-4 flex items-center gap-3">
              {developerLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-slate-700/60 pt-7 text-center">
          <p className="text-sm leading-6 text-slate-500">
            © {currentYear} FitFlow. Portfolio project built by Luka Matović
            with React, Express, PostgreSQL, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}