import { createFileRoute } from "@tanstack/react-router";
import { EditableImage } from "@/components/EditableImage";

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const accessories: { name: string; image: string }[] = [
  { name: "Trouser Rack", image: "/category-images/wardrobe-accessories/trouser-rack.jpg" },
  { name: "Tie Rack", image: "/category-images/wardrobe-accessories/tie-rack.jpg" },
  { name: "Belt Organizer", image: "/category-images/wardrobe-accessories/belt-organizer.jpg" },
  { name: "Shoe Rack", image: "/category-images/wardrobe-accessories/shoe-rack.jpg" },
  { name: "Jewellery Organizer", image: "/category-images/wardrobe-accessories/jewellery-organizer.jpg" },
  { name: "Watch Organizer", image: "/category-images/wardrobe-accessories/watch-organizer.jpg" },
  { name: "Pull-Out Basket", image: "/category-images/wardrobe-accessories/pull-out-basket.jpg" },
  { name: "Pull-Down Hanging Rail", image: "/category-images/wardrobe-accessories/pull-down-hanging-rail.jpg" },
  { name: "Valet Rod", image: "/category-images/wardrobe-accessories/valet-rod.jpg" },
  { name: "Sliding Accessory Tray", image: "/category-images/wardrobe-accessories/sliding-accessory-tray.jpg" },
  { name: "Glass Drawer", image: "/category-images/wardrobe-accessories/glass-drawer.jpg" },
  { name: "LED Wardrobe Lighting", image: "/category-images/wardrobe-accessories/led-wardrobe-lighting.jpg" },
  { name: "Adjustable Shelving", image: "/category-images/wardrobe-accessories/adjustable-shelving.jpg" },
  { name: "Accessory Drawer Inserts", image: "/category-images/wardrobe-accessories/accessory-drawer-inserts.jpg" },
  { name: "Laundry Basket", image: "/category-images/wardrobe-accessories/laundry-basket.jpg" },
  { name: "Hanging Rod System", image: "/category-images/wardrobe-accessories/hanging-rod-system.jpg" },
];

const title = "Wardrobe Accessories — Wood Lab Islamabad";
const description =
  "Premium wardrobe accessories — trouser and tie racks, jewellery and watch organizers, pull-out baskets, shoe racks, soft-close drawers and LED lighting, integrated into bespoke Wood Lab wardrobes.";

export const Route = createFileRoute("/wardrobe-accessories")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WardrobeAccessoriesPage,
});

function WardrobeAccessoriesPage() {
  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Wood Lab Islamabad
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Wardrobe Accessories
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Boutique-grade organization systems that turn every Wood Lab wardrobe into a private dressing room.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {accessories.map((item) => (
            <article
              key={item.name}
              className="group flex flex-col overflow-hidden rounded-xl bg-card"
            >
              <EditableImage
                slug={`wardrobe-accessories/${toSlug(item.name)}`}
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
