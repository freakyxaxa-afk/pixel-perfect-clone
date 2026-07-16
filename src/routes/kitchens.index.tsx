import { createFileRoute } from "@tanstack/react-router";
import { MainCategoryPage, type CategoryTile } from "@/components/MainCategoryPage";

const tiles: CategoryTile[] = [
  { label: 'Modular Kitchen', image: '/category-images/kitchens/modular-kitchen/hero.jpg', to: '/kitchens/modular-kitchen' },
  { label: 'Classic Kitchen', image: '/category-images/kitchens/classic-kitchen/hero.jpg', to: '/kitchens/classic-kitchen' },
  { label: 'Modern Kitchen', image: '/category-images/kitchens/modern-kitchen/hero.jpg', to: '/kitchens/modern-kitchen' }
];

export const Route = createFileRoute("/kitchens/")({
  head: () => ({
    meta: [
      { title: 'Kitchens — WoodLab Islamabad' },
      { name: "description", content: 'Bespoke modular, classic and modern kitchens designed, manufactured and installed by WoodLab in Islamabad.' },
      { property: "og:title", content: 'Kitchens — WoodLab Islamabad' },
      { property: "og:description", content: 'Bespoke modular, classic and modern kitchens designed, manufactured and installed by WoodLab in Islamabad.' },
    ],
  }),
  component: () => (
    <MainCategoryPage
      eyebrow='Kitchens'
      title='Kitchens'
      subtitle='Modular, classic and modern kitchens — designed, built and installed by WoodLab.'
      tiles={tiles}
    />
  ),
});
