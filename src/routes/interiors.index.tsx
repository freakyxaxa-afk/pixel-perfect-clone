import { createFileRoute } from "@tanstack/react-router";
import { MainCategoryPage, type CategoryTile } from "@/components/MainCategoryPage";
import { INTERIOR_CATEGORY_IMAGES } from "@/lib/category-content";

const tiles: CategoryTile[] = [
  { label: 'Media Walls', image: INTERIOR_CATEGORY_IMAGES['interiors/media-walls'], to: '/interiors/media-walls' },
  { label: 'Feature Walls', image: INTERIOR_CATEGORY_IMAGES['interiors/feature-walls'], to: '/interiors/feature-walls' },
  { label: 'Bed Walls', image: INTERIOR_CATEGORY_IMAGES['interiors/bed-walls'], to: '/interiors/bed-walls' },
  { label: 'Wooden Flooring', image: INTERIOR_CATEGORY_IMAGES['interiors/wooden-flooring'], to: '/interiors/wooden-flooring' }
];

export const Route = createFileRoute("/interiors/")({
  head: () => ({
    meta: [
      { title: 'Interiors — WoodLab Islamabad' },
      { name: "description", content: 'Media walls, feature walls, bed walls and wooden flooring designed and executed by WoodLab.' },
      { property: "og:title", content: 'Interiors — WoodLab Islamabad' },
      { property: "og:description", content: 'Media walls, feature walls, bed walls and wooden flooring designed and executed by WoodLab.' },
    ],
  }),
  component: () => (
    <MainCategoryPage
      eyebrow='Interiors'
      title='Interiors'
      subtitle='Media walls, feature walls, bed walls and premium wooden flooring.'
      tiles={tiles}
    />
  ),
});
