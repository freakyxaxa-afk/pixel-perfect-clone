import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['home-furnitures/wooden'];

export const Route = createFileRoute('/home-furnitures/wooden')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
