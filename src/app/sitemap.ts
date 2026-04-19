import type { MetadataRoute } from "next";
import { BIDS, MEETINGS, REPRESENTATIVES, VENDORS, WARDS } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/meetings`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/representatives`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/bids`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/vendors`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/wards`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/budget`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/map`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
  const meetings = MEETINGS.map((m) => ({ url: `${siteConfig.url}/meetings/${m.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 }));
  const reps = REPRESENTATIVES.map((r) => ({ url: `${siteConfig.url}/representatives/${r.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));
  const bids = BIDS.map((b) => ({ url: `${siteConfig.url}/bids/${b.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 }));
  const vendors = VENDORS.map((v) => ({ url: `${siteConfig.url}/vendors/${v.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 }));
  const wards = WARDS.map((w) => ({ url: `${siteConfig.url}/wards/${w.number}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...base, ...meetings, ...reps, ...bids, ...vendors, ...wards];
}
