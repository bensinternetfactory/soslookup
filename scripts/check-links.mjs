#!/usr/bin/env node
// Verify every external URL in src/lib/states.ts and src/lib/professionals.ts
// resolves to a 2xx or benign 3xx. Runs in CI — fails the job with a
// human-readable report if any URL is broken.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;
const UA =
  "Mozilla/5.0 (compatible; SOSLookupLinkCheck/1.0; +https://soslookup.com)";

function extractUrls(file) {
  const src = fs.readFileSync(file, "utf8");
  const urls = new Set();
  const re = /https?:\/\/[^\s"'`<>]+/g;
  let m;
  while ((m = re.exec(src))) urls.add(m[0].replace(/[.,)]+$/, ""));
  return [...urls];
}

async function checkOne(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    // HEAD first; many gov sites reject HEAD so fall back to GET with no body read.
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctl.signal,
      headers: { "user-agent": UA, accept: "*/*" },
    });
    if (res.status === 405 || res.status === 403 || res.status >= 500) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctl.signal,
        headers: { "user-agent": UA, accept: "text/html,*/*" },
      });
      // Drain body minimally.
      try {
        await res.body?.cancel();
      } catch {}
    }
    return { url, status: res.status, finalUrl: res.url };
  } catch (err) {
    return { url, status: 0, error: err?.message ?? String(err) };
  } finally {
    clearTimeout(timer);
  }
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (true) {
        const idx = i++;
        if (idx >= items.length) return;
        results[idx] = await fn(items[idx]);
      }
    }),
  );
  return results;
}

const files = [
  path.join(ROOT, "src/lib/states.ts"),
  path.join(ROOT, "src/lib/professionals.ts"),
];

const urls = [...new Set(files.flatMap(extractUrls))].sort();
console.log(`Checking ${urls.length} URLs…\n`);

const results = await mapLimit(urls, CONCURRENCY, checkOne);

const bad = [];
const suspect = [];
for (const r of results) {
  const tag =
    r.status >= 200 && r.status < 400
      ? "ok"
      : r.status === 403 || r.status === 401 || r.status === 429
        ? "suspect"
        : "bad";
  const line = `[${String(r.status).padStart(3, " ")}] ${r.url}${
    r.finalUrl && r.finalUrl !== r.url ? ` → ${r.finalUrl}` : ""
  }${r.error ? `  (${r.error})` : ""}`;
  console.log(`${tag === "ok" ? "✓" : tag === "suspect" ? "?" : "✗"} ${line}`);
  if (tag === "bad") bad.push(line);
  if (tag === "suspect") suspect.push(line);
}

const report = [
  `Checked ${urls.length} URLs at ${new Date().toISOString()}.`,
  `OK: ${urls.length - bad.length - suspect.length}`,
  `Suspect (bot-blocked but probably fine): ${suspect.length}`,
  `Broken: ${bad.length}`,
  "",
  bad.length ? "Broken URLs:" : "",
  ...bad,
  "",
  suspect.length ? "Suspect URLs (manual review):" : "",
  ...suspect,
]
  .filter((l) => l !== "")
  .join("\n");

fs.writeFileSync(path.join(ROOT, "link-check-report.txt"), report + "\n");

console.log(
  `\nSummary: ${urls.length - bad.length - suspect.length} ok, ${suspect.length} suspect, ${bad.length} broken.`,
);

if (bad.length > 0) {
  console.error(`\n✗ ${bad.length} broken URL(s) — failing.`);
  process.exit(1);
}
console.log("\n✓ All URLs OK or benignly rate-limited.");
