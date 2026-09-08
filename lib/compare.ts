import type { TraitScores } from "@/data/traits";

export interface ShareableResult {
  archetypeId: string;
  scores: TraitScores;
}

/** Packs a result into a compact, URL-safe string — no backend needed for
 * the "compare with a friend" link. */
export function encodeResult(result: ShareableResult): string {
  const json = JSON.stringify(result);
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(json, "utf-8").toString("base64")
      : btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeResult(code: string): ShareableResult | null {
  try {
    const base64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json =
      typeof window === "undefined"
        ? Buffer.from(padded, "base64").toString("utf-8")
        : decodeURIComponent(escape(atob(padded)));
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed.archetypeId !== "string" || !parsed.scores) return null;
    return parsed as ShareableResult;
  } catch {
    return null;
  }
}
