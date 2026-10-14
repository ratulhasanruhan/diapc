import type { MetadataRoute } from "next";

const routes = ["", "/about", "/events", "/committee", "/achievements", "/wings", "/projects", "/gallery", "/resources", "/join", "/collaborate", "/constitution", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `https://diapc.dev${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));
}
