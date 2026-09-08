"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

export function CompareCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[24px] bg-lavender px-6 py-7 text-center sm:px-8"
    >
      <p className="font-serif text-xl text-brown">You + a friend?</p>
      <p className="mx-auto mt-2 max-w-xs text-[15px] text-brown/70">
        See how compatible you really are — and who’s more likely to cancel plans.
      </p>
      <div className="mt-5 flex justify-center">
        <LinkButton href="/compare" variant="secondary" className="bg-offwhite">
          <Users size={16} strokeWidth={2.5} />
          Compare with a friend
        </LinkButton>
      </div>
    </motion.div>
  );
}
