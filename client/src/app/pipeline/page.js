"use client";
import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { api } from "../../services/api";
import { PIPELINE, statusLabel } from "../../constants/jobs";
import StatusBadge from "../../components/StatusBadge";
import Link from "next/link";
import { toast } from "sonner";
export default function Pipeline() {
  const [jobs, setJobs] = useState([]);
  const load = () => api("/jobs?limit=100").then((d) => setJobs(d.jobs));
  useEffect(() => {
    load();
  }, []);
  const move = async (id, status) => {
    try {
      await api("/jobs/" + id + "/status", {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <AppShell>
      <Page
        title="Pipeline"
        subtitle="Move opportunities forward as your conversations evolve."
      />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE.map((s) => (
          <section
            className="pipeline-column w-72 shrink-0 rounded-xl p-3"
            key={s}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-sm">{statusLabel(s)}</h2>
              <span className="text-xs text-slate-300">
                {jobs.filter((j) => j.status === s).length}
              </span>
            </div>
            <div className="space-y-3">
              {jobs
                .filter((j) => j.status === s)
                .map((j) => (
                  <article className="card p-3" key={j._id}>
                    <Link
                      href={"/jobs/" + j._id}
                      className="font-semibold text-sm hover:text-blue-600"
                    >
                      {j.title}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">{j.company}</p>
                    <div className="mt-3">
                      <select
                        aria-label="Change stage"
                      className="input h-8 !rounded-md !p-1 text-xs"
                        value={j.status}
                        onChange={(e) => move(j._id, e.target.value)}
                      >
                        {PIPELINE.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
