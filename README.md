# You Core ✨

> Find out what your friends probably already knew.

You Core is a playful, mobile-first personality discovery app. Answer a handful of oddly specific, relatable questions and get a shareable personality profile — traits, a matching archetype, a flattering read, and a slightly-too-honest "expose me" reveal. No sign-up, no boring quiz energy.

Live at **[youcore.vercel.app](https://youcore.vercel.app)**.

## The experience

Landing page → quiz → result → share, all without an account:

1. **Quiz** — 12–15 questions randomly sampled from a pool of 26, one at a time, with a soft progress indicator instead of "Question X of Y."
2. **Scoring** — each answer nudges 12 hidden personality traits (Homebody, Chaos, Main Character Energy, etc). Scores are normalized to 0–100% against the exact question set shown, so the result is always deterministic for a given set of answers.
3. **Result** — the closest of 12 archetypes (The Soft Chaos 🎀, The Secret CEO 💼, The Calm Menace 😌, …) is matched by trait signature, then rendered with animated trait bars, personalized "we noticed…" copy, a toxic trait, a green flag, and more.
4. **Expose Me** — an optional, more brutally honest second read.
5. **Share** — renders the result as an on-brand 9:16 image (via `html-to-image`) and opens the native share sheet or downloads it directly.
6. **Daily question** — a small standalone retention hook, deterministic per calendar day.

Results persist to `localStorage`, so refreshing never loses your answer.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for micro-interactions
- [Lucide](https://lucide.dev) for icons
- [html-to-image](https://github.com/bubkoo/html-to-image) for the shareable result card
- No backend, no database, no auth — everything runs client-side against `localStorage`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

Personality logic is kept separate from presentation, so questions, traits, archetypes, and scoring can be edited without touching any UI:

```
app/                  routes: landing, quiz, results, daily
components/
  landing/            landing page
  quiz/                question card, answer buttons
  results/             hero, trait bars, insight cards, expose-me, share card
  ui/                  buttons, decorative blobs, progress dots, confetti
data/
  traits.ts            the 12 hidden personality traits
  questions.ts         the question bank (26 questions, 4 answers each)
  archetypes.ts         the 12 archetypes and their copy
  daily.ts              standalone prompts for the daily-question feature
lib/
  scoring.ts            raw answers → 0–100 trait percentages (pure, deterministic)
  personality.ts        trait scores → best-matching archetype
  storage.ts             localStorage read/write for the saved result
  quizSession.ts         random 12–15 question sampling per quiz
  insights.ts             day-of-year helper for the daily question
  site.ts                 the deployed domain, referenced by the share card
```

To add a question, trait, or archetype, edit the relevant file in `data/` — the scoring and matching logic in `lib/` picks it up automatically.

## Deployment

Deployed on [Vercel](https://vercel.com), connected to this repo's `main` branch. No environment variables are required.
