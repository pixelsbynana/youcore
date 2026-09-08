"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ExposeMe({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-[22px] border border-dashed border-brown/20 bg-transparent px-5 py-6 text-center sm:px-8">
      <AnimatePresence mode="wait" initial={false}>
        {!revealed ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-serif text-lg text-brown">Want the less flattering version?</p>
            <p className="mx-auto mt-1 max-w-xs text-sm text-brown-soft">
              We’ve been holding back. This is your last chance to say no.
            </p>
            <div className="mt-5 flex justify-center">
              <Button variant="secondary" onClick={() => setRevealed(true)}>
                <Eye size={16} strokeWidth={2.5} />
                Expose me
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-deep">
              The unfiltered version
            </p>
            <p className="mx-auto mt-3 max-w-sm text-balance font-serif text-xl leading-snug text-brown">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
