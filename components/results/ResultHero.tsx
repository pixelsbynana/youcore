"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Confetti } from "@/components/ui/Confetti";
import { Blob, FloatingChip } from "@/components/ui/Decor";
import type { Archetype } from "@/data/archetypes";
import type { TraitScores } from "@/data/traits";

export function ResultHero({ archetype, scores }: { archetype: Archetype; scores: TraitScores }) {
  return (
    <div className="relative pt-4 text-center">
      <Confetti />
      <Blob className="-top-6 -left-10" color="lavender" size={180} />
      <Blob className="top-8 -right-12" color="blush" size={200} delay={0.15} reverse />

      <FloatingChip className="left-0 top-2 hidden text-lg sm:block" delay={0.6}>
        😳
      </FloatingChip>
      <FloatingChip className="right-0 top-16 hidden text-lg sm:block" delay={0.8} reverse>
        ✨
      </FloatingChip>

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-pink-deep"
      >
        <Sparkles size={13} strokeWidth={2.5} />
        Your You Core
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-3 text-balance font-serif text-4xl leading-[1.1] text-brown sm:text-5xl"
      >
        {archetype.name} {archetype.emoji}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="relative mx-auto mt-4 max-w-sm text-balance text-[17px] italic leading-relaxed text-brown-soft"
      >
        “{archetype.tagline(scores)}”
      </motion.p>
    </div>
  );
}
