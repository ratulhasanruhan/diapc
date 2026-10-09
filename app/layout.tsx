import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DIA Programming Club",
  description: "= new instance of future();",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-electric selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
