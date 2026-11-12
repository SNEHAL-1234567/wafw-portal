import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FacilitatorsGrid } from "@/components/facilitators-grid";
import { Container } from "@/components/ui";
import { getPublicFacilitators } from "@/lib/data/facilitators";
import { facilitatorRole, photos } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Facilitators",
  description: facilitatorRole,
};

export const revalidate = 300;

export default async function FacilitatorsPage() {
  const facilitators = await getPublicFacilitators();

  return (
    <>
      <PageHero
        name="Facilitators"
        title="Our facilitators"
        description={facilitatorRole}
        image={photos.classroomSession}
      />
      <section className="py-14 sm:py-20">
        <Container>
          <FacilitatorsGrid facilitators={facilitators} />
        </Container>
      </section>
    </>
  );
}
