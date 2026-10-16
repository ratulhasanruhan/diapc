import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/events", priority: 0.9, freq: "weekly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/committee", priority: 0.8, freq: "monthly" },
  { path: "/wings", priority: 0.7, freq: "monthly" },
  { path: "/achievements", priority: 0.7, freq: "monthly" },
  { path: "/projects", priority: 0.7, freq: "monthly" },
  { path: "/gallery", priority: 0.6, freq: "monthly" },
  { path: "/resources", priority: 0.5, freq: "monthly" },
  { path: "/join", priority: 0.7, freq: "monthly" },
  { path: "/collaborate", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.5, freq: "yearly" },
  { path: "/constitution", priority: 0.4, freq: "yearly" },
  { path: "/media-kit", priority: 0.4, freq: "yearly" }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-16");
  return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified, changeFrequency: r.freq, priority: r.priority }));
}