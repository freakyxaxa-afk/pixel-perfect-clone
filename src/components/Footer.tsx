import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/site-data";
import { TikTokIcon } from "@/components/TikTokIcon";
import logo from "@/assets/woodlab-logo.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Wood Lab Islamabad logo"
              className="h-16 w-16 rounded-full object-contain"
            />
            <span className="font-display text-xl">Wood Lab Islamabad</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Premium interior construction & luxury woodworking since {COMPANY.since}. From concept
            and design to manufacturing and installation.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={COMPANY.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href={COMPANY.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Projects" },
              { to: "/faq", label: "FAQ" },
              { to: "/book", label: "Book Consultation" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Services</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
            {SERVICES.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug} className="transition-colors hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Get in Touch</h4>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${COMPANY.phone}`} className="hover:text-gold">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-gold">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{COMPANY.address.join(", ")}</span>
            </li>
          </ul>
          <div className="mt-5 overflow-hidden rounded-xl border border-primary-foreground/15">
            <iframe
              title="Wood Lab Islamabad location"
              src={COMPANY.mapEmbed}
              className="h-32 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>{COMPANY.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
