import type { TraitScores, TraitWeights } from "./traits";

export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  /** How strongly each trait defines this archetype, roughly -1..1. Used for matching. */
  signature: TraitWeights;
  description: string;
  tagline: (t: TraitScores) => string;
  weNoticed: (t: TraitScores) => string;
  toxicTrait: string;
  greenFlag: string;
  mainCharacterMoment: string;
  brainSoundsLike: string;
  idealPerson: string;
  idealFriend: string;
  exposeMe: (t: TraitScores) => string;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "soft-chaos",
    name: "The Soft Chaos",
    emoji: "🎀",
    signature: { homebody: 0.6, romanticiser: 0.7, comfort: 0.6, chaos: 0.5, overthinker: 0.4 },
    description: "Comfort-loving, secretly romantic, and mildly held together by snacks and vibes.",
    tagline: (t) => `You're ${t.practicality}% responsible and ${100 - t.practicality}% “we'll figure it out.”`,
    weNoticed: (t) =>
      `Your spontaneity score is ${t.spontaneity}%, which tracks — you love the idea of chaos far more than you love actually living inside it.`,
    toxicTrait: "You ask everyone where they want to eat and reject every single suggestion.",
    greenFlag: "You remember tiny details people mentioned months ago.",
    mainCharacterMoment: "You can turn a completely ordinary Tuesday into a cinematic experience — soundtrack included.",
    brainSoundsLike: "A playlist that's 40% love songs, 40% intrusive thoughts, 20% “should I text them.”",
    idealPerson: "Someone who brings you snacks without being asked and doesn't make you leave the house unless it's really worth it.",
    idealFriend: "Someone who lets you overthink out loud, then gently tells you to just send the text.",
    exposeMe: () =>
      `You claim to love spontaneity. You do not. You like the IDEA of spontaneity, provided someone tells you about it three business days in advance and you've had time to pick an outfit.`,
  },
  {
    id: "main-character",
    name: "The Main Character",
    emoji: "✨",
    signature: { mainCharacter: 0.9, romanticiser: 0.5, social: 0.4, spontaneity: 0.3 },
    description: "Turns everyday life into a movie — soundtrack, lighting, and slow-motion walk included.",
    tagline: (t) => `You're ${t.mainCharacter}% main character and ${100 - t.mainCharacter}% supporting cast — you've never once believed the second number.`,
    weNoticed: () => `You narrate your own life in third person sometimes. We're not judging. We're taking notes.`,
    toxicTrait: "You've rehearsed how you'd tell this story before it's even finished happening.",
    greenFlag: "You make ordinary moments feel special for the people around you, not just yourself.",
    mainCharacterMoment: "Walking somewhere completely mundane with headphones in like it's the opening scene of your own film.",
    brainSoundsLike: "A movie trailer voice, narrating your grocery run.",
    idealPerson: "Someone who's happy to be your co-star and doesn't mind an occasional dramatic monologue.",
    idealFriend: "Someone who hypes up your plot twists and never steals your spotlight.",
    exposeMe: (t) =>
      `You think you're the main character. You are — of a show that's currently running on ${100 - t.practicality}% vibes-based planning and several unresolved storylines.`,
  },
  {
    id: "professional-overthinker",
    name: "The Professional Overthinker",
    emoji: "🧠",
    signature: { overthinker: 0.9, peopleWatcher: 0.5, practicality: 0.3, social: -0.3 },
    description: "Has analysed a conversation from 2019 and is still not fully at peace with it.",
    tagline: (t) => `You're ${t.overthinker}% overthinker and ${100 - t.overthinker}% “I'm sure it's fine” (you are not sure it's fine).`,
    weNoticed: () => `You replied to that message in under a minute, then thought about it for the next four hours.`,
    toxicTrait: "You've mentally rehearsed arguments with people who don't even know you're upset with them.",
    greenFlag: "You think things through so thoroughly that you rarely blindside anyone.",
    mainCharacterMoment: "Standing in the shower, three years later, suddenly understanding what someone meant.",
    brainSoundsLike: "A courtroom drama where you're the defence, the prosecution, and the increasingly concerned judge.",
    idealPerson: "Someone who says exactly what they mean, so your brain has less to work with.",
    idealFriend: "Someone who talks you down from spirals at 1am without making you feel dramatic about it.",
    exposeMe: () =>
      `You say you "don't overthink things." Your search history and your 2am group chat messages would like a word.`,
  },
  {
    id: "cozy-goblin",
    name: "The Cozy Goblin",
    emoji: "🧸",
    signature: { homebody: 0.9, comfort: 0.7, social: -0.5, adventure: -0.5 },
    description: "Would rather be at home, thank you very much.",
    tagline: (t) => `You're ${t.homebody}% homebody and ${100 - t.homebody}% “I'll go, but I'm leaving by 9.”`,
    weNoticed: () => `You said yes to going out, then spent the whole day hoping it would rain.`,
    toxicTrait: "You've cancelled plans to do literally nothing, on purpose, and felt great about it.",
    greenFlag: "You've mastered the art of making any space feel warm and safe.",
    mainCharacterMoment: "Turning down a night out for a blanket, a snack, and a show you've already seen four times.",
    brainSoundsLike: "A cosy podcast that occasionally interrupts itself to ask “wait, do I have to leave the house tomorrow?”",
    idealPerson: "Someone who's just as happy staying in and thinks your bed is a valid vacation destination.",
    idealFriend: "Someone who comes to you, instead of asking you to go anywhere further than the sofa.",
    exposeMe: (t) =>
      `You call it "self-care." It is. It's also the fact that you'd choose your own bed over most human experiences, ${100 - t.social}% of the time.`,
  },
  {
    id: "secret-ceo",
    name: "The Secret CEO",
    emoji: "💼",
    signature: { ambition: 0.9, chaos: 0.5, mainCharacter: 0.4, practicality: -0.3 },
    description: "Has 47 ideas and 3 unfinished projects, and somehow still seems completely in control.",
    tagline: (t) => `You're ${t.ambition}% ambitious and ${100 - t.practicality}% “I'll figure out the details later.”`,
    weNoticed: () => `You have a five-year plan and also, somehow, no idea what you're doing tomorrow.`,
    toxicTrait: "You start seventeen projects and finish the ones that get you the most compliments.",
    greenFlag: "You genuinely believe you can build anything — and you're usually right.",
    mainCharacterMoment: "Explaining your latest business idea at a party like it's already a magazine cover story.",
    brainSoundsLike: "A pitch meeting that never actually ends, even while you're asleep.",
    idealPerson: "Someone who believes in the vision even when the spreadsheet doesn't exist yet.",
    idealFriend: "Someone who'll be your first customer, your hype squad, and your reality check, in that order.",
    exposeMe: (t) =>
      `You call yourself a "visionary." Your Notes app calls you someone with ${t.chaos}% chaos and a folder named "ideas (2)" that hasn't been opened since March.`,
  },
  {
    id: "people-watcher",
    name: "The People Watcher",
    emoji: "👀",
    signature: { peopleWatcher: 0.9, social: -0.4, overthinker: 0.3, practicality: 0.3 },
    description: "Doesn't participate in the drama. Collects evidence.",
    tagline: (t) => `You're ${t.peopleWatcher}% observer and ${100 - t.social}% “I'd rather just watch this happen.”`,
    weNoticed: () => `You know more about the people around you than they've ever actually told you.`,
    toxicTrait: "You've formed a fully-developed opinion about a stranger based on one comment they made.",
    greenFlag: "You notice when someone's off before they even say anything.",
    mainCharacterMoment: "Sitting quietly at the party, absorbing every plot detail like it's a documentary made just for you.",
    brainSoundsLike: "A nature documentary narrator, watching the group chat unfold in real time.",
    idealPerson: "Someone entertaining enough to watch, but who also actually talks to you.",
    idealFriend: "Someone who debriefs every social situation with you afterwards, in full detail.",
    exposeMe: () =>
      `You say you "don't like drama." You just prefer to experience it from a safe distance, with a full view, and zero fingerprints.`,
  },
  {
    id: "golden-retriever",
    name: "The Golden Retriever",
    emoji: "☀️",
    signature: { social: 0.8, spontaneity: 0.5, mainCharacter: 0.4, overthinker: -0.4, adventure: 0.3 },
    description: "Somehow friends with everyone. Radiates zero threat.",
    tagline: (t) => `You're ${t.social}% social battery and ${100 - t.overthinker}% “wait, why would they be mad at me?”`,
    weNoticed: () => `You said yes to plans before you'd even finished reading the message.`,
    toxicTrait: "You agree to plans with three different groups on the same day because you didn't want to disappoint anyone.",
    greenFlag: "You make people feel instantly comfortable around you, no effort required.",
    mainCharacterMoment: "Becoming best friends with a stranger in a queue within four minutes, no notes.",
    brainSoundsLike: "An excited voicemail that never quite finishes one thought before starting the next.",
    idealPerson: "Someone calm enough to balance out your endless enthusiasm.",
    idealFriend: "Someone who matches your energy at 8am and doesn't need convincing to have fun.",
    exposeMe: () =>
      `You think you're "easygoing." You're actually incapable of saying no, which is a very different, much more exhausting thing.`,
  },
  {
    id: "calm-menace",
    name: "The Calm Menace",
    emoji: "😌",
    signature: { practicality: 0.5, peopleWatcher: 0.5, chaos: 0.5, social: -0.3, comfort: 0.2 },
    description: "Looks innocent. Is absolutely not.",
    tagline: (t) => `You're ${t.practicality}% composed and ${t.chaos}% quietly plotting something.`,
    weNoticed: () => `You said "it's fine" in a tone that made it extremely clear it was not fine.`,
    toxicTrait: "You remember every single thing, and will bring it up at the worst possible moment — calmly.",
    greenFlag: "You never lose your composure, even when everyone around you has lost theirs.",
    mainCharacterMoment: "Delivering a devastating comment in the softest, most polite voice imaginable.",
    brainSoundsLike: "A very calm narrator, reading out a list of receipts.",
    idealPerson: "Someone who can tell when you're joking and when you are extremely not joking.",
    idealFriend: "Someone who lets you be dramatic in private and terrifyingly composed in public.",
    exposeMe: (t) =>
      `You seem so chill. You are not chill. You are ${t.chaos}% chaos wearing an extremely convincing calm-person costume.`,
  },
  {
    id: "the-planner",
    name: "The Planner",
    emoji: "📋",
    signature: { practicality: 0.9, ambition: 0.5, spontaneity: -0.6, homebody: 0.3 },
    description: "Has a spreadsheet for the spreadsheet.",
    tagline: (t) => `You're ${t.practicality}% planned out and ${100 - t.spontaneity}% “not without a schedule, thank you.”`,
    weNoticed: () => `You made a packing list for a trip that's still four months away.`,
    toxicTrait: "You've silently judged someone's entire personality based on their lack of a calendar.",
    greenFlag: "People genuinely trust you to make things happen, because you always do.",
    mainCharacterMoment: "Colour-coding a group trip itinerary that nobody asked for, but everyone secretly needed.",
    brainSoundsLike: "A to-do list that's somehow also a five-year forecast.",
    idealPerson: "Someone who appreciates a well-organised surprise, on a Tuesday you already cleared.",
    idealFriend: "Someone who lets you plan the trip and just shows up where you tell them to.",
    exposeMe: () =>
      `You call it "being organised." It's also the reason you've never once in your life said yes to something starting in the next ten minutes.`,
  },
  {
    id: "chaotic-adventurer",
    name: "The Chaotic Adventurer",
    emoji: "🌪️",
    signature: { adventure: 0.9, chaos: 0.7, spontaneity: 0.7, practicality: -0.5 },
    description: "Says yes first and considers consequences later, if at all.",
    tagline: (t) => `You're ${t.adventure}% adventure and ${100 - t.practicality}% “the plan is that there is no plan.”`,
    weNoticed: () => `You booked something before checking if you could actually afford it. Iconic, reckless, on brand.`,
    toxicTrait: "You've convinced multiple people to do something questionable at 1am and have zero regrets.",
    greenFlag: "You make people brave enough to try things they'd never do alone.",
    mainCharacterMoment: "Turning a wrong turn into the best story of the entire trip.",
    brainSoundsLike: "A group chat during an emergency, except the emergency is that you're bored.",
    idealPerson: "Someone who can keep up — or at least someone entertaining to drag along.",
    idealFriend: "Someone who says “wait, actually, let's do it” before you've even finished the sentence.",
    exposeMe: (t) =>
      `You call yourself "spontaneous." You are actually ${t.chaos}% chaos with excellent improv skills and a shocking lack of a backup plan.`,
  },
  {
    id: "romantic-delusionist",
    name: "The Romantic Delusionist",
    emoji: "💌",
    signature: { romanticiser: 0.9, mainCharacter: 0.5, overthinker: 0.5, spontaneity: -0.3 },
    description: "A five-second eye contact is basically a love story with three acts.",
    tagline: (t) => `You're ${t.romanticiser}% hopeless romantic and ${100 - t.spontaneity}% “but only if it's meant to be.”`,
    weNoticed: () => `You've written the entire relationship in your head before the second date has even been scheduled.`,
    toxicTrait: "You've assigned deep meaning to a text that says “lol” with no other context.",
    greenFlag: "You make the people you love feel like they're the plot of something beautiful.",
    mainCharacterMoment: "Getting emotional over a song that reminds you of someone you've spoken to twice.",
    brainSoundsLike: "A love letter that occasionally gets interrupted by “wait, but what did they MEAN by that.”",
    idealPerson: "Someone who's a little bit dramatic too, and isn't afraid to admit it.",
    idealFriend: "Someone who lets you narrate every situationship in full, unnecessary detail.",
    exposeMe: () =>
      `You think you're a "hopeless romantic." You're actually running an entire narrative department for relationships that are, technically, still hypothetical.`,
  },
  {
    id: "responsible-adult",
    name: "The Responsible Adult™️",
    emoji: "🧾",
    signature: { practicality: 0.7, ambition: 0.5, comfort: 0.5, chaos: -0.6, spontaneity: -0.3 },
    description: "Has snacks, chargers, and contingency plans.",
    tagline: (t) => `You're ${t.practicality}% dependable and ${100 - t.chaos}% “someone has to be the adult here.”`,
    weNoticed: () => `You were the only one with a portable charger, and everyone knew exactly who to ask.`,
    toxicTrait: "You've quietly resented being the reliable one while never once asking for help yourself.",
    greenFlag: "People genuinely feel safe around you, because you always have a plan B.",
    mainCharacterMoment: "Calmly solving a problem while everyone else is mid-crisis, then never mentioning it again.",
    brainSoundsLike: "A very calm group chat message that starts with “okay so here's what we're going to do.”",
    idealPerson: "Someone who lets you take care of things, and occasionally takes care of you too.",
    idealFriend: "Someone who appreciates the snacks and the spreadsheet, and brings the fun you forgot to plan for.",
    exposeMe: (t) =>
      `You act like being "the responsible one" is a personality trait you chose. It's actually ${t.comfort}% fear of chaos, wearing a very practical raincoat.`,
  },
];

export function getArchetype(id: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}
