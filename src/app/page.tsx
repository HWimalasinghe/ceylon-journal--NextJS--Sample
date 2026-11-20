import Link from "next/link";
import { ArrowRight, Compass, Heart, CarFront, Headphones } from "lucide-react";
import {
  Hero,
  Reveal,
  DestinationMap,
  ExperienceStory,
  Gallery,
} from "@/components/interactive";
import {
  SectionTitle,
  JourneyCard,
  StoryCard,
  ButtonLink,
  Photo,
  CTA,
} from "@/components/ui";
import {
  getJourneys,
  getDestinations,
  getExperiences,
  getStays,
  getArticles,
} from "@/lib/content";
export default async function Home() {
  const [journeys, destinations, experiences, stays, articles] =
    await Promise.all([
      getJourneys(),
      getDestinations(),
      getExperiences(),
      getStays(),
      getArticles(),
    ]);
  return (
    <>
      <Hero />
      <section id="intro" className="intro section">
        <div className="wrap intro-grid">
          <Reveal>
            <span className="eyebrow">
              <i /> THE CEYLON JOURNAL WAY
            </span>
            <h2>
              Discover the soul
              <br />
              of an <em>extraordinary island.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p>
              From ancient kingdoms and emerald tea estates to serene shores,
              Sri Lanka holds a lifetime of discoveries. We believe the most
              meaningful journeys are personal, thoughtful and filled with the
              unexpected.
            </p>
            <Link href="/about" className="text-link">
              Discover our philosophy <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
        <div className="wrap trust-grid">
          {[
            {
              icon: Compass,
              title: "Local knowledge",
              text: "The island, through local eyes.",
            },
            {
              icon: Heart,
              title: "Bespoke by design",
              text: "Every detail, thoughtfully yours.",
            },
            {
              icon: CarFront,
              title: "Private journeys",
              text: "Freedom to travel at your pace.",
            },
            {
              icon: Headphones,
              title: "Personal care",
              text: "A human specialist by your side.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="trust-item">
              <Icon size={27} strokeWidth={1.3} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section sand">
        <div className="wrap">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="CURATED COLLECTION"
              title="Journeys made for you."
              description="A collection of inspiring private escapes. Each is a starting point for something entirely your own."
            />
            <ButtonLink href="/journeys" variant="outline">
              View all journeys
            </ButtonLink>
          </div>
          <div className="grid-3">
            {journeys.slice(0, 3).map((j) => (
              <Reveal key={j.slug}>
                <JourneyCard journey={j} />
              </Reveal>
            ))}
          </div>
          <p className="fine-print">
            Illustrative itineraries and prices · Not live travel offers
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionTitle
            eyebrow="A WORLD IN ONE ISLAND"
            title="Find your Sri Lanka."
            description="Choose a destination to discover the landscapes, stories and experiences that await."
          />
          <DestinationMap destinations={destinations} />
        </div>
      </section>
      <section className="section dark">
        <div className="wrap">
          <SectionTitle
            eyebrow="EXPERIENCES THAT STAY WITH YOU"
            title="Moments beyond the ordinary."
            description="Experience the island through its people, places, and natural rhythms."
          />
          <ExperienceStory stories={experiences} />
          <ButtonLink href="/experiences" variant="light">
            Explore experiences
          </ButtonLink>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="A PLACE TO BELONG"
              title="Stay somewhere special."
              description="Intimate retreats, heritage bungalows and beautiful spaces to call your own."
            />
            <ButtonLink href="/stays" variant="outline">
              Explore stays
            </ButtonLink>
          </div>
          <div className="grid-3">
            {stays.map((s) => (
              <StoryCard key={s.slug} story={s} base="stays" />
            ))}
          </div>
        </div>
      </section>
      <section className="section sand">
        <div className="wrap split">
          <Photo
            src="/images/tea.webp"
            alt="Illustrative highland landscape"
            className="about-photo"
          />
          <div>
            <SectionTitle
              eyebrow="TRAVEL WITH INTENTION"
              title="A more personal way to wander."
              description="Ceylon Journal is a concept for a local, independent travel concierge. We envision journeys rooted in authentic encounters, respect for nature and the joy of slowing down."
            />
            <ButtonLink href="/about">Our story</ButtonLink>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionTitle
            eyebrow="A GLIMPSE OF THE ISLAND"
            title="Sri Lanka, in frames."
          />
          <Gallery
            images={destinations.map((d) => ({
              src: d.image,
              alt: d.name + " illustrative scene",
            }))}
          />
        </div>
      </section>
      <section className="section sand">
        <div className="wrap">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="THE TRAVEL JOURNAL"
              title="Stories for the curious."
            />
            <ButtonLink href="/journal" variant="outline">
              Read the journal
            </ButtonLink>
          </div>
          <div className="grid-3">
            {articles.map((a) => (
              <StoryCard key={a.slug} story={a} base="journal" />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
