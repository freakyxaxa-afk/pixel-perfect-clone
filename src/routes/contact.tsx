import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY, buildWhatsAppUrl } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section } from "@/components/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Wood Lab Islamabad (PVT.) LTD" },
      {
        name: "description",
        content:
          "Contact Wood Lab Islamabad. Call 0305 5865757, email woodlabislamabad@gmail.com or visit our showroom in F-11/1, Islamabad.",
      },
      { property: "og:title", content: "Contact — Wood Lab Islamabad" },
      { property: "og:description", content: "Let's build your dream interior. Get in touch today." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  message: z.string().min(5),
});

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30";

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please add your name, phone and a short message.");
      return;
    }
    const msg = `Hello Wood Lab Islamabad,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "-"}\n\n${form.message}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
    toast.success("Opening WhatsApp with your message…");
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Your Dream Interior"
        subtitle="Reach out for a consultation, a quote, or simply to discuss ideas for your space."
      />

      <Section className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
              { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="font-medium">{c.value}</span>
                </span>
              </a>
            ))}

            <div className="flex items-start gap-4 rounded-2xl border bg-card p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Address
                </span>
                <span className="mt-1 block text-sm text-foreground/90">
                  {COMPANY.address.join(", ")}
                </span>
              </span>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h4 className="flex items-center gap-2 text-lg">
                <Clock className="h-4 w-4 text-gold" /> Business Hours
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                {COMPANY.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className={h.closed ? "font-medium text-destructive" : ""}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <h3 className="text-2xl">Send us a message</h3>
            <div className="mt-6 space-y-5">
              <input
                className={inputClass}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="email"
                className={inputClass}
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                rows={5}
                className={inputClass}
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                Send via WhatsApp
              </button>
            </div>
          </form>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Find Us Here</p>
            <p className="mx-auto mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
              {COMPANY.addressLine}
            </p>
            <a
              href={COMPANY.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5"
            >
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border shadow-[var(--shadow-soft)]">
            <iframe
              title="Wood Lab Islamabad location map"
              src={COMPANY.mapEmbed}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
