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
  /** ≤155 chars — used as the page's meta description. */
  metaDescription: string;
  /** "What a visit looks like" paragraph on the detail page. */
  visit: string;
  faqs: { q: string; a: string }[];
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
    metaDescription:
      "Respectful in-home help with bathing, dressing, oral hygiene, toileting and incontinence care in Drexel Hill and Delaware County, PA.",
    visit:
      "A typical personal care visit follows your loved one's own routine. Their caregiver greets them, checks how they're feeling, and helps with bathing or showering, dressing, grooming and oral care in the order they prefer. Privacy comes first: doors stay closed, towels stay close, and your loved one does everything they can for themselves. Before leaving, the caregiver tidies the bathroom and makes sure your loved one is comfortable and safe.",
    faqs: [
      {
        q: "How do caregivers protect my loved one's privacy and dignity?",
        a: "Caregivers explain each step before they begin, ask permission, keep your loved one covered as much as possible and follow their preferences for how and when care happens.",
      },
      {
        q: "Can personal care be combined with other services?",
        a: "Yes. Many families pair personal care with meal preparation, medication reminders or companionship so one familiar caregiver covers the whole visit.",
      },
      {
        q: "What if my loved one resists help with bathing?",
        a: "It's common. Our caregivers go slowly, build trust, adjust timing and offer choices. We'll talk with your family about approaches that have worked before.",
      },
    ],
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
    metaDescription:
      "In-home mobility and transfer assistance plus light exercise to help seniors move safely in Drexel Hill and Delaware County, PA.",
    visit:
      "During a mobility-focused visit, the caregiver helps your loved one get up and moving safely — out of bed, into a favorite chair, to the bathroom or the kitchen table. They stay alongside on walks around the home, use the walker or cane your loved one already relies on, and keep pathways clear of clutter. With your loved one's agreement, they encourage gentle stretching and light movement that supports strength and confidence.",
    faqs: [
      {
        q: "Do your caregivers help with transfers to and from a wheelchair?",
        a: "Yes. Transfer assistance covers moving safely between bed, chair, wheelchair, toilet and car, using steady, careful technique.",
      },
      {
        q: "Can you help reduce the risk of falls at home?",
        a: "Caregivers provide a steady hand during everyday movement and keep walkways clear. We'll also point out hazards we notice so your family can address them.",
      },
      {
        q: "Is the light exercise a physical therapy program?",
        a: "No. We encourage gentle, everyday movement. If your loved one has exercises from a physical therapist, caregivers can remind and encourage them to keep up with that routine.",
      },
    ],
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
    metaDescription:
      "Home-cooked meal preparation, help at mealtimes and medication reminders for seniors in Drexel Hill and Delaware County, PA.",
    visit:
      "A meals-and-medication visit is built around the clock. The caregiver prepares a fresh meal your loved one enjoys — following any dietary guidance from their doctor — sits with them while they eat if help is needed, and cleans up the kitchen afterwards. At the scheduled times, they give friendly reminders to take medications as directed, so routines stay steady and nothing important is missed.",
    faqs: [
      {
        q: "Can meals follow a special diet?",
        a: "Yes. Tell us about dietary guidelines, allergies, cultural preferences and favorite foods, and we'll build meal preparation around them.",
      },
      {
        q: "Do caregivers give medication?",
        a: "Our caregivers provide medication reminders so your loved one takes medications as directed by their physician. Talk with us about your loved one's specific needs.",
      },
      {
        q: "Can the caregiver pick up groceries?",
        a: "Let us know what support you need around meals and shopping, and we'll discuss what we can include in the care plan.",
      },
    ],
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
    metaDescription:
      "Light housekeeping and laundry that keep a loved one's home clean, safe and comfortable in Drexel Hill and Delaware County, PA.",
    visit:
      "Home support fits naturally into a care visit. While spending time with your loved one, the caregiver washes dishes, wipes down the kitchen and bathroom, tidies living spaces, takes out the trash and keeps walkways clear. Laundry is washed, dried, folded and put away, and bed linens are changed on a regular schedule — so the home stays comfortable and safe between family visits.",
    faqs: [
      {
        q: "Is this a full house-cleaning service?",
        a: "No. Home support is light housekeeping connected to your loved one's daily living — the kind of upkeep that keeps their space clean, safe and comfortable.",
      },
      {
        q: "Can laundry be done every visit?",
        a: "Laundry can be scheduled as often as your loved one needs. We'll set a rhythm that keeps clothing and linens fresh.",
      },
      {
        q: "Can home support be the only service we receive?",
        a: "Home support is usually part of a broader care visit that includes companionship or personal care. Call us to talk through what fits your situation.",
      },
    ],
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
      { name: "Friendly Companionship", desc: "Friendly, reliable company for conversation, games, reading and favorite shows." },
      { name: "Socialization & Emotional Support", desc: "Encouragement, a listening ear and help staying connected to the people and activities they love." },
    ],
    idealFor: ["Seniors living alone", "Early memory changes", "Grief & life transitions"],
    metaDescription:
      "Companion care in Drexel Hill, PA: friendly conversation, shared activities and emotional support that help seniors feel connected.",
    visit:
      "Companionship visits are about the person, not a checklist. A caregiver might share coffee and conversation, look through photo albums, play cards, read aloud, watch a favorite program or take a short walk outside. They listen, encourage and help your loved one stay connected with the people and activities that matter to them — and let your family know how the day went.",
    faqs: [
      {
        q: "What does a companion caregiver actually do?",
        a: "Conversation, games, reading, hobbies, walks and simply being present. Companions also offer encouragement and emotional support, especially for seniors who live alone.",
      },
      {
        q: "Can companionship help with loneliness?",
        a: "Regular, familiar company gives your loved one something to look forward to and someone to talk to — which can make a real difference to how they feel day to day.",
      },
      {
        q: "Will it be the same caregiver each time?",
        a: "We aim for consistency, because familiar faces help build trust. We'll tell you in advance if a scheduling change is needed.",
      },
    ],
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
      { name: "Short-Term Relief Visits", desc: "Short-term or recurring relief for family caregivers, with the same attentive care your loved one is used to." },
      { name: "Continuity of Routine", desc: "We follow your loved one's established routines and care plan, so time apart is seamless." },
    ],
    idealFor: ["Family caregivers", "Planned time away", "Preventing burnout"],
    metaDescription:
      "Respite care in Drexel Hill, PA: trusted, temporary in-home care that gives family caregivers time to rest, work or travel.",
    visit:
      "Before respite care begins, we learn your loved one's routine from you — meals, medication reminders, favorite activities and anything that helps them feel settled. During the visit, the caregiver follows that plan closely, providing personal care, companionship and home support as needed. When you return, you'll hear how the time went, so stepping away feels easy rather than stressful.",
    faqs: [
      {
        q: "How often can we schedule respite care?",
        a: "Respite can be occasional — for an appointment or a trip — or a recurring break each week. Call us to talk through the schedule you need.",
      },
      {
        q: "Will the respite caregiver follow our routine?",
        a: "Yes. We follow your loved one's established routines and care plan so time apart is seamless for them.",
      },
      {
        q: "Why is respite important for family caregivers?",
        a: "Caregiving without breaks leads to exhaustion and burnout. Regular rest helps you stay healthy and keep caring for the person you love.",
      },
    ],
  },
];

export const allServiceNames = services
  .flatMap((s) => s.items.map((i) => i.name))
  .filter((n) => n !== "Continuity of Routine")
  .map((n) => ({ "Short-Term Relief Visits": "Respite Care", "Friendly Companionship": "Companionship" })[n] ?? n);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
