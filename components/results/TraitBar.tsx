"use client";

import { motion } from "framer-motion";

export function TraitBar({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[15px] font-medium text-brown">{label}</span>
        <motion.span
          className="font-serif text-[15px] text-brown/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-[10px] w-full overflow-hidden rounded-full bg-brown/[0.07]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink to-pink-deep"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
