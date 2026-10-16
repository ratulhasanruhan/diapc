import PageHero from "@/components/sections/PageHero";
import { pageMeta, JsonLd } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { articles, preamble, constitutionMeta } from "@/content/constitution";

export const metadata = pageMeta({
  title: "Constitution",
  description: "Constitution of DIA Programming Club - DPC (founded 21 June 2015): name, aims, membership, structure, wings, elections, conduct and amendments.",
  path: "/constitution"
});

export default function ConstitutionPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Constitution", path: "/constitution" }])} />
      <PageHero eyebrow="Governance" title="Constitution" intro={`The governing document of ${site.fullName}. ${site.tagline}.`}>
        <p className="mt-3 font-mono text-xs text-muted">Founded {site.foundingDateLabel} · Last updated {constitutionMeta.lastUpdated}</p>
      </PageHero>
      <div className="section grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Articles" className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">Contents</p>
          <ol className="space-y-1.5 text-sm">
            <li><a href="#preamble" className="text-muted hover:text-brand-blue">Preamble</a></li>
            {articles.map((a, i) => (
              <li key={a.id}><a href={`#${a.id}`} className="text-muted hover:text-brand-blue"><span className="font-mono text-xs text-brand-blue">{i + 1}.</span> {a.title}</a></li>
            ))}
          </ol>
        </nav>
        <article className="max-w-3xl">
          <section id="preamble" className="card scroll-mt-28 p-7">
            <h2 className="text-2xl text-ink">Preamble</h2>
            <p className="mt-3 leading-7 text-muted">{preamble}</p>
          </section>
          {articles.map((a, i) => (
            <section key={a.id} id={a.id} className="scroll-mt-28 border-b border-line py-9">
              <h2 className="text-2xl text-ink"><span className="font-mono text-base text-brand-blue">Article {i + 1}.</span> {a.title}</h2>
              <ol className="mt-4 space-y-3">
                {a.clauses.map((c, j) => (
                  <li key={j} className="flex gap-3 leading-7 text-muted"><span className="shrink-0 font-mono text-xs leading-7 text-[#5d6679]">{i + 1}.{j + 1}</span><span>{c}</span></li>
                ))}
              </ol>
            </section>
          ))}
          <p className="mt-10 font-mono text-xs text-muted">Questions or suggestions: <a className="text-brand-blue" href={`mailto:${site.email}?subject=Constitution%20feedback`}>{site.email}</a></p>
        </article>
      </div>
    </main>
  );
}
