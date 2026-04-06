import { createPortal } from "react-dom";
import { useEffect } from "react";

export function Modal({ children, onClose }) {
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    const handleExitPress = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleExitPress);

    return () => {
      document.removeEventListener("keydown", handleExitPress);
    };
  }, []);

  return createPortal(
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center bg-black/40 px-4 "
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-100 shadow-2xl border border-slate-500">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}
