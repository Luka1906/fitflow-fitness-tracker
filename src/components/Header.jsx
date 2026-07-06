import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaUser, FaHouse } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function Header({ user }) {
  const location = useLocation();

  return (
    <header className="px-4 py-4 sm:px-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-12 sm:h-16" src={logo} alt="FitFlow Logo" />

          <span className="bg-gradient-to-r from-cta-dark to-accent-dark bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
            FitFlow
          </span>
        </Link>

        {location.pathname === "/" ? (
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
              {user ? (
             <Link to="/profile">
  <img
    src={user.avatar_url}
    alt="Profile"
    className="
      h-12 w-12
      cursor-pointer
      rounded-full
     
      object-cover
      transition
      hover:scale-105
      hover:border-sky-300
    "
  />
</Link>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sky-300 hover:bg-white/10"
                >
                  <FaUser size={18} />
                  <span className="hidden lg:block">Log In</span>
                </Link>
              )}
            </li>
          </ul>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 text-accent-dark font-medium text-lg transition hover:text-accent-soft "
          >
            <FaHouse />
            <p>Back to Home</p>
          </Link>
        )}
      </nav>
    </header>
  );
}
