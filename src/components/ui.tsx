import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Clock, Compass } from "lucide-react";
import type { Journey, Story, Destination } from "@/lib/data";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Ceylon Journal home">
      <span className="brand-mark">✳</span>
      <span>
        CEYLON<span className="brand-sub">JOURNAL</span>
      </span>
    </Link>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={src.startsWith("http")}
      />
    </div>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light";
}) {
  return (
    <Link href={href} className={`btn btn-${variant}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-title">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function JourneyCard({ journey: j }: { journey: Journey }) {
  return (
    <Link href={`/journeys/${j.slug}`} className="journey-card group">
      <Photo src={j.image} alt={j.title} className="card-photo" />
      <div className="card-content">
        <div className="card-meta">
          <span>{j.category}</span>
          <span>
            <Clock size={14} /> {j.days} days
          </span>
        </div>
        <h3>{j.title}</h3>
        <p>{j.description}</p>
        <div className="card-bottom">
          <span>
            From <strong>${j.price.toLocaleString("en-US")}</strong> / person
          </span>
          <span className="round-arrow">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </div>
    </Link>
  );
}
export function StoryCard({ story: s, base }: { story: Story; base: string }) {
  return (
    <Link href={`/${base}/${s.slug}`} className="story-card">
      <Photo src={s.image} alt={s.title} className="card-photo" />
      <div className="story-content">
        <span className="eyebrow">{s.category}</span>
        <h3>{s.title}</h3>
        <p>{s.description}</p>
        <span className="text-link">
          Discover more <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
export function DestinationCard({
  destination: d,
}: {
  destination: Destination;
}) {
  return (
    <Link href={`/destinations/${d.slug}`} className="destination-card">
      <Photo src={d.image} alt={d.name} className="card-photo" />
      <div className="destination-copy">
        <span>
          <Compass size={14} /> {d.region}
        </span>
        <h3>{d.name}</h3>
        <ArrowUpRight aria-hidden size={21} />
      </div>
    </Link>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className={`page-hero ${image ? "has-photo" : ""}`}>
      {image && <Photo src={image} alt="" priority sizes="100vw" />}
      <div className="page-hero-copy wrap">
        <span className="eyebrow">
          <i />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <span className="eyebrow">
            <i /> YOUR JOURNEY BEGINS HERE
          </span>
          <h2>
            A journey as unique
            <br />
            as <em>you.</em>
          </h2>
          <p>
            Tell us what inspires you. We’ll design a Sri Lankan escape entirely
            around your interests, pace and preferences.
          </p>
        </div>
        <ButtonLink href="/plan-your-journey" variant="light">
          Design my journey
        </ButtonLink>
      </div>
    </section>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((x, i) => (
        <span key={i}>
          {" "}
          / {x.href ? <Link href={x.href}>{x.label}</Link> : x.label}
        </span>
      ))}
    </nav>
  );
}
