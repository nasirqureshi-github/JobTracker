"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

export default function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", onConfirm, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="modal-card animate-rise"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button aria-label="Close dialog" className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white" onClick={onClose}>
          <X size={18} />
        </button>
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-600"><AlertTriangle size={21} /></div>
        <h2 id="confirm-dialog-title" className="mt-5 text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
