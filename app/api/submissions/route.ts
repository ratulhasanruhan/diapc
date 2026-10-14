import { NextResponse } from "next/server";
import { validateSubmission } from "@/lib/submissions";
import { clientIp, insertRow, ipHash, notify, spamCheck, storageConfigured } from "@/lib/server/forms";

/**
 * Member submissions (projects / achievements) -> Supabase table `submissions` with status "pending".
 * Nothing is published automatically; an admin reviews rows and copies approved ones into content/*.ts.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  const ip = clientIp(req);
  const spam = spamCheck(body, ip);
  if (spam?.silent) return NextResponse.json({ ok: true });
  if (spam) return NextResponse.json({ ok: false, error: spam.error }, { status: spam.status });

  const v = validateSubmission(body);
  if (!v.ok) return NextResponse.json({ ok: false, errors: v.errors }, { status: 422 });

  if (!storageConfigured()) {
    return NextResponse.json({ ok: false, error: "Online submissions aren't switched on yet. Please email your details to hi@diapc.dev." }, { status: 503 });
  }
  const { email, ...payload } = v.value.data;
  try {
    await insertRow("submissions", { type: v.value.kind, payload, submitter_email: String(email), status: "pending", ip_hash: ipHash(ip) });
  } catch (err) {
    console.error("[submissions]", err);
    return NextResponse.json({ ok: false, error: "We couldn't save your submission right now. Please try again later or email hi@diapc.dev." }, { status: 503 });
  }
  await notify({
    subject: `[DPC] New ${v.value.kind} submission (pending): ${String(payload.title ?? "")}`,
    intro: `A new <b>${v.value.kind}</b> was submitted on diapc.dev and is <b>pending review</b> in Supabase (table <code>submissions</code>).`,
    data: { ...payload, submitter_email: email },
    replyTo: String(email)
  });
  return NextResponse.json({ ok: true });
}
