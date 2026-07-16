import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductDetail, productHead } from "@/components/ProductDetail";
import { findProduct } from "@/lib/products";

export const Route = createFileRoute("/design/$subcategory/$product")({
  loader: ({ params }) => {
    const product = findProduct(params.subcategory, params.product);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Design not found — WoodLab" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return productHead(loaderData.product);
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Design not found</h1>
      <p className="mt-3 text-muted-foreground">
        The design you're looking for isn't in our current collection.
      </p>
    </main>
  ),
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
    </main>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  return <ProductDetail product={product} />;
}
