import { TRAITS, emptyTraitScores, type TraitScores } from "@/data/traits";
import type { Question } from "@/data/questions";

export type AnswerMap = Record<string, string>; // questionId -> answerId

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Turns raw answers into 0–100 trait percentages.
 *
 * Pure and deterministic: the same questions + answers always produce the
 * same scores, regardless of when or how many times it's called. Percentages
 * are normalised against the min/max each trait could possibly reach given
 * the exact question set the user was shown (since only 12–15 of the 26
 * questions are sampled per quiz), so a "full send" answer set always lands
 * near 100% and a "full opposite" answer set always lands near 0%.
 */
export function computeTraitScores(questions: Question[], answers: AnswerMap): TraitScores {
  const raw = emptyTraitScores();
  const min = emptyTraitScores();
  const max = emptyTraitScores();

  for (const q of questions) {
    const chosen = q.answers.find((a) => a.id === answers[q.id]);
    for (const trait of TRAITS) {
      const id = trait.id;
      const deltas = q.answers.map((a) => a.weights[id] ?? 0);
      min[id] += Math.min(...deltas);
      max[id] += Math.max(...deltas);
      raw[id] += chosen?.weights[id] ?? 0;
    }
  }

  const result = emptyTraitScores();
  for (const trait of TRAITS) {
    const id = trait.id;
    const range = max[id] - min[id];
    result[id] = range === 0 ? 50 : clamp(Math.round(((raw[id] - min[id]) / range) * 100), 0, 100);
  }
  return result;
}

export interface TraitRank {
  id: (typeof TRAITS)[number]["id"];
  label: string;
  value: number;
}

export function rankTraits(scores: TraitScores): TraitRank[] {
  return TRAITS.map((t) => ({ id: t.id, label: t.label, value: scores[t.id] }))
    .sort((a, b) => b.value - a.value);
}
