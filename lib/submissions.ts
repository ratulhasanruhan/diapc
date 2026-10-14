/** Shared submission schema + validation (used by the form and the API route). No dependencies. */
export type SubmissionKind = "project" | "achievement";

type Field = { name: string; label: string; type: "text" | "textarea" | "url" | "email" | "date" | "list"; required?: boolean; max: number; placeholder?: string; help?: string };

export const FIELDS: Record<SubmissionKind, Field[]> = {
  project: [
    { name: "title", label: "Project title", type: "text", required: true, max: 120 },
    { name: "description", label: "Description", type: "textarea", required: true, max: 1000, help: "What it does and what problem it solves." },
    { name: "tags", label: "Tags", type: "list", max: 200, placeholder: "Next.js, Python, ML", help: "Comma-separated." },
    { name: "repo", label: "Repository URL", type: "url", max: 300, placeholder: "https://github.com/…" },
    { name: "demo", label: "Live demo URL", type: "url", max: 300, placeholder: "https://…" },
    { name: "image", label: "Screenshot / image URL", type: "url", max: 500, placeholder: "https://…", help: "A public link to an image (16:10 works best)." },
    { name: "members", label: "Team members", type: "list", required: true, max: 400, placeholder: "Full names, comma-separated" },
    { name: "email", label: "Your email", type: "email", required: true, max: 200, help: "Only used to contact you about this submission. Never published." }
  ],
  achievement: [
    { name: "title", label: "Achievement title", type: "text", required: true, max: 120 },
    { name: "result", label: "Result", type: "text", required: true, max: 80, placeholder: "Champion, 1st Runner-up, Finalist…" },
    { name: "event", label: "Contest / event", type: "text", required: true, max: 160 },
    { name: "date", label: "Date", type: "date", required: true, max: 10 },
    { name: "members", label: "Members", type: "list", required: true, max: 400, placeholder: "Full names, comma-separated" },
    { name: "link", label: "Proof / details link", type: "url", max: 300, placeholder: "Result page, certificate, news post…" },
    { name: "image", label: "Image URL", type: "url", max: 500, placeholder: "https://…" },
    { name: "email", label: "Your email", type: "email", required: true, max: 200, help: "Only used to contact you about this submission. Never published." }
  ]
};

export type CleanSubmission = { kind: SubmissionKind; data: Record<string, string | string[]> };

const isUrl = (v: string) => { try { const u = new URL(v); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; } };
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function validateSubmission(input: Record<string, unknown>): { ok: true; value: CleanSubmission } | { ok: false; errors: Record<string, string> } {
  const kind = input.kind;
  if (kind !== "project" && kind !== "achievement") return { ok: false, errors: { form: "Unknown submission type." } };
  const errors: Record<string, string> = {};
  const data: Record<string, string | string[]> = {};
  for (const f of FIELDS[kind]) {
    const raw = typeof input[f.name] === "string" ? (input[f.name] as string).trim() : "";
    if (!raw) { if (f.required) errors[f.name] = `${f.label} is required.`; continue; }
    if (raw.length > f.max) { errors[f.name] = `${f.label} is too long (max ${f.max} characters).`; continue; }
    if (f.type === "url" && !isUrl(raw)) { errors[f.name] = "Enter a full URL starting with https://"; continue; }
    if (f.type === "email" && !isEmail(raw)) { errors[f.name] = "Enter a valid email address."; continue; }
    if (f.type === "date" && (!/^\d{4}-\d{2}-\d{2}$/.test(raw) || isNaN(Date.parse(raw)))) { errors[f.name] = "Enter a valid date."; continue; }
    data[f.name] = f.type === "list" ? raw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 20) : raw;
  }
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: { kind, data } };
}
