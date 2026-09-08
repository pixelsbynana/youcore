"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { Blob, FloatingChip } from "@/components/ui/Decor";
import { ARCHETYPES } from "@/data/archetypes";
import { DAILY_PROMPTS } from "@/data/daily";
import { dayOfYearIndex } from "@/lib/insights";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function Landing() {
  const todayPrompt = DAILY_PROMPTS[dayOfYearIndex(DAILY_PROMPTS.length)];

  return (
    <main className="relative mx-auto flex min-h-svh max-w-lg flex-col overflow-x-clip px-6 pb-16 pt-8 sm:max-w-2xl sm:px-10">
      {/* nav */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg tracking-tight text-brown">You Core</span>
        <span className="rounded-full bg-offwhite px-3 py-1 text-xs font-medium text-brown-soft ring-1 ring-brown/10">
          v1
        </span>
      </div>

      {/* hero */}
      <section className="relative mt-16 flex flex-col items-center text-center sm:mt-24">
        <Blob className="-top-10 -left-10 sm:-left-4" color="blush" size={220} />
        <Blob className="top-24 -right-14" color="lavender" size={180} delay={0.2} reverse />

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-pink-deep"
        >
          <Sparkles size={13} strokeWidth={2.5} />
          Personality, but make it fun
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative mt-4 text-balance font-serif text-[2.75rem] leading-[1.05] text-brown sm:text-6xl"
        >
          Find your <span className="italic text-pink-deep">You Core</span>.
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="relative mt-5 max-w-sm text-balance text-[17px] leading-relaxed text-brown-soft"
        >
          Answer a few oddly specific questions and discover the personality hiding underneath.
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.24 }} className="relative mt-8">
          <LinkButton href="/quiz" className="px-8 py-4 text-[16px]">
            Discover my You Core
            <ArrowRight size={17} strokeWidth={2.5} />
          </LinkButton>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-4 text-sm text-brown-soft/80"
        >
          Takes about 3 minutes · No sign-up required
        </motion.p>
      </section>

      {/* result preview */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mx-auto mt-16 w-full max-w-xs sm:mt-20 sm:max-w-sm"
      >
        <FloatingChip className="-top-5 -left-6 text-lg" delay={0.9}>
          👀
        </FloatingChip>
        <FloatingChip className="-right-4 top-10 text-lg" delay={1.1} reverse>
          ✨
        </FloatingChip>
        <FloatingChip className="-bottom-6 left-1 text-xs font-medium text-brown" delay={1.3}>
          “this is scarily accurate”
        </FloatingChip>

        <div className="grain rotate-[-2deg] rounded-[28px] bg-offwhite p-6 shadow-[0_30px_60px_-20px_rgba(51,42,39,0.28)] ring-1 ring-brown/[0.06] sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-pink-deep">✨ Your You Core</p>
          <p className="mt-2 font-serif text-2xl text-brown">The Soft Chaos 🎀</p>
          <div className="mt-4 space-y-2.5">
            {[
              ["Homebody", 91],
              ["Romanticiser", 87],
              ["Overthinker", 82],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-xs text-brown-soft">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-[6px] w-full overflow-hidden rounded-full bg-brown/[0.07]">
                  <div className="h-full rounded-full bg-gradient-to-r from-pink to-pink-deep" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] italic leading-snug text-brown-soft">
            “You have your life together. In theory.”
          </p>
        </div>
      </motion.section>

      {/* archetype strip */}
      <section className="mt-20 sm:mt-24">
        <p className="text-center text-sm text-brown-soft">There are 12 of these. Which one is yours?</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {ARCHETYPES.map((a, i) => (
            <motion.span
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="flex min-h-[52px] items-center justify-center gap-1.5 rounded-2xl bg-offwhite px-3 py-2.5 text-center text-sm font-medium text-brown ring-1 ring-brown/10"
            >
              <span>{a.emoji}</span>
              {a.name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* daily question teaser */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative mt-16 overflow-hidden rounded-[28px] bg-brown px-6 py-7 text-offwhite sm:mt-20 sm:px-8"
      >
        <Blob className="-bottom-16 -right-16" color="pink" size={200} />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-blush">
          Today’s question 👀
        </p>
        <p className="relative mt-3 max-w-sm font-serif text-xl leading-snug sm:text-2xl">{todayPrompt.prompt}</p>
        <div className="relative mt-6">
          <LinkButton href="/daily" variant="secondary" className="bg-offwhite text-brown">
            Answer today’s question
            <ArrowRight size={16} strokeWidth={2.5} />
          </LinkButton>
        </div>
      </motion.section>

      <footer className="mt-16 text-center text-xs text-brown-soft/70">
        Made for people who probably know exactly what their friends would say about them.
      </footer>
    </main>
  );
}
