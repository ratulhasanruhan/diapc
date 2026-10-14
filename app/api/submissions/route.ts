import { NextResponse } from "next/server";
import { validateSubmission, type CleanSubmission } from "@/lib/submissions";

/**
 * Member submissions (projects / achievements). Nothing here is ever published automatically:
 * every submission is stored with status "pending" for an admin to review.
 *
 * Storage (whichever is configured; both if both are):
 *  1. Firestore: collection "submissions" via the REST API, using NEXT_PUBLIC_FIREBASE_PROJECT_ID + NEXT_PUBLIC_FIREBASE_API_KEY.
 *  2. Email via Resend: RESEND_API_KEY (+ optional SUBMISSIONS_EMAIL_TO, SUBMISSIONS_EMAIL_FROM).
 */

const MIN_FILL_MS = 3000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

type FsValue = { stringValue: string } | { arrayValue: { values: { stringValue: string }[] } } | { timestampValue: string };

async function saveToFirestore(sub: CleanSubmission, meta: Record<string, string>) {
  const project = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!project || !key) return null;
  const fields: Record<string, FsValue> = {
    kind: { stringValue: sub.kind },
    status: { stringValue: "pending" },
    createdAt: { timestampValue: new Date().toISOString() }
  };
  for (const [k, v] of Object.entries(sub.data)) fields[k] = Array.isArray(v) ? { arrayValue: { values: v.map((s) => ({ stringValue: s })) } } : { stringValue: v };
  for (const [k, v] of Object.entries(meta)) fields[k] = { stringValue: v };
  const res = await fetch(`https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/submissions?key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ fields })
  });
  if (!res.ok) throw new Error(`Firestore ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return true;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

async function sendEmail(sub: CleanSubmission) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const rows = Object.entries(sub.data).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#667085">${esc(k)}</td><td>${esc(Array.isArray(v) ? v.join(", ") : v)}</td></tr>`).join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.SUBMISSIONS_EMAIL_FROM ?? "DPC website <submissions@diapc.dev>",
      to: [process.env.SUBMISSIONS_EMAIL_TO ?? "hi@diapc.dev"],
      reply_to: String(sub.data.email ?? ""),
      subject: `[DPC] New ${sub.kind} submission (pending review): ${String(sub.data.title ?? "")}`,
      html: `<p>A new <b>${sub.kind}</b> was submitted on diapc.dev. Status: <b>pending</b>. It is not published until you add it to <code>content/${sub.kind === "project" ? "projects" : "achievements"}.ts</code>.</p><table>${rows}</table>`
    })
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return true;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  // Spam guards: honeypot field must be empty, and the form must not be submitted instantly.
  const startedAt = Number(body.startedAt);
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) return NextResponse.json({ ok: false, error: "That was a bit fast. Please try again." }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });

  const v = validateSubmission(body);
  if (!v.ok) return NextResponse.json({ ok: false, errors: v.errors }, { status: 422 });

  const results = await Promise.allSettled([
    saveToFirestore(v.value, { userAgent: (req.headers.get("user-agent") ?? "").slice(0, 200) }),
    sendEmail(v.value)
  ]);
  const stored = results.some((r) => r.status === "fulfilled" && r.value === true);
  results.forEach((r) => r.status === "rejected" && console.error("[submissions]", r.reason));
  if (!stored) {
    const configured = results.some((r) => r.status === "rejected");
    return NextResponse.json(
      { ok: false, error: configured ? "We couldn't save your submission right now. Please try again later or email hi@diapc.dev." : "Online submissions aren't switched on yet. Please email your details to hi@diapc.dev." },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: true });
}
