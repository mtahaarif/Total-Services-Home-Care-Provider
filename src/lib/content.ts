import { site } from "./site";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What areas do you serve?",
    a: `Our office is in ${site.address.city}, PA, and we care for families throughout ${site.address.county} and nearby communities. Give us a call at ${site.phone} and we'll confirm coverage for your address.`,
  },
  {
    q: "What kinds of care do you provide?",
    a: "We provide in-home personal care (bathing, dressing, oral hygiene, toileting, incontinence care), mobility and transfer assistance, light exercise, meal preparation and help with eating, medication reminders, housekeeping, laundry, companionship and emotional support, and respite care for family caregivers.",
  },
  {
    q: "How do we get started?",
    a: "Start with a phone call or a message through our contact form. We'll listen to your situation, learn about your loved one's routines and preferences, and work with your family to build a customized care plan before care begins.",
  },
  {
    q: "Can the schedule work around our family's routine?",
    a: "Yes. Care plans are built around your loved one's needs — whether that's a few hours a week or more regular support. Tell us what you need and we'll talk through what's possible.",
  },
  {
    q: "Will our family stay involved in the care?",
    a: "Absolutely. We work closely with families from the very first conversation and keep you informed as needs change, so you always have peace of mind.",
  },
  {
    q: "How is care paid for?",
    a: "Payment options depend on your situation. Call us and we'll walk you through the options that may apply to your family.",
  },
];

/** Full FAQ page (/faq), grouped by topic. */
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      faqs[2],
      faqs[0],
      {
        q: "Do I need a referral to contact you?",
        a: "No. Families can call us directly to talk about care — you don't need a referral to start the conversation.",
      },
      {
        q: "How soon can care begin?",
        a: "It depends on your loved one's needs and the schedule you have in mind. Call us and we'll talk through timing and what we can arrange.",
      },
      {
        q: "Can I arrange care for a parent who lives nearby while I live farther away?",
        a: "Yes. Many families coordinate care from a distance. We'll keep you informed by phone so you know how your loved one is doing.",
      },
    ],
  },
  {
    id: "our-services",
    title: "Our services",
    items: [
      faqs[1],
      {
        q: "Can different services be combined in one visit?",
        a: "Yes. Most care plans combine several services — for example personal care, meal preparation and companionship — so one familiar caregiver covers the whole visit.",
      },
      {
        q: "Do you offer respite care for family caregivers?",
        a: "Yes. Respite care gives family caregivers time to rest, work or travel, with a caregiver who follows your loved one's established routine.",
      },
      {
        q: "Can you help after a hospital stay?",
        a: "Yes. Support with personal care, mobility, meals and household tasks can make the return home safer and more comfortable. Tell us about your loved one's needs and their doctor's guidance.",
      },
      {
        q: "Do you provide medical care?",
        a: "Our services focus on personal care, companionship and help with daily living. If your loved one also needs skilled nursing or therapy, talk with us and their doctor about the right mix of support.",
      },
    ],
  },
  {
    id: "scheduling-payment",
    title: "Scheduling & payment",
    items: [
      faqs[3],
      faqs[5],
      {
        q: "Can we change the care plan later?",
        a: "Of course. Needs change over time, and we revisit the care plan with your family so support always fits where your loved one is today.",
      },
    ],
  },
  {
    id: "our-caregivers",
    title: "Our caregivers",
    items: [
      {
        q: "Are your caregivers background checked?",
        a: "Pennsylvania requires background checks for direct care workers, and our caregivers complete the required clearances before working with clients.",
      },
      {
        q: "Will my loved one have the same caregiver?",
        a: "We aim for consistency, because familiar faces help build trust and comfort. If a schedule change is ever needed, we'll let you know in advance.",
      },
      faqs[4],
    ],
  },
];

export const careerFaqs: Faq[] = [
  {
    q: "Do I need prior caregiving experience?",
    a: "Experience is a plus, but character matters most. If you're compassionate, dependable and eager to learn, we'd love to hear from you.",
  },
  {
    q: "What clearances are required?",
    a: "Pennsylvania requires background checks for direct care workers. We'll guide you through every step of the process after you apply.",
  },
  {
    q: "Where would I be working?",
    a: `In clients' homes in and around ${site.address.city} and ${site.address.county}. We aim to match caregivers with clients close to where they live.`,
  },
];

/** Things every family can expect — used in place of testimonials until real reviews are added. */
export const promises = [
  { title: "A plan written for one person", body: "Your loved one's care plan is built around their routines, preferences and goals — never a template." },
  { title: "Dignity, always", body: "We knock, we ask, we explain. Care happens at their pace and in the way they're comfortable with." },
  { title: "Family in the loop", body: "We work closely with families and keep you informed, so you never have to wonder how the day went." },
  { title: "Independence first", body: "We help with what's needed and encourage everything they can still do on their own." },
  { title: "Local and reachable", body: `Our team is based right here in ${site.address.city}. When you call, you reach people who know your neighborhood.` },
  { title: "Consistency that builds trust", body: "Familiar faces and steady routines help your loved one feel safe and settled at home." },
  { title: "Care that adapts", body: "Needs change. We revisit the care plan with you so support always fits where your loved one is today." },
  { title: "Respect for the home", body: "Their home, their rules. We care for the space as respectfully as we care for the person." },
  { title: "Peace of mind", body: "Exceptional care every step of the way — so you can be a daughter, son or spouse again, not just a caregiver." },
];

/**
 * Real client testimonials. Leave empty until the agency provides reviews it
 * has permission to publish (e.g. from CareAvailability or Google). When filled,
 * the home page swaps the "promises" wall for these.
 */
export const testimonials: { quote: string; name: string; relation?: string }[] = [];

export const values = [
  {
    title: "Compassion",
    body: "We treat every client the way we'd want our own parents and grandparents treated — with warmth, patience and kindness.",
    image: "/images/companionship.jpg",
  },
  {
    title: "Dignity",
    body: "Privacy, choice and respect come first in every task, from bathing to conversation.",
    image: "/images/couple-window.jpg",
  },
  {
    title: "Personalization",
    body: "Customized care plans that reflect each client's unique needs, history and preferences.",
    image: "/images/hero-reading.jpg",
  },
  {
    title: "Partnership",
    body: "We work closely with families so everyone shares the same goals and the same peace of mind.",
    image: "/images/family.jpg",
  },
  {
    title: "Independence",
    body: "We support what's needed and celebrate everything your loved one can still do on their own.",
    image: "/images/exercise.jpg",
  },
];

export const steps = [
  {
    title: "Reach out",
    body: `Call ${site.phone} or send us a message. Tell us about your loved one and what's prompting the search for care.`,
    image: "/images/family.jpg",
  },
  {
    title: "Get to know you",
    body: "We listen closely — to routines, preferences, health needs and the little things that make a day feel right.",
    image: "/images/medication.jpg",
  },
  {
    title: "Build the care plan",
    body: "Together with your family, we create a customized care plan that meets your loved one's unique needs.",
    image: "/images/hero-reading.jpg",
  },
  {
    title: "Care begins — and evolves",
    body: "A compassionate caregiver begins visits, and we stay in touch, adjusting the plan as needs change.",
    image: "/images/couple-walk.jpg",
  },
];
