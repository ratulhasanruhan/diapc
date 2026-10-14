import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import RoamingAstronaut from "@/components/motion/RoamingAstronaut";
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
  metadataBase: new URL("https://diapc.dev"),
  title: {
    default: "DIA Programming Club — = new instance of future();",
    template: "%s | DPC",
  },
  description:
    "A student-driven community at Daffodil International Academy where curious minds learn to code, build real projects, explore emerging technologies, and create meaningful impact.",
  keywords: [
    "DIA Programming Club",
    "DPC",
    "Daffodil International Academy",
    "programming",
    "coding club",
    "Bangladesh",
  ],
  openGraph: {
    title: "DIA Programming Club",
    description: "= new instance of future();",
    type: "website",
    url: "https://diapc.dev",
    siteName: "DIA Programming Club",
    images: [{ url: "/brand/cover.png", width: 1200, height: 630, alt: "DIA Programming Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIA Programming Club",
    description: "= new instance of future();",
    images: ["/brand/cover.png"]
  },
  alternates: {
    canonical: "https://diapc.dev"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <OrbitalBackground />
        <Navbar />
        <RoamingAstronaut />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
