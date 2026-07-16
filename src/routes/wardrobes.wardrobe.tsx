import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['wardrobes/wardrobe'];

export const Route = createFileRoute('/wardrobes/wardrobe')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
