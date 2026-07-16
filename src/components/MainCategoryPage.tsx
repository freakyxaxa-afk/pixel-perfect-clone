import { Link } from "@tanstack/react-router";
import { EditableImage } from "@/components/EditableImage";

export type CategoryTile = {
  label: string;
  image: string;
  to: string;
};

// Derive a stable slug from the destination path so the image can be
// managed through Supabase Storage without extra plumbing.
function tileSlug(to: string): string {
  return to.replace(/^\//, "").replace(/\/$/, "");
}

export function MainCategoryPage({
  eyebrow,
  title,
  subtitle,
  tiles,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tiles: CategoryTile[];
}) {
  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          )}
        </header>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {tiles.map((t) => (
            <article key={t.to} className="group flex flex-col overflow-hidden rounded-xl bg-card">
              <div className="block overflow-hidden rounded-xl bg-muted">
                <Link to={t.to as any} aria-label={`View ${t.label}`} className="block">
                  <EditableImage
                    slug={tileSlug(t.to)}
                    src={t.image}
                    alt={t.label}
                    className="aspect-[4/3] w-full overflow-hidden"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col gap-2 px-1 pt-3 sm:gap-3 sm:pt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm">
                  {t.label}
                </h2>
                <div>
                  <Link
                    to={t.to as any}
                    className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-accent hover:shadow-md sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-[15px]"
                  >
                    Read More
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
