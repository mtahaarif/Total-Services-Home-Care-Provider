import { PageTransition } from "@/components/layout/page-transition";
import { Hero } from "@/components/home/hero";
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

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
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
