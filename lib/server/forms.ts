import "server-only";
import { createHash } from "node:crypto";

/** Server-only helpers for form storage (Supabase via PostgREST) and Resend notifications. */

const MIN_ELAPSED_MS = 3000;
const hits = new Map<string, number[]>();

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function ipHash(ip: string) {
  return createHash("sha256").update(`${ip}|${process.env.IP_HASH_SALT ?? "diapc"}`).digest("hex").slice(0, 32);
}

/** Spam guards: honeypot, minimum time on page, per-IP rate limit (best effort per instance). */
export function spamCheck(body: Record<string, unknown>, ip: string): { silent?: true; error?: string; status?: number } | null {
  if (typeof body.website === "string" && body.website.length > 0) return { silent: true };
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) return { error: "That was a bit fast. Please try again.", status: 400 };
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (recent.length > 5) return { error: "Too many submissions. Please try again in a few minutes.", status: 429 };
  return null;
}

export function storageConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function insertRow(table: string, row: Record<string, unknown>) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  const headers: Record<string, string> = { apikey: key, "content-type": "application/json", prefer: "return=minimal" };
  if (key.startsWith("eyJ")) headers.authorization = `Bearer ${key}`; // legacy JWT service_role key
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, { method: "POST", headers, body: JSON.stringify(row) });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const show = (v: unknown) => (Array.isArray(v) ? v.join(", ") : typeof v === "object" && v !== null ? JSON.stringify(v) : String(v ?? ""));

/** Sends a notification if RESEND_API_KEY is set; otherwise does nothing. Never throws. */
export async function notify({ subject, intro, data, replyTo }: { subject: string; intro: string; data: Record<string, unknown>; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const to = (process.env.SUBMISSIONS_EMAIL_TO ?? "hi@diapc.dev,1001358@daffodil.ac").split(",").map((s) => s.trim()).filter(Boolean);
  const rows = Object.entries(data).map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#667085;vertical-align:top">${esc(k)}</td><td>${esc(show(v))}</td></tr>`).join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.SUBMISSIONS_EMAIL_FROM ?? "DPC website <onboarding@resend.dev>",
        to,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        html: `<p>${intro}</p><table style="font:14px/1.5 sans-serif">${rows}</table>`
      })
    });
    if (!res.ok) console.error("[notify] Resend", res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error("[notify]", err);
  }
}
