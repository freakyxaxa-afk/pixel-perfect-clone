import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Star, ChevronRight, Check } from "lucide-react";
import { ProductImageZoom } from "@/components/ProductImageZoom";
import type { Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [product.slug]);

  return (
    <main className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-32 text-xs text-muted-foreground sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <nav className="flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{product.parentLabel}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-foreground">{product.categoryLabel}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Top area */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: image */}
          <div>
            <ProductImageZoom src={product.image} alt={product.name} />
          </div>


          {/* Right: info */}
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span>4.9/5.0 Client Satisfaction</span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>

            <p className="mt-5 text-base leading-relaxed text-foreground/80">
              {product.intro}
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Category:</dt>
                <dd className="text-muted-foreground">
                  <Link
                    to={"/" + product.parentLabel.toLowerCase().replace(/\s+/g, "-") + "/" + product.subcategorySlug as any}
                    className="hover:text-foreground"
                  >
                    {product.categoryLabel}
                  </Link>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Collection:</dt>
                <dd className="text-muted-foreground">WoodLab Design Collections</dd>
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
      </section>

      {/* Description */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex rounded-md bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border">
            Description
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {product.editorialTitle}
          </h2>
          <div className="prose prose-neutral mt-6 max-w-none text-base leading-relaxed text-foreground/80">
            {product.editorial.map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Design Specifications
        </h2>
        <dl className="mt-6 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-y-0">
          {product.specs.map((s, i) => (
            <div
              key={s.label}
              className={`flex justify-between gap-4 px-5 py-4 text-sm sm:border-b sm:border-border ${
                i >= product.specs.length - 2 ? "sm:border-b-0" : ""
              }`}
            >
              <dt className="font-semibold text-foreground">{s.label}</dt>
              <dd className="text-right text-muted-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Key Features */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Key Features
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-background p-5"
              >
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


      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Bring the {product.name} to your space
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            WoodLab designs and executes this piece completely to your site — measurement, 3D preview, factory build and installation.
          </p>
          <div className="mt-6">
            <Link
              to="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
            >
              Book Design Consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export function productHead(product: Product) {
  const title = `${product.name} — WoodLab ${product.categoryLabel}`;
  const description = product.intro;
  const url = `/design/${product.subcategorySlug}/${product.slug}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: product.image },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
