import { getPublicFacilitators } from "@/lib/data/facilitators";
import { Hero } from "@/components/home/hero";
import {
  ActionSection,
  FacilitatorsPreview,
  GlobalSection,
  IntroSection,
} from "@/components/home/home-sections";
import { CtaSection } from "@/components/cta-section";

export default async function HomePage() {
  const facilitators = await getPublicFacilitators();

  return (
    <>
      <Hero facilitatorCount={facilitators.length} />
      <IntroSection />
      <ActionSection />
      <GlobalSection />
      {facilitators.length > 0 && <FacilitatorsPreview facilitators={facilitators} />}
      <CtaSection />
    </>
  );
}
