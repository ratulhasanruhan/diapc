import { site } from "@/content/site";
import { committee, type CommitteeMember } from "@/content/committee";
import type { EventItem } from "@/lib/events";

const ORG_ID = `${site.url}/#org`;
const AWS_ORG_ID = "https://aws.diapc.dev/#organization";
/** Shared with the awssbg site so search engines merge both into one entity. */
export const RATUL_ID = "https://aws.diapc.dev/team#ratul-hasan-ruhan";

export const personId = (m: CommitteeMember) => `${site.url}/committee#${m.id}`;

/** Ratul Hasan Ruhan: personal-branding Person entity (data only, no visible UI). */
export const ratulSameAs = [
  "https://ratuler.vercel.app",
  "https://github.com/ratulhasanruhan",
  "https://www.linkedin.com/in/ratul-hasan-ruhan/",
  "https://www.facebook.com/ratulhasan.ruhan",
  "https://appibrium.com"
];

export const ratulPersonJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": RATUL_ID,
  name: "Ratul Hasan Ruhan",
  jobTitle: "AWS Student Builders Group Leader / Software Engineer",
  description: "AWS Student Builders Group Leader at Daffodil International Academy, software engineer and founder of Appibrium.",
  image: "https://aws.diapc.dev/team/ratul-hasan-ruhan.webp",
  url: "https://ratuler.vercel.app",
  sameAs: ratulSameAs,
  memberOf: [
    { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url },
    { "@type": "Organization", "@id": AWS_ORG_ID, name: "AWS Student Builders Group at Daffodil International Academy", url: site.awsSbg }
  ],
  worksFor: { "@type": "Organization", "@id": "https://appibrium.com/#organization", name: "Appibrium", url: "https://appibrium.com", founder: { "@id": RATUL_ID } },
  affiliation: { "@type": "EducationalOrganization", name: site.institution }
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  alternateName: [site.shortName, site.fullName],
  slogan: site.tagline,
  foundingDate: site.foundingDate,
  foundingLocation: { "@type": "Place", name: `${site.institution}, ${site.location}` },
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/classic_logo.png`,
  image: `${site.url}/og.png`,
  email: site.email,
  sameAs: [site.facebook, site.meetup, site.awsSbg],
  parentOrganization: { "@type": "EducationalOrganization", name: site.institution, address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" } },
  subOrganization: { "@type": "Organization", "@id": AWS_ORG_ID, name: "AWS Student Builders Group at Daffodil International Academy", url: site.awsSbg },
  member: [{ "@type": "Person", "@id": RATUL_ID, name: "Ratul Hasan Ruhan" }, ...committee.map((m) => ({ "@type": "Person", "@id": personId(m), name: m.name }))],
  employee: committee.filter((m) => m.group === "advisor").map((m) => ({ "@type": "Person", "@id": personId(m), name: m.name })),
  contactPoint: { "@type": "ContactPoint", email: site.email, contactType: "general inquiries" }
};

export const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, name: site.fullName, url: site.url, inLanguage: "en", publisher: { "@id": ORG_ID } };

/** Person entities for the committee page. No contact details are included. */
export function committeeJsonLd(members: CommitteeMember[]) {
  return members.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(m),
    name: m.name,
    jobTitle: m.role,
    ...(m.photo ? { image: `${site.url}${m.photo}` } : {}),
    ...(m.tags?.length ? { knowsAbout: m.tags } : {}),
    memberOf: { "@id": ORG_ID }
  }));
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path === "/" ? "" : it.path}` }))
  };
}

export function eventJsonLd(e: EventItem) {
  const image = e.cover ?? e.gallery?.[0]?.src;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: e.venue === "Online" ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    location: e.venue === "Online" ? { "@type": "VirtualLocation", url: e.url ?? site.url } : { "@type": "Place", name: e.venue ?? site.institution, address: site.location },
    ...(e.description ? { description: e.description.slice(0, 300) } : {}),
    ...(image ? { image: image.startsWith("http") ? image : `${site.url}${image}` } : {}),
    ...(e.url ? { url: e.url } : {}),
    organizer: { "@type": "Organization", "@id": e.source === "meetup" ? AWS_ORG_ID : ORG_ID, name: e.source === "meetup" ? "AWS Student Builders Group at DIA" : site.name, url: e.source === "meetup" ? site.awsSbg : site.url }
  };
}