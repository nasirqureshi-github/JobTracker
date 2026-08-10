import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardPlus,
  Clock3,
  FileCheck2,
  KanbanSquare,
  CalendarCheck,
  MessageSquareText,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserPlus,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
export default function Home() {
  return (
    <main className="landing-page min-h-screen overflow-hidden">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-sm text-white shadow-lg shadow-blue-600/30">JT</span>
          <span className="hidden sm:inline">Job<span className="text-blue-600">Tracker</span></span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link className="btn btn-secondary px-3 text-sm sm:px-4" href="/login">
            Sign in
          </Link>
          <Link className="btn btn-primary px-3 text-sm sm:px-4" href="/register">
            Get started
          </Link>
        </div>
      </header>
      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="relative z-10 animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
            <Sparkles size={15} /> Job search, organized
          </span>
          <h1 className="mt-6 max-w-2xl text-5xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Turn your job search into your next <span className="text-gradient">yes.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A focused home for every application, interview and follow-up—so the right opportunity never slips through the cracks.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/register" className="btn btn-primary btn-glow px-5 py-3">
              Build your pipeline <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="font-semibold text-slate-700 transition hover:text-blue-600">
              Sign in to your workspace
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            {[[ShieldCheck, "Private by design"], [Clock3, "Save hours every week"], [FileCheck2, "All your notes together"]].map(([Icon, text]) => (
              <span className="flex items-center gap-2" key={text}><Icon size={16} className="text-blue-600" />{text}</span>
            ))}
          </div>
        </div>
        <div className="hero-visual animate-float relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 -z-10 rounded-full bg-blue-200/50 blur-3xl" />
          <img
            className="h-[390px] w-full rounded-[2rem] object-cover shadow-2xl shadow-blue-950/20 sm:h-[480px]"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
            alt="Professionals collaborating in a bright modern office"
          />
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900 sm:-left-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">This week</p>
            <p className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">4 interviews <span className="text-blue-600 dark:text-blue-400">booked</span></p>
          </div>
          <div className="absolute -right-3 top-8 rounded-2xl bg-slate-950 p-4 text-white shadow-xl sm:-right-8">
            <p className="text-xs text-slate-400">Follow-ups due</p><p className="mt-1 text-2xl font-bold">02</p>
          </div>
        </div>
      </section>
      <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Everything in one place</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">A calmer, clearer path to the offer.</h2>
        </div>
        <div className="grid gap-5 text-left md:grid-cols-3">
          {[
            [
              KanbanSquare,
              "Visual pipeline",
              "Move opportunities from saved to offer with clarity.",
            ],
            [
              BarChart3,
              "Useful insight",
              "See what sources and stages move your search forward.",
            ],
            [
              CheckCircle2,
              "Never miss a step",
              "Keep interviews and follow-ups front and center.",
            ],
          ].map(([I, t, d]) => (
            <div className="feature-card card p-7" key={t}>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><I size={21} /></div>
              <h3 className="mt-5 text-lg font-bold">{t}</h3>
              <p className="mt-2 leading-6 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="how-it-works mx-auto max-w-7xl rounded-[2rem] px-6 py-16 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">How JobTracker works</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">From first application to your next yes.</h2>
          <p className="mt-4 leading-7 text-slate-600">A simple workflow that keeps every opportunity moving forward.</p>
        </div>
        <div className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-11 hidden h-px bg-gradient-to-r from-blue-200 via-violet-200 to-emerald-200 xl:block" />
          {[
            [UserPlus, "01", "Create your workspace", "Sign up in seconds and make one focused home for your search."],
            [ClipboardPlus, "02", "Add every opportunity", "Save the role, company, links, contacts and important notes."],
            [KanbanSquare, "03", "Move through your pipeline", "Update each application from saved to interview, offer or beyond."],
            [CalendarCheck, "04", "Stay ready for every step", "Track interview dates and follow-ups so nothing slips away."],
            [Trophy, "05", "Learn and land the role", "Use your dashboard to spot progress and focus on what works."],
          ].map(([Icon, step, title, copy]) => (
            <article className="process-card relative z-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" key={step}>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25"><Icon size={20} /></div>
                <span className="text-xs font-extrabold tracking-wider text-blue-600">{step}</span>
              </div>
              <h3 className="mt-6 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/register" className="btn btn-primary px-5 py-3">Start your journey <ArrowRight size={18} /></Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <img
            className="h-[360px] w-full rounded-[2rem] object-cover shadow-xl shadow-slate-900/10 sm:h-[430px]"
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"
            alt="A productive professional meeting"
          />
          <div className="absolute bottom-5 left-5 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold text-slate-400">FOLLOW-UP READY</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Thank-you note drafted</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Built for momentum</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Know what to do next, every day.</h2>
          <p className="mt-5 max-w-xl leading-7 text-slate-600">JobTracker puts your next best action in view. Capture details after a conversation, set a follow-up date, and keep every important decision in context.</p>
          <div className="mt-7 space-y-5">
            {[
              [CheckCircle2, "Stay one step ahead", "Set follow-ups and interview dates before you forget."],
              [MessageSquareText, "Keep the full story", "Store contacts, notes, links, compensation and role details together."],
              [BarChart3, "Learn what works", "See the sources and stages that create real progress."],
            ].map(([Icon, title, copy]) => (
              <div className="flex gap-4" key={title}>
                <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600"><Icon size={18} /></div>
                <div><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="cta-panel overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">Your career, more intentional</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">The next great opportunity starts with a clear system.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">Create your free workspace and bring calm, confidence and consistency to your search.</p>
          <Link href="/register" className="btn mt-8 bg-white px-5 py-3 font-bold text-blue-700 hover:bg-blue-50">Get started free <MoveRight size={18} /></Link>
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-slate-200 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} JobTracker. Built to help you move forward.</p>
        <div className="flex gap-5"><Link href="/login" className="hover:text-blue-600">Sign in</Link><Link href="/register" className="hover:text-blue-600">Create account</Link></div>
      </footer>
    </main>
  );
}
