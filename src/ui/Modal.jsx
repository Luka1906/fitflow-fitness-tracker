import { createPortal } from "react-dom";
import { useEffect } from "react";

export function Modal({ children, onClose, isOpen }) {
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
  className={`
    fixed inset-0 z-100 flex items-center justify-center
    bg-black/40 px-4 transition-opacity duration-200
    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
>
  <div
    className={`
      w-full max-w-md  border-none rounded-2xl overflow-hidden  shadow-2xl
      transition-all duration-200
      ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
    `}
  >
    {children}
  </div>
</div>,
    document.getElementById("modal-root"),
  );
}
