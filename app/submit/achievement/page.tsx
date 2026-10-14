import PageHero from "@/components/sections/PageHero";
import SubmissionForm from "@/components/forms/SubmissionForm";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Submit a achievement", description: "Members can submit a achievement for review by the DIA Programming Club committee.", path: "/submit/achievement" }), robots: { index: false } };

export default function SubmitAchievementPage() {
  return (
    <main>
      <PageHero eyebrow="Member submission" title="Submit a achievement" intro="Tell us about it. The committee reviews every submission before it appears on the site." />
      <section className="section mx-auto max-w-3xl"><SubmissionForm kind="achievement" /></section>
    </main>
  );
}
