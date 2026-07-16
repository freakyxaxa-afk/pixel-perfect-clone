import { createFileRoute } from "@tanstack/react-router";
import { EditableImage } from "@/components/EditableImage";

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const accessories: { name: string; image: string }[] = [
  { name: "Cutlery Organizer", image: "/category-images/kitchen-accessories/cutlery-organizer.jpg" },
  { name: "Drawer Organizer", image: "/category-images/kitchen-accessories/drawer-organizer.jpg" },
  { name: "Drawer Divider", image: "/category-images/kitchen-accessories/drawer-divider.jpg" },
  { name: "Spice Pull-Out", image: "/category-images/kitchen-accessories/spice-pull-out.jpg" },
  { name: "Bottle Pull-Out", image: "/category-images/kitchen-accessories/bottle-pull-out.jpg" },
  { name: "Magic Corner", image: "/category-images/kitchen-accessories/magic-corner.jpg" },
  { name: "Corner Carousel", image: "/category-images/kitchen-accessories/corner-carousel.jpg" },
  { name: "Pull-Out Pantry", image: "/category-images/kitchen-accessories/pull-out-pantry.jpg" },
  { name: "Tall Pantry Unit", image: "/category-images/kitchen-accessories/tall-pantry-unit.jpg" },
  { name: "Waste Bin System", image: "/category-images/kitchen-accessories/waste-bin-system.jpg" },
  { name: "Dish Drying Rack", image: "/category-images/kitchen-accessories/dish-drying-rack.jpg" },
  { name: "Sink Organizer", image: "/category-images/kitchen-accessories/sink-organizer.jpg" },
  { name: "Plate Holder", image: "/category-images/kitchen-accessories/plate-holder.jpg" },
  { name: "Glass Holder", image: "/category-images/kitchen-accessories/glass-holder.jpg" },
  { name: "Lift-Up Cabinet System", image: "/category-images/kitchen-accessories/lift-up-cabinet-system.jpg" },
  { name: "Under-Sink Organizer", image: "/category-images/kitchen-accessories/under-sink-organizer.jpg" },
];

const title = "Kitchen Accessories — Wood Lab Islamabad";
const description =
  "Premium built-in kitchen accessories — cutlery organizers, magic corners, pull-out pantries, bottle racks, waste bin systems and more, integrated into bespoke Wood Lab kitchens.";

export const Route = createFileRoute("/kitchen-accessories")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: KitchenAccessoriesPage,
});

function KitchenAccessoriesPage() {
  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Wood Lab Islamabad
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Kitchen Accessories
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Intelligent, premium storage hardware engineered to make every Wood Lab kitchen effortless to use.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {accessories.map((item) => (
            <article
              key={item.name}
              className="group flex flex-col overflow-hidden rounded-xl bg-card"
            >
              <EditableImage
                slug={`kitchen-accessories/${toSlug(item.name)}`}
                src={item.image}
                alt={item.name}
                className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted"
                imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <h2 className="mt-3 px-1 text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm">
                {item.name}
              </h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
