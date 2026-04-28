import { useEffect } from "react";

export default function Drawer({ children, isOpen, onClose }) {
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) onClose();
  };
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={handleClickOutside}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-bg-dark p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </aside>
    </div>
  );
}
