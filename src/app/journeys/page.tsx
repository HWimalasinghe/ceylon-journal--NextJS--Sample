import type { Metadata } from "next";
import { getJourneys } from "@/lib/content";
import { PageHero, CTA } from "@/components/ui";
import { JourneyFilters } from "@/components/interactive";
export const metadata: Metadata = { title: "Private Luxury Journeys" };
export default async function Page() {
  return (
    <>
      <PageHero
        eyebrow="THE COLLECTION"
        title="Journeys made for you."
        description="Explore inspiring itineraries, then make every moment your own."
        image="/images/coast.webp"
      />
      <section className="section">
        <div className="wrap">
          <JourneyFilters journeys={await getJourneys()} />
          <p className="fine-print">
            Demo itineraries and indicative USD pricing per person, excluding
            international flights. No live availability.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
