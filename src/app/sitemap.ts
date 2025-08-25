import { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

type ItemWithSlug = {
  name?: string;
  slug?: string;
};

function readJsonArraySafe<T>(p: string): T[] {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as T[];
  } catch {
    return [] as T[];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const root = process.cwd();
  const lakesPath = path.join(root, "public", "data", "lakes.json");
  const lightsPath = path.join(root, "public", "data", "lighthouse.json");
  const parksPath = path.join(root, "public", "data", "park.json");
  const museumsPath = path.join(root, "public", "data", "museum.json");
  const citiesPath = path.join(root, "public", "data", "cities.json");
  const golfCoursesPath = path.join(root, "public", "data", "golfCourse.json");

  const base = "https://localemichigan.com";
  const now = new Date();

  const lakes = readJsonArraySafe<ItemWithSlug>(lakesPath).slice(0, 5000);
  const lighthouses = readJsonArraySafe<ItemWithSlug>(lightsPath).slice(
    0,
    5000
  );
  const parks = readJsonArraySafe<ItemWithSlug>(parksPath).slice(0, 5000);
  const museums = readJsonArraySafe<ItemWithSlug>(museumsPath).slice(0, 5000);
  const cities = readJsonArraySafe<ItemWithSlug>(citiesPath).slice(0, 5000);
  const golfCourses = readJsonArraySafe<ItemWithSlug>(golfCoursesPath).slice(
    0,
    5000
  );

  const normalizeSlug = (raw?: string) =>
    (raw || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/g, "_")
      .replace(/^_+|_+$/g, "");
  const toSlug = (name?: string, slug?: string) => {
    const candidate = slug && slug.length > 0 ? slug : name || "";
    return normalizeSlug(candidate);
  };

  const urlJoin = (baseUrl: string, ...segments: string[]) =>
    [
      baseUrl.replace(/\/+$/g, ""),
      ...segments.map((s) => encodeURIComponent(s)),
    ].join("/");

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/cities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/lakes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/lighthouses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/parks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/museum`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/golf-courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/events`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  lakes.forEach((it) => {
    const slug = toSlug(it.name, it.slug);
    if (!slug) return;
    urls.push({
      url: urlJoin(base, "lakes", slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });
  lighthouses.forEach((it) => {
    const slug = toSlug(it.name, it.slug);
    if (!slug) return;
    urls.push({
      url: urlJoin(base, "lighthouses", slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });
  parks.forEach((it) => {
    const slug = toSlug(it.name, it.slug);
    if (!slug) return;
    urls.push({
      url: urlJoin(base, "parks", slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });
  museums.forEach((it) => {
    const slug = toSlug(it.name, it.slug);
    if (!slug) return;
    urls.push({
      url: urlJoin(base, "museum", slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Golf courses dynamic pages
  golfCourses.forEach((it) => {
    const slug = toSlug(it.name, it.slug);
    if (!slug) return;
    urls.push({
      url: urlJoin(base, "golf-courses", slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Cities dynamic pages
  cities.forEach((it) => {
    const slug = toSlug(it.name, it.slug);
    if (!slug) return;
    urls.push({
      url: urlJoin(base, "cities", slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // News dynamic pages (if you have IDs in data, add them here). Placeholder: skip if no dataset

  return urls;
}
