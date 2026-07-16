import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section } from "@/components/sections";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Wood Lab Islamabad (PVT.) LTD" },
      {
        name: "description",
        content:
          "Browse our portfolio of luxury kitchens, modern bedrooms, office interiors, false ceilings, wardrobes, media walls, home renovations and wooden doors.",
      },
      { property: "og:title", content: "Our Projects — Wood Lab Islamabad" },
      {
        property: "og:description",
        content: "A portfolio of premium interiors crafted across Islamabad.",
      },
    ],
  }),
  component: Projects,
});

type Project = { slug: string; title: string; category: string; image: string; detail: string };

const PROJECTS: Project[] = [
  { slug: "modular-walnut-kitchen", title: "Modular Walnut Kitchen", category: "Luxury Kitchens", image: "/category-images/projects/modular-walnut-kitchen.jpg", detail: "Handleless walnut cabinetry with marble tops and integrated lighting." },
  { slug: "illuminated-walk-in-wardrobe", title: "Illuminated Walk-in Wardrobe", category: "Wardrobes", image: "/category-images/projects/illuminated-walk-in-wardrobe.jpg", detail: "Full-height wardrobe with LED shelving and glass display doors." },
  { slug: "grand-hardwood-entrance", title: "Grand Hardwood Entrance", category: "Wooden Doors", image: "/category-images/projects/grand-hardwood-entrance.jpg", detail: "Solid hardwood entrance door with custom grain and brass fittings." },
  { slug: "executive-office-suite", title: "Executive Office Suite", category: "Office Interiors", image: "/category-images/projects/executive-office-suite.jpg", detail: "Wood-paneled executive office with bespoke desk and storage." },
  { slug: "cove-lit-living-ceiling", title: "Cove-Lit Living Ceiling", category: "False Ceilings", image: "/category-images/projects/cove-lit-living-ceiling.jpg", detail: "Layered gypsum ceiling with concealed LED cove lighting." },
  { slug: "backlit-media-wall", title: "Backlit Media Wall", category: "Media Walls", image: "/category-images/projects/backlit-media-wall.jpg", detail: "Wooden panel media wall with backlit shelving and hidden cabling." },
  { slug: "boutique-dressing-room", title: "Boutique Dressing Room", category: "Wardrobes", image: "/category-images/projects/boutique-dressing-room.jpg", detail: "Walk-in closet with island storage and feature lighting." },
  { slug: "turnkey-home-transformation", title: "Turnkey Home Transformation", category: "Home Renovation", image: "/category-images/projects/turnkey-home-transformation.jpg", detail: "Complete open-plan home renovation with premium finishes throughout." },
  { slug: "panelled-master-bedroom", title: "Panelled Master Bedroom", category: "Modern Bedrooms", image: "/category-images/projects/panelled-master-bedroom.jpg", detail: "Custom wood headboard wall with ambient lighting." },
  { slug: "spa-style-vanity", title: "Spa-Style Vanity", category: "Home Renovation", image: "/category-images/projects/spa-style-vanity.jpg", detail: "Moisture-resistant vanity with stone top and backlit mirror." },
  { slug: "fluted-wpc-feature-wall", title: "Fluted WPC Feature Wall", category: "Media Walls", image: "/category-images/projects/fluted-wpc-feature-wall.jpg", detail: "Premium WPC decorative panelling for a modern hallway." },
  { slug: "laminated-living-units", title: "Laminated Living Units", category: "Modern Bedrooms", image: "/category-images/projects/laminated-living-units.jpg", detail: "Custom laminated living-room storage and TV unit with integrated shelving." },
];

const CATEGORIES = [
  "All",
  "Luxury Kitchens",
  "Modern Bedrooms",
  "Office Interiors",
  "False Ceilings",
  "Wardrobes",
  "Media Walls",
  "Home Renovation",
  "Wooden Doors",
];

function Projects() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects That Speak for Themselves"
        subtitle="A selection of interiors we've designed, manufactured and installed with precision."
      />

      <Section>
        <div className="flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <button
                type="button"
                onClick={() => setLightbox(p)}
                className="group block w-full overflow-hidden rounded-2xl border bg-card text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-luxe)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 via-primary/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-sm font-medium text-primary-foreground">View project</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">{p.category}</span>
                  <h3 className="mt-1.5 text-xl">{p.title}</h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-luxe)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-primary/70 text-primary-foreground backdrop-blur transition-colors hover:bg-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="max-h-[60vh] w-full object-cover"
            />
            <div className="p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">{lightbox.category}</span>
              <h3 className="mt-1.5 text-2xl">{lightbox.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{lightbox.detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
