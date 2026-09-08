"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Check, Skull, Flame, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { Blob } from "@/components/ui/Decor";
import { loadResult, type StoredResult } from "@/lib/storage";
import { encodeResult, decodeResult } from "@/lib/compare";
import { compatibility } from "@/lib/personality";
import { compareProfiles, type Lean } from "@/lib/insights";
import { getArchetype } from "@/data/archetypes";

export function CompareClient() {
  const searchParams = useSearchParams();
  const friendCode = searchParams.get("r");

  const [mine, setMine] = useState<StoredResult | null | "loading">("loading");
  const [copied, setCopied] = useState(false);

  // localStorage read has to happen client-side, after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMine(loadResult());
  }, []);

  if (mine === "loading") {
    return <Shell>Loading your result…</Shell>;
  }

  if (!mine) {
    return (
      <Shell>
        <p className="font-serif text-2xl text-brown">Take the quiz first</p>
        <p className="mx-auto mt-2 max-w-xs text-[15px] text-brown-soft">
          You’ll need your own You Core before you can compare with a friend.
        </p>
        <div className="mt-6 flex justify-center">
          <LinkButton href="/quiz">Discover my You Core</LinkButton>
        </div>
      </Shell>
    );
  }

  const myArchetype = getArchetype(mine.archetypeId);
  if (!myArchetype) return <Shell>Something went wrong loading your result.</Shell>;

  if (!friendCode) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const code = encodeResult({ archetypeId: mine.archetypeId, scores: mine.scores });
    const link = `${origin}/compare?r=${code}`;

    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        // clipboard unavailable
      }
    }

    return (
      <Shell>
        <p className="text-5xl">{myArchetype.emoji}</p>
        <p className="mt-3 font-serif text-2xl text-brown">Send this to a friend</p>
        <p className="mx-auto mt-2 max-w-xs text-[15px] text-brown-soft">
          They’ll need to take the quiz too — then you’ll both see how compatible you really are.
        </p>
        <div className="mx-auto mt-6 max-w-xs truncate rounded-2xl bg-offwhite px-4 py-3 text-sm text-brown-soft ring-1 ring-brown/10">
          {link}
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleCopy}>
            {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} strokeWidth={2.5} />}
            {copied ? "Copied!" : "Copy link"}
          </Button>
        </div>
      </Shell>
    );
  }

  const friend = decodeResult(friendCode);
  if (!friend) {
    return (
      <Shell>
        <p className="font-serif text-2xl text-brown">That link looks broken</p>
        <p className="mx-auto mt-2 max-w-xs text-[15px] text-brown-soft">
          Ask your friend to send you their compare link again.
        </p>
      </Shell>
    );
  }

  const friendArchetype = getArchetype(friend.archetypeId);
  if (!friendArchetype) return <Shell>Couldn’t read your friend’s result.</Shell>;

  const score = compatibility(mine.scores, friend.scores);
  const insight = compareProfiles(mine.scores, friend.scores, score);

  return (
    <Shell wide>
      <div className="relative">
        <Blob className="-top-8 left-1/2 -translate-x-1/2" color="lavender" size={220} />
        <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-pink-deep">
          You + Your Friend
        </p>
        <div className="relative mt-4 flex items-center justify-center gap-4">
          <ArchetypeChip label="You" name={myArchetype.name} emoji={myArchetype.emoji} />
          <span className="font-serif text-2xl text-brown-soft">+</span>
          <ArchetypeChip label="Them" name={friendArchetype.name} emoji={friendArchetype.emoji} />
        </div>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-8 text-center font-serif text-6xl text-brown"
        >
          {score}%
        </motion.p>
        <p className="relative text-center text-sm font-medium text-pink-deep">{insight.vibe}</p>
        <p className="relative mx-auto mt-3 max-w-sm text-balance text-center text-[15px] italic text-brown-soft">
          “{insight.summary}”
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <CompareRow icon={<Flame size={17} strokeWidth={2.5} />} label="More chaotic" lean={insight.moreChaotic} />
        <CompareRow
          icon={<CalendarX size={17} strokeWidth={2.5} />}
          label="More likely to cancel plans"
          lean={insight.moreLikelyToCancel}
        />
        <CompareRow
          icon={<Skull size={17} strokeWidth={2.5} />}
          label="Would survive a zombie apocalypse"
          lean={insight.zombieSurvivor}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <LinkButton href="/quiz" variant="secondary">
          Take the quiz yourself
        </LinkButton>
      </div>
    </Shell>
  );
}

function ArchetypeChip({ label, name, emoji }: { label: string; name: string; emoji: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-offwhite px-4 py-3 ring-1 ring-brown/10">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-brown-soft">{label}</span>
      <span className="text-2xl">{emoji}</span>
      <span className="max-w-[7rem] text-center text-xs font-medium leading-tight text-brown">{name}</span>
    </div>
  );
}

function CompareRow({ icon, label, lean }: { icon: React.ReactNode; label: string; lean: Lean }) {
  const leanText = lean === "tie" ? "Tie" : lean === "you" ? "You" : "Them";
  return (
    <div className="flex items-center justify-between rounded-2xl bg-offwhite px-5 py-4 ring-1 ring-brown/[0.06]">
      <span className="flex items-center gap-2.5 text-[15px] text-brown">
        <span className="text-pink-deep">{icon}</span>
        {label}
      </span>
      <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-brown">{leanText}</span>
    </div>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main
      className={`mx-auto flex min-h-svh ${wide ? "max-w-lg justify-start pt-10" : "max-w-sm justify-center"} flex-col px-6 pb-16 text-center sm:px-10`}
    >
      <Link href="/" className="mb-10 font-serif text-lg text-brown">
        You Core
      </Link>
      {children}
    </main>
  );
}
