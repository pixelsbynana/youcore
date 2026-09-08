"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { pickQuizQuestions } from "@/lib/quizSession";
import { computeTraitScores, type AnswerMap } from "@/lib/scoring";
import { pickArchetype } from "@/lib/personality";
import { saveResult } from "@/lib/storage";
import type { Question } from "@/data/questions";

const ADVANCE_DELAY = 700;
const FINISH_DELAY = 1100;

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [finishing, setFinishing] = useState(false);

  // Question selection happens client-side only, after mount, so the random
  // sample never causes a server/client hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount-only randomization, not a sync loop
    setQuestions(pickQuizQuestions());
  }, []);

  const handleAnswer = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }, []);

  useEffect(() => {
    if (!finishing || !questions) return;
    const scores = computeTraitScores(questions, answers);
    const archetype = pickArchetype(scores);
    saveResult({
      questionIds: questions.map((q) => q.id),
      answers,
      scores,
      archetypeId: archetype.id,
      createdAt: Date.now(),
    });
    const t = setTimeout(() => router.push("/results"), FINISH_DELAY);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishing]);

  if (!questions) return <LoadingState />;
  if (finishing) return <FinishingState />;

  const question = questions[index];
  const isLast = index + 1 >= questions.length;

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col px-6 py-7 sm:max-w-xl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="justify-self-start text-brown-soft transition-colors hover:text-brown" aria-label="Exit quiz">
          <X size={20} strokeWidth={2} />
        </Link>
        <ProgressDots total={questions.length} current={index} />
        <span />
      </div>

      <div className="flex flex-1 items-center py-10">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={question.id}
            question={question}
            onAnswer={(answerId) => {
              handleAnswer(question.id, answerId);
              setTimeout(() => {
                if (isLast) {
                  setFinishing(true);
                } else {
                  setIndex((i) => i + 1);
                }
              }, ADVANCE_DELAY);
            }}
          />
        </AnimatePresence>
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <PulseDots />
      <p className="font-serif text-xl text-brown">Getting curious…</p>
    </main>
  );
}

function FinishingState() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <PulseDots />
      <p className="font-serif text-xl text-brown">Okay. We’re learning a lot about you.</p>
    </main>
  );
}

function PulseDots() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-pink-deep"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
