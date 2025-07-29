import logo from "../assets/logo.svg";
import { FaTiktok, FaInstagram, FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="px-6 bg-slate-800 py-10 text-sm text-white">
      {/* Logo and brand */}
      <div className="flex items-center gap-3 mb-6">
        <img
          className="h-20 grayscale contrast-200"
          src={logo}
          alt="Fitflow logo"
        />
        <h2 className="text-lg font-semibold">FitFlow</h2>
      </div>

      {/* Links and newsletter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
        {/* Navigation Links */}
        <ul className="flex flex-wrap gap-4">
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/careers" className="hover:underline">Careers</a></li>
          <li><a href="/press" className="hover:underline">Press</a></li>
          <li><a href="/support" className="hover:underline">Customer Service</a></li>
          <li><a href="/accessibility" className="hover:underline">Accessibility Help</a></li>
        </ul>

        {/* Newsletter form */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <p className="font-medium">Get the latest FitFlow news</p>
          <form className="flex">
            <input
              className="border border-r-0 px-3 py-3 w-full outline-none border-slate-400 placeholder:text-white/60 bg-transparent"
              type="email"
              name="email"
              id="email"
              placeholder="Your email here"
            />
            <button className="border border-slate-400 px-4 hover:bg-white hover:text-slate-800 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-slate-600" />

      {/* Legal links & social */}
      <div className="flex flex-col gap-6 mt-8 text-xs">
        {/* Legal Links */}
        <ul className="flex flex-wrap gap-2">
          <li className="pr-3 border-r border-slate-400">
            <a href="/terms">Terms & Conditions</a>
          </li>
          <li className="pr-3 border-r border-slate-400">
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li className="pr-3 border-r border-slate-400">
            <a href="/fraud">Fraud and scam alert</a>
          </li>
          <li className="pr-3">
            <a href="/cookies">Cookie Consent</a>
          </li>
        </ul>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/70">&copy; 2025 FitFlow, LLC. All rights reserved.</p>

          {/* Social Icons */}
          <ul className="flex gap-3 text-base">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaInstagram /></a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a></li>
            <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition"><FaXTwitter /></a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><FaTiktok /></a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition"><FaYoutube /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
