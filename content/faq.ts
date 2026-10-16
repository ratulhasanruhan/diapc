import { site } from "@/content/site";
import { wings } from "@/content/wings";

const activeWings = wings.filter((w) => w.status === "active");
const activeWingNames = activeWings.map((w) => w.name).join(", ");

/**
 * Frequently asked questions. Shown on /about (with FAQPage JSON-LD) and /contact.
 * Keep every answer factual and consistent with the constitution and the rest of the site.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is DIA Programming Club (DPC)?",
    a: `DIA Programming Club (DPC) is the student-led, non-profit and non-political programming and technology community at ${site.institution}, ${site.location}. Members learn, build and compete together under the motto Code, Create, Connect.`
  },
  {
    q: "When and where was DPC founded?",
    a: `DPC was founded on ${site.foundingDateLabel} at ${site.institution} in Dhaka, Bangladesh.`
  },
  {
    q: "What does DPC do?",
    a: "DPC organizes workshops, bootcamps, contests, hackathons, seminars and study circles, helps members build real projects, and represents DIA in competitions."
  },
  {
    q: "Who can join DPC?",
    a: "Any currently enrolled DIA student can become a General Member by registering with the club and agreeing to the constitution and code of conduct. Participants from partner clubs can join specific activities as Associate Members, and former DIA students can stay connected as Alumni Members."
  },
  {
    q: "How do I join DPC?",
    a: `Fill in the membership form on the Join page (${site.url}/join). You can also email ${site.email} with any questions.`
  },
  {
    q: "Do I need programming experience?",
    a: "No. DPC is open to every skill level, and beginners are welcome."
  },
  {
    q: "Does it cost anything to take part?",
    a: "Any cost for a specific activity is announced in advance. Membership terms are set by the Executive Committee and published to members."
  },
  {
    q: "What is the AWS Student Builders Group at DIA?",
    a: `It is one of DPC's active wings: a student community for learning cloud and AI by building, part of the global AWS Builder Center network. It runs workshops and builder sessions, publishes events on Meetup, and has its own site at ${site.awsSbg}.`
  },
  {
    q: "What is a wing?",
    a: `A wing is a focused sub-community inside DPC dedicated to one domain. DPC has ${activeWings.length} active wings: ${activeWingNames}. Other wings are proposed and open for founding members.`
  },
  {
    q: "How can my organization collaborate with DPC?",
    a: `Send a collaboration request on the Collaborate page (${site.url}/collaborate). We welcome clubs, universities, companies and communities.`
  },
  {
    q: "How do I contact DPC?",
    a: `Email ${site.email}, use the contact form on ${site.url}/contact, or message DPC on Facebook at facebook.com/diadpc.`
  }
];
