import type { TraitScores } from "@/data/traits";

/** Deterministic index into a list, based on the current UTC calendar day —
 * so everyone gets the same "today's question" on the same day. */
export function dayOfYearIndex(length: number, date = new Date()): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const day = Math.floor(diff / 86_400_000);
  return day % length;
}

export type Lean = "you" | "them" | "tie";

export interface CompareInsight {
  compatibility: number;
  vibe: string;
  summary: string;
  moreChaotic: Lean;
  moreLikelyToCancel: Lean;
  zombieSurvivor: Lean;
}

function lean(diff: number): Lean {
  if (Math.abs(diff) < 4) return "tie";
  return diff > 0 ? "you" : "them";
}

export function compareProfiles(you: TraitScores, them: TraitScores, compatibilityScore: number): CompareInsight {
  const cancelYou = (you.homebody + you.comfort - you.social) / 2;
  const cancelThem = (them.homebody + them.comfort - them.social) / 2;
  const survivalYou = you.practicality + you.adventure - you.comfort;
  const survivalThem = them.practicality + them.adventure - them.comfort;

  let vibe: string;
  let summary: string;
  if (compatibilityScore >= 85) {
    vibe = "Scarily aligned";
    summary = "You'd finish each other's sentences, and possibly each other's snacks.";
  } else if (compatibilityScore >= 65) {
    vibe = "Genuinely great match";
    summary = "You'd have an amazing time together — until neither of you can decide where to eat.";
  } else if (compatibilityScore >= 45) {
    vibe = "Opposites, but it works";
    summary = "You balance each other out, mostly by accident.";
  } else {
    vibe = "Chaotic combination";
    summary = "Wildly different energy. Could be a great story or a great disaster. Possibly both.";
  }

  return {
    compatibility: compatibilityScore,
    vibe,
    summary,
    moreChaotic: lean(you.chaos - them.chaos),
    moreLikelyToCancel: lean(cancelYou - cancelThem),
    zombieSurvivor: lean(survivalYou - survivalThem),
  };
}
