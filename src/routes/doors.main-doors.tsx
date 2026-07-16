import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['doors/main-doors'];

export const Route = createFileRoute('/doors/main-doors')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
