import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <header className="px-6 pb-4">
      <nav className="flex items-center justify-between">
        {/* Logo + App Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            className="h-30 "
            src={logo}
            alt="FitFlow Logo"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cta-dark to-accent-dark bg-clip-text text-transparent">
            FitFlow
            
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center space-x-6 text-lg text-text-secondary-dark">
          <li>
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/profile">
              <FaUser className="text-2xl hover:text-white transition" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
