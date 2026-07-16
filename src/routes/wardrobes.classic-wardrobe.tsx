import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['wardrobes/classic-wardrobe'];

export const Route = createFileRoute('/wardrobes/classic-wardrobe')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
