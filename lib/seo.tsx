import type { Metadata } from "next";
import { site } from "@/content/site";

const DEFAULT_OG = { url: "/og.png", width: 1200, height: 630, alt: site.fullName };

/** Per-page metadata with matching canonical, Open Graph and Twitter tags. Pass `image` for a page-specific OG image. */
export function pageMeta({ title, description, path, image }: { title?: string; description: string; path: string; image?: string }): Metadata {
  const fullTitle = title ? `${title} | DPC` : `${site.fullName} | ${site.tagline}`;
  const og = image ? { url: image, alt: title ? `${title}, ${site.name}` : site.fullName } : DEFAULT_OG;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.fullName, locale: "en_US", url: path, title: fullTitle, description, images: [og] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [og.url] }
  };
}

export function JsonLd({ data }: { data: unknown }) {
  if (Array.isArray(data) && data.length === 0) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}