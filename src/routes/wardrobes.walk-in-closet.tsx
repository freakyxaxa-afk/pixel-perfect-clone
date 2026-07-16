import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['wardrobes/walk-in-closet'];

export const Route = createFileRoute('/wardrobes/walk-in-closet')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
