// The hidden personality traits You Core measures.
// Nothing user-facing references these directly during the quiz —
// they're the invisible scaffolding behind every "how did it know me?" moment.

export const TRAITS = [
  { id: "homebody", label: "Homebody" },
  { id: "social", label: "Social Energy" },
  { id: "romanticiser", label: "Romanticiser" },
  { id: "overthinker", label: "Overthinker" },
  { id: "chaos", label: "Chaos" },
  { id: "ambition", label: "Ambition" },
  { id: "adventure", label: "Adventure" },
  { id: "peopleWatcher", label: "People Watcher" },
  { id: "comfort", label: "Comfort Seeking" },
  { id: "spontaneity", label: "Spontaneity" },
  { id: "mainCharacter", label: "Main Character Energy" },
  { id: "practicality", label: "Practicality" },
] as const;

export type TraitId = (typeof TRAITS)[number]["id"];

export type TraitScores = Record<TraitId, number>;

export type TraitWeights = Partial<Record<TraitId, number>>;

export function emptyTraitScores(fill = 0): TraitScores {
  return TRAITS.reduce((acc, t) => {
    acc[t.id] = fill;
    return acc;
  }, {} as TraitScores);
}

export function traitLabel(id: TraitId): string {
  return TRAITS.find((t) => t.id === id)?.label ?? id;
}
