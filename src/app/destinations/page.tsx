import type { Metadata } from "next";
import { getDestinations } from "@/lib/content";
import { PageHero, SectionTitle, DestinationCard, CTA } from "@/components/ui";
import { DestinationMap } from "@/components/interactive";
export const metadata: Metadata = { title: "Destinations" };
export default async function Page() {
  const d = await getDestinations();
  return (
    <>
      <PageHero
        eyebrow="EXPLORE THE ISLAND"
        title="Find your Sri Lanka."
        description="Ancient wonders, mountain escapes, wild landscapes and timeless shores."
        image="/images/hero.webp"
      />
      <section className="section">
        <div className="wrap">
          <DestinationMap destinations={d} />
          <div className="section-spacer" />
          <SectionTitle
            eyebrow="THE ISLAND'S REGIONS"
            title="Where will you wander?"
          />
          <div className="grid-3">
            {d.map((x) => (
              <DestinationCard key={x.slug} destination={x} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
