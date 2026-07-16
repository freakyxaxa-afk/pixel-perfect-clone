import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['wardrobes/aluminium-wardrobe'];

export const Route = createFileRoute('/wardrobes/aluminium-wardrobe')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
