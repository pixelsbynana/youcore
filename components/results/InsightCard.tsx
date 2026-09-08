"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ACCENTS = {
  blush: "bg-blush",
  pink: "bg-pink",
  lavender: "bg-lavender",
} as const;

export function InsightCard({
  emoji,
  title,
  children,
  accent = "blush",
  delay = 0,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
  accent?: keyof typeof ACCENTS;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="overflow-hidden rounded-[22px] bg-offwhite ring-1 ring-brown/[0.06]"
    >
      <div className={cn("h-1.5 w-full", ACCENTS[accent])} />
      <div className="px-5 py-5 sm:px-6">
        <p className="flex items-center gap-2 font-serif text-lg text-brown">
          <span>{emoji}</span>
          {title}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-brown-soft">{children}</p>
      </div>
    </motion.div>
  );
}
