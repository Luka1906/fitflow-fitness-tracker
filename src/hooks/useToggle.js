import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle,
  };
}
