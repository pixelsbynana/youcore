import { QUESTIONS, type Question } from "@/data/questions";

const MIN_QUESTIONS = 12;
const MAX_QUESTIONS = 15;

/** Randomly samples 12–15 questions for a fresh quiz run. Not deterministic
 * by design — it's the *scoring* of whatever gets picked that has to be
 * deterministic, not the picking itself. */
export function pickQuizQuestions(): Question[] {
  const count = MIN_QUESTIONS + Math.floor(Math.random() * (MAX_QUESTIONS - MIN_QUESTIONS + 1));
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map(QUESTIONS.map((q) => [q.id, q]));
  return ids.map((id) => map.get(id)).filter((q): q is Question => Boolean(q));
}
