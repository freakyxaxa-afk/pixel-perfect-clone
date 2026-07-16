import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Gem, Hammer, Palette, Workflow } from "lucide-react";
import aboutHeroBg from "@/assets/about-hero-bg.jpg";
import bedroomImg from "@/assets/bedroom.jpg";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section, SectionHeading } from "@/components/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wood Lab Islamabad (PVT.) LTD" },
      {
        name: "description",
        content:
          "Our story, mission, vision and craftsmanship. Learn how Wood Lab Islamabad creates timeless luxury interiors from concept to installation.",
      },
      { property: "og:title", content: "About — Wood Lab Islamabad" },
      {
        property: "og:description",
        content: "Timeless luxury interiors built with precision and passion.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Target, title: "Mission", text: "To transform every space into an elegant, functional and timeless environment through premium craftsmanship." },
  { icon: Eye, title: "Vision", text: "To be the most trusted name in luxury interior construction and custom woodworking across Pakistan." },
  { icon: Gem, title: "Values", text: "Integrity, quality, and attention to detail guide every project we deliver — no compromises." },
  { icon: Palette, title: "Design Philosophy", text: "We blend traditional woodworking mastery with modern design to create interiors that feel both warm and contemporary." },
  { icon: Hammer, title: "Craftsmanship", text: "Skilled artisans hand-finish every piece, ensuring precision, durability and a flawless final result." },
  { icon: Workflow, title: "Our Process", text: "Concept → Design → Manufacturing → Installation. A seamless journey with a single point of contact." },
];

const PROCESS = [
  { step: "01", title: "Concept", text: "We listen, understand your vision, and explore ideas tailored to your space and lifestyle." },
  { step: "02", title: "Design", text: "Detailed 3D designs, material selection and precise planning before a single cut is made." },
  { step: "03", title: "Manufacturing", text: "Premium materials crafted in our workshop with meticulous quality control." },
  { step: "04", title: "Installation", text: "Professional on-site installation and finishing, delivered on time and spotless." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Where Craftsmanship Meets Modern Design"
        subtitle="Wood Lab Islamabad (PVT.) LTD is a premium interior construction and woodworking company specializing in luxury residential and commercial interiors."
        backgroundImage={aboutHeroBg}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="left" eyebrow="Our Story" title="Built on Passion & Precision" />
          <Reveal delay={80}>
            <p className="mt-6 text-lg font-medium text-gold">
              Proudly doing this business since 1990.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              For over three decades, our experienced craftsmen and designers have combined creativity
              with precision to deliver elegant interiors that are both functional and timeless. What
              began as a dedicated woodworking workshop in 1990 has grown into a full-service interior
              construction company.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From luxurious kitchens and wardrobes to complete home renovations, office décor, media
              walls, false ceilings and custom woodwork, we transform ordinary spaces into
              extraordinary living experiences — always guided by quality and detail.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border bg-gradient-to-r from-primary to-primary/90 px-8 py-14 text-center text-primary-foreground">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Our Heritage</p>
            <p className="mt-4 font-display text-5xl sm:text-6xl">
              Doing this business <span className="text-gold">since 1990</span>
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/75">
              Three generations of trust, thousands of finished spaces, and a reputation built one
              flawless detail at a time.
            </p>
          </div>
        </Reveal>
      </Section>



      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="What Drives Us" title="Our Mission, Vision & Values" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 90}>
              <div className="h-full rounded-2xl border bg-card p-7 transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <img
            src={bedroomImg}
            alt="Modern luxury bedroom with custom wood headboard wall"
            loading="lazy"
            width={1024}
            height={1024}
            className="rounded-3xl shadow-[var(--shadow-luxe)]"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading align="left" eyebrow="How We Work" title="Our Four-Step Process" />
          <div className="mt-8 space-y-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="flex gap-5">
                  <span className="font-display text-3xl text-gold">{p.step}</span>
                  <div>
                    <h3 className="text-xl">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
