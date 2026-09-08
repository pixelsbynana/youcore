"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/data/questions";
import { AnswerButton } from "./AnswerButton";

const ACKNOWLEDGEMENTS = [
  "Noted.",
  "Interesting choice…",
  "Okay, we see you.",
  "We have some thoughts.",
  "Duly noted.",
  "Filed away.",
  "We're learning a lot about you.",
  "Mm. Okay.",
];

export function QuestionCard({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (answerId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [ack] = useState(() => ACKNOWLEDGEMENTS[Math.floor(Math.random() * ACKNOWLEDGEMENTS.length)]);

  function handleSelect(answerId: string) {
    if (selected) return;
    setSelected(answerId);
    onAnswer(answerId);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <h2 className="text-balance font-serif text-[1.6rem] leading-[1.2] text-brown sm:text-3xl">
        {question.prompt}
      </h2>

      <div className="mt-7 flex flex-col gap-3">
        {question.answers.map((answer) => (
          <AnswerButton
            key={answer.id}
            text={answer.text}
            selected={selected === answer.id}
            faded={selected !== null}
            onClick={() => handleSelect(answer.id)}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: selected ? 1 : 0, y: selected ? 0 : 4 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-5 text-center text-sm font-medium text-pink-deep"
      >
        {selected ? ack : " "}
      </motion.p>
    </motion.div>
  );
}
