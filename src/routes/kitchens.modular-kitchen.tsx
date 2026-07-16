import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['kitchens/modular-kitchen'];

export const Route = createFileRoute('/kitchens/modular-kitchen')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
