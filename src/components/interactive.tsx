"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Search,
  Play,
  Pause,
} from "lucide-react";
import Link from "next/link";
import { Photo, JourneyCard, ButtonLink } from "./ui";
import type { Destination, Journey, Story } from "@/lib/data";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 22 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-45px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Hero() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return (
    <section className="hero">
      <Photo
        src="/images/hero.webp"
        alt="Artistic depiction of Sigiriya rising above the Sri Lankan forest at dawn"
        priority
        sizes="100vw"
        className={`hero-photo ${paused ? "paused" : ""}`}
      />
      <div className="hero-shade" />
      <div className="wrap hero-inner">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow hero-eyebrow">
            <i /> BESPOKE PRIVATE TRAVEL · SRI LANKA
          </span>
          <h1>
            Beyond the
            <br />
            <em>ordinary.</em>
          </h1>
          <p>
            Discover a different side of Sri Lanka. Thoughtfully curated
            journeys, intimate stays and unforgettable moments, designed
            entirely around you.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/plan-your-journey" variant="light">
              Design your journey
            </ButtonLink>
            <Link href="/journeys" className="hero-secondary">
              Explore journeys <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="wrap hero-bottom">
        <a href="#intro" className="scroll-cue">
          <ArrowDown size={18} /> Scroll to discover
        </a>
        <span className="hero-location">
          <MapPin size={16} /> Cultural Triangle, Sri Lanka
        </span>
        <button
          aria-label={
            paused ? "Play background motion" : "Pause background motion"
          }
          onClick={() => setPaused(!paused)}
          className="motion-control"
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </section>
  );
}
export function DestinationMap({
  destinations,
  route,
}: {
  destinations: Destination[];
  route?: string[];
}) {
  const list = route
    ? route
        .map((s) => destinations.find((d) => d.slug === s))
        .filter((d): d is Destination => !!d)
    : destinations;
  const [slug, setSlug] = useState(list[0]?.slug);
  const active = list.find((d) => d.slug === slug) || list[0];
  if (!active) return null;
  return (
    <div className="map-layout">
      <div className="map-panel">
        <div className="map-compass">N ↑</div>
        <svg
          viewBox="0 0 300 340"
          role="group"
          aria-label="Illustrative map of Sri Lanka with destination pins"
        >
          <defs>
            <pattern
              id="lines"
              width="11"
              height="11"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 11L11 0" stroke="#bdc8a7" strokeWidth=".4" />
            </pattern>
          </defs>
          <path
            d="M123 14L141 20 147 39 160 47 171 66 188 79 198 107 215 135 231 162 242 193 243 224 228 253 215 275 193 294 163 306 135 315 110 306 84 287 67 263 58 234 56 205 62 176 68 150 77 128 90 104 93 81 109 63 110 41 116 28Z"
            fill="#d9dfc6"
            stroke="#70856b"
            strokeWidth="1.6"
          />
          <path
            d="M123 14L141 20 147 39 160 47 171 66 188 79 198 107 215 135 231 162 242 193 243 224 228 253 215 275 193 294 163 306 135 315 110 306 84 287 67 263 58 234 56 205 62 176 68 150 77 128 90 104 93 81 109 63 110 41 116 28Z"
            fill="url(#lines)"
          />
          {route && (
            <polyline
              points={list
                .map((d) => `${d.x * 2.35 + 23},${d.y * 3.05 + 12}`)
                .join(" ")}
              fill="none"
              stroke="#887040"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          )}
          {list.map((d) => (
            <g
              key={d.slug}
              role="button"
              tabIndex={0}
              aria-label={`Select ${d.name}`}
              aria-pressed={active.slug === d.slug}
              onClick={() => setSlug(d.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSlug(d.slug);
                }
              }}
              transform={`translate(${d.x * 2.35 + 23} ${d.y * 3.05 + 12})`}
            >
              <circle
                r={active.slug === d.slug ? 10 : 6}
                fill={active.slug === d.slug ? "#b89a60" : "#163b31"}
                stroke="white"
                strokeWidth="2"
              />
              <text x="12" y="4" fontSize="10" fill="#243a2e">
                {d.name}
              </text>
            </g>
          ))}
        </svg>
        <div className="map-pins" aria-label="Select a destination">
          {list.map((d) => (
            <button
              key={d.slug}
              aria-pressed={active.slug === d.slug}
              onClick={() => setSlug(d.slug)}
            >
              {d.name}
            </button>
          ))}
        </div>
        <small>Illustrative destination map · not for navigation</small>
      </div>
      <div className="map-info">
        <Photo src={active.image} alt={active.name} className="map-photo" />
        <div>
          <span className="eyebrow">{active.region}</span>
          <h3>{active.name}</h3>
          <p>{active.description}</p>
          <Link className="text-link" href={`/destinations/${active.slug}`}>
            Explore {active.name} <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export function JourneyFilters({ journeys }: { journeys: Journey[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const filtered = journeys
    .filter(
      (j) =>
        (category === "All" || j.category === category) &&
        `${j.title} ${j.description} ${j.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : sort === "duration"
          ? a.days - b.days
          : 0,
    );
  return (
    <>
      <div className="filter-bar">
        <div className="chips">
          {["All", ...new Set(journeys.map((j) => j.category))].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={18} />
          <input
            aria-label="Search journeys"
            placeholder="Search journeys"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Sort journeys"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price">Price: low to high</option>
          <option value="duration">Shortest first</option>
        </select>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} journeys
      </p>
      <div className="grid-3">
        {filtered.map((j) => (
          <JourneyCard key={j.slug} journey={j} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty">No journeys match. Try a different search.</p>
      )}
    </>
  );
}
export function ExperienceStory({ stories }: { stories: Story[] }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils
          .toArray<HTMLElement>(".experience-image", root.current!)
          .forEach((el) => {
            gsap.fromTo(
              el,
              { y: 22 },
              {
                y: -22,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <div ref={root} className="experience-rows">
      {stories.slice(0, 3).map((s, i) => (
        <article
          key={s.slug}
          className={`experience-row ${i % 2 ? "reverse" : ""}`}
        >
          <div className="experience-frame">
            <Photo src={s.image} alt={s.title} className="experience-image" />
          </div>
          <div className="experience-copy">
            <span className="eyebrow">
              <i /> 0{i + 1} / {s.category}
            </span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <Link className="text-link" href={`/experiences/${s.slug}`}>
              Discover experience <ArrowUpRight size={17} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export function Gallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <Swiper
      modules={[Navigation, A11y, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={18}
      slidesPerView={1}
      breakpoints={{ 760: { slidesPerView: 2 } }}
      className="gallery"
    >
      {images.map((i, index) => (
        <SwiperSlide key={index}>
          <Photo src={i.src} alt={i.alt} className="gallery-photo" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export function Accordion({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((x, i) => (
        <div key={i}>
          <button
            aria-expanded={open === i}
            aria-controls={`accordion-panel-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {x.title}
            <ChevronDown className={open === i ? "turned" : ""} />
          </button>
          <div hidden={open !== i} id={`accordion-panel-${i}`}>
            <p>{x.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
