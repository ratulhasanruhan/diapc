import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aws.diapc.dev"),
  title: {
    default: "AWS Student Builder Group · DIA",
    template: "%s | AWS SBG · DIA"
  },
  description:
    "Student-led AWS cloud community at Daffodil International Academy. Learn by building: foundations, hands-on workshops, and certification circles.",
  openGraph: {
    title: "AWS Student Builder Group · DIA",
    description:
      "Learn AWS by building. Workshops, study circles, and projects at DIA.",
    url: "https://aws.diapc.dev",
    siteName: "AWS SBG · DIA",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AWS SBG at DIA" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Builder Group · DIA",
    description:
      "Learn AWS by building. Workshops, study circles, and projects at DIA.",
    images: ["/og.png"]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <Navbar />
        <div className="relative z-10 pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
