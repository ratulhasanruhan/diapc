import { NextResponse } from "next/server";
import { clientIp, insertRow, ipHash, notify, spamCheck, storageConfigured } from "@/lib/server/forms";

/** Join / Contact / Collaborate forms -> Supabase tables (server-side insert only). */
const FORMS = {
  join: { table: "applications", label: "membership application" },
  contact: { table: "contacts", label: "contact message" },
  collaborate: { table: "collaborations", label: "collaboration request" }
} as const;

const MAX_FIELDS = 40;
const MAX_STR = 4000;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Keep only plain string / boolean / number / string[] values, trimmed and length-capped. */
function clean(input: unknown): Record<string, unknown> | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input).slice(0, MAX_FIELDS)) {
    if (!/^[a-zA-Z0-9_]{1,40}$/.test(k)) continue;
    if (typeof v === "string") out[k] = v.trim().slice(0, MAX_STR);
    else if (typeof v === "boolean" || (typeof v === "number" && Number.isFinite(v))) out[k] = v;
    else if (Array.isArray(v)) out[k] = v.filter((x) => typeof x === "string").slice(0, 30).map((x: string) => x.slice(0, 200));
  }
  return out;
}

export async function POST(req: Request, { params }: { params: Promise<{ form: string }> }) {
  const { form } = await params;
  const cfg = FORMS[form as keyof typeof FORMS];
  if (!cfg) return NextResponse.json({ ok: false, error: "Unknown form." }, { status: 404 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  const ip = clientIp(req);
  const spam = spamCheck(body, ip);
  if (spam?.silent) return NextResponse.json({ ok: true });
  if (spam) return NextResponse.json({ ok: false, error: spam.error }, { status: spam.status });

  const data = clean(body.data);
  if (!data) return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  const email = typeof data.email === "string" ? data.email : "";
  if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  if (JSON.stringify(data).length > 20_000) return NextResponse.json({ ok: false, error: "Form is too long." }, { status: 413 });

  if (!storageConfigured()) return NextResponse.json({ ok: false, error: "The form isn't switched on yet. Please email hi@diapc.dev." }, { status: 503 });
  try {
    await insertRow(cfg.table, { payload: data, email, ip_hash: ipHash(ip) });
  } catch (err) {
    console.error(`[forms/${form}]`, err);
    return NextResponse.json({ ok: false, error: "We couldn't send that right now. Please try again later or email hi@diapc.dev." }, { status: 503 });
  }
  await notify({ subject: `[DPC] New ${cfg.label}`, intro: `A new <b>${cfg.label}</b> arrived on diapc.dev (Supabase table <code>${cfg.table}</code>).`, data, replyTo: email });
  return NextResponse.json({ ok: true });
}
