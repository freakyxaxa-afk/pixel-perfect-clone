import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section } from "@/components/sections";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Wood Lab Islamabad (PVT.) LTD" },
      {
        name: "description",
        content:
          "Answers to common questions about custom kitchens, wardrobes, WPC panels, home renovation, project timelines and booking a consultation.",
      },
      { property: "og:title", content: "FAQ — Wood Lab Islamabad" },
      { property: "og:description", content: "Everything you need to know before your project." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about working with Wood Lab Islamabad."
      />
      <Section className="max-w-3xl">
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b">
                <AccordionTrigger className="text-left font-display text-lg hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="mt-12 rounded-2xl border bg-secondary/40 p-8 text-center">
          <h3 className="text-2xl">Still have questions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our team is happy to help you plan your project.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            Contact Us
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
