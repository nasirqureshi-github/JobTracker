"use client";
import { useState } from "react";
import { api } from "../services/api";
import { STATUSES, statusLabel } from "../constants/jobs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const fields = [
  ["title", "Job title"],
  ["company", "Company"],
  ["location", "Location"],
  ["jobUrl", "Job URL"],
  ["companyUrl", "Company URL"],
  ["source", "Source"],
  ["contactName", "Contact name"],
  ["contactEmail", "Contact email"],
  ["contactPhone", "Contact phone"],
  ["salaryMin", "Salary minimum", "number"],
  ["salaryMax", "Salary maximum", "number"],
  ["appliedDate", "Applied date", "date"],
  ["interviewDate", "Interview date", "date"],
  ["followUpDate", "Follow-up date", "date"],
  ["offerDate", "Offer date", "date"],
];
export default function JobForm({ job }) {
  const r = useRouter();
  const [form, setForm] = useState(
    job
      ? {
          ...job,
          tags: job.tags?.join(", "),
          ...Object.fromEntries(
            ["appliedDate", "interviewDate", "followUpDate", "offerDate"].map(
              (k) => [k, job[k]?.slice(0, 10) || ""],
            ),
          ),
        }
      : {
          status: "SAVED",
          priority: "MEDIUM",
          remoteType: "HYBRID",
          employmentType: "FULL_TIME",
          currency: "USD",
          source: "LinkedIn",
        },
  );
  const change = (k, v) => setForm({ ...form, [k]: v });
  const submit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        ...form,
        tags:
          typeof form.tags === "string"
            ? form.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : form.tags,
      };
      await api(job ? `/jobs/${job._id}` : "/jobs", {
        method: job ? "PUT" : "POST",
        body: JSON.stringify(data),
      });
      toast.success(job ? "Job updated" : "Job added");
      r.push("/jobs");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="card p-5">
        <h2 className="font-bold">Job information</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.slice(0, 5).map(([k, l, t]) => (
            <Input
              key={k}
              label={l}
              type={t}
              value={form[k] || ""}
              onChange={(v) => change(k, v)}
              required={["title", "company"].includes(k)}
            />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Select
            label="Remote type"
            value={form.remoteType}
            onChange={(v) => change("remoteType", v)}
            options={["ONSITE", "HYBRID", "REMOTE"]}
          />
          <Select
            label="Employment type"
            value={form.employmentType}
            onChange={(v) => change("employmentType", v)}
            options={[
              "FULL_TIME",
              "PART_TIME",
              "CONTRACT",
              "INTERNSHIP",
              "FREELANCE",
            ]}
          />
        </div>
      </section>
      <section className="card p-5">
        <h2 className="font-bold">Application & compensation</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Select
            label="Status"
            value={form.status}
            onChange={(v) => change("status", v)}
            options={STATUSES}
          />
          <Select
            label="Priority"
            value={form.priority}
            onChange={(v) => change("priority", v)}
            options={["LOW", "MEDIUM", "HIGH"]}
          />
          <Input
            label="Source"
            value={form.source || ""}
            onChange={(v) => change("source", v)}
          />
          {fields.slice(10, 15).map(([k, l, t]) => (
            <Input
              key={k}
              label={l}
              type={t}
              value={form[k] || ""}
              onChange={(v) => change(k, v)}
            />
          ))}
        </div>
      </section>
      <section className="card p-5">
        <h2 className="font-bold">Contact & notes</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.slice(6, 9).map(([k, l, t]) => (
            <Input
              key={k}
              label={l}
              type={t}
              value={form[k] || ""}
              onChange={(v) => change(k, v)}
            />
          ))}
        </div>
        <div className="mt-4">
          <Input
            label="Tags (comma separated)"
            value={form.tags || ""}
            onChange={(v) => change("tags", v)}
          />
        </div>
        <div className="mt-4">
          <label className="label">Description</label>
          <textarea
            className="input min-h-24"
            value={form.description || ""}
            onChange={(e) => change("description", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="label">Private notes</label>
          <textarea
            className="input min-h-24"
            value={form.notes || ""}
            onChange={(e) => change("notes", e.target.value)}
          />
        </div>
      </section>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => r.back()}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button className="btn btn-primary">
          {job ? "Save changes" : "Add job"}
        </button>
      </div>
    </form>
  );
}
function Input({ label, type = "text", value, onChange, required }) {
  return (
    <label>
      <span className="label">{label}</span>
      <input
        required={required}
        className="input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <label>
      <span className="label">{label}</span>
      <select
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((x) => (
          <option key={x} value={x}>{statusLabel(x)}</option>
        ))}
      </select>
    </label>
  );
}
