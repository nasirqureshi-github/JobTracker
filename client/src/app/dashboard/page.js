"use client";
import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../../components/StatusBadge";
import {
  Briefcase,
  CalendarCheck,
  Gift,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function Dashboard() {
  const [d, setD] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    api("/dashboard/stats")
      .then(setD)
      .catch(() => {});
  }, []);
  if (!d)
    return (
      <AppShell>
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((x) => (
              <div className="h-28 bg-slate-200 rounded-xl" key={x} />
            ))}
          </div>
        </div>
      </AppShell>
    );
  const cards = [
    ["Total applications", d.total, Briefcase],
    ["This month", d.thisMonth, TrendingUp],
    ["Interviews", d.interviews, CalendarCheck],
    ["Offers", d.offers, Gift],
    ["Pending", d.pending, Target],
    ["Rejected", d.rejected, XCircle],
  ];
  return (
    <AppShell>
      <Page
        title={`Good to see you${user?.name ? `, ${user.name}` : ""}`}
        subtitle="Here’s how your job search is moving."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {cards.map(([t, n, I]) => (
          <div className="card p-4" key={t}>
            <I className="text-blue-600" size={19} />
            <p className="mt-4 text-2xl font-bold">{n}</p>
            <p className="text-xs text-slate-500">{t}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <section className="card p-5 lg:col-span-3">
          <h2 className="font-bold">Applications by stage</h2>
          <div className="mt-5 h-64">
            <ResponsiveContainer>
              <BarChart
                data={d.byStatus.map((x) => ({
                  name: x._id.replaceAll("_", " "),
                  count: x.count,
                }))}
              >
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="card p-5 lg:col-span-2">
          <h2 className="font-bold">Recent activity</h2>
          <div className="mt-4 space-y-4">
            {d.recent.length ? (
              d.recent.map((j) => (
                <div
                  className="flex items-center justify-between gap-2"
                  key={j._id}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{j.title}</p>
                    <p className="text-xs text-slate-500">{j.company}</p>
                  </div>
                  <StatusBadge status={j.status} />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Add your first job to get started.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
