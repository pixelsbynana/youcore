import type { TraitWeights } from "./traits";

export type QuestionCategory =
  | "social"
  | "spontaneity"
  | "decisions"
  | "money"
  | "food"
  | "relationships"
  | "overthinking"
  | "ambition"
  | "comfort"
  | "aesthetics"
  | "conflict"
  | "travel"
  | "weekends"
  | "texting"
  | "awkward"
  | "habits";

export interface AnswerOption {
  id: string;
  text: string;
  weights: TraitWeights;
}

export interface Question {
  id: string;
  prompt: string;
  category: QuestionCategory;
  answers: [AnswerOption, AnswerOption, AnswerOption, AnswerOption];
}

// 26 questions across every category. 12–15 are randomly sampled per quiz
// (see lib/quizSession.ts), so nobody sees the same exact quiz twice.
export const QUESTIONS: Question[] = [
  {
    id: "party-strangers",
    prompt: "You're at a party where you know nobody. What do you do?",
    category: "social",
    answers: [
      { id: "a", text: "Find the person who also looks uncomfortable", weights: { peopleWatcher: 2, social: -1, comfort: 1 } },
      { id: "b", text: "Go straight for the food", weights: { comfort: 2, practicality: 1 } },
      { id: "c", text: "Start talking to someone", weights: { social: 3, spontaneity: 1 } },
      { id: "d", text: "Pretend to text until someone approaches you", weights: { overthinker: 2, social: -2, homebody: 1 } },
    ],
  },
  {
    id: "plans-cancelled",
    prompt: "Your plans get cancelled at the last minute.",
    category: "social",
    answers: [
      { id: "a", text: "THANK GOD.", weights: { homebody: 3, social: -2, comfort: 2 } },
      { id: "b", text: "I'm disappointed but I'll survive", weights: { social: 1, practicality: 1 } },
      { id: "c", text: "Immediately make new plans", weights: { spontaneity: 2, social: 2, chaos: 1 } },
      { id: "d", text: "I was secretly hoping this would happen", weights: { homebody: 2, overthinker: 1, comfort: 1 } },
    ],
  },
  {
    id: "accidental-wave",
    prompt: "You accidentally wave back at someone who wasn't waving at you.",
    category: "awkward",
    answers: [
      { id: "a", text: "Commit to it. That person is my friend now.", weights: { chaos: 3, mainCharacter: 2, spontaneity: 1 } },
      { id: "b", text: "Pretend I was fixing my hair.", weights: { practicality: 1, overthinker: 1 } },
      { id: "c", text: "Think about it for the next 4 years.", weights: { overthinker: 3, romanticiser: 1 } },
      { id: "d", text: "Move countries.", weights: { chaos: 2, overthinker: 2, mainCharacter: 1 } },
    ],
  },
  {
    id: "ideal-sunday",
    prompt: "Your ideal Sunday is:",
    category: "weekends",
    answers: [
      { id: "a", text: "Coffee, book, walk", weights: { comfort: 2, practicality: 1, homebody: 1 } },
      { id: "b", text: "Bed. Snacks. TV.", weights: { homebody: 3, comfort: 2, social: -1 } },
      { id: "c", text: "Brunch + shopping", weights: { social: 2, mainCharacter: 1, spontaneity: 1 } },
      { id: "d", text: "“Let's see where the day takes us.”", weights: { spontaneity: 3, adventure: 2, chaos: 1 } },
    ],
  },
  {
    id: "twenty-pounds",
    prompt: "You have £20 left until payday.",
    category: "money",
    answers: [
      { id: "a", text: "Save it.", weights: { practicality: 3, ambition: 1 } },
      { id: "b", text: "Food.", weights: { practicality: 1, comfort: 1 } },
      { id: "c", text: "A little treat.", weights: { comfort: 2, romanticiser: 1 } },
      { id: "d", text: "Somehow turn it into £3.", weights: { chaos: 3, spontaneity: 2, practicality: -2 } },
    ],
  },
  {
    id: "someone-cancels-you",
    prompt: "Someone cancels plans with you.",
    category: "social",
    answers: [
      { id: "a", text: "“No worries!” (I am celebrating internally.)", weights: { homebody: 2, social: -1, comfort: 1 } },
      { id: "b", text: "I'm genuinely disappointed.", weights: { social: 2, romanticiser: 1 } },
      { id: "c", text: "Immediately make alternative plans.", weights: { spontaneity: 2, practicality: 1 } },
      { id: "d", text: "Depends who it is.", weights: { overthinker: 1, practicality: 1 } },
    ],
  },
  {
    id: "no-reply-days",
    prompt: "Someone hasn't replied to your text in 3 days.",
    category: "texting",
    answers: [
      { id: "a", text: "It's fine, I forget to reply too", weights: { practicality: 2, social: -1 } },
      { id: "b", text: "I replay the last message in my head", weights: { overthinker: 3, romanticiser: 1 } },
      { id: "c", text: "I double text", weights: { chaos: 2, social: 1 } },
      { id: "d", text: "I quietly spiral, then act completely normal", weights: { overthinker: 2, peopleWatcher: 1, comfort: -1 } },
    ],
  },
  {
    id: "friend-upset-you",
    prompt: "A friend says something that upsets you.",
    category: "conflict",
    answers: [
      { id: "a", text: "Address it immediately, calmly", weights: { practicality: 2, ambition: 1 } },
      { id: "b", text: "Say it's fine, think about it for a week", weights: { overthinker: 3 } },
      { id: "c", text: "Get a little petty about it", weights: { chaos: 2, peopleWatcher: 1 } },
      { id: "d", text: "Avoid them until it blows over", weights: { homebody: 2, overthinker: 1, social: -1 } },
    ],
  },
  {
    id: "travel-style",
    prompt: "Your travel style is:",
    category: "travel",
    answers: [
      { id: "a", text: "Full itinerary, every hour planned", weights: { practicality: 3, ambition: 1, spontaneity: -2 } },
      { id: "b", text: "One must-do, the rest is vibes", weights: { adventure: 2, spontaneity: 2 } },
      { id: "c", text: "I researched this trip for 3 months", weights: { overthinker: 2, practicality: 2 } },
      { id: "d", text: "Book the flight, figure it out later", weights: { chaos: 3, adventure: 2, spontaneity: 2 } },
    ],
  },
  {
    id: "group-chat-plans",
    prompt: "The group chat posts weekend plans.",
    category: "weekends",
    answers: [
      { id: "a", text: "Already there, first to reply", weights: { social: 3, spontaneity: 1 } },
      { id: "b", text: "Reading it, deciding if I have the energy", weights: { homebody: 2, overthinker: 1 } },
      { id: "c", text: "Organising logistics for everyone", weights: { practicality: 3, ambition: 1 } },
      { id: "d", text: "Waiting to see who else is going", weights: { peopleWatcher: 2, social: -1 } },
    ],
  },
  {
    id: "ideal-room",
    prompt: "Your ideal room looks like:",
    category: "aesthetics",
    answers: [
      { id: "a", text: "Cosy, candles, blankets, soft lighting", weights: { comfort: 3, homebody: 2, romanticiser: 1 } },
      { id: "b", text: "Minimal, clean, everything has a place", weights: { practicality: 3 } },
      { id: "c", text: "Fairy lights, film posters, chaos on the walls", weights: { chaos: 2, romanticiser: 2, mainCharacter: 1 } },
      { id: "d", text: "Whatever's practical, I'm never home anyway", weights: { adventure: 2, practicality: 1, homebody: -2 } },
    ],
  },
  {
    id: "big-purchase",
    prompt: "You're about to make a big purchase.",
    category: "money",
    answers: [
      { id: "a", text: "Research every option for 2 weeks", weights: { overthinker: 2, practicality: 2 } },
      { id: "b", text: "Impulse buy, no regrets", weights: { chaos: 3, spontaneity: 2 } },
      { id: "c", text: "Buy it, then feel guilty for days", weights: { overthinker: 2, comfort: -1 } },
      { id: "d", text: "Wait for it to go on sale", weights: { practicality: 3, ambition: 1 } },
    ],
  },
  {
    id: "five-year-plan",
    prompt: "Your 5-year plan is:",
    category: "ambition",
    answers: [
      { id: "a", text: "I have a spreadsheet.", weights: { ambition: 3, practicality: 2 } },
      { id: "b", text: "Vibes-based, but I'll get there", weights: { ambition: 1, spontaneity: 2 } },
      { id: "c", text: "I have 47 ideas and 3 unfinished projects", weights: { ambition: 2, chaos: 2, mainCharacter: 1 } },
      { id: "d", text: "Genuinely no idea, and that's fine", weights: { homebody: 1, comfort: 1, ambition: -2 } },
    ],
  },
  {
    id: "text-sent-10-min",
    prompt: "You sent a text 10 minutes ago.",
    category: "overthinking",
    answers: [
      { id: "a", text: "Already forgotten about it", weights: { practicality: 2 } },
      { id: "b", text: "Reading it back for typos, tone, everything", weights: { overthinker: 3 } },
      { id: "c", text: "Considering a follow-up “sorry that came across weird”", weights: { overthinker: 2, romanticiser: 1 } },
      { id: "d", text: "Screenshotting it to a friend for analysis", weights: { peopleWatcher: 1, social: 2, overthinker: 1 } },
    ],
  },
  {
    id: "food-decision",
    prompt: "Deciding where to eat with friends, you:",
    category: "food",
    answers: [
      { id: "a", text: "“Anywhere is fine!” then reject every suggestion", weights: { overthinker: 2, chaos: 1 } },
      { id: "b", text: "Already have 3 restaurants picked out", weights: { practicality: 2, ambition: 1 } },
      { id: "c", text: "Whatever's closest, I'm hungry now", weights: { practicality: 1, spontaneity: 1 } },
      { id: "d", text: "Let's get everything, we'll share", weights: { social: 2, spontaneity: 1, chaos: 1 } },
    ],
  },
  {
    id: "spontaneous-trip",
    prompt: "A friend offers you a spontaneous trip leaving tomorrow.",
    category: "spontaneity",
    answers: [
      { id: "a", text: "Bags packed within the hour", weights: { adventure: 3, spontaneity: 3 } },
      { id: "b", text: "I need at least 48 hours' notice", weights: { practicality: 2, spontaneity: -2 } },
      { id: "c", text: "Yes, but I will make a list first", weights: { adventure: 2, practicality: 2 } },
      { id: "d", text: "Absolutely not, my bed and I have plans", weights: { homebody: 3, comfort: 2, adventure: -2 } },
    ],
  },
  {
    id: "music-walking",
    prompt: "Walking with music on, you are:",
    category: "aesthetics",
    answers: [
      { id: "a", text: "This is a movie and I am the lead", weights: { mainCharacter: 3, romanticiser: 2 } },
      { id: "b", text: "Just trying to get where I'm going", weights: { practicality: 2 } },
      { id: "c", text: "Fully aware everyone's watching me (they're not)", weights: { overthinker: 2, peopleWatcher: 1 } },
      { id: "d", text: "Choreographing a whole moment in my head", weights: { mainCharacter: 2, romanticiser: 2, chaos: 1 } },
    ],
  },
  {
    id: "crush-situation",
    prompt: "You have a crush on someone.",
    category: "relationships",
    answers: [
      { id: "a", text: "Already planned our wedding", weights: { romanticiser: 3, mainCharacter: 1 } },
      { id: "b", text: "Playing it extremely cool (I am not cool)", weights: { overthinker: 2, comfort: -1 } },
      { id: "c", text: "Told them immediately", weights: { spontaneity: 2, social: 2 } },
      { id: "d", text: "Waiting for a sign from the universe", weights: { romanticiser: 2, overthinker: 1 } },
    ],
  },
  {
    id: "friend-tiny-detail",
    prompt: "A friend mentioned a tiny detail months ago. You:",
    category: "relationships",
    answers: [
      { id: "a", text: "Remember it and bring it up unprompted", weights: { romanticiser: 2, peopleWatcher: 2 } },
      { id: "b", text: "Remember the big things, not the small stuff", weights: { practicality: 1 } },
      { id: "c", text: "I have a mental file on everyone I know", weights: { peopleWatcher: 3, overthinker: 1 } },
      { id: "d", text: "What did we even talk about", weights: { social: 1, chaos: 1 } },
    ],
  },
  {
    id: "trip-in-public",
    prompt: "You trip in public.",
    category: "awkward",
    answers: [
      { id: "a", text: "Own it, take a bow", weights: { chaos: 2, mainCharacter: 2, social: 1 } },
      { id: "b", text: "Keep walking like nothing happened", weights: { practicality: 2, comfort: -1 } },
      { id: "c", text: "Replay it mentally for the rest of the day", weights: { overthinker: 3 } },
      { id: "d", text: "Immediately text a friend about it", weights: { social: 2, peopleWatcher: 1 } },
    ],
  },
  {
    id: "stressful-day",
    prompt: "You've had a stressful day. What actually helps?",
    category: "comfort",
    answers: [
      { id: "a", text: "My bed, silence, a snack", weights: { homebody: 3, comfort: 2 } },
      { id: "b", text: "Calling a friend to vent", weights: { social: 3 } },
      { id: "c", text: "Making a plan to fix it", weights: { practicality: 3, ambition: 1 } },
      { id: "d", text: "A little chaos — shopping, a new hobby, anything", weights: { chaos: 2, spontaneity: 2 } },
    ],
  },
  {
    id: "what-to-watch",
    prompt: "Choosing what to watch tonight, you:",
    category: "decisions",
    answers: [
      { id: "a", text: "Same comfort show for the 5th time", weights: { homebody: 2, comfort: 2 } },
      { id: "b", text: "Scroll for 45 minutes, watch nothing", weights: { overthinker: 2, practicality: -1 } },
      { id: "c", text: "Whatever's trending", weights: { practicality: 1, social: 1 } },
      { id: "d", text: "Something new and slightly unhinged", weights: { adventure: 2, chaos: 1 } },
    ],
  },
  {
    id: "we-should-hang-out",
    prompt: "You text someone “we should hang out soon.”",
    category: "texting",
    answers: [
      { id: "a", text: "I immediately suggest 3 dates", weights: { practicality: 2, social: 2, ambition: 1 } },
      { id: "b", text: "I mean it, but we both know it's not happening", weights: { homebody: 1, practicality: -1 } },
      { id: "c", text: "I show up at their door within the week", weights: { spontaneity: 2, social: 2 } },
      { id: "d", text: "I think about it fondly and never follow up", weights: { romanticiser: 1, overthinker: 1, practicality: -2 } },
    ],
  },
  {
    id: "morning-routine",
    prompt: "Your morning routine is:",
    category: "habits",
    answers: [
      { id: "a", text: "Same order, every single day", weights: { practicality: 3, comfort: 1 } },
      { id: "b", text: "Different every day, structure is a scam", weights: { chaos: 3, spontaneity: 2 } },
      { id: "c", text: "An elaborate routine I researched extensively", weights: { overthinker: 2, ambition: 1, practicality: 1 } },
      { id: "d", text: "Whatever gets me out the door", weights: { practicality: 1, homebody: 1 } },
    ],
  },
  {
    id: "camera-roll",
    prompt: "Your camera roll is mostly:",
    category: "aesthetics",
    answers: [
      { id: "a", text: "400 photos of the same sunset", weights: { romanticiser: 2, mainCharacter: 1 } },
      { id: "b", text: "Screenshots, memes, receipts, chaos", weights: { chaos: 3 } },
      { id: "c", text: "Aesthetically curated, colour-coordinated", weights: { practicality: 2, mainCharacter: 1 } },
      { id: "d", text: "My pet or my food, mostly", weights: { comfort: 2, homebody: 1 } },
    ],
  },
  {
    id: "dream-vs-comfort",
    prompt: "Dream job vs. comfort zone — be honest.",
    category: "ambition",
    answers: [
      { id: "a", text: "Chase the dream, comfort can wait", weights: { ambition: 3, adventure: 1 } },
      { id: "b", text: "Comfort now, dream later (eventually)", weights: { comfort: 2, homebody: 1, ambition: -1 } },
      { id: "c", text: "Both, somehow, through sheer chaos", weights: { ambition: 2, chaos: 2 } },
      { id: "d", text: "Redefine the dream to include a nap", weights: { comfort: 3, mainCharacter: 1 } },
    ],
  },
];
