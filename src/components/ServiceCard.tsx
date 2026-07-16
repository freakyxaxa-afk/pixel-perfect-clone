import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        id={service.slug}
        className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-luxe)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

          <div className="mt-4 grid gap-1.5">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-gold" />
                <span className="text-foreground/80">{f}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {service.benefits.map((b) => (
              <span
                key={b}
                className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
              >
                {b}
              </span>
            ))}
          </div>

          <Link
            to="/book"
            search={{ service: service.title }}
            className="group/btn mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            Book Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
