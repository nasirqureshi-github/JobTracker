"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "../../components/AppShell";
import Page from "../../components/Page";
import { api } from "../../services/api";
import StatusBadge from "../../components/StatusBadge";
import { Search, Trash2, Plus, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "../../components/ConfirmDialog";
export default function Jobs() {
  const [d, setD] = useState({ jobs: [], pagination: {} }),
    [q, setQ] = useState(""),
    [status, setStatus] = useState(""),
    [page, setPage] = useState(1),
    [jobToDelete, setJobToDelete] = useState(null);
  const load = async () => {
    try {
      const data = await api(`/jobs?search=${encodeURIComponent(q)}&status=${status}&page=${page}&limit=10`);
      setD(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    load();
  }, [q, status, page]);
  const del = async (id) => {
    try {
      await api("/jobs/" + id, { method: "DELETE" });
      toast.success("Job deleted");
      setJobToDelete(null);
      load();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <AppShell>
      <Page
        title="Jobs"
        subtitle="Keep every opportunity organized."
        actions={
          <Link className="btn btn-primary" href="/jobs/new">
            <Plus size={17} />
            Add job
          </Link>
        }
      />
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="input"
              style={{ paddingLeft: "3.25rem" }}
              placeholder="Search jobs, companies, tags…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="input sm:w-48"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All statuses</option>
            {[
              "SAVED",
              "APPLIED",
              "SCREENING",
              "INTERVIEW",
              "OFFER",
              "ACCEPTED",
              "REJECTED",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-4">Role</th>
                <th>Stage</th>
                <th>Priority</th>
                <th>Applied</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {d.jobs.map((j) => (
                <tr className="border-t border-slate-100" key={j._id}>
                  <td className="p-4">
                    <p className="font-semibold">{j.title}</p>
                    <p className="text-xs text-slate-500">
                      {j.company} · {j.location || "No location"}
                    </p>
                  </td>
                  <td>
                    <StatusBadge status={j.status} />
                  </td>
                  <td>{j.priority}</td>
                  <td>
                    {j.appliedDate
                      ? new Date(j.appliedDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <Link aria-label={`View details for ${j.title}`} href={`/jobs/${j._id}`} className="text-slate-500 transition hover:text-blue-600 dark:text-slate-300">
                        <Eye size={18} />
                      </Link>
                      <button aria-label={`Delete ${j.title}`} onClick={() => setJobToDelete(j)} className="text-red-500 transition hover:text-red-700">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 p-4 md:hidden">
          {d.jobs.map((j) => (
            <article key={j._id} className="rounded-xl border border-slate-100 p-4">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-semibold">{j.title}</p>
                  <p className="text-sm text-slate-500">{j.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={j.status} />
                  <Link aria-label={`View details for ${j.title}`} href={`/jobs/${j._id}`} className="text-slate-500 hover:text-blue-600 dark:text-slate-300"><Eye size={18} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!d.jobs.length && (
          <div className="p-12 text-center text-sm text-slate-500">
            No jobs found. Add your first opportunity.
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-100 p-4 text-sm">
          <span>{d.pagination.total || 0} total</span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="btn btn-secondary p-2"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              disabled={page >= d.pagination.pages}
              onClick={() => setPage(page + 1)}
              className="btn btn-secondary p-2"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(jobToDelete)}
        title="Delete this job?"
        description={`This will permanently remove ${jobToDelete?.title || "this job"} from your tracker. This action cannot be undone.`}
        confirmLabel="Delete job"
        onClose={() => setJobToDelete(null)}
        onConfirm={() => del(jobToDelete._id)}
      />
    </AppShell>
  );
}
