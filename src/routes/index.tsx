import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Sparkles } from "lucide-react";

import { HeroSlideshow } from "@/components/HeroSlideshow";
import interiorDesignImg from "@/assets/interior-designing.jpg";
import beforeImg from "@/assets/before-after-before.jpg";
import afterImg from "@/assets/before-after-after.jpg";
import whyChooseBg from "@/assets/why-choose-bg.jpg";
import whoWeAreBg from "@/assets/who-we-are-bg.jpg";
import kitchenShowcase from "@/assets/kitchen-showcase.jpg";
import wardrobeShowcase from "@/assets/hero-wardrobe-showcase.jpg";
import doorsShowcase from "@/assets/hero-doors-showcase.jpg";
import interiorsShowcase from "@/assets/hero-interiors-showcase.jpg";
import homeFurnituresShowcase from "@/assets/hero-homefurnitures-showcase.jpg";
import kitchenAppliancesShowcase from "@/assets/hero-kitchen-appliances-showcase.jpg";
import kitchenAccessoriesShowcase from "@/assets/hero-kitchen-accessories-showcase.jpg";
import wardrobeAccessoriesShowcase from "@/assets/hero-wardrobe-accessories-showcase.jpg";
import featuredProjectShowcase from "@/assets/hero-featured-project-showcase.jpg";
import { COMPANY, STATS, WHY_CHOOSE } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Section, SectionHeading } from "@/components/sections";
import { CertifiedSection } from "@/components/CertifiedSection";
import { EditableImage } from "@/components/EditableImage";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const factor = isMobile ? 0.4 : 1;
  const clamped = Math.min(scrollY, 900);

  return (
    <>
      {/* HERO with parallax */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateY(${clamped * 0.4 * factor}px) scale(${1 + clamped * 0.0004 * factor})`,
          }}
        >
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/85" />

        </div>

        {/* floating decorative shapes */}
        <div
          className="pointer-events-none absolute left-[8%] top-[22%] h-24 w-24 rounded-full border border-gold/40"
          style={{ transform: `translateY(${-clamped * 0.25 * factor}px)` }}
        />
        <div
          className="pointer-events-none absolute right-[12%] top-[30%] h-40 w-40 rounded-full bg-gold/10 blur-2xl"
          style={{ transform: `translateY(${clamped * 0.5 * factor}px)` }}
        />

        <div
          className="container-luxe relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground"
          style={{
            transform: `translateY(${-clamped * 0.18 * factor}px)`,
            opacity: Math.max(1 - clamped / 620, 0),
          }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            {COMPANY.tagline}
          </div>
          <h1 className="max-w-4xl text-4xl leading-[1.08] sm:text-6xl md:text-7xl">
            Luxury Wood Interiors Crafted for Modern Living
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Premium kitchens, wardrobes, wooden doors, media walls, false ceilings, and complete
            home renovations designed with craftsmanship and precision.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-gold-foreground transition-transform hover:scale-105"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-primary-foreground/10"
            >
              Explore Projects
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-primary-foreground/80">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < 4 ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-primary-foreground/40"}
                />
              ))}
            </div>
            <span>{COMPANY.rating} · {COMPANY.reviewsCount} Google Reviews</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary-foreground/60">
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-primary-foreground/40 p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary-foreground/70" />
          </div>
        </div>
      </section>

      {/* KITCHEN SHOWCASE */}
      <ShowcaseBanner
        slug="home:kitchens"
        src={kitchenShowcase}
        alt="Luxury modern fitted kitchen with marble island and walnut cabinetry"
        position="[object-position:50%_55%] sm:[object-position:50%_50%]"
        title="Kitchens"
        to="/kitchens"
      />

      {/* WARDROBES SHOWCASE */}
      <ShowcaseBanner
        slug="home:wardrobes"
        src={wardrobeShowcase}
        alt="Luxury walk-in wardrobe with warm LED lighting and walnut cabinetry"
        position="[object-position:50%_45%] sm:[object-position:50%_50%]"
        title="Wardrobes"
        to="/wardrobes"
      />

      {/* DOORS SHOWCASE */}
      <ShowcaseBanner
        slug="home:doors"
        src={doorsShowcase}
        alt="Luxury modern wooden double entrance door with warm sconce lighting"
        position="[object-position:50%_50%] sm:[object-position:50%_50%]"
        title="Doors"
        to="/doors"
      />

      {/* INTERIORS SHOWCASE */}
      <ShowcaseBanner
        slug="home:interiors"
        src={interiorsShowcase}
        alt="Luxury modern living room with fluted wooden feature wall and media wall"
        position="[object-position:50%_45%] sm:[object-position:50%_50%]"
        title="Interiors"
        to="/interiors"
      />

      {/* HOME FURNITURES SHOWCASE */}
      <ShowcaseBanner
        slug="home:home-furniture"
        src={homeFurnituresShowcase}
        alt="Elegant contemporary living and dining interior with premium home furniture"
        position="[object-position:50%_60%] sm:[object-position:50%_50%]"
        title="Home Furnitures"
        to="/home-furnitures"
      />

      {/* KITCHEN APPLIANCES SHOWCASE */}
      <ShowcaseBanner
        slug="home:kitchen-appliances"
        src={kitchenAppliancesShowcase}
        alt="Luxury modern fitted kitchen featuring premium built-in appliances"
        position="[object-position:60%_45%] sm:[object-position:50%_40%]"
        title="Kitchen Appliances"
        to="/kitchen-appliances"
      />

      {/* KITCHEN ACCESSORIES SHOWCASE */}
      <ShowcaseBanner
        slug="home:kitchen-accessories"
        src={kitchenAccessoriesShowcase}
        alt="Premium kitchen drawer with internal storage organisers and cutlery trays"
        position="[object-position:50%_50%] sm:[object-position:50%_45%]"
        title="Kitchen Accessories"
        to="/kitchen-accessories"
      />

      {/* WARDROBE ACCESSORIES SHOWCASE */}
      <ShowcaseBanner
        slug="home:wardrobe-accessories"
        src={wardrobeAccessoriesShowcase}
        alt="Premium fitted wardrobe interior with internal accessories and organisers"
        position="[object-position:50%_50%] sm:[object-position:50%_50%]"
        title="Wardrobe Accessories"
        to="/wardrobe-accessories"
      />

      {/* FEATURED PROJECT / PORTFOLIO SHOWCASE */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[4/5] w-full sm:aspect-auto sm:h-[80vh] sm:min-h-[420px]">
          <EditableImage
            slug="home:portfolio"
            src={featuredProjectShowcase}
            alt="Premium completed luxury open-plan interior with bespoke wood panelling"
            className="absolute inset-0 h-full w-full"
            imgClassName="absolute inset-0 h-full w-full object-cover [object-position:55%_55%] sm:[object-position:55%_60%]"
            loading="lazy"
            width={1920}
            height={1088}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-primary-foreground">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-white sm:text-4xl md:text-5xl">
              Featured Project
            </h2>
            <div className="pointer-events-auto mt-5 sm:mt-6">
              <ShowcaseCTA to="/projects" label="Our Portfolio" />
            </div>
          </div>
        </div>
      </section>


      {/* INTRO */}
      <WhoWeAreSection />

      {/* INTERIOR DESIGNING & EXECUTION */}
      <Section className="grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="Design + Build"
            title="Interior Designing & Execution"
            subtitle="From first sketch to final handover — we design, plan, and execute complete interiors that feel cohesive, luxurious, and unmistakably yours."
          />
          <Reveal delay={120}>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our in-house team of interior designers and project managers work alongside our
              craftsmen to deliver turnkey solutions. We handle space planning, 2D & 3D visualisation,
              material selection, lighting design, custom woodwork, false ceilings, paint, and every
              finishing detail.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-6 space-y-3">
              {[
                "2D & 3D design layouts",
                "Material & finish curation",
                "End-to-end project execution",
                "Single point of contact",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280}>
            <Link
              to="/book"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <div className="relative">
            <img
              src={interiorDesignImg}
              alt="Luxury interior design and execution by Wood Lab Islamabad"
              loading="lazy"
              width={1024}
              height={1024}
              className="rounded-3xl shadow-[var(--shadow-luxe)]"
            />
            <div className="glass absolute -bottom-6 -left-4 rounded-2xl px-6 py-4 shadow-[var(--shadow-glass)] sm:-left-6">
              <p className="font-display text-3xl text-gold">Turnkey</p>
              <p className="text-xs text-muted-foreground">Design to Delivery</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* WHY CHOOSE US */}
      <WhyChooseSection />

      {/* BEFORE & AFTER */}
      <Section>
        <SectionHeading
          eyebrow="Transformations"
          title="Before & After Transformations"
          subtitle="See how thoughtful design and expert craftsmanship transform ordinary spaces into elegant, functional interiors."
        />
        <Reveal className="mt-14">
          <BeforeAfter
            beforeSrc={afterImg}
            afterSrc={beforeImg}
            beforeAlt="Kitchen before renovation"
            afterAlt="Kitchen after renovation"
          />
        </Reveal>
      </Section>

      {/* CERTIFIED & TRUSTED */}
      <CertifiedSection />

      {/* REVIEWS */}
      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Client Love" title="What Our Clients Say" />
        <div className="mt-12">
          <ReviewsCarousel />
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-luxe py-20 text-center sm:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-5xl">
              Let's Build Your Dream Interior
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-xl text-primary-foreground/70">
              Book a free consultation and let our designers bring your vision to life with premium
              craftsmanship.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/book"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-gold-foreground transition-transform hover:scale-105"
            >
              Book Your Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>

  );
}

function ShowcaseCTA({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to as any}
      className="group inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-foreground shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-transform hover:scale-105 sm:gap-2 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.25em]"
    >
      {label}
      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
    </Link>
  );
}

function ShowcaseBanner({
  slug,
  src,
  alt,
  position,
  title,
  to,
}: {
  slug: string;
  src: string;
  alt: string;
  position: string;
  title: string;
  to: string;
}) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/5] w-full sm:aspect-auto sm:h-[80vh] sm:min-h-[420px]">
        <EditableImage
          slug={slug}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full"
          imgClassName={`absolute inset-0 h-full w-full object-cover ${position}`}
          loading="lazy"
          width={1920}
          height={1088}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-4 pb-6 sm:pb-14">
          <h2
            className="max-w-[90%] text-center text-[22px] font-bold uppercase leading-tight tracking-[0.05em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-3xl md:text-4xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            {title}
          </h2>
          <div className="pointer-events-auto mt-3 sm:mt-4">
            <ShowcaseCTA to={to} label="Explore Now" />
          </div>
        </div>
      </div>
    </section>
  );
}


function WhoWeAreSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const mql = window.matchMedia("(max-width: 767px)");
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom > 0 && rect.top < vh) {
        const mid = rect.top + rect.height / 2 - vh / 2;
        const speed = mql.matches ? 0.1 : 0.25;
        setOffset(-mid * speed);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)` }}
      >
        <img
          src={whoWeAreBg}
          alt=""
          loading="lazy"
          decoding="async"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>
      <div className="container-luxe">
        <div className="mx-auto max-w-3xl text-center text-white">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Who We Are</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
              Crafting Timeless Interiors Since Day One
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 leading-relaxed text-white/80">
              Wood Lab Islamabad (PVT.) LTD is a premium interior construction and woodworking
              company specializing in luxury residential and commercial interiors. Our experienced
              craftsmen and designers combine creativity with precision to deliver elegant interiors
              that are both functional and timeless.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 leading-relaxed text-white/80">
              From luxurious kitchens and wardrobes to complete home renovations, office décor, media
              walls, false ceilings, and custom woodwork, we transform ordinary spaces into
              extraordinary living experiences.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-105"
            >
              Discover Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function WhyChooseSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom > 0 && rect.top < vh) {
        setVisible(true);
        if (!reduce) {
          const mid = rect.top + rect.height / 2 - vh / 2;
          const speed = mql.matches ? 0.08 : 0.2;
          setOffset(-mid * speed);
        }
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${offset}px, 0) scale(1.15)`,
          transition: "opacity 900ms ease-out",
          opacity: visible ? 1 : 0,
        }}
      >
        <img
          src={whyChooseBg}
          alt=""
          loading="lazy"
          decoding="async"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="container-luxe">
        <SectionHeadingLight
          eyebrow="Why Wood Lab"
          title="Why Clients Choose Us"
          subtitle="A relentless commitment to quality, detail and a seamless experience from start to finish."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((reason, i) => (
            <Reveal key={reason} delay={(i % 3) * 90}>
              <div className="group flex items-center gap-4 rounded-2xl bg-card p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-lg text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{reason}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeadingLight({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={200}>
          <p className="mx-auto mt-5 max-w-2xl text-white/75">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
