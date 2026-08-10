"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "../../../components/AppShell";
import Page from "../../../components/Page";
import { api } from "../../../services/api";
import StatusBadge from "../../../components/StatusBadge";
import { ExternalLink, Link2 } from "lucide-react";
export default function Detail() {
  const { id } = useParams(),
    [job, setJob] = useState(null);
  const externalUrl = (url) =>
    url && (/^https?:\/\//i.test(url) ? url : `https://${url}`);
  useEffect(() => {
    api("/jobs/" + id).then((d) => setJob(d.job));
  }, [id]);
  if (!job) return <AppShell>Loading…</AppShell>;
  return (
    <AppShell>
      <Page
        title={job.title}
        subtitle={job.company}
        actions={
          <Link href={"/jobs/" + id + "/edit"} className="btn btn-primary">
            Edit job
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="card p-6 lg:col-span-2">
          <StatusBadge status={job.status} />
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            {[
              ["Location", job.location],
              ["Remote type", job.remoteType],
              ["Employment", job.employmentType],
              ["Source", job.source],
              [
                "Applied",
                job.appliedDate &&
                  new Date(job.appliedDate).toLocaleDateString(),
              ],
              [
                "Follow-up",
                job.followUpDate &&
                  new Date(job.followUpDate).toLocaleDateString(),
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-bold uppercase text-slate-400">
                  {k}
                </dt>
                <dd className="mt-1 text-sm">{v || "—"}</dd>
              </div>
            ))}
          </dl>
          {job.description && (
            <>
              <h2 className="mt-8 font-bold">Description</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
                {job.description}
              </p>
            </>
          )}
        </section>
        <aside className="card p-6">
          <h2 className="font-bold">Contact</h2>
          <p className="mt-4 text-sm">
            {job.contactName || "No contact added"}
          </p>
          <p className="text-sm text-slate-500">{job.contactEmail}</p>
          {(job.jobUrl || job.companyUrl) && (
            <div className="mt-7 border-t border-slate-100 pt-6 dark:border-slate-700">
              <h2 className="font-bold">Useful links</h2>
              <div className="mt-4 space-y-3">
                {job.jobUrl && (
                  <a className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700" href={externalUrl(job.jobUrl)} target="_blank" rel="noreferrer">
                    <Link2 size={16} /> Job posting <ExternalLink size={14} />
                  </a>
                )}
                {job.companyUrl && (
                  <a className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700" href={externalUrl(job.companyUrl)} target="_blank" rel="noreferrer">
                    <Link2 size={16} /> Company website <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          )}
          {job.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span
                  className="rounded bg-slate-100 px-2 py-1 text-xs"
                  key={t}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}
