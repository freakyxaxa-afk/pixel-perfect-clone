import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['kitchens/classic-kitchen'];

export const Route = createFileRoute('/kitchens/classic-kitchen')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
