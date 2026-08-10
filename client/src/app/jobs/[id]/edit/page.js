"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "../../../../components/AppShell";
import Page from "../../../../components/Page";
import JobForm from "../../../../components/JobForm";
import { api } from "../../../../services/api";
export default function Edit() {
  const { id } = useParams(),
    [job, setJob] = useState(null);
  useEffect(() => {
    api("/jobs/" + id).then((d) => setJob(d.job));
  }, [id]);
  return (
    <AppShell>
      <Page title="Edit job" subtitle="Update opportunity details." />
      {job ? <JobForm job={job} /> : <p>Loading…</p>}
    </AppShell>
  );
}
