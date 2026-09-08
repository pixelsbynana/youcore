"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnswerButton({
  text,
  selected,
  faded,
  onClick,
}: {
  text: string;
  selected: boolean;
  faded: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={faded}
      whileHover={faded ? undefined : { scale: 1.015, x: 2 }}
      whileTap={faded ? undefined : { scale: 0.98 }}
      animate={{ opacity: faded && !selected ? 0.4 : 1, scale: faded && !selected ? 0.98 : 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-[16px] leading-snug transition-colors",
        selected
          ? "border-pink-deep bg-blush text-brown"
          : "border-brown/10 bg-offwhite text-brown hover:border-brown/25 hover:bg-white"
      )}
    >
      <span>{text}</span>
      <motion.span
        initial={false}
        animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-deep text-offwhite"
      >
        <Check size={14} strokeWidth={3} />
      </motion.span>
    </motion.button>
  );
}
