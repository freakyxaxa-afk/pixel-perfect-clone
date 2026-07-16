import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['doors/bed-bathroom-doors'];

export const Route = createFileRoute('/doors/bed-bathroom-doors')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
