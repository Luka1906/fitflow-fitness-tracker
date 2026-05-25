import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

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

        <ul className="flex items-center gap-4 text-text-secondary-dark sm:gap-8 sm:text-lg">
          <li className="hidden md:block">
            <Link className="transition hover:text-white" to="/features">
              Features
            </Link>
          </li>

          <li className="hidden md:block">
            <Link className="transition hover:text-white" to="/pricing">
              Pricing
            </Link>
          </li>

          <li className="hidden md:block">
            <Link className="transition hover:text-white" to="/blog">
              Blog
            </Link>
          </li>

          <li className="rounded-xl bg-white/5 p-2">
            <Link to="/profile">
              <FaUser className="text-xl transition hover:text-white sm:text-2xl" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}