import { ShieldCheck, BadgeCheck, Award } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/sections";
import fbrLogo from "@/assets/cert-fbr.png";
import secpLogo from "@/assets/cert-secp.png";
import pecLogo from "@/assets/cert-pec.png";

type Cert = {
  key: string;
  logo: string;
  title: string;
  fullName: string;
  description: string;
  accent: string;
  certificateUrl?: string;
};

const CERTS: Cert[] = [
  {
    key: "fbr",
    logo: fbrLogo,
    title: "FBR Registered",
    fullName: "Federal Board of Revenue",
    description:
      "Registered with the Federal Board of Revenue, ensuring legal tax compliance and transparent business operations.",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    key: "secp",
    logo: secpLogo,
    title: "SECP Registered",
    fullName: "Securities & Exchange Commission of Pakistan",
    description:
      "Officially incorporated and registered with the Securities and Exchange Commission of Pakistan.",
    accent: "from-sky-500/20 to-sky-500/5",
  },
  {
    key: "pec",
    logo: pecLogo,
    title: "PEC Registered",
    fullName: "Pakistan Engineering Council",
    description:
      "Recognized by the Pakistan Engineering Council, reflecting professional engineering standards and industry compliance.",
    accent: "from-amber-500/20 to-amber-500/5",
  },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Legally Registered" },
  { icon: BadgeCheck, label: "Certified Professionals" },
  { icon: Award, label: "Trusted by Residential & Commercial Clients" },
];

export function CertifiedSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow="Certified & Trusted"
          title="Certified. Trusted. Professional."
          subtitle="We operate with full legal compliance and are officially registered with Pakistan's leading regulatory authorities, giving our clients confidence in every project we undertake."
        />

        {/* Trust badges */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="glass flex items-center gap-3 rounded-2xl border border-border/60 px-5 py-4 shadow-[var(--shadow-glass)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cert cards */}
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <Reveal key={c.key} delay={i * 150}>
              <article className="group relative flex h-full flex-col items-center rounded-[22px] border border-border/60 bg-white p-8 text-center shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
                <div
                  className={`pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${c.accent}`}
                />
                <div className="relative">
                  <div className="grid h-24 w-32 place-items-center rounded-2xl border border-border/60 bg-white px-4 shadow-inner transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={c.logo}
                      alt={`${c.fullName} official logo`}
                      className="max-h-[72px] w-auto object-contain"
                    />
                  </div>
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold text-gold-foreground shadow-md">
                    <BadgeCheck className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-semibold text-foreground">
                  {c.title}
                </h3>
                <p className="relative mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                  {c.fullName}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Trust statement */}
        <Reveal delay={200}>
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-border/60 bg-white/80 p-8 text-center shadow-[var(--shadow-glass)] backdrop-blur">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
              Fully Licensed & Trusted Across Pakistan
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We proudly operate as a legally registered company, meeting national standards for
              taxation, corporate compliance, and professional engineering practices. Our
              certifications reflect our commitment to transparency, quality, and long-term client
              trust.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
