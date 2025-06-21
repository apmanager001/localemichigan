import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/cities"],
      disallow: ["/comp/*", "/api/*"],
    },
    sitemap: "https://localemichigan.com/sitemap.xml",
    host: "https://localemichigan.com",
  };
}
