import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

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

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="starfield" aria-hidden="true" />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
