import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b5bdb 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "white",
              color: "#3b5bdb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            S
          </div>
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            SOSLookup
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            Secretary of State business entity search, all 50 states.
          </div>
          <div style={{ fontSize: 28, opacity: 0.85 }}>
            Free · mobile-first · straight to the official .gov source
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
