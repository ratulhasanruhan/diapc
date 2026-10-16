import { site } from "@/content/site";
import { faqs } from "@/content/faq";
import { wings } from "@/content/wings";
import { committee } from "@/content/committee";

/** /llms.txt: a concise, factual summary for AI assistants and answer engines (https://llmstxt.org). */
export function GET() {
  const advisor = committee.find((m) => m.group === "advisor");
  const president = committee.find((m) => m.group === "president");
  const convener = committee.find((m) => m.group === "convener");
  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${site.description}`,
    "",
    "## Facts",
    `- Name: ${site.name} (${site.shortName}); motto: ${site.tagline}`,
    `- Founded: ${site.foundingDateLabel} at ${site.institution}, ${site.location}`,
    "- Type: student-led, non-profit, non-political programming and technology club",
    ...(advisor ? [`- Advisor: ${advisor.name} (${advisor.role})`] : []),
    ...(president ? [`- President: ${president.name}`] : []),
    ...(convener ? [`- Convener: ${convener.name}`] : []),
    `- Contact: ${site.email}; Facebook: ${site.facebook}`,
    `- Active wings: ${wings.filter((w) => w.status === "active").map((w) => w.name).join(", ")}. AWS Student Builders Group at DIA: ${site.awsSbg}; Meetup: ${site.meetup}`,
    "",
    "## Pages",
    `- [Home](${site.url}/): overview, upcoming events, committee`,
    `- [About](${site.url}/about): story, pillars (Code, Create, Connect) and FAQ`,
    `- [Events](${site.url}/events): upcoming events (including AWS SBG Meetup events) and the past-event archive`,
    `- [Gallery](${site.url}/gallery): photos from past events`,
    `- [Committee](${site.url}/committee): advisor, president, convener and executive members`,
    `- [Wings](${site.url}/wings): sub-communities of DPC`,
    `- [Achievements](${site.url}/achievements): contest results and recognitions`,
    `- [Projects](${site.url}/projects): projects built by members`,
    `- [Join](${site.url}/join): membership application`,
    `- [Collaborate](${site.url}/collaborate): partnership requests`,
    `- [Constitution](${site.url}/constitution): how the club is run`,
    `- [Contact](${site.url}/contact): get in touch`,
    `- [Media kit](${site.url}/media-kit): logos, brand colours and boilerplate text`,
    "",
    "## Wings",
    ...wings.map((w) => `- ${w.name} (${w.status}): ${w.description}`),
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`**${f.q}**`, f.a, ""])
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
