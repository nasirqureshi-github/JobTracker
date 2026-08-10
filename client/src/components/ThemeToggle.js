"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const d = localStorage.theme !== "light";
    setDark(d);
    if (!localStorage.theme) localStorage.theme = "dark";
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    localStorage.theme = d ? "dark" : "light";
    document.documentElement.classList.toggle("dark", d);
  };
  return (
    <button
      aria-label="Toggle color theme"
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
