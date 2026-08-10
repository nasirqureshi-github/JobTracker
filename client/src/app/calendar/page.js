"use client";
import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { api } from "../../services/api";
import { format } from "date-fns";
export default function Calendar() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    api("/jobs?limit=100&sort=interviewDate").then((d) =>
      setJobs(d.jobs.filter((j) => j.interviewDate || j.followUpDate)),
    );
  }, []);
  const events = jobs
    .flatMap((j) =>
      [
        ["Interview", j.interviewDate],
        ["Follow-up", j.followUpDate],
      ]
        .filter((x) => x[1])
        .map(([type, date]) => ({ type, date: new Date(date), job: j })),
    )
    .sort((a, b) => a.date - b.date);
  return (
    <AppShell>
      <Page
        title="Upcoming"
        subtitle="Interviews and follow-ups that need your attention."
      />
      <div className="card divide-y divide-slate-100">
        {events.length ? (
          events.map((e, i) => (
            <div className="flex gap-4 p-5" key={i}>
              <div className="w-14 text-center">
                <b className="block text-lg text-blue-600">
                  {format(e.date, "dd")}
                </b>
                <span className="text-xs uppercase text-slate-500">
                  {format(e.date, "MMM")}
                </span>
              </div>
              <div>
                <p className="font-semibold">
                  {e.type}: {e.job.title}
                </p>
                <p className="text-sm text-slate-500">
                  {e.job.company} · {format(e.date, "PPP p")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-sm text-slate-500">
            No upcoming interviews or follow-ups. Add dates to your jobs to see
            them here.
          </div>
        )}
      </div>
    </AppShell>
  );
}
