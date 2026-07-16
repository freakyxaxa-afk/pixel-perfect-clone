import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary pt-44 pb-20 text-primary-foreground sm:pt-56 sm:pb-24">
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            loading="eager"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </>
      )}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-luxe relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/70">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className="mt-4 text-muted-foreground">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`container-luxe py-20 sm:py-28 ${className}`}>{children}</section>;
}
