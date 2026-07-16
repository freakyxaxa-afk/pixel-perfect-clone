import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MapPin, Clock } from "lucide-react";
import { COMPANY, SERVICE_NAMES, buildWhatsAppUrl } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section } from "@/components/sections";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book a Consultation — Wood Lab Islamabad (PVT.) LTD" },
      {
        name: "description",
        content:
          "Book a free interior consultation with Wood Lab Islamabad. Share your project details and our team will contact you via WhatsApp.",
      },
      { property: "og:title", content: "Book a Consultation — Wood Lab Islamabad" },
      { property: "og:description", content: "Start your dream interior project today." },
    ],
  }),
  component: Book,
});

const BUDGETS = [
  "Under PKR 200,000",
  "PKR 200,000 – 500,000",
  "PKR 500,000 – 1,000,000",
  "PKR 1,000,000 – 2,500,000",
  "Above PKR 2,500,000",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30";

function Book() {
  const { service } = Route.useSearch();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    service: service ?? "",
    date: "",
    time: "",
    address: "",
    budget: "",
    notes: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      toast.error("Please fill in your name, phone and service.");
      return;
    }
    const message = `Hello Wood Lab Islamabad,
I would like to book a consultation.

Name: ${form.name}
Phone: ${form.phone}
WhatsApp: ${form.whatsapp || form.phone}
Email: ${form.email || "-"}
Selected Service: ${form.service}
Project Address: ${form.address || "-"}
Preferred Date: ${form.date || "-"}
Preferred Time: ${form.time || "-"}
Budget: ${form.budget || "-"}
Additional Details: ${form.notes || "-"}

Please contact me regarding my project.`;

    window.open(buildWhatsAppUrl(message), "_blank");
    toast.success("Opening WhatsApp with your consultation details…");
  };

  return (
    <>
      <PageHero
        eyebrow="Book Consultation"
        title="Start Your Dream Interior Project"
        subtitle="Share a few details and we'll send them straight to our team on WhatsApp for a fast response."
      />

      <Section className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name *">
                <input className={inputClass} value={form.name} onChange={set("name")} placeholder="Your full name" />
              </Field>
              <Field label="Phone *">
                <input className={inputClass} value={form.phone} onChange={set("phone")} placeholder="03xx xxxxxxx" />
              </Field>
              <Field label="WhatsApp">
                <input className={inputClass} value={form.whatsapp} onChange={set("whatsapp")} placeholder="Same as phone if empty" />
              </Field>
              <Field label="Email">
                <input type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="you@email.com" />
              </Field>
              <Field label="Service *">
                <select className={inputClass} value={form.service} onChange={set("service")}>
                  <option value="">Select a service</option>
                  {SERVICE_NAMES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Budget">
                <select className={inputClass} value={form.budget} onChange={set("budget")}>
                  <option value="">Select a budget</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred Date">
                <input type="date" className={inputClass} value={form.date} onChange={set("date")} />
              </Field>
              <Field label="Preferred Time">
                <input type="time" className={inputClass} value={form.time} onChange={set("time")} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Project Address">
                  <input className={inputClass} value={form.address} onChange={set("address")} placeholder="Where is the project located?" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Additional Notes">
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={form.notes}
                    onChange={set("notes")}
                    placeholder="Tell us more about your project…"
                  />
                </Field>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              Send Booking via WhatsApp
            </button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-4">
            <div className="rounded-2xl border bg-secondary/40 p-6">
              <h3 className="text-xl">Prefer to talk?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Call us directly or message us on WhatsApp — we usually respond within business hours.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" /> {COMPANY.phone}
                </a>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {COMPANY.address.join(", ")}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border p-6">
              <h4 className="flex items-center gap-2 text-lg">
                <Clock className="h-4 w-4 text-gold" /> Business Hours
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                {COMPANY.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className={h.closed ? "text-destructive" : ""}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
