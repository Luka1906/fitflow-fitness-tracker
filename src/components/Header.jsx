import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="px-4 py-4 sm:px-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-12 sm:h-16" src={logo} alt="FitFlow Logo" />

          <span className="bg-gradient-to-r from-cta-dark to-accent-dark bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
            FitFlow
          </span>
        </Link>

        <ul className="flex items-center gap-4 font-semibold sm:gap-8 sm:text-lg">
          <li className="hidden md:block">
            <a
              href="#features"
              className="text-sky-300/90 transition-colors duration-200 hover:text-white"
            >
              Features
            </a>
          </li>

          <li className="hidden md:block">
            <a
              href="#how-it-works"
              className="text-sky-300/90 transition-colors duration-200 hover:text-white"
            >
              How It Works
            </a>
          </li>

          <li className="hidden md:block">
            <a
              href="#pricing"
              className="text-sky-300/90 transition-colors duration-200 hover:text-white"
            >
              Pricing
            </a>
          </li>

          <li className="hidden md:block">
            <a
              href="#faq"
              className="text-sky-300/90 transition-colors duration-200 hover:text-white"
            >
              FAQ
            </a>
          </li>

          <li className="hidden md:block">
            <Link
              to="/auth"
              className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-text-primary-headings transition-all duration-200 hover:bg-sky-400/20 hover:text-white"
            >
              Log In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}