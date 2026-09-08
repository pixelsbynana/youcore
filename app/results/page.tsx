"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { ResultHero } from "@/components/results/ResultHero";
import { TraitList } from "@/components/results/TraitList";
import { InsightCard } from "@/components/results/InsightCard";
import { ExposeMe } from "@/components/results/ExposeMe";
import { ShareCard } from "@/components/results/ShareCard";
import { loadResult, type StoredResult } from "@/lib/storage";
import { getArchetype } from "@/data/archetypes";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null | "loading">("loading");

  // localStorage only exists on the client, so the read has to happen after
  // mount — this is a one-shot hydration, not a sync loop.
  useEffect(() => {
    const stored = loadResult();
    if (!stored) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(stored);
  }, [router]);

  if (result === "loading") return <LoadingShell />;
  if (!result) return null; // redirecting to "/"

  const archetype = getArchetype(result.archetypeId);
  if (!archetype) return <LoadingShell />;

  const { scores } = result;

  return (
    <main className="relative min-h-svh overflow-x-clip pb-20 pt-7">
      {/* Content stays column-width via this inner wrapper, but overflow-x-clip
          lives on the full-bleed <main> above — so the hero blobs (absolute
          children of ResultHero) can fade out gradually toward the viewport
          edge instead of getting hard-clipped at the narrow column's edge. */}
      <div className="relative mx-auto flex max-w-lg flex-col gap-10 px-6 sm:max-w-2xl sm:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-lg text-brown">
            You Core
          </Link>
          <Link
            href="/quiz"
            className="flex items-center gap-1.5 text-sm text-brown-soft transition-colors hover:text-brown"
          >
            <RotateCcw size={13} strokeWidth={2.5} />
            Retake
          </Link>
        </div>

        <ResultHero archetype={archetype} scores={scores} />

        <TraitList scores={scores} />

        <div className="flex flex-col gap-4">
          <InsightCard emoji="👀" title="We noticed…" accent="blush">
            {archetype.weNoticed(scores)}
          </InsightCard>
          <InsightCard emoji="🚩" title="Your toxic trait" accent="pink">
            {archetype.toxicTrait}
          </InsightCard>
          <InsightCard emoji="💚" title="Your green flag" accent="lavender">
            {archetype.greenFlag}
          </InsightCard>
          <InsightCard emoji="🎬" title="Your main-character moment" accent="blush">
            {archetype.mainCharacterMoment}
          </InsightCard>
          <InsightCard emoji="🧠" title="Your brain probably sounds like…" accent="pink">
            {archetype.brainSoundsLike}
          </InsightCard>
          <InsightCard emoji="💘" title="Your ideal person" accent="lavender">
            {archetype.idealPerson}
          </InsightCard>
          <InsightCard emoji="🫶" title="Your ideal friend" accent="blush">
            {archetype.idealFriend}
          </InsightCard>
        </div>

        <ExposeMe text={archetype.exposeMe(scores)} />

        <div>
          <p className="mb-5 text-center font-serif text-2xl text-brown">Share your You Core</p>
          <ShareCard archetype={archetype} scores={scores} />
        </div>

        <footer className="pt-2 text-center text-xs text-brown-soft/70">
          Not a licensed psychologist. Just very observant.
        </footer>
      </div>
    </main>
  );
}

function LoadingShell() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-serif text-xl text-brown">Putting together your results…</p>
    </main>
  );
}
