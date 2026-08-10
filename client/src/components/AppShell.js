"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ConfirmDialog from "./ConfirmDialog";
const links = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/jobs", "Jobs", BriefcaseBusiness],
  ["/pipeline", "Pipeline", BarChart3],
  ["/calendar", "Calendar", CalendarDays],
  ["/settings", "Settings", Settings],
];
export default function AppShell({ children }) {
  const [open, setOpen] = useState(false),
    [logoutOpen, setLogoutOpen] = useState(false),
    [navigating, setNavigating] = useState(false),
    p = usePathname();

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setNavigating(false), [p]);
  const navigate = () => {
    setOpen(false);
    setNavigating(true);
  };
  const nav = (
    <nav className="space-y-1">
      {links.map(([href, label, Icon]) => (
        <Link
          onClick={navigate}
          key={href}
          href={href}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${p === href || (href !== "/dashboard" && p.startsWith(`${href}/`)) ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}`}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="min-h-screen">
      <aside
        className={`fixed inset-y-0 z-40 w-72 border-r border-slate-200 bg-white p-5 shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-900 lg:w-64 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            JobTracker
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        {nav}
        <div className="absolute bottom-5 left-4 right-4">
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>
      {open && (
        <div
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <main className="lg:ml-64">
        {navigating && <div className="route-progress" />}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-3 backdrop-blur dark:bg-slate-900/90 sm:px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <div className="hidden lg:block text-sm text-slate-500">
            Your career command center
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/jobs/new" className="btn btn-primary px-3 text-sm sm:px-4">
              <Plus size={17} />
              <span className="hidden sm:inline">Add job</span>
            </Link>
          </div>
        </header>
        <div className="page-enter p-4 lg:p-8">{children}</div>
      </main>
      <ConfirmDialog
        open={logoutOpen}
        title="Sign out of JobTracker?"
        description="You will need to sign in again to access your applications and dashboard."
        confirmLabel="Sign out"
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          localStorage.removeItem("jt_token");
          location.href = "/login";
        }}
      />
    </div>
  );
}
