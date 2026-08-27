import { getPublicFacilitators } from "@/lib/data/facilitators";
import { facilitatorPhotoUrl } from "@/lib/photo-url";
import { HeroScroll } from "@/components/hero-scroll";
import { MissionSection } from "@/components/mission-section";
import { StatsSection } from "@/components/stats-section";
import { ModulesSection } from "@/components/modules-section";
import { FacilitatorsPreview } from "@/components/facilitators-preview";
import { CtaSection } from "@/components/cta-section";

export default async function HomePage() {
  const facilitators = await getPublicFacilitators();

  const withPhotos = facilitators.filter((f) => f.photo_path);
  const heroPhotos = withPhotos
    .slice(0, 24)
    .map((f) => facilitatorPhotoUrl(f.photo_path)!);
  const previewFacilitators = facilitators.slice(0, 8);

  const countryCount = new Set(
    facilitators.map((f) => f.location).filter(Boolean),
  ).size;

  return (
    <>
      <HeroScroll photoUrls={heroPhotos} />
      <MissionSection />
      <StatsSection
        facilitatorCount={facilitators.length}
        countryCount={countryCount}
      />
      <ModulesSection />
      {previewFacilitators.length > 0 && (
        <FacilitatorsPreview facilitators={previewFacilitators} />
      )}
      <CtaSection />
    </>
  );
}
