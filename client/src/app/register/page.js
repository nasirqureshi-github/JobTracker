"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Auth, Field } from "../login/page";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" }),
    [busy, setBusy] = useState(false),
    r = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const d = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("jt_token", d.token);
      r.push("/dashboard");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Auth
      title="Create your workspace"
      sub="Take control of your job search today"
    >
      <form onSubmit={submit} className="space-y-4">
        <Field
          label="Full name"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(email) => setForm({ ...form, email })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(password) => setForm({ ...form, password })}
        />
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-semibold text-blue-600" href="/login">
          Sign in
        </Link>
      </p>
    </Auth>
  );
}
