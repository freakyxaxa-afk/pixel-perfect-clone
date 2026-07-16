import { PageHero, Section } from "@/components/sections";
import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/site-data";

export function CategoryPage({
  eyebrow,
  title,
  subtitle,
  intro,
  highlights,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  intro: string;
  highlights: string[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {highlights.map((h) => (
            <div
              key={h}
              className="glass rounded-2xl px-5 py-4 text-sm text-foreground/90"
            >
              <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
              {h}
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Link
            to="/book"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            Book Consultation
          </Link>
          <a
            href={`tel:${COMPANY.phoneIntl}`}
            className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Call {COMPANY.phone}
          </a>
        </div>
      </Section>
    </>
  );
}
