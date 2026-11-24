/**
 * Care services. Every individual service below comes from the agency's
 * published service list (AgingCare listing): Meal Preparation, Medication
 * Reminders, Mobility Assistance, Oral Hygiene, Personal Care, Respite Care,
 * Toileting, Transfer Assistance, Assistance with Eating, Assistance with
 * Light Exercise, Bathing/Dressing, Companionship, Companionship/Socialization/
 * Emotional Support, Housekeeping, Incontinence Care, Laundry.
 */

export type IconKey =
  | "hand-heart"
  | "footprints"
  | "utensils"
  | "home"
  | "message-heart"
  | "coffee";

export type ServiceItem = { name: string; desc: string };

export type ServiceCategory = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  intro: string;
  image: string;
  imageAlt: string;
  icon: IconKey;
  tone: "navy" | "leaf" | "sky" | "cream";
  items: ServiceItem[];
  idealFor: string[];
};

export const services: ServiceCategory[] = [
  {
    slug: "personal-care",
    title: "Personal Care",
    short: "Respectful, hands-on help with the daily routines that keep your loved one comfortable and confident.",
    tagline: "Dignity in every daily routine.",
    intro:
      "Personal care is deeply personal. Our caregivers help with bathing, dressing, grooming and hygiene at your loved one's pace — always with patience, privacy and respect for how they like things done.",
    image: "/images/personal-care.jpg",
    imageAlt: "Caregiver serving tea to a senior woman resting in bed",
    icon: "hand-heart",
    tone: "navy",
    items: [
      { name: "Bathing & Dressing", desc: "Safe, unhurried help with bathing, showering, grooming and choosing the day's clothes." },
      { name: "Oral Hygiene", desc: "Gentle support with brushing, denture care and daily mouth care." },
      { name: "Toileting", desc: "Discreet, respectful assistance getting to and using the bathroom." },
      { name: "Incontinence Care", desc: "Compassionate, matter-of-fact care that protects comfort, skin health and dignity." },
    ],
    idealFor: ["Seniors aging in place", "Adults with limited mobility", "Recovery after a hospital stay"],
  },
  {
    slug: "mobility-assistance",
    title: "Mobility & Safety",
    short: "Steady support moving around the home, transferring safely and staying active.",
    tagline: "Moving with confidence.",
    intro:
      "Falls and strain often happen during everyday movement. Our caregivers offer a steady hand for walking, getting in and out of bed or a chair, and light exercise that helps maintain strength and independence.",
    image: "/images/mobility.jpg",
    imageAlt: "Two caregivers helping a senior man stand up from his bed",
    icon: "footprints",
    tone: "leaf",
    items: [
      { name: "Mobility Assistance", desc: "Support walking around the home, using a walker or cane, and getting where they need to go." },
      { name: "Transfer Assistance", desc: "Safe transfers between bed, chair, wheelchair, car and bathroom." },
      { name: "Light Exercise", desc: "Encouragement and help with gentle movement and stretching routines." },
    ],
    idealFor: ["Fall-risk prevention", "Post-surgery recovery", "Arthritis & chronic pain"],
  },
  {
    slug: "meals-and-medication",
    title: "Meals & Medication",
    short: "Nourishing home-cooked meals, help at mealtimes and timely medication reminders.",
    tagline: "Nourished, on schedule, at ease.",
    intro:
      "Good nutrition and consistent routines are the foundation of wellbeing. We plan and prepare meals around your loved one's tastes and dietary needs, help at mealtime when needed, and keep medication on track with friendly reminders.",
    image: "/images/meal-prep.jpg",
    imageAlt: "Caregiver preparing fresh vegetables in the kitchen while a senior man looks on",
    icon: "utensils",
    tone: "sky",
    items: [
      { name: "Meal Preparation", desc: "Fresh, home-cooked meals that respect preferences, culture and dietary guidelines." },
      { name: "Assistance with Eating", desc: "Patient help at mealtimes so every meal is comfortable and unhurried." },
      { name: "Medication Reminders", desc: "Timely prompts so medications are taken as directed by their physician." },
    ],
    idealFor: ["Managing a daily routine", "Special diets", "Memory changes"],
  },
  {
    slug: "home-support",
    title: "Home Support",
    short: "Light housekeeping and laundry that keep the home clean, safe and welcoming.",
    tagline: "A home that feels like home.",
    intro:
      "A tidy, comfortable home makes daily life easier and safer. Our caregivers take care of light housekeeping and laundry so your loved one can focus on living well, not on chores.",
    image: "/images/errands.jpg",
    imageAlt: "Caregiver unpacking fresh groceries for a senior man at home",
    icon: "home",
    tone: "cream",
    items: [
      { name: "Housekeeping", desc: "Light cleaning, tidying, dishes and keeping walkways clear and safe." },
      { name: "Laundry", desc: "Washing, drying, folding and changing bed linens on a regular rhythm." },
    ],
    idealFor: ["Seniors living alone", "Busy family caregivers", "Recovery periods"],
  },
  {
    slug: "companionship",
    title: "Companionship",
    short: "Warm conversation, shared activities and emotional support that brighten every day.",
    tagline: "Someone to share the day with.",
    intro:
      "Loneliness affects health as much as any physical condition. Our caregivers become genuine companions — sharing conversation, hobbies, walks and stories, and offering emotional support when it matters most.",
    image: "/images/companionship.jpg",
    imageAlt: "Caregiver holding a senior woman's hands while sitting together on a sofa",
    icon: "message-heart",
    tone: "leaf",
    items: [
      { name: "Companionship", desc: "Friendly, reliable company for conversation, games, reading and favorite shows." },
      { name: "Socialization & Emotional Support", desc: "Encouragement, a listening ear and help staying connected to the people and activities they love." },
    ],
    idealFor: ["Seniors living alone", "Early memory changes", "Grief & life transitions"],
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    short: "Trusted, temporary care that gives family caregivers time to rest and recharge.",
    tagline: "Care for the caregiver, too.",
    intro:
      "Caring for someone you love is meaningful — and exhausting. Our respite care steps in so you can rest, work, travel or simply breathe, knowing your loved one is in capable, caring hands.",
    image: "/images/respite.jpg",
    imageAlt: "Caregiver attending to seniors in a bright, comfortable living room",
    icon: "coffee",
    tone: "navy",
    items: [
      { name: "Respite Care", desc: "Short-term or recurring relief for family caregivers, with the same attentive care your loved one is used to." },
      { name: "Continuity of Routine", desc: "We follow your loved one's established routines and care plan, so time apart is seamless." },
    ],
    idealFor: ["Family caregivers", "Planned time away", "Preventing burnout"],
  },
];

export const allServiceNames = services.flatMap((s) => s.items.map((i) => i.name)).filter((n) => n !== "Continuity of Routine");

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
