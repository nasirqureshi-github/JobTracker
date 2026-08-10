export const STATUSES = [
  "SAVED",
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "TECHNICAL_INTERVIEW",
  "FINAL_INTERVIEW",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
];
export const PIPELINE = [...STATUSES];
export const statusLabel = (s) =>
  s?.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
export const statusColor = (s) =>
  ({
    SAVED: "bg-slate-100 text-slate-700",
    APPLIED: "bg-blue-100 text-blue-700",
    SCREENING: "bg-violet-100 text-violet-700",
    INTERVIEW: "bg-amber-100 text-amber-700",
    TECHNICAL_INTERVIEW: "bg-orange-100 text-orange-700",
    FINAL_INTERVIEW: "bg-pink-100 text-pink-700",
    OFFER: "bg-emerald-100 text-emerald-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    WITHDRAWN: "bg-slate-200 text-slate-600",
  })[s] || "";
