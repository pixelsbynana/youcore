"use client";

import { useRef, useState } from "react";
import { Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Archetype } from "@/data/archetypes";
import type { TraitScores } from "@/data/traits";
import { rankTraits } from "@/lib/scoring";
import { SITE_URL } from "@/lib/site";

type Status = "idle" | "working" | "done";

export function ShareCard({ archetype, scores }: { archetype: Archetype; scores: TraitScores }) {
  const cardRef = useRef<HTMLDivElement>(null);
  // A ref, not state, so a near-simultaneous second click (e.g. a double-tap,
  // or a duplicate event from the touch/motion layer) is blocked immediately —
  // state updates aren't synchronous, so checking `status` alone can't catch
  // two calls that both start before the first re-render lands.
  const workingRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const top3 = rankTraits(scores).slice(0, 3);
  const fileName = `you-core-${archetype.id}.png`;

  async function handleShare() {
    if (!cardRef.current || workingRef.current) return;
    workingRef.current = true;
    setStatus("working");

    try {
      // Rendering the card to an image is only needed once someone actually
      // asks for it, so it's loaded on demand instead of bundled up front.
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(cardRef.current, { pixelRatio: 4, cacheBust: true });
      if (!blob) throw new Error("Image generation failed");

      const file = new File([blob], fileName, { type: "image/png" });

      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "You Core",
            text: `I'm ${archetype.name} ${archetype.emoji} — find your You Core at ${SITE_URL}`,
          });
          setStatus("done");
        } catch (shareErr) {
          if (shareErr instanceof Error && shareErr.name === "AbortError") {
            // user closed the share sheet without picking anything
            setStatus("idle");
            return;
          }
          downloadBlob(blob, fileName);
          setStatus("done");
        }
      } else {
        downloadBlob(blob, fileName);
        setStatus("done");
      }
    } catch {
      setStatus("idle");
      return;
    } finally {
      workingRef.current = false;
    }

    setTimeout(() => setStatus("idle"), 2200);
  }

  return (
    <div>
      {/* Shadow lives on this outer wrapper, not on the captured node itself —
          html-to-image mis-measures elements that have their own box-shadow,
          producing a shifted/cropped export. */}
      <div className="mx-auto max-w-[260px] shadow-[0_24px_50px_-16px_rgba(51,42,39,0.35)] sm:max-w-[280px]">
        <div
          ref={cardRef}
          className="aspect-[9/16] overflow-hidden rounded-[26px] bg-gradient-to-b from-pink to-blush p-6 ring-1 ring-brown/15"
        >
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pink-deep">Take the quiz at</p>
              <p className="text-[11px] font-medium text-brown/70">{SITE_URL}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-brown-soft">Save this as an image and post it anywhere ✨</p>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleShare} disabled={status === "working"}>
          {status === "working" ? (
            <Loader2 size={16} strokeWidth={2.5} className="animate-spin" />
          ) : status === "done" ? (
            <Check size={16} strokeWidth={2.5} />
          ) : (
            <Share2 size={16} strokeWidth={2.5} />
          )}
          {status === "working" ? "Preparing…" : status === "done" ? "Saved!" : "Share my You Core"}
        </Button>
      </div>
    </div>
  );
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
