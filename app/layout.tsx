import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { site } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import OrbitalBackground from "@/components/backgrounds/OrbitalBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | ${site.tagline}`,
    template: "%s | DPC",
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: ["DIA Programming Club", "DPC", "Daffodil International Academy", "programming club", "coding club", "Dhaka", "Bangladesh", "AWS Student Builders Group"],
  openGraph: {
    title: `${site.fullName} | ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.fullName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} | ${site.tagline}`,
    description: site.description,
    images: ["/og.png"]
  },
  alternates: { canonical: "/" }
};

export const viewport = { themeColor: "#fbfaf7" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#2454d7] focus:px-4 focus:py-2 focus:font-bold focus:text-white">Skip to content</a>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }} />
        <OrbitalBackground />
        <Navbar />
        <div id="content" className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
