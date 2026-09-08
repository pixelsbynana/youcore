"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#D9A6A1", "#DDD6F3", "#332A27", "#F3D9D7", "#C4837D"];

interface Piece {
  x: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
  size: number;
  drift: number;
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 100,
    delay: Math.random() * 0.35,
    duration: 1.6 + Math.random() * 1.1,
    rotate: (Math.random() - 0.5) * 480,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 7,
    drift: (Math.random() - 0.5) * 80,
  }));
}

/** A single gentle confetti burst, fired once on mount. Not a loop — this is
 * a "the result is ready" celebration, not a background animation.
 *
 * The random piece layout is generated in an effect (not during render) so
 * the component stays pure — the burst simply appears a frame after mount,
 * which is imperceptible for a celebratory flourish like this. */
export function Confetti({ count = 26 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot random burst, deferred to avoid SSR/client mismatch
    setPieces(makePieces(count));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible" aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block rounded-sm"
          style={{ left: `${p.x}%`, width: p.size, height: p.size * 0.4, background: p.color }}
          initial={{ y: -10, opacity: 0, rotate: 0 }}
          animate={{ y: 340, opacity: [0, 1, 1, 0], x: p.drift, rotate: p.rotate }}
          transition={{ delay: p.delay, duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
