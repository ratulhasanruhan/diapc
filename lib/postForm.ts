/** Client helper: posts a Join/Contact/Collaborate form to its server route with spam-guard fields. */
export async function postForm(form: "join" | "contact" | "collaborate", data: Record<string, unknown>, el?: HTMLFormElement | null) {
  const website = (el?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
  const res = await fetch(`/api/forms/${form}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ data, website, elapsed: Math.round(performance.now()) })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
}
