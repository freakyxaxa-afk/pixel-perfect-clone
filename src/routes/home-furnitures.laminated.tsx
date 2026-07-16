import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['home-furnitures/laminated'];

export const Route = createFileRoute('/home-furnitures/laminated')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
