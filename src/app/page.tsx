import { PageTransition } from "@/components/layout/page-transition";
import { Banner } from "@/components/sections/banner";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServiceTicker } from "@/components/home/service-ticker";
import { MissionScroll } from "@/components/home/mission-scroll";
import { HorizontalServices } from "@/components/home/horizontal-services";
import { StackingSteps } from "@/components/home/stacking-steps";
import { WhyBento } from "@/components/home/why-bento";
import { PromisesWall } from "@/components/home/promises-wall";
import { ServiceArea } from "@/components/home/service-area";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <PageTransition>
      <Banner
        eyebrow={`In-home care · ${site.address.city} & ${site.address.county}, PA`}
        title="Compassionate care, right where they feel most at *home.*"
        description="Personalized support with daily activities, personal care, meals, medication reminders, companionship and respite — from caring people right here in Delaware County."
        slides={[
          { src: "/images/hero-reading.jpg", alt: "A caregiver sitting on the sofa reading with a senior man at home", focus: "35% center" },
          { src: "/images/companionship.jpg", alt: "Caregiver holding a senior woman's hands", focus: "60% center" },
          { src: "/images/family.jpg", alt: "Family smiling together with a senior man at the table", focus: "60% center" },
        ]}
        primary={{ label: `Call ${site.phone}`, href: site.phoneHref }}
        secondary={{ label: "Explore our services", href: "/services" }}
      />
      <TrustStrip />
      <ServiceTicker />
      <MissionScroll />
      <HorizontalServices />
      <StackingSteps />
      <WhyBento />
      <PromisesWall />
      <ServiceArea />
      <FaqSection items={faqs} />
      <CtaBand />
    </PageTransition>
  );
}
