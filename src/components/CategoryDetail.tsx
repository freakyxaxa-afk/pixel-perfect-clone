import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ChevronLeft, Check, Star } from "lucide-react";
import { ProductImageZoom } from "@/components/ProductImageZoom";
import { ImageLightbox } from "@/components/ImageLightbox";
import { EditableGallery } from "@/components/EditableGallery";
import type { CategoryContent } from "@/lib/category-content";
import { useCategoryImages } from "@/lib/site-images";
import { useAdmin } from "@/lib/admin-context";

export function CategoryDetail({ data }: { data: CategoryContent }) {
  const { slug, title, subtitle, introImage, hero, intro, intro2, features } = data;
  const { isAdmin } = useAdmin();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  const [parentSlug] = slug.split("/");
  const parentLabel = parentSlug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  const fallbackMain = introImage || hero;

  // DB-managed images (admin panel). If any exist, they take precedence.
  const { images: dbImages, reload } = useCategoryImages(slug);
  const hasDb = dbImages && dbImages.length > 0;
  const galleryImages: { src: string; alt: string }[] = hasDb
    ? dbImages!.map((img) => ({ src: img.public_url, alt: title }))
    : [{ src: fallbackMain, alt: title }];

  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    setCurrent(0);
  }, [slug]);

  const main = galleryImages[current] ?? galleryImages[0];
  const goPrev = () => setCurrent((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const goNext = () => setCurrent((i) => (i + 1) % galleryImages.length);

  return (
    <main className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-32 text-xs text-muted-foreground sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <nav className="flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={("/" + parentSlug) as any} className="hover:text-foreground">
            {parentLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{title}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div
              className="relative"
              onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStart.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStart.current;
                if (dx > 50) goPrev();
                else if (dx < -50) goNext();
                touchStart.current = null;
              }}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block w-full"
                aria-label="Open full-screen viewer"
              >
                <ProductImageZoom src={main.src} alt={main.alt} />
              </button>
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 hidden -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow hover:bg-background sm:grid"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-2 top-1/2 hidden -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/80 shadow hover:bg-background sm:grid"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {galleryImages.length > 1 && !isAdmin && (
              <div className="mt-4 flex flex-wrap gap-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    onDoubleClick={() => { setCurrent(i); setLightboxOpen(true); }}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 sm:h-20 sm:w-20 ${
                      i === current ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View picture ${i + 1}`}
                  >
                    <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span>4.9/5.0 based on 140+ customer reviews</span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-3 text-base leading-relaxed text-foreground/80">{subtitle}</p>

            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Category:</dt>
                <dd className="text-muted-foreground">
                  <Link to={("/" + parentSlug) as any} className="hover:text-foreground">
                    {parentLabel}
                  </Link>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                to="/book"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                Book Design Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Admin editable gallery below the main image */}
        {isAdmin && (
          <div className="mt-10">
            <EditableGallery slug={slug} images={dbImages ?? []} onChange={reload} />
          </div>
        )}
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex rounded-md bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border">
            Description
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">About {title}</h2>
          <div className="prose prose-neutral mt-6 max-w-none text-base leading-relaxed text-foreground/80">
            <p className="mb-4">{intro}</p>
            {intro2 && <p className="mb-4">{intro2}</p>}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Key Features</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <ImageLightbox
          images={galleryImages}
          index={current}
          onIndexChange={setCurrent}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}

export function categoryHead(data: CategoryContent) {
  const url = "/" + data.slug;
  return {
    meta: [
      { title: data.seoTitle },
      { name: "description", content: data.seoDescription },
      { property: "og:title", content: data.seoTitle },
      { property: "og:description", content: data.seoDescription },
      { property: "og:image", content: data.hero },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
