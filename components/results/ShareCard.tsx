"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Archetype } from "@/data/archetypes";
import type { TraitScores } from "@/data/traits";
import { rankTraits } from "@/lib/scoring";

export function ShareCard({
  archetype,
  scores,
  shareUrl,
}: {
  archetype: Archetype;
  scores: TraitScores;
  shareUrl: string;
}) {
  const [copied, setCopied] = useState(false);
  const top3 = rankTraits(scores).slice(0, 3);

  const shareText = `✨ YOU CORE\n\n${archetype.name.toUpperCase()} ${archetype.emoji}\n\n${top3
    .map((t) => `${t.value}% ${t.label}`)
    .join("\n")}\n\n"${archetype.weNoticed(scores)}"\n\nFind your You Core →`;

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "You Core", text: shareText, url: shareUrl });
        return;
      } catch {
        // cancelled or unsupported mid-flight — fall back to copy
      }
    }
    handleCopy();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard unavailable — nothing more we can do
    }
  }

  return (
    <div>
      <div className="mx-auto aspect-[9/16] max-w-[260px] overflow-hidden rounded-[26px] bg-gradient-to-b from-blush to-cream p-6 shadow-[0_24px_50px_-16px_rgba(51,42,39,0.35)] ring-1 ring-brown/10 sm:max-w-[280px]">
        <div className="grain flex h-full flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brown/60">You Core</p>
          <p className="mt-6 font-serif text-2xl leading-tight text-brown">{archetype.name}</p>
          <p className="text-3xl">{archetype.emoji}</p>

          <div className="mt-6 space-y-3">
            {top3.map((t) => (
              <div key={t.id}>
                <div className="flex justify-between text-[11px] font-medium text-brown/70">
                  <span>{t.label}</span>
                  <span>{t.value}%</span>
                </div>
                <div className="mt-1 h-[5px] w-full rounded-full bg-brown/10">
                  <div className="h-full rounded-full bg-pink-deep" style={{ width: `${t.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 flex-1 text-[13px] italic leading-snug text-brown/80">
            “{archetype.weNoticed(scores)}”
          </p>

          <div className="mt-4 border-t border-brown/10 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pink-deep">Take the quiz →</p>
            <p className="text-[10px] text-brown/50">You Core</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-brown-soft">📸 Screenshot this to post it, or share it directly</p>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleShare}>
          {copied ? <Check size={16} strokeWidth={2.5} /> : <Share2 size={16} strokeWidth={2.5} />}
          {copied ? "Copied!" : "Share my You Core"}
        </Button>
      </div>
    </div>
  );
}
