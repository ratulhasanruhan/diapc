"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FIELDS, validateSubmission, type SubmissionKind } from "@/lib/submissions";

type State = { status: "idle" | "sending" | "done" | "error"; message?: string; errors?: Record<string, string> };

const inputCls = "mt-1.5 w-full border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-blue aria-[invalid=true]:border-red-500";

export default function SubmissionForm({ kind }: { kind: SubmissionKind }) {
  const [state, setState] = useState<State>({ status: "idle" });
  const fields = FIELDS[kind];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    payload.kind = kind;
    payload.elapsed = Math.round(performance.now());
    const check = validateSubmission(payload);
    if (!check.ok) return setState({ status: "error", errors: check.errors, message: "Please fix the highlighted fields." });
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/submissions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) { form.reset(); setState({ status: "done" }); return; }
      setState({ status: "error", errors: json.errors, message: json.error ?? "Please fix the highlighted fields." });
    } catch {
      setState({ status: "error", message: "Network error. Check your connection and try again." });
    }
  }

  if (state.status === "done") {
    return (
      <div role="status" className="card p-8 text-center">
        <CheckCircle2 className="mx-auto text-[#16845b]" size={40} aria-hidden="true" />
        <h2 className="mt-4 text-2xl text-ink">Thanks! Your {kind} is in the review queue.</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">A committee member will check it before it appears on the site. We may email you if we need anything else.</p>
        <button type="button" onClick={() => setState({ status: "idle" })} className="btn-ghost mt-6">Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      {state.status === "error" && state.message && (
        <p role="alert" className="flex items-start gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />{state.message}</p>
      )}
      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const err = state.errors?.[f.name];
          const id = `f-${f.name}`;
          const common = { id, name: f.name, required: f.required, maxLength: f.max, placeholder: f.placeholder, "aria-invalid": err ? true : undefined, "aria-describedby": err ? `${id}-err` : f.help ? `${id}-help` : undefined, className: inputCls };
          return (
            <div key={f.name} className={f.type === "textarea" || f.name === "title" || f.name === "members" ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="text-sm font-semibold text-ink">{f.label}{f.required ? <span className="text-brand-magenta"> *</span> : <span className="font-normal text-muted"> (optional)</span>}</label>
              {f.type === "textarea" ? <textarea rows={4} {...common} /> : <input type={f.type === "list" ? "text" : f.type} {...common} />}
              {err ? <p id={`${id}-err`} className="mt-1 text-xs text-red-600">{err}</p> : f.help ? <p id={`${id}-help`} className="mt-1 text-xs text-muted">{f.help}</p> : null}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Submissions are reviewed by the committee before anything is published.</p>
        <button type="submit" disabled={state.status === "sending"} className="btn-primary justify-center disabled:opacity-60">
          {state.status === "sending" ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…</> : `Submit ${kind}`}
        </button>
      </div>
    </form>
  );
}
