import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJourneys, getDestinations } from "@/lib/content";
import {
  PageHero,
  Breadcrumb,
  ButtonLink,
  SectionTitle,
  JourneyCard,
  CTA,
} from "@/components/ui";
import { Accordion, DestinationMap, Gallery } from "@/components/interactive";
import { Check, Clock, Users, MapPin } from "lucide-react";
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getJourneys()).map((j) => ({ slug: j.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const j = (await getJourneys()).find((x) => x.slug === slug);
  return j ? { title: j.title, description: j.description } : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [journeys, destinations] = await Promise.all([
    getJourneys(),
    getDestinations(),
  ]);
  const j = journeys.find((x) => x.slug === slug);
  if (!j) notFound();
  return (
    <>
      <PageHero
        eyebrow={`${j.category} · ${j.days} DAYS`}
        title={j.title}
        description={j.description}
        image={j.image}
      />
      <div className="wrap">
        <Breadcrumb
          items={[{ label: "Journeys", href: "/journeys" }, { label: j.title }]}
        />
        <div className="detail-grid">
          <article>
            <div className="facts">
              <span>
                <Clock />
                {j.days} days
              </span>
              <span>
                <Users />
                Private journey
              </span>
              <span>
                <MapPin />
                {j.destinations.length} destinations
              </span>
            </div>
            <SectionTitle
              eyebrow="THE JOURNEY"
              title="Your private escape."
              description={j.description}
            />
            <h3 className="subheading">Journey highlights</h3>
            <ul className="check-list">
              {j.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} />
                  {h}
                </li>
              ))}
            </ul>
            <h3 className="subheading">Your itinerary</h3>
            <Accordion
              items={j.itinerary.map((d) => ({
                title: `Day ${d.day} · ${d.title}`,
                body: d.description,
              }))}
            />
            <h3 className="subheading">Explore your route</h3>
            <DestinationMap
              destinations={destinations}
              route={j.destinations}
            />
            <h3 className="subheading">A glimpse of your journey</h3>
            <Gallery
              images={j.destinations
                .map((s) => destinations.find((d) => d.slug === s))
                .filter((d) => !!d)
                .map((d) => ({ src: d.image, alt: d.name }))}
            />
            <h3 className="subheading">What's included?</h3>
            <ul className="check-list">
              {[
                "Private driver and transport (indicative)",
                "Suggested boutique accommodation",
                "Guided experiences as agreed",
                "Personalized itinerary planning",
              ].map((h) => (
                <li key={h}>
                  <Check size={18} />
                  {h}
                </li>
              ))}
            </ul>
            <p>
              International flights, travel insurance, personal expenses and
              optional activities are excluded unless explicitly included in a
              final travel proposal.
            </p>
            <h3 className="subheading">Important information</h3>
            <p>
              All details are illustrative. Actual availability, accommodation,
              pricing, travel times and cancellation terms must be confirmed
              before booking.
            </p>
          </article>
          <aside className="inquiry-sidebar">
            <span className="eyebrow">MAKE IT YOUR OWN</span>
            <h2>From ${j.price.toLocaleString("en-US")}</h2>
            <p>Indicative USD per person · {j.days} days</p>
            <ButtonLink href={`/plan-your-journey?journey=${j.slug}`}>
              Personalize this journey
            </ButtonLink>
            <small>
              Private, flexible and tailored to your preferences. No payment
              required.
            </small>
          </aside>
        </div>
      </div>
      <section className="section sand">
        <div className="wrap">
          <SectionTitle eyebrow="MORE INSPIRATION" title="You may also love." />
          <div className="grid-3">
            {journeys
              .filter((x) => x.slug !== slug)
              .slice(0, 3)
              .map((x) => (
                <JourneyCard key={x.slug} journey={x} />
              ))}
          </div>
        </div>
      </section>
      <CTA />
      <div className="mobile-inquiry">
        <ButtonLink href={`/plan-your-journey?journey=${j.slug}`}>
          Personalize this journey
        </ButtonLink>
      </div>
    </>
  );
}
