export default function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative border-b border-line bg-paper px-6 pb-16 pt-36 sm:pt-44">
      <div className="paper-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl text-ink sm:text-7xl">{title}<span className="text-brand-magenta">.</span></h1>
        {intro && <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
