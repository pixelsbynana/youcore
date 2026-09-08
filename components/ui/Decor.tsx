"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Soft blurred colour field used behind hero/result content. Purely decorative. */
export function Blob({
  className,
  color = "blush",
  size = 260,
  delay = 0,
  reverse = false,
}: {
  className?: string;
  color?: "blush" | "pink" | "lavender";
  size?: number;
  delay?: number;
  reverse?: boolean;
}) {
  const colorMap = {
    blush: "bg-blush",
    pink: "bg-pink/70",
    lavender: "bg-lavender",
  } as const;

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", colorMap[color], className)}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.6, scale: 1, y: reverse ? [0, 14, 0] : [0, -14, 0] }}
      transition={{
        opacity: { duration: 1.2, delay },
        scale: { duration: 1.2, delay },
        y: { duration: reverse ? 8 : 7, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

/** A small floating emoji/text chip, e.g. sprinkled around a result card. */
export function FloatingChip({
  children,
  className,
  delay = 0,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none rounded-2xl bg-offwhite/90 px-3 py-2 text-sm shadow-[0_8px_24px_-8px_rgba(51,42,39,0.25)] ring-1 ring-brown/5",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: reverse ? [0, 10, 0] : [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: { duration: reverse ? 6 : 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}
