"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-[7px]" aria-label={`Question ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const state = i < current ? "done" : i === current ? "active" : "upcoming";
        return (
          <motion.span
            key={i}
            className={cn(
              "block rounded-full",
              state === "active" ? "bg-pink-deep" : state === "done" ? "bg-brown/40" : "bg-brown/15"
            )}
            initial={false}
            animate={{
              width: state === "active" ? 20 : 6,
              height: 6,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          />
        );
      })}
    </div>
  );
}
