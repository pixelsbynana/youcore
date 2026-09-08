import type { TraitScores } from "@/data/traits";
import type { AnswerMap } from "./scoring";

const RESULT_KEY = "youcore:result:v1";

export interface StoredResult {
  questionIds: string[];
  answers: AnswerMap;
  scores: TraitScores;
  archetypeId: string;
  createdAt: number;
}

export function saveResult(result: StoredResult) {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
  } catch {
    // localStorage unavailable (private mode, SSR, etc). Fail silently —
    // the result still renders for this session, it just won't persist.
  }
}

export function loadResult(): StoredResult | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredResult;
  } catch {
    return null;
  }
}

export function clearResult() {
  try {
    localStorage.removeItem(RESULT_KEY);
  } catch {
    // ignore
  }
}
