import logo from "../assets/logo.svg";
import { Link, useLocation, Form } from "react-router-dom";
import { FaUser, FaHouse, FaPowerOff } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

export default function Header({ user }) {
  const location = useLocation();
  const [dropDown, setDropDown] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  setDropDown(false);
}, [location.pathname, user?.id]);

  return (
    <header id="top" className="px-4 py-4 sm:px-6">
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
             className="text-text-primary-paragraph transition-colors duration-200 hover:text-sky-400"
              >
                Features
              </a>
            </li>

            <li className="hidden md:block">
              <a
                href="#how-it-works"
              className="text-text-primary-paragraph transition-colors duration-200 hover:text-sky-400"
              >
                How It Works
              </a>
            </li>

            <li className="hidden md:block">
              <a
                href="#pricing"
               className="text-text-primary-paragraph transition-colors duration-200 hover:text-sky-400"
              >
                Pricing
              </a>
            </li>

            <li className="hidden md:block">
              <a
                href="#faq"
              className="text-text-primary-paragraphtransition-colors duration-200 hover:text-sky-400"
              >
                FAQ
              </a>
            </li>

            <li className="hidden md:block">
              {user ? (
                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDropDown((prev) => !prev)}
                    className="rounded-full"
                  >
                    <img
                      src={user.avatar_url}
                      alt="Profile"
                      className="h-12 w-12 cursor-pointer rounded-full object-cover transition hover:scale-105 hover:ring-2 hover:ring-sky-300/70"
                    />
                  </button>
                  <div
                    className={`
    absolute right-0 z-50 w-64 overflow-hidden
    rounded-2xl border border-white/10
    bg-slate-800/95 shadow-2xl backdrop-blur-md
    origin-top-right
    transition-all duration-200 ease-out
    ${
    dropDown
  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
    }
  `}
                  >
                    <div className="border-b border-white/10 p-4">
                      <p className="font-semibold text-slate-100">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="mt-1 truncate text-[13px] text-slate-400">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropDown(false)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium text-slate-300 transition-all hover:bg-white/5 hover:text-sky-400"
                      >
                        <FaUser className="text-base" />
                        <span>Profile</span>
                      </Link>
                      <Form method="POST" action="/logout">
                        <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300">
                          <FaPowerOff className="text-base" />
                          <span>Logout</span>
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 rounded-xl border border-white/10 hover:border-accent-dark/15 bg-white/5 px-3 py-2 text-slate-300  hover:text-sky-400 transition hover:bg-accent-dark/5 active:scale-[1.03]"
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
className="flex items-center gap-2 text-slate-300 transition-colors duration-200 hover:text-white"
          >
            <FaHouse className="text-sm sm:text-base" />
            <p className="text-sm sm:text-base">Back to Home</p>
          </Link>
        )}
      </nav>
    </header>
  );
}
