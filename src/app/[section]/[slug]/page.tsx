import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getExperiences, getStays, getArticles } from "@/lib/content";
import {
  PageHero,
  CTA,
  Breadcrumb,
  SectionTitle,
  StoryCard,
  ButtonLink,
} from "@/components/ui";
const collections = {
  experiences: getExperiences,
  stays: getStays,
  journal: getArticles,
};
type Props = { params: Promise<{ section: string; slug: string }> };
export async function generateStaticParams() {
  const pairs = await Promise.all(
    Object.entries(collections).map(async ([section, get]) =>
      (await get()).map((s) => ({ section, slug: s.slug })),
    ),
  );
  return pairs.flat();
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const get = collections[section as keyof typeof collections];
  if (!get) return {};
  const s = (await get()).find((s) => s.slug === slug);
  return s ? { title: s.title, description: s.description } : {};
}
export default async function Page({ params }: Props) {
  const { section, slug } = await params;
  const get = collections[section as keyof typeof collections];
  if (!get) notFound();
  const list = await get();
  const s = list.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero
        eyebrow={s.category}
        title={s.title}
        description={s.description}
        image={s.image}
      />
      <section className="section">
        <div className="wrap reading">
          <Breadcrumb
            items={[
              {
                label: section[0].toUpperCase() + section.slice(1),
                href: `/${section}`,
              },
              { label: s.title },
            ]}
          />
          <h2>{s.description}</h2>
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <ButtonLink href="/plan-your-journey">
            Include this in my journey
          </ButtonLink>
        </div>
      </section>
      <section className="section sand">
        <div className="wrap">
          <SectionTitle eyebrow="DISCOVER MORE" title="More inspiration." />
          <div className="grid-3">
            {list
              .filter((x) => x.slug !== slug)
              .map((x) => (
                <StoryCard key={x.slug} story={x} base={section} />
              ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
