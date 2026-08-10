"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" }),
    [busy, setBusy] = useState(false),
    r = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const d = await api("/auth/login", {
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
    <Auth title="Welcome back" sub="Sign in to your workspace">
      <form onSubmit={submit} className="space-y-4">
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
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        New here?{" "}
        <Link className="font-semibold text-blue-600" href="/register">
          Create account
        </Link>
      </p>
    </Auth>
  );
}
export function Field({ label, type = "text", value, onChange }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  return (
    <label className="block">
      <span className="label">{label}</span>
      <span className="relative block">
        <input
          required
          type={isPassword && visible ? "text" : type}
          className={`input ${isPassword ? "pr-11" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-400 transition hover:text-blue-600"
            onClick={(event) => { event.preventDefault(); setVisible(!visible); }}
            type="button"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </span>
    </label>
  );
}
export function Auth({ title, sub, children }) {
  const router = useRouter();
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [router]);
  return (
    <main className="auth-page grid min-h-screen place-items-center p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) router.push("/"); }}>
      <div className="card animate-rise w-full max-w-md p-7 sm:p-9">
        <Link href="/" className="font-bold text-blue-600">
          JobTracker
        </Link>
        <h1 className="mt-8 text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{sub}</p>
        <div className="mt-7">{children}</div>
      </div>
    </main>
  );
}
