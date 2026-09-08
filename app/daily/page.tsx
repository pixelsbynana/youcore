"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { DAILY_PROMPTS, type DailyPrompt } from "@/data/daily";
import { dayOfYearIndex } from "@/lib/insights";

export default function DailyPage() {
  const [prompt, setPrompt] = useState<DailyPrompt | null>(null);
  const [answered, setAnswered] = useState<string | null>(null);

  // Resolved after mount so server and client always agree on "today".
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrompt(DAILY_PROMPTS[dayOfYearIndex(DAILY_PROMPTS.length)]);
  }, []);

  if (!prompt) {
    return (
      <main className="flex min-h-svh items-center justify-center px-6 text-center">
        <p className="font-serif text-xl text-brown">Loading today’s question…</p>
      </main>
    );
  }

  const response = prompt.answers.find((a) => a.id === answered)?.response;

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col px-6 py-7 sm:max-w-xl">
      <Link href="/" className="font-serif text-lg text-brown">
        You Core
      </Link>

      <div className="flex flex-1 flex-col justify-center py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-deep">Today’s question 👀</p>
        <h1 className="mt-3 text-balance font-serif text-3xl leading-[1.15] text-brown sm:text-4xl">
          {prompt.prompt}
        </h1>

        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8 flex flex-col gap-3"
            >
              {prompt.answers.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAnswered(a.id)}
                  className="rounded-2xl border border-brown/10 bg-offwhite px-5 py-4 text-left text-[16px] text-brown transition-colors hover:border-brown/25 hover:bg-white"
                >
                  {a.text}
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-[24px] bg-brown px-6 py-7 text-offwhite sm:px-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blush">Our take</p>
              <p className="mt-2 text-balance font-serif text-xl leading-snug sm:text-2xl">{response}</p>
              <div className="mt-6">
                <LinkButton href="/quiz" variant="secondary" className="bg-offwhite text-brown">
                  Take the full quiz
                  <ArrowRight size={16} strokeWidth={2.5} />
                </LinkButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
