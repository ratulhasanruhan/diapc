import { site } from "@/content/site";
import type { EventItem } from "@/lib/events";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name,
  alternateName: [site.shortName, site.fullName],
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/classic_logo.png`,
  email: site.email,
  sameAs: [site.facebook, site.meetup],
  parentOrganization: { "@type": "EducationalOrganization", name: site.institution },
  subOrganization: { "@type": "Organization", name: "AWS Student Builders Group at Daffodil International Academy", url: site.awsSbg },
  contactPoint: { "@type": "ContactPoint", email: site.email, contactType: "general inquiries" }
};

export const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, name: site.fullName, url: site.url, publisher: { "@id": `${site.url}/#org` } };

export function eventJsonLd(e: EventItem) {
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
    ...(e.cover ? { image: e.cover.startsWith("http") ? e.cover : `${site.url}${e.cover}` } : {}),
    ...(e.url ? { url: e.url } : {}),
    organizer: { "@type": "Organization", name: e.source === "meetup" ? "AWS Student Builders Group at DIA" : site.name, url: e.source === "meetup" ? site.awsSbg : site.url }
  };
}
