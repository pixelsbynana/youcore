export interface DailyPrompt {
  id: string;
  prompt: string;
  answers: { id: string; text: string; response: string }[];
}

// Standalone from the main quiz pool — these don't feed the scoring engine,
// they're a lightweight daily hook. One is deterministically selected per
// calendar day via lib/insights.ts#dayOfYearIndex.
export const DAILY_PROMPTS: DailyPrompt[] = [
  {
    id: "tesco-eye-contact",
    prompt: "You see someone you know in the supermarket. You make eye contact.",
    answers: [
      { id: "a", text: "Wave and commit fully", response: "Bold. Respect. That's a whole relationship now." },
      { id: "b", text: "Pretend to urgently need the pasta aisle", response: "The pasta aisle has never been so tactically important." },
      { id: "c", text: "Nod once, keep moving", response: "Efficient. Diplomatic. Slightly unreadable." },
      { id: "d", text: "Full conversation, even though you're both just there for milk", response: "15 minutes later, neither of you has the milk." },
    ],
  },
  {
    id: "phone-8-percent",
    prompt: "Your phone is at 8% and you're nowhere near a charger.",
    answers: [
      { id: "a", text: "Low power mode immediately, ration every tap", response: "A survivalist. We respect the discipline." },
      { id: "b", text: "Ignore it and hope for the best", response: "Bold strategy. The universe respects chaos." },
      { id: "c", text: "Mild internal panic, tell everyone nearby", response: "We felt that panic through the screen." },
      { id: "d", text: "Already planning your exact route to the nearest plug socket", response: "You've mapped this before. We know." },
    ],
  },
  {
    id: "we-need-to-talk",
    prompt: "Someone in the group chat sends “we need to talk.”",
    answers: [
      { id: "a", text: "Reply instantly, need answers now", response: "No patience for suspense. Iconic." },
      { id: "b", text: "Screenshot it and send it to another friend first", response: "Building your case before the trial even starts." },
      { id: "c", text: "Assume it's about you and mentally list your crimes", response: "The overthinking Olympics, and you just qualified." },
      { id: "d", text: "Leave them on read. For strategic reasons.", response: "A power move. Slightly unhinged. We respect it." },
    ],
  },
  {
    id: "last-slice",
    prompt: "You're offered the last slice of pizza.",
    answers: [
      { id: "a", text: "Take it, no hesitation", response: "Confidence we should all aspire to." },
      { id: "b", text: "Insist someone else has it, secretly devastated", response: "A martyr for a slice of pizza. Noted." },
      { id: "c", text: "Suggest splitting it into microscopic pieces", response: "Democracy in action. Nobody wins." },
      { id: "d", text: "Already halfway through eating it before anyone answers", response: "Didn't even ask. Iconic behaviour." },
    ],
  },
  {
    id: "wifi-cuts-out",
    prompt: "Your Wi-Fi cuts out mid video call.",
    answers: [
      { id: "a", text: "Calmly wait for it to reconnect", response: "A patience the rest of us simply do not have." },
      { id: "b", text: "Panic-refresh everything at once", response: "The chaos was not necessary, but we understand." },
      { id: "c", text: "Pretend you meant to leave anyway", response: "A graceful exit. Technically true." },
      { id: "d", text: "Immediately blame the router, out loud, to no one", response: "The router isn't listening. But we heard you." },
    ],
  },
  {
    id: "door-held-far-away",
    prompt: "A stranger holds the door for you from very far away.",
    answers: [
      { id: "a", text: "Sprint. Obviously.", response: "The commitment. The cardio. Unmatched." },
      { id: "b", text: "Awkward power-walk, apologising the whole way", response: "Three apologies per metre, roughly." },
      { id: "c", text: "Wave them off, take the stairs instead", response: "Avoidant, but efficient." },
      { id: "d", text: "Full jog, hand up, mouthing “thank you so much”", response: "A whole performance for four seconds of door." },
    ],
  },
  {
    id: "story-nobody-listening",
    prompt: "You're mid-story and realise nobody's really listening.",
    answers: [
      { id: "a", text: "Wrap it up immediately, pretend it was always short", response: "A tactical retreat. Smooth." },
      { id: "b", text: "Keep going anyway, out of principle", response: "The story deserves to be finished. Respect." },
      { id: "c", text: "Ask a pointed “are you even listening”", response: "Calling it out. Bold. Slightly risky." },
      { id: "d", text: "Quietly file it away to bring up again later", response: "It's coming back. When they least expect it." },
    ],
  },
  {
    id: "wake-up-phone",
    prompt: "You wake up and immediately check your phone.",
    answers: [
      { id: "a", text: "Notifications first, existential crisis after", response: "Priorities, in the correct order." },
      { id: "b", text: "Time first, mild panic about how late it is", response: "A daily ritual of self-inflicted stress." },
      { id: "c", text: "Weather — it determines the entire day", response: "The forecast holds real power over you." },
      { id: "d", text: "Don't check it, stare at the ceiling first", response: "A moment of peace before the chaos begins." },
    ],
  },
  {
    id: "what-tonight",
    prompt: "Someone asks: “what do you want to do tonight?”",
    answers: [
      { id: "a", text: "Genuinely no idea, deflect the question", response: "The circle of indecision continues." },
      { id: "b", text: "Already have 3 plans ready to pitch", response: "Prepared. Slightly intense. We like it." },
      { id: "c", text: "Suggest something, immediately regret it", response: "Second-guessing at the speed of light." },
      { id: "d", text: "“Whatever you want” (you have a very specific want)", response: "The most dishonest sentence in the English language." },
    ],
  },
  {
    id: "youve-changed",
    prompt: "Someone says “you've changed.”",
    answers: [
      { id: "a", text: "Say thank you. Mean it.", response: "Growth, and you're not even mad about it." },
      { id: "b", text: "Panic slightly, ask what they mean", response: "A perfectly reasonable spiral, honestly." },
      { id: "c", text: "Agree immediately, list the ways", response: "You've clearly been waiting to say this." },
      { id: "d", text: "Deflect with a joke", response: "Humour as armour. Classic. Effective." },
    ],
  },
];
