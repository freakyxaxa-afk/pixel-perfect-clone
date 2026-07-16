import { Link } from "@tanstack/react-router";
import type { Subcategory } from "@/lib/products";
import { productPath } from "@/lib/products";

export function CatalogPage({ subcategory }: { subcategory: Subcategory }) {
  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {subcategory.pluralLabel}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Showing all {subcategory.products.length} results
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {subcategory.products.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-xl bg-card"
            >
              <Link
                to="/design/$subcategory/$product"
                params={{ subcategory: p.subcategorySlug, product: p.slug }}
                className="block overflow-hidden rounded-xl bg-muted"
                aria-label={`View ${p.name}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 px-1 pt-3 sm:gap-3 sm:pt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm">
                  {p.name}
                </h2>
                <div>
                  <Link
                    to="/design/$subcategory/$product"
                    params={{ subcategory: p.subcategorySlug, product: p.slug }}
                    className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-accent hover:shadow-md sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-[15px]"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function catalogHead(subcategory: Subcategory) {
  const title = `${subcategory.pluralLabel} — WoodLab Design Collection`;
  const description = `Explore ${subcategory.products.length} bespoke ${subcategory.pluralLabel.toLowerCase()} designs by WoodLab — custom design, premium hardware and complete execution.`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: subcategory.products[0]?.image },
      { property: "og:url", content: subcategory.routePath },
    ],
    links: [{ rel: "canonical", href: subcategory.routePath }],
  };
}

export { productPath };
