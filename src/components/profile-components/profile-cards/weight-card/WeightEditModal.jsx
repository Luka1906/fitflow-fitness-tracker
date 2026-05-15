import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../../ui/Modal";
import WeightDeleteConfirm from "./WeightDeleteConfirm";
import useToggle from "../../../../hooks/useToggle";

const WeightEditModal = ({ onClose, goal, onDelete}) => {
  const menuRef = useRef();
  const { open, isOpen, close } = useToggle();

  // Handle click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  return (
  
      <div
        ref={menuRef}
        className="absolute right-0 top-2  z-50 w-36 rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10">
          Edit log
        </button>

        <button
          onClick={onDelete}
          className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10"
        >
          Delete log
        </button>
      </div>

  );
};

export default WeightEditModal;
