import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site-data";
import { ServiceCard } from "@/components/ServiceCard";
import { PageHero, Section } from "@/components/sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Wood Lab Islamabad (PVT.) LTD" },
      {
        name: "description",
        content:
          "Explore our premium services: kitchen cabinets, wardrobes, wooden doors, media walls, false ceilings, WPC panels, home renovation and more.",
      },
      { property: "og:title", content: "Our Services — Wood Lab Islamabad" },
      {
        property: "og:description",
        content: "Luxury woodwork, custom interiors, renovation and premium finishing.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Premium Interior & Woodwork Solutions"
        subtitle="Each service is crafted with matching premium materials and delivered from concept to installation."
      />
      <Section>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} delay={(i % 3) * 100} />
          ))}
        </div>
      </Section>
    </>
  );
}
