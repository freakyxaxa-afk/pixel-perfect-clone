import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const data = CATEGORY_CONTENT['interiors/bed-walls'];

export const Route = createFileRoute('/interiors/bed-walls')({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
