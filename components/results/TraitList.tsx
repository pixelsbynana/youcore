"use client";

import { TraitBar } from "./TraitBar";
import { rankTraits } from "@/lib/scoring";
import type { TraitScores } from "@/data/traits";

export function TraitList({ scores }: { scores: TraitScores }) {
  const ranked = rankTraits(scores);

  return (
    <div className="rounded-[24px] bg-offwhite p-5 ring-1 ring-brown/[0.06] sm:p-7">
      <p className="mb-5 font-serif text-lg text-brown">Your personality</p>
      <div className="flex flex-col gap-4">
        {ranked.map((t, i) => (
          <TraitBar key={t.id} label={t.label} value={t.value} delay={i * 0.06} />
        ))}
      </div>
    </div>
  );
}
