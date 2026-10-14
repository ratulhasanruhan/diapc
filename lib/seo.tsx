import type { Metadata } from "next";
import { site } from "@/content/site";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: site.fullName };

/** Per-page metadata with matching canonical, Open Graph and Twitter tags. */
export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} | DPC` : `${site.fullName} | ${site.tagline}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.fullName, locale: "en_US", url: path, title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] }
  };
}

export function JsonLd({ data }: { data: unknown }) {
  if (Array.isArray(data) && data.length === 0) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
