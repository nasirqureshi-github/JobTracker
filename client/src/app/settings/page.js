"use client";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import ThemeToggle from "../../components/ThemeToggle";
export default function Settings() {
  return (
    <AppShell>
      <Page
        title="Settings"
        subtitle="Personalize your JobTracker workspace."
      />
      <div className="card max-w-xl p-6">
        <h2 className="font-bold">Appearance</h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Color theme</p>
            <p className="text-sm text-slate-500">
              Choose light or dark mode. Your preference is saved.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </AppShell>
  );
}
