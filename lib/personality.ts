import { ARCHETYPES, type Archetype } from "@/data/archetypes";
import type { TraitId, TraitScores } from "@/data/traits";

/**
 * Matches a trait profile to the closest archetype signature using cosine-ish
 * similarity: each trait score is centered to -1..1 (50% = neutral) and
 * dotted against the archetype's signature weights. Deterministic — same
 * scores always produce the same archetype.
 */
export function pickArchetype(scores: TraitScores): Archetype {
  let best = ARCHETYPES[0];
  let bestScore = -Infinity;

  for (const archetype of ARCHETYPES) {
    let dot = 0;
    for (const [trait, weight] of Object.entries(archetype.signature)) {
      const centered = (scores[trait as TraitId] - 50) / 50; // -1..1
      dot += centered * (weight ?? 0);
    }
    if (dot > bestScore) {
      bestScore = dot;
      best = archetype;
    }
  }

  return best;
}

/** Similarity between two trait profiles, 0–100. Used for "compare" compatibility. */
export function compatibility(a: TraitScores, b: TraitScores): number {
  const traits = Object.keys(a) as TraitId[];
  const totalDiff = traits.reduce((sum, t) => sum + Math.abs(a[t] - b[t]), 0);
  const maxDiff = traits.length * 100;
  return Math.round(100 - (totalDiff / maxDiff) * 100);
}
