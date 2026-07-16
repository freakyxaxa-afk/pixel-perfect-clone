import { createFileRoute } from "@tanstack/react-router";
import { MainCategoryPage, type CategoryTile } from "@/components/MainCategoryPage";

const tiles: CategoryTile[] = [
  { label: 'Vatti', image: '/category-images/kitchen-appliances/vatti.jpg', to: '/kitchen-appliances/vatti' },
  { label: 'Fotile', image: '/category-images/kitchen-appliances/fotile.jpg', to: '/kitchen-appliances/fotile' },
  { label: 'Robam', image: '/category-images/kitchen-appliances/robam.jpg', to: '/kitchen-appliances/robam' },
  { label: 'Bosch', image: '/category-images/kitchen-appliances/bosch.jpg', to: '/kitchen-appliances/bosch' }
];

export const Route = createFileRoute("/kitchen-appliances/")({
  head: () => ({
    meta: [
      { title: 'Kitchen Appliances — WoodLab Islamabad' },
      { name: "description", content: 'Premium built-in kitchen appliances — Vatti, Fotile, Robam and Bosch — integrated into your WoodLab kitchen.' },
      { property: "og:title", content: 'Kitchen Appliances — WoodLab Islamabad' },
      { property: "og:description", content: 'Premium built-in kitchen appliances — Vatti, Fotile, Robam and Bosch — integrated into your WoodLab kitchen.' },
    ],
  }),
  component: () => (
    <MainCategoryPage
      eyebrow='Kitchen Appliances'
      title='Kitchen Appliances'
      subtitle='Premium built-in kitchen appliances integrated into your WoodLab kitchen.'
      tiles={tiles}
    />
  ),
});
